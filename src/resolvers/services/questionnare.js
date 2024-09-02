import api, { route, storage, startsWith  } from "@forge/api";
import { getInstancePrefixKeys, getInstanceUserKey } from "./storageUtils";

export const getCurrentUser = async _ => {
  const response = await api.asUser().requestConfluence(route`/wiki/rest/api/user/current`, {
    headers: {
      'Accept': 'application/json'
    }
  });      
  return await response.json();
}

export const getAllOutputs = async(systemObj) => {
  const appId = systemObj.context.localId;
  let wrappedResult = await storage.query().where('key', startsWith(getInstancePrefixKeys(appId))).limit(10).getMany();
  const data = wrappedResult.results;
  while(wrappedResult.nextCursor) {
    wrappedResult = await storage.query().where('key', startsWith(getInstancePrefixKeys(appId))).limit(20).cursor(wrappedResult.nextCursor).getMany();
    data.push(...wrappedResult.results);
  }
  return data;
}

export const saveUserOutputs = async(ids) => {
  const appId = ids.context.localId;
  const accId = await getCurrentUser();
  await storage.set(getInstanceUserKey(appId, accId.accountId), {outputs: ids.payload, timestamp: new Date().toISOString() });
};

export const getUserOutputs = async(systemObj) => {
  const appId = systemObj.context.localId;
  const accId = await getCurrentUser();
  return storage.get(getInstanceUserKey(appId, accId.accountId));
};


export const getOutputVouters = async(choosenId) => {
  const appId = choosenId.context.localId;
  const idQuestion = JSON.stringify(choosenId.payload) === '{}' ? 0 : choosenId.payload;
  let wrappedResult = await storage.query().where('key', startsWith(getInstancePrefixKeys(appId))).limit(10).getMany();
  const data = wrappedResult.results.filter(it => it.value.outputs.includes(idQuestion));

  while(wrappedResult.nextCursor) {
    wrappedResult = await storage.query().where('key', startsWith(getInstancePrefixKeys(appId))).limit(20).cursor(wrappedResult.nextCursor).getMany();
    data.push(...wrappedResult.results.filter(it => it.value.outputs.includes(idQuestion)));
  }

  return data.map(it => it.key.replace(getInstancePrefixKeys(appId), ''));
};

export const clearVoutesOnEmptyQuestionValue = async(data) => {
  const emptyQuestionIds = data.payload.map((v,i) => v === false ? i : null).filter(i => i !== null);
  const userWithOutputs = await getAllOutputs(data);
  return await Promise.all(userWithOutputs.map(it => {
    const userResponsesWithoutEmptyAnswers = {...it.value, outputs: it.value.outputs.filter(n_it => !emptyQuestionIds.includes(n_it))};
    return storage.set(it.key, userResponsesWithoutEmptyAnswers);
  }))
}


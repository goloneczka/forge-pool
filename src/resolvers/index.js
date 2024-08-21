import Resolver from '@forge/resolver';
import api, { route, storage, startsWith  } from "@forge/api";

const resolver = new Resolver();

const getCurrentUser = async _ => {
  const response = await api.asUser().requestConfluence(route`/wiki/rest/api/user/current`, {
    headers: {
      'Accept': 'application/json'
    }
  });      
  return await response.json();
}

const getAllOutputs = async(systemObj) => {
  const appId = systemObj.context.localId;
  let wrappedResult = await storage.query().where('key', startsWith(`app-${appId}-userChoices-`)).limit(10).getMany();
  const data = wrappedResult.results;
  while(wrappedResult.nextCursor) {
    wrappedResult = await storage.query().where('key', startsWith(`app-${appId}-userChoices-`)).limit(20).cursor(wrappedResult.nextCursor).getMany();
    data.push(...wrappedResult.results);
  }
  return data;
}

resolver.define('getCurrentUser', async() => {
    return await getCurrentUser();
});

resolver.define('saveUserOutputs', async(ids) => {
  const appId = ids.context.localId;
  const accId = await getCurrentUser();
  await storage.set(`app-${appId}-userChoices-` + accId.accountId, ids.payload);
});

resolver.define('getUserOutputs', async(systemObj) => {
  const appId = systemObj.context.localId;
  const accId = await getCurrentUser();
  return storage.get(`app-${appId}-userChoices-` + accId.accountId);
});

resolver.define('getAllOutputs', async(systemObj) => {
  return getAllOutputs(systemObj);
});

resolver.define('getOutputVouters', async(choosenId) => {
  const appId = choosenId.context.localId;
  const idQuestion = JSON.stringify(choosenId.payload) === '{}' ? 0 : choosenId.payload;
  let wrappedResult = await storage.query().where('key', startsWith(`app-${appId}`)).limit(10).getMany();
  const data = wrappedResult.results.filter(it => it.value.includes(idQuestion));
  while(wrappedResult.nextCursor) {
    wrappedResult = await storage.query().where('key', startsWith(`app-${appId}`)).limit(20).cursor(wrappedResult.nextCursor).getMany();
    data.push(...wrappedResult.results.filter(it => it.value.includes(idQuestion)));
  }

  return data.map(it => it.key.replace(`app-${appId}-userChoices-`, ''))
});

resolver.define('clearVoutesOnEmptyQuestionValue', async(data) => {
  const emptyQuestionIds = data.payload.map((v,i) => v === false ? i : null).filter(i => i !== null);
  const userWithOutputs = await getAllOutputs(data);
  return await Promise.all(userWithOutputs.map(it => {
    const userResponsesWithoutEmptyAnswers = it.value.filter(n_it => !emptyQuestionIds.includes(n_it));
    storage.set(it.key, userResponsesWithoutEmptyAnswers);
  }))
});


resolver.define('initMockVotesData', async(systemObj) => {
  const appId = systemObj.context.localId;
  storage.set(`app-${appId}-userChoices-TEST-1`, []);
  storage.set(`app-${appId}-userChoices-TEST-2`, [0, 2, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-3`, [1, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-4`, [0, 1, 2, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-5`, [0, 1, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-6`, [0, 2, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-7`, [0, 2, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-8`, [0, 2, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-9`, [2, 1, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-10`, [0, 2, 7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-11`, [7]);
  storage.set(`app-${appId}-userChoices-TEST-12`, [7]);
  storage.set(`app-${appId}-userChoices-TEST-13`, [7]);
  storage.set(`app-${appId}-userChoices-TEST-14`, [7]);
  storage.set(`app-${appId}-userChoices-TEST-15`, [7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-16`, [7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-17`, [7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-18`, [7, 8]);
  storage.set(`app-${appId}-userChoices-TEST-19`, [7, 8]);
});

resolver.define('clearMockVoteskData', async(systemObj) => {
  const appId = systemObj.context.localId;
  storage.set(`app-${appId}-userChoices-TEST-1`, []);
  storage.set(`app-${appId}-userChoices-TEST-2`, []);
  storage.set(`app-${appId}-userChoices-TEST-3`, []);
  storage.set(`app-${appId}-userChoices-TEST-4`, []);
  storage.set(`app-${appId}-userChoices-TEST-5`, []);
  storage.set(`app-${appId}-userChoices-TEST-6`, []);
  storage.set(`app-${appId}-userChoices-TEST-7`, []);
  storage.set(`app-${appId}-userChoices-TEST-8`, []);
  storage.set(`app-${appId}-userChoices-TEST-9`, []);
  storage.set(`app-${appId}-userChoices-TEST-10`, []);
  storage.set(`app-${appId}-userChoices-TEST-11`, []);
  storage.set(`app-${appId}-userChoices-TEST-12`, []);
  storage.set(`app-${appId}-userChoices-TEST-13`, []);
  storage.set(`app-${appId}-userChoices-TEST-14`, []);
  storage.set(`app-${appId}-userChoices-TEST-15`, []);
  storage.set(`app-${appId}-userChoices-TEST-16`, []);
  storage.set(`app-${appId}-userChoices-TEST-17`, []);
  storage.set(`app-${appId}-userChoices-TEST-18`, []);
  storage.set(`app-${appId}-userChoices-TEST-19`, []);
});
export const handler = resolver.getDefinitions();

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

resolver.define('getCurrentUser', async() => {
    return await getCurrentUser();
});

resolver.define('saveUserOutputs', async(ids) => {
  const accId = await getCurrentUser();
  console.log('usr: ', accId.accountId, ' ',  ids.payload);
  await storage.set('userChoices-' + accId.accountId, ids.payload);
});

resolver.define('getUserOutputs', async() => {
  const accId = await getCurrentUser();
  return storage.get('userChoices-' + accId.accountId);
});

resolver.define('getAllOutputs', async() => {
  let wrappedResult = await storage.query().where('key', startsWith('userChoices-')).limit(10).getMany();
  const data = wrappedResult.results;
  while(wrappedResult.nextCursor) {
    wrappedResult = await storage.query().where('key', startsWith('userChoices-')).limit(20).cursor(wrappedResult.nextCursor).getMany();
    data.concat(wrappedResult.results);
  }
  console.log(data);
  return data;
});


resolver.define('initMockVotesData', () => {
  storage.set('userChoices-TEST-1' , []);
  storage.set('userChoices-TEST-2' , [0, 2]);
  storage.set('userChoices-TEST-3' , [1]);
  storage.set('userChoices-TEST-4' , [0, 1, 2]);
  storage.set('userChoices-TEST-5' , [0, 1]);
  storage.set('userChoices-TEST-6' , [0, 2]);
  storage.set('userChoices-TEST-7' , [0, 2]);
  storage.set('userChoices-TEST-8' , [0, 2]);
  storage.set('userChoices-TEST-9' , [2, 1]);
  storage.set('userChoices-TEST-10' , [0, 2]);
  storage.set('userChoices-TEST-11' , [2]);
});

resolver.define('clearMockVoteskData', async() => {
  storage.set('userChoices-TEST-1' , []);
  storage.set('userChoices-TEST-2' , []);
  storage.set('userChoices-TEST-3' , []);
  storage.set('userChoices-TEST-4' , []);
  storage.set('userChoices-TEST-5' , []);
  storage.set('userChoices-TEST-6' , []);
  storage.set('userChoices-TEST-7' , []);
  storage.set('userChoices-TEST-8' , []);
  storage.set('userChoices-TEST-9' , []);
  storage.set('userChoices-TEST-10' , []);
  storage.set('userChoices-TEST-11' , []);
});
export const handler = resolver.getDefinitions();

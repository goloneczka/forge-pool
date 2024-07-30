import Resolver from '@forge/resolver';
import api, { route, storage } from "@forge/api";

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

export const handler = resolver.getDefinitions();

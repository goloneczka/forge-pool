import Resolver from '@forge/resolver';
import api, { route } from "@forge/api";
const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Hello, world!';
});

resolver.define('getCurrentUser', async() => {
    const response = await api.asUser().requestConfluence(route`/wiki/rest/api/user/current`, {
        headers: {
          'Accept': 'application/json'
        }
    });      
    return await response.json();
});

export const handler = resolver.getDefinitions();

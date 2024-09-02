import Resolver from '@forge/resolver';
import api, { storage  } from "@forge/api";
import {getCurrentUser, getAllOutputs, saveUserOutputs, getUserOutputs, getOutputVouters, clearVoutesOnEmptyQuestionValue} from "./services/questionnare";
import {runGdpr} from "./services/gdpr";

const resolver = new Resolver();


resolver.define('getCurrentUser', async() => {
    return await getCurrentUser();
});

resolver.define('saveUserOutputs', async(ids) => {
  await saveUserOutputs(ids);
});

resolver.define('getUserOutputs', async(systemObj) => {
  return await getUserOutputs(systemObj);
});

resolver.define('getAllOutputs', async(systemObj) => {
  return await getAllOutputs(systemObj);
});

resolver.define('getOutputVouters', async(choosenId) => {
  return await getOutputVouters(choosenId);
});

resolver.define('clearVoutesOnEmptyQuestionValue', async(data) => {
  return await clearVoutesOnEmptyQuestionValue(data);
});

resolver.define('initMockVotesData', async(systemObj) => {
  const appId = systemObj.context.localId;
  storage.set(`app-${appId}-userChoices-TEST-1`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-2`, {outputs:[0, 2, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-3`, {outputs:[1, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-4`, {outputs:[0, 1, 2, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-5`, {outputs:[0, 1, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-6`, {outputs:[0, 2, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-7`, {outputs:[0, 2, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-8`, {outputs:[0, 2, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-9`, {outputs:[2, 1, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-10`, {outputs:[0, 2, 7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-11`, {outputs:[7], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-12`, {outputs:[7], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-13`, {outputs:[7], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-14`, {outputs:[7], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-15`, {outputs:[7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-16`, {outputs:[7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-17`, {outputs:[7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-18`, {outputs:[7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-19`, {outputs:[7, 8], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-5be24ba3f91c106033269289`, {outputs:[1, 7, 8], timestamp: new Date().toISOString() });

});

resolver.define('clearMockVoteskData', async(systemObj) => {
  const appId = systemObj.context.localId;
  storage.set(`app-${appId}-userChoices-TEST-1`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-2`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-3`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-4`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-5`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-6`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-7`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-8`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-9`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-10`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-11`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-12`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-13`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-14`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-15`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-16`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-17`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-18`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-TEST-19`, {outputs:[], timestamp: new Date().toISOString() });
  storage.set(`app-${appId}-userChoices-5be24ba3f91c106033269289`, {outputs:[], timestamp: new Date().toISOString() });

});
export const handler = resolver.getDefinitions();

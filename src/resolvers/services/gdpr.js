import { privacy, storage } from '@forge/api';

const POLL_BATCH_SIZE = 90;

export const getAllOutputs = async() => {
    let wrappedResult = await storage.query().limit(20).getMany();
    const data = wrappedResult.results
        .filter(it => it.key.includes('-userChoices-'));

    while(wrappedResult.nextCursor) {
      wrappedResult = await storage.query().limit(20).cursor(wrappedResult.nextCursor).getMany();
      data.push(...wrappedResult.results.filter(it => it.key.includes('-userChoices-')));
    }
    return data;
}

export const getAllUserKeysByUserId = async(accountId) => {
    let wrappedResult = await storage.query().limit(20).getMany();
    const data = wrappedResult.results
        .filter(it => it.key.includes(accountId))
        .map(it => it.key);

    while(wrappedResult.nextCursor) {
      wrappedResult = await storage.query().limit(20).cursor(wrappedResult.nextCursor).getMany();
      data.push(...wrappedResult.results.filter(it => it.key.includes(accountId)).map(it => it.key));
    }
    return data;
}

export const runGdpr = async() => {
    console.log('gdpr is staring');

    const appRawOutpus = await getAllOutputs();
    const appOutpus = appRawOutpus.map(it => ({
         accountId: it.key.replace(/^.*?-userChoices-\s*/, ''),
         updatedAt: it.value.timestamp || new Date().toISOString()
    }));

    const batches = [];
    for(let i = 0; i < appOutpus.length; i += POLL_BATCH_SIZE) {
        const chunk = appOutpus.slice(i, i + POLL_BATCH_SIZE);
        batches.push(chunk);
    }

    const responseAccounts = await Promise.all(batches.map(async (batch) => {
        if(batch.length === 0) {
          return [];
        }

        const accounts = await privacy.reportPersonalData(batch);
        return accounts;
    }));

    const polledAccounts = responseAccounts.reduce((acc, val) => acc.concat(val), []);
    
    let index = 0;
    for(const element of polledAccounts) {
        if(element.status === 'closed'){
            let userKeys = await getAllUserKeysByUserId(element.accountId);
            index += 1;
            for(const key of userKeys) {
                storage.delete(key);
            }
        }
    }
    console.log(`gdrp should deleted ${index} users data`);
};


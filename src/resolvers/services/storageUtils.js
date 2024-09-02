export const getInstancePrefixKeys = (appId) => {
    return `app-${appId}-userChoices-`;
}

export const getInstanceUserKey = (appId, accountId) => {
    return `app-${appId}-userChoices-${accountId}`;
}
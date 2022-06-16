const secrets : Array<Secret> = [];

export const storeSecret = (secret: Secret) : void => {
    secrets.push(secret);
}

export const findSecretById(id: string) : (Secret | undefined) => {
    return secrets.find(s => s.id === id);
}

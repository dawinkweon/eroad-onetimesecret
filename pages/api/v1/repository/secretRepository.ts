const secrets : Array<Secret> = [];

export const storeSecret = (secret: Secret) => {
    console.log(`Storing secret... secret=[${JSON.stringify(secret)}]`);

    secrets.push(secret);
    
    console.log(`All secrets=[${JSON.stringify(secrets)}]`);
}

export const findSecretById = (id: string) : (Secret | undefined) => {
    console.log(`All secrets=[${JSON.stringify(secrets)}]`);
    return secrets.find(s => s.id === id);
}
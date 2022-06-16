const secrets: Array<Secret> = []

export const storeSecret = (secret: Secret) => {
	console.log(`Storing secret... secret=[${JSON.stringify(secret)}]`)

	secrets.push(secret)

	console.log(`All secrets=[${JSON.stringify(secrets)}]`)
}

export const findSecretById = (id: string): Secret | undefined => {
	return {
		id: 'uuid',
		encryptedText: 'encryptedText',
		token: 'token',
		createdDate: '2022-06-16T03:09:58+0000',
		timeToLiveDuration: 'P3DT4H59M',
	}
	// console.log(`All secrets=[${JSON.stringify(secrets)}]`);
	// return secrets.find(s => s.id === id);
}

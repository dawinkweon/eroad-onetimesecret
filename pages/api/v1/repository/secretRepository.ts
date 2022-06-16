import {
	DynamoDB,
	GetItemCommandInput,
	PutItemCommandInput,
} from '@aws-sdk/client-dynamodb'
import { Secret } from '../model/secret'

const ddb = new DynamoDB({
	region: process.env.AMAZON_DEFAULT_REGION ?? 'ap-southeast-2',
	credentials: {
		accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
		secretAccessKey: process.env.AMAZON_SECRET_KEY
	}
})

const tableName = 'hackathon-eroad-one-time-secret'

export const storeSecret = (secret: Secret) => {
	console.log(`Storing secret... secret=[${JSON.stringify(secret)}]`)

	const params: PutItemCommandInput = {
		Item: {
			id: {
				S: secret.id,
			},
			encryptedText: {
				S: secret.encryptedText,
			},
			token: {
				S: secret.token,
			},
			createdDate: {
				S: secret.createdDate,
			},
			timeToLiveDuration: {
				S: secret.timeToLiveDuration,
			},
		},
		ReturnConsumedCapacity: 'TOTAL',
		TableName: tableName,
	}
	try {
		ddb.putItem(params, (err, data) => {
			if (err) {
				console.log(err, err.stack)
			} else {
				console.log(`Successfully putItem for id=[${secret.id}]`)
			}
		})
	} catch (error) {
		console.error('Could not put item. Error=' + error)
	}
}

export const findSecretById = async (id: string): Promise<Secret | undefined> => {
	const input: GetItemCommandInput = {
		TableName: tableName,
		Key: {
			id: {
				S: id,
			},
		},
	};

	const { Item } = await ddb.getItem(input)
	const secret: Secret = {
		id: Item.id.S,
		encryptedText: Item.encryptedText.S,
		token: Item.token.S,
		createdDate: Item.createdDate.S,
		timeToLiveDuration: Item.timeToLiveDuration.S,
	}
	return secret;
	// console.log(`All secrets=[${JSON.stringify(secrets)}]`);
	// return secrets.find(s => s.id === id);
}

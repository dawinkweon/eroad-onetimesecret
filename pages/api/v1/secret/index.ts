import { createCipher, randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { Secret } from '../model/secret'
import { storeSecret } from '../repository/secretRepository'
import { CreateSecretRequest } from './createSecretRequest'
import { CreateSecretResponse } from './createSecretResponse'
import fetch from 'node-fetch'
import Cors from 'cors'



// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD', 'POST', 'OPTION'],
	origin: "*"
  })

const post = async(request: CreateSecretRequest, res: NextApiResponse) => {
	if (typeof request.secretText === 'undefined') {
		res.status(400).json({ message: 'secretText is missing in body' })
	}

	const mykey = createCipher('aes-128-cbc', '!fEiDRs@NA6E!V')
	let encryptedText = mykey.update(request.secretText, 'utf8', 'hex')
	encryptedText += mykey.final('hex')

	const uuid = randomUUID()
	const token = randomUUID()

	const secret: Secret = {
		id: uuid,
		encryptedText: encryptedText,
		token: token,
		createdDate: '2022-06-16T03:09:58+0000',
		timeToLiveDuration: 'P3DT4H59M',
	}
	storeSecret(secret)

	const secretUrl = `${process.env.HOST_URL}/showSecret/${uuid}/?token=${token}`

	const response: CreateSecretResponse = {
		secretUrl,
    type: "SECRET_URL_GENERATED"
	}

	if (!request.recipient) {
		res.status(200).json(response)
		return
	}

	await triggerEmail(secretUrl, request);
	res.status(200).json({ message: 'Email sent', type: "EMAIL_SENT" });
}

async function triggerEmail(secretUrl: string, request: CreateSecretRequest) {
	try {
		// 👇️ const response: Response
		const response = await fetch(
			'https://48nu3eol5m.execute-api.ap-southeast-2.amazonaws.com/Prod/secret/',
			{
				method: 'POST',
				body: JSON.stringify({
					'secret-url': secretUrl,
					recipient: request.recipient,
				}),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`)
		}

		const result = await response.json()

		console.log('Email API response is: ', JSON.stringify(result, null, 4))

		return result
	} catch (error) {
		if (error instanceof Error) {
			console.error('error message: ', error.message)
			return error.message
		} else {
			console.error('unexpected error: ', error)
			return 'An unexpected error occurred'
		}
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	
	// Run the middleware
	await runMiddleware(req, res, cors)
	
	const request = req.body as CreateSecretRequest
	console.log(`encrypting secret... secret=[${request.secretText}]`)

	if (req.method === 'POST') {
		post(request, res)
	} else {
		res.status(404)
	}
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
	  fn(req, res, (result) => {
		if (result instanceof Error) {
		  return reject(result)
		}
  
		return resolve(result)
	  })
	})
  }

export const config = {
	api: {
	  bodyParser: {
		sizeLimit: '1mb',
	  },
	},
  }
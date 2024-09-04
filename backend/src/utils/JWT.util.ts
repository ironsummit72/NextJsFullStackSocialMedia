import jsonwebtoken from 'jsonwebtoken'

export async function signJwt(payload: object, secret: string): Promise<string> {
	return await jsonwebtoken.sign(payload, secret, { expiresIn: 1000 * 3600 * 24 * 5})
}

import bcryptjs from 'bcryptjs'
export async function hashPassword(password: string): Promise<string> {
	const salt = await bcryptjs.genSalt(10)
	const hash = await bcryptjs.hash(password, salt)
	return hash
}
export async function comparePassword(plainpassword: string, hashpassword: string): Promise<boolean> {
	const PasswordMatchResult = await bcryptjs.compare(plainpassword, hashpassword)
	return PasswordMatchResult
}

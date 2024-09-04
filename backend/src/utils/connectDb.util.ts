import mongoose from 'mongoose'
import envs from '../conf/env'
export default async function ConnectDB() {
	mongoose
		.connect(`${envs.DB_URL}/${envs.DB_NAME}`)
		.then((res) => {
			console.log(`connected to database ${res.connection.host}:${res.connection.port}`)
		})
		.catch((err) => {
			console.error(err)
		})
}

import { clientapi } from "./api"

type USER = {
    username: string,
    id: string,
    fullName: string
}
export async function getCurrentUserClient():Promise<USER>{
    const {data}=await clientapi.get('/currentuser')
    return data.data
}

import { headers } from 'next/headers'
import { api } from './api';
type USER = {
    username: string,
    id: string,
    fullName: string
}
export async function getCurrentUser(): Promise<USER> {
        const headersList = await headers()
        const { data } = await api.get('/currentuser', { headers: { cookie: headersList.get('cookie') } });
        return data.data;
}
import axios from 'axios'
export const clientapi = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL, withCredentials: true });
export const api = axios.create({ baseURL: process.env.BASE_URL, withCredentials: true });

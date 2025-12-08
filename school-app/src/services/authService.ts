import type { IUser } from "../types/types"
import api from "./api"

export const registerUser = async (data: IUser) => {
    return api.post("/users", data)
}

export const loginUser = async (email: string, password: string) => {
    const res = await api.get(`/users?email=${email}&password=${password}`)
    return res.data[0]
}
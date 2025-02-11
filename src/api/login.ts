import instance from "../axios/customize";

export const loginAPI = async (email: string, password: string) => {
    const url = `/api/v1/auth/login`
    const res = await instance.post(url!, { email, password });
    return res.data as IBEResponse<ILogin>
}

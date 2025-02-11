import instance from "../axios/customize";

export const getCategoryAllAPI = async () => {
    const url = `/api/v1/all-category`
    const res = await instance.get(url!);
    return res.data as IBEResponse<ICategory[]>
}

export const getCategoryListAPI = async (current: number, pageSize: number) => {
    const url = `/api/v1/list-category?current=${current}&pageSize=${pageSize}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<ICategoryResponse>
}

export const createCategoryAPI = async (name: string) => {
    const url = `/api/v1/create-category`
    const res = await instance.post(url!, { name });
    return res.data as IBEResponse<any>
}

export const updateCategoryAPI = async (id: string, name: string) => {
    const url = `/api/v1/update-category/${id}`
    const res = await instance.put(url!, { name });
    return res.data as IBEResponse<any>
}

export const deleteCategoryAPI = async (id: string) => {
    const url = `/api/v1/delete-category/${id}`
    const res = await instance.delete(url!);
    return res.data as IBEResponse<any>
}
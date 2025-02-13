import instance from "../axios/customize";

export const getBlogAllAPI = async (current: number, pageSize: number) => {
    const url = `/api/v1/list-blog?current=${current}&pageSize=${pageSize}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<IBlogResponse>
}

export const createBlogAPI = async (data: { title: string, images: string[], description: string }) => {
    const url = `/api/v1/create-blog`
    const res = await instance.post(url!, data);
    return res.data as IBEResponse<any>
}

export const deleteBlogAPI = async (id: string) => {
    const url = `/api/v1/delete-blog/${id}`
    const res = await instance.delete(url!);
    return res.data as IBEResponse<any>
}

export const updateBlogAPI = async (id: string, data: { title: string, images: string[], description: string }) => {
    const url = `/api/v1/update-blog/${id}`
    const res = await instance.put(url!, data);
    return res.data as IBEResponse<any>
}
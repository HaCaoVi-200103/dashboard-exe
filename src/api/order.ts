import instance from "../axios/customize";

export const getOrderAllAPI = async (current: number, pageSize: number) => {
    const url = `/api/v1/list-order?current=${current}&pageSize=${pageSize}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<IBlogResponse>
}

export const getOrderDetailByIdAPI = async (id: string) => {
    const url = `/api/v1/list-order-detail/${id}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<any>
}

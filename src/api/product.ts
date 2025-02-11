import instance from "../axios/customize";

export const getProductListAPI = async (current: string, pageSize: string) => {
    const url = `/api/v1/list-product?current=${current}&pageSize=${pageSize}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<IProductResponse>
}

export const deleteProductAPI = async (id: string) => {
    const url = `/api/v1/delete-product/${id}`
    const res = await instance.delete(url!);
    return res.data as IBEResponse<IProductResponse>
}

export const createProductAPI = async (data: ICreateProductRequest) => {
    const url = `/api/v1/create-product`
    const res = await instance.post(url!, data);
    return res.data as IBEResponse<IProductResponse>
}


export const getProductByIdAPI = async (id: string) => {
    const url = `/api/v1/get-product/${id}`
    const res = await instance.post(url!);
    return res.data as IBEResponse<IProduct>
}

export const updateProductAPI = async (id: string, data: ICreateProductRequest) => {
    const url = `/api/v1/update-product/${id}`
    const res = await instance.put(url!, data);
    return res.data as IBEResponse<IProductResponse>
}

export const getProductListByFilterAndSearchAPI = async (current: number, pageSize: number, search: string, filterReq: string) => {
    const url = `/api/v1/filter-search?current=${current}&pageSize=${pageSize}&search=${search}&filterReq=${filterReq}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<IProductResponse>
}
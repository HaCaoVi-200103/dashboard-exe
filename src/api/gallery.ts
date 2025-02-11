import instance from "../axios/customize";

export const createGalleryAPI = async (proId: string, images: string[]) => {
    const url = `/api/v1/create-gallery`
    const res = await instance.post(url!, { proId: proId, images: images });
    return res.data as IBEResponse<any>
}

export const getGalleryListByProIdAPI = async (id: string) => {
    const url = `/api/v1/list-gallery/${id}`
    const res = await instance.get(url!);
    return res.data as IBEResponse<IGallery[]>
}

export const deleteGalleryAPI = async (id: string) => {
    const url = `/api/v1/delete-gallery/${id}`
    const res = await instance.delete(url!);
    return res.data as IBEResponse<IGallery[]>
}

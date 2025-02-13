export { };

declare global {
    interface IBEResponse<T> {
        statusCode: number,
        message?: string,
        data?: T,
        error?: string
    }

    interface ILogin {
        token: string
    }

    interface IProduct {
        _id: string,
        cate_id: {
            _id: string,
            cate_name: string
        },
        pro_name: string,
        pro_price: number,
        pro_discount: number,
        pro_size: string[],
        pro_picture: string,
        pro_quantity: number,
        pro_description: string,
        update_at: string,
        is_deleted: boolean,
        create_at: string,
    }

    interface IProductResponse {
        meta: {
            current: number,
            pageSize: number,
            pages: number,
            total: number
        },
        result: IProduct[]
    }

    interface ICategory {
        _id: string,
        cate_name: string,
        is_deleted: boolean,
        product_count: number
    }

    interface ICreateProductRequest {
        cate_id: string,
        pro_name: string,
        pro_price: number,
        pro_discount: number,
        pro_size: string[],
        pro_picture: string,
        pro_description: string,
        pro_quantity: number
    }

    interface ICreateProductForm {
        cate_id: string,
        pro_name: string,
        pro_price: number,
        pro_discount: number,
        pro_quantity: number,
        pro_size: string[],
        pro_picture: FileList,
        pro_description: string,
    }

    interface IUploadSingleFile {
        name: string,
        type: string,
        downloadURL: string,
    }

    interface ICategoryResponse {
        meta: {
            current: number,
            pageSize: number,
            pages: number,
            total: number
        },
        result: ICategory[]
    }

    interface IGallery {
        _id: string,
        pro_id: string,
        gal_picture: string,
    }

    interface IBlog {
        _id: string,
        title: string,
        images: string[],
        description: string,
        createdAt: string,
        updatedAt: string,
    }

    interface IBlogResponse {
        meta: {
            current: number,
            pageSize: number,
            pages: number,
            total: number
        },
        result: IBlog[]
    }
}

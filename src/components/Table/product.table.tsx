import { CloudUploadOutlined, DeleteOutlined, DeleteTwoTone, EditOutlined, EditTwoTone, FileSearchOutlined, FilterOutlined, FlagTwoTone, SearchOutlined, UploadOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Col, Image, notification, Popconfirm, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import InputCustomize from "../../components/Input";
import TableCustomize from "../../components/Table";
import { useEffect, useState } from "react";
import NoImage from "../../assets/no-image.png"
import { calculateDiscountPercentage, formatNumber } from "../../utils";
import { deleteProductAPI, getProductListByFilterAndSearchAPI } from "../../api/product";
import { useAppContext } from "../../context/AppContext";
import CreateProductModal from "../Modal/create.product.modal";
import UpdateProductModal from "../Modal/update.product.model";
import SelectCustomize from "../Select";
import { getCategoryAllAPI, getCategoryListAPI } from "../../api/category";
import AddGalleryModal from "../Modal/add.gallery.modal";
import { getGalleryListByProIdAPI } from "../../api/gallery";

interface IProps {
    dataSource: IProduct[];
    meta: {
        current: number,
        pageSize: number,
        total: number,
    },
    metaDefault: {
        current: number,
        LIMIT: number
    }
}

const ProductTable = (props: IProps) => {
    const { dataSource, meta, metaDefault } = props;
    const [dataTable, setDataTable] = useState<IProduct[] | []>(dataSource)
    const [metaTable, setMetaTable] = useState(meta)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
    const [isAddGalleryOpen, setIsAddGalleryOpen] = useState<boolean>(false)
    const [dataProductId, setDataProductId] = useState<IProduct | null>(null)
    const [search, setSearch] = useState("")
    const [filterReq, setFilterReq] = useState("")
    const { refreshProduct, setRefreshProduct, refreshCategory, refreshGallery } = useAppContext()
    const [listCate, setListCate] = useState<ICategory[] | []>([])
    const [listGallery, setListGallery] = useState<IGallery[]>([])

    useEffect(() => {
        (async () => {
            const res = await getCategoryAllAPI()
            if (res.statusCode === 200) {
                setListCate(res.data!)
            }
        })()
    }, [isCreateModalOpen, isUpdateModalOpen, refreshCategory])

    useEffect(() => {
        (async () => {
            if (search.length > 0 || filterReq.length > 0) {
                const res = await getProductListByFilterAndSearchAPI(metaDefault.current, metaDefault.LIMIT, search, filterReq)
                setDataTable(res.data?.result!)
                setMetaTable(res.data?.meta!)
            } else {
                setMetaTable(meta)
                setDataTable(dataSource)
            }
        })()
    }, [search, dataSource, filterReq, meta])

    const handleDeleteProduct = async (id: string) => {
        const res = await deleteProductAPI(id);

        if (res.statusCode === 200) {
            setRefreshProduct(!refreshProduct)
            notification.success({ message: res.message })
        }
    }

    const getGalleryList = async (id: string) => {
        const res = await getGalleryListByProIdAPI(id)
        if (res.statusCode === 200) {
            setListGallery(res.data!)
        }
    }

    const columns: ColumnsType<IProduct> = [
        {
            title: 'Name',
            dataIndex: 'pro_name',
            key: 'pro_name',
        },
        {
            title: 'Image',
            dataIndex: 'pro_picture',
            key: 'pro_picture',
            render: (value, record, index) => (
                <Image style={{ width: "50px", height: "50px" }} src={value !== "" ? value : NoImage} />
            ),
        },
        {
            title: 'Type',
            dataIndex: 'cate_id',
            key: 'cate_id',
            render: (value, record, index) => (
                <div>{value.cate_name}</div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'pro_price',
            key: 'pro_price',
            render: (value, record, index) => {
                return (
                    <div style={{ display: "flex", gap: 10 }}>
                        <div style={{ opacity: 0.5, textDecoration: 'line-through', textDecorationColor: 'gray', textDecorationThickness: '1px' }}
                        >
                            {formatNumber(value)}
                        </div>
                        <div style={{ color: "#46DFB1" }}>
                            {formatNumber(value - record.pro_discount)}
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'Discount',
            dataIndex: 'pro_discount',
            key: 'pro_discount',
            render: (value, record, index) => {
                return (
                    <>
                        {value === 0 ?
                            <div>{calculateDiscountPercentage(record.pro_price, value)}</div>
                            :
                            <div style={{ color: "#F04770" }}>{calculateDiscountPercentage(record.pro_price, value)}</div>

                        }
                    </>
                )
            },
        },
        {
            title: 'Action',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
            render: (value, record, index) => {
                return (
                    <div style={{ display: "flex", gap: 20, justifyContent: "start" }}>
                        <Tooltip title="Add gallery">
                            <UploadOutlined style={{ fontSize: 20 }}
                                onClick={() => {
                                    setIsAddGalleryOpen(true);
                                    setDataProductId(record)
                                    getGalleryList(record._id)
                                }}
                            />
                        </Tooltip>
                        <EditTwoTone
                            style={{ fontSize: 20 }}
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataProductId(record)
                            }} />
                        <Popconfirm
                            title="Are you sure lock this user?"
                            onConfirm={() => handleDeleteProduct(record._id)}
                            // okText="Yes"
                            cancelText="No"
                        >
                            <DeleteTwoTone style={{ fontSize: 20 }} twoToneColor={"#F04770"} />
                        </Popconfirm>

                    </div>
                )
            },
        }

    ];

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                fontWeight: 600,
                fontSize: 20,
            }}>
                <span>Manage Product</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <CloudUploadOutlined />
                    <span>Add New</span>
                </Button>
            </div >
            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "start", gap: 10 }}>
                <div style={{ width: "300px" }}>
                    <InputCustomize placeholder="Search" setValue={setSearch} value={search} icon={<SearchOutlined />} />
                </div>
                <div>
                    <SelectCustomize data={listCate} placeholder="Category" selected={filterReq} setSelected={setFilterReq} icon={<FilterOutlined />} />
                </div>
            </div>
            <TableCustomize columns={columns} dataSource={dataTable} meta={metaTable} />
            <CreateProductModal listCate={listCate} isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen} />
            <UpdateProductModal listCate={listCate} data={dataProductId} isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen} />
            <AddGalleryModal refreshGallery={getGalleryList} listGallery={listGallery} id={dataProductId?._id || ""} isGalleryModalOpen={isAddGalleryOpen} setIsGalleryModalOpen={setIsAddGalleryOpen} />

        </>
    )
}

export default ProductTable;
import { CheckOutlined, CloseOutlined, CloudUploadOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import TableCustomize from "../../components/Table";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CreateBlogModal from "../Modal/create.blog.modal";
import { deleteBlogAPI } from "../../api/blog";
import UpdateBlogModal from "../Modal/update.blog.modal";
import { formatDateTime, formatPriceVND } from "../../utils";
import OrderDetailsModal from "../Modal/order.detail";
import { getOrderDetailByIdAPI } from "../../api/order";

interface IProps {
    dataSource: IBlog[];
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

const OrderTable = (props: IProps) => {
    const { dataSource, meta } = props;
    const [dataTable, setDataTable] = useState<IBlog[] | []>(dataSource)
    const [metaTable, setMetaTable] = useState(meta)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
    const [dataBlog, setDataBlog] = useState<IBlog | null>(null)
    const { setRefreshBlog, refreshBlog } = useAppContext()
    const [dataOrderDetail, setDataOrderDetail] = useState<any>([])

    useEffect(() => {
        (async () => {
            setMetaTable(meta)
            setDataTable(dataSource)
        })()
    }, [dataSource, meta])

    const handleDeleteBlog = async (id: string) => {
        try {
            const res = await deleteBlogAPI(id);

            if (res.statusCode === 200) {
                setRefreshBlog(!refreshBlog)
                notification.success({ message: res.message })
                return;
            }

            notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    }

    const getDataOrderDetail = async (id: string) => {
        try {
            const res = await getOrderDetailByIdAPI(id)

            if (res.statusCode === 200) {
                setDataOrderDetail(res.data.result)
            } else {
                setDataOrderDetail([])
            }
        } catch (error) {
            console.log(error);

        }
    }

    const columns: ColumnsType<IBlog> = [
        {
            title: 'Full name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (value: string) => (
                <div style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textAlign: "justify"
                }}>
                    {value}
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string) => (
                <div style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textAlign: "justify"
                }}>
                    {formatDateTime(value)}
                </div>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (value: string) => (
                <div style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textAlign: "justify"
                }}>
                    {formatPriceVND(value)}
                </div>
            ),
        },
        {
            title: 'Payment',
            dataIndex: 'pay_status',
            key: 'pay_status',
            render: (value: boolean) => (
                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                    {value ? (
                        <div style={{
                            color: "#00b894",
                            fontWeight: "bold",
                            // border: "2px solid #00b894",
                            // padding: "4px",
                            // borderRadius: "4px"
                        }}>
                            Paid
                        </div>
                    ) : (
                        <div style={{
                            color: "#fab1a0",
                            fontWeight: "bold",
                            // border: "2px solid #636e72",
                            // padding: "4px",
                            // borderRadius: "4px"
                        }}>
                            Unpaid
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (value: boolean) => (
                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                    {value ? (
                        <div style={{
                            color: "#00b894",
                            fontWeight: "bold",
                            // border: "2px solid #00b894",
                            // padding: "4px",
                            // borderRadius: "4px"
                        }}>
                            Confirmed
                        </div>
                    ) : (
                        <div style={{
                            color: "#fab1a0",
                            fontWeight: "bold",
                            // border: "2px solid #636e72",
                            // padding: "4px",
                            // borderRadius: "4px"
                        }}>
                            Unconfirmed
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Order Details',
            dataIndex: '_id',
            key: '_id',
            render: (value) => (
                <>
                    <MenuFoldOutlined
                        onClick={() => {
                            setIsUpdateModalOpen(true);
                            getDataOrderDetail(value)
                        }}
                        size={30} />
                </>
            )
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (__, record) => {
                return (
                    <div style={{ display: "flex", gap: 20, justifyContent: "start" }}>
                        <CheckOutlined
                            style={{ fontSize: 20, color: "#00b894" }}
                            onClick={() => {
                                setDataBlog(record)
                            }} />
                        <Popconfirm
                            title="Are you sure delete category?"
                            onConfirm={() => handleDeleteBlog(record._id)}
                            // okText="Yes"
                            cancelText="No"
                        >
                            <CloseOutlined style={{ fontSize: 20, color: "#F04770" }} />
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
                <span>Manage Blog</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <CloudUploadOutlined />
                    <span>Add New</span>
                </Button>
            </div >
            <TableCustomize columns={columns} dataSource={dataTable} meta={metaTable} />
            <CreateBlogModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />
            <OrderDetailsModal data={dataOrderDetail} isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen} />
        </>
    )
}

export default OrderTable;
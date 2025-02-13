import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Image, notification, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import TableCustomize from "../../components/Table";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { deleteCategoryAPI } from "../../api/category";
import CreateBlogModal from "../Modal/create.blog.modal";
import { deleteBlogAPI } from "../../api/blog";

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

const BlogTable = (props: IProps) => {
    const { dataSource, meta } = props;
    const [dataTable, setDataTable] = useState<IBlog[] | []>(dataSource)
    const [metaTable, setMetaTable] = useState(meta)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
    const [dataCateId, setDataCateId] = useState<any>(null)
    const { setRefreshBlog, refreshBlog } = useAppContext()

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

    const columns: ColumnsType<IBlog> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'pro_name',
        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (value: string[]) => (
                <div style={{
                    display: "flex",
                    gap: 10
                }}>
                    {value && value.length > 0 && value.map(item => (
                        <Image style={{
                            width: "50px",
                            height: "50px",
                        }} src={item} />
                    ))}
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (__, record) => {
                return (
                    <div style={{ display: "flex", gap: 20, justifyContent: "start" }}>
                        <EditTwoTone
                            style={{ fontSize: 20 }}
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataCateId(record)
                            }} />
                        <Popconfirm
                            title="Are you sure delete category?"
                            onConfirm={() => handleDeleteBlog(record._id)}
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
                <span>Manage Blog</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <CloudUploadOutlined />
                    <span>Add New</span>
                </Button>
            </div >
            <TableCustomize columns={columns} dataSource={dataTable} meta={metaTable} />
            <CreateBlogModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />
            {/*  <UpdateCategoryModal dataCate={dataCateId} isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen} /> */}
        </>
    )
}

export default BlogTable;
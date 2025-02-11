import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, notification, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import TableCustomize from "../../components/Table";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { deleteCategoryAPI } from "../../api/category";
import CreateCategoryModal from "../Modal/create.category.modal";
import UpdateCategoryModal from "../Modal/update.category.modal";

interface IProps {
    dataSource: ICategory[];
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

const CategoryTable = (props: IProps) => {
    const { dataSource, meta } = props;
    const [dataTable, setDataTable] = useState<ICategory[] | []>(dataSource)
    const [metaTable, setMetaTable] = useState(meta)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
    const [dataCateId, setDataCateId] = useState<any>(null)
    const { refreshProduct, setRefreshProduct } = useAppContext()

    useEffect(() => {
        (async () => {
            setMetaTable(meta)
            setDataTable(dataSource)
        })()
    }, [dataSource, meta])

    const handleDeleteCategory = async (id: string) => {
        try {
            const res = await deleteCategoryAPI(id);

            if (res.statusCode === 200) {
                setRefreshProduct(!refreshProduct)
                notification.success({ message: res.message })
                return;
            }

            notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    }

    const columns: ColumnsType<ICategory> = [
        {
            title: 'Name',
            dataIndex: 'cate_name',
            key: 'pro_name',
        },
        {
            title: 'Product',
            dataIndex: 'product_count',
            key: 'pro_picture',
            render: (value) => (
                <div>{value}</div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
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
                            onConfirm={() => handleDeleteCategory(record._id)}
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
                <span>Manage Category</span>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <CloudUploadOutlined />
                    <span>Add New</span>
                </Button>
            </div >
            <TableCustomize columns={columns} dataSource={dataTable} meta={metaTable} />
            <CreateCategoryModal isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen} />
            <UpdateCategoryModal dataCate={dataCateId} isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen} />
        </>
    )
}

export default CategoryTable;
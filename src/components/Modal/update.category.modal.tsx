import {
    Modal, Input, Form,
    notification,

} from 'antd';
import { useEffect, useState } from 'react';
import { formatPriceVND } from '../../utils';
import { useAppContext } from '../../context/AppContext';
import { createCategoryAPI, updateCategoryAPI } from '../../api/category';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataCate: { _id: string, cate_name: string }
}

const UpdateCategoryModal = (props: IProps) => {
    const {
        isUpdateModalOpen, dataCate, setIsUpdateModalOpen
    } = props;
    const { refreshCategory, setRefreshCategory } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsUpdateModalOpen(false);
    }

    const onFinish = async (values: any) => {
        setLoading(true)
        const res = await updateCategoryAPI(dataCate._id, values.cate_name)

        if (res.statusCode === 200) {
            notification.success({ message: res.message })
            setLoading(false)
            form.resetFields()
            setRefreshCategory(!refreshCategory)
            setIsUpdateModalOpen(false);
            return;
        }
    };

    useEffect(() => {
        form.setFieldValue("cate_name", dataCate?.cate_name)
    }, [isUpdateModalOpen, dataCate])

    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Add new product"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                maskClosable={false}
                loading={loading}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        hasFeedback
                        label="Category name"
                        name="cate_name"
                        rules={[{ required: true, message: 'Please input your category name!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

export default UpdateCategoryModal;
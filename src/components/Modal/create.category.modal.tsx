import {
    Modal, Input, Form,
    notification,

} from 'antd';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { createCategoryAPI } from '../../api/category';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateCategoryModal = (props: IProps) => {
    const {
        isCreateModalOpen, setIsCreateModalOpen
    } = props;
    const { refreshProduct, setRefreshProduct, refreshCategory, setRefreshCategory } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsCreateModalOpen(false);
    }

    const onFinish = async (values: any) => {
        setLoading(true)
        const res = await createCategoryAPI(values.cate_name)

        if (res.statusCode === 201) {
            notification.success({ message: res.message })
            setLoading(false)
            form.resetFields()
            setRefreshProduct(!refreshProduct)
            setRefreshCategory(!refreshCategory)
            setIsCreateModalOpen(false);
            return;
        }
    };

    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Add new product"
                open={isCreateModalOpen}
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

export default CreateCategoryModal;
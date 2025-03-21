import {
    Modal, Input, Form,
    notification,

} from 'antd';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { updateCategoryAPI } from '../../api/category';

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
        try {
            const res = await updateCategoryAPI(dataCate._id, values.cate_name)

            if (res.statusCode === 200) {
                notification.success({ message: res.message })
                setLoading(false)
                form.resetFields()
                setRefreshCategory(!refreshCategory)
                setIsUpdateModalOpen(false);
                return;
            }
            notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        form.setFieldsValue({ cate_name: dataCate?.cate_name });
    }, [isUpdateModalOpen, dataCate, form])

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
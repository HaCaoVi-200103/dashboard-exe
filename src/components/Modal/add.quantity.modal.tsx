import {
    Modal, Input,
    notification,
    InputNumber,
    Col,
    Row,
    Form,

} from 'antd';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { createCategoryAPI } from '../../api/category';
import { formatNumberDot } from '../../utils';

interface IProps {
    isAddQuantityModalOpen: boolean;
    setIsAddQuantityModalOpen: (v: boolean) => void;
    data: IProduct
}

const AddQuantityModal = (props: IProps) => {
    const {
        isAddQuantityModalOpen, setIsAddQuantityModalOpen, data
    } = props;
    const { refreshProduct, setRefreshProduct, refreshCategory, setRefreshCategory } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const current = Form.useWatch('pro_quantity', form);
    const add = Form.useWatch('pro_add', form);

    useEffect(() => {
        const currentQuantity = current ? current : 0
        const addQuantity = add ? add : 0
        form.setFieldsValue({ total: formatNumberDot(currentQuantity + addQuantity) + " SL" });
    }, [current, add])

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsAddQuantityModalOpen(false);
    }

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            const res = await createCategoryAPI(values.cate_name)

            if (res.statusCode === 201) {
                notification.success({ message: res.message })
                setLoading(false)
                form.resetFields()
                setRefreshProduct(!refreshProduct)
                setRefreshCategory(!refreshCategory)
                setIsAddQuantityModalOpen(false);
                return;
            }

            notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        form.setFieldValue("pro_quantity", data?.pro_quantity)
    }, [isAddQuantityModalOpen, data])

    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Add quantity product"
                open={isAddQuantityModalOpen}
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
                    <Row gutter={[15, 15]}>
                        <Col span={24} md={8}>
                            <Form.Item
                                hasFeedback
                                label="Current"
                                name="pro_quantity"
                            >
                                <InputNumber
                                    style={{ width: 150 }}
                                    type='number'
                                    min={1}
                                    disabled
                                />

                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item
                                hasFeedback
                                label="Add"
                                name="pro_add"
                                rules={[{ required: true, message: 'Please input your product quantity!' },
                                () => ({
                                    validator(_, value) {
                                        if (!value || Number(value) >= 0) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Discount must be greater than 0!"));
                                    },
                                }),
                                ]}
                            >
                                <InputNumber
                                    style={{ width: 150 }}
                                    type='number'
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item
                                label="Total"
                                name="total"
                            >
                                <Input
                                    disabled
                                    style={{ width: 150 }}
                                    type='text'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div >
    )
}

export default AddQuantityModal;
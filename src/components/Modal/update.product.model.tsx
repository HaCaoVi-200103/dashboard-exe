import {
    Modal, Input, Form, Row, Col,
    notification,
    Select,
    InputNumber,
    Button,
    Space,
    Upload,
    UploadProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { calculateDiscountPercentage, formatPriceVND } from '../../utils';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { updateProductAPI } from '../../api/product';
import { useAppContext } from '../../context/AppContext';


interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    data: IProduct | null,
    listCate: ICategory[] | []
}

const UpdateProductModal = (props: IProps) => {
    const {
        isUpdateModalOpen, setIsUpdateModalOpen, data, listCate
    } = props;
    const { refreshProduct, setRefreshProduct } = useAppContext()
    const [form] = Form.useForm();
    const [urlUpload, setUrlUpload] = useState<string>("")
    const price = Form.useWatch('pro_price', form);
    const discount = Form.useWatch('pro_discount', form);
    const image = Form.useWatch('pro_picture', form);
    const [loading, setLoading] = useState(false);
    const { Option } = Select;

    useEffect(() => {
        const currentPrice = price ? price : 0
        const currentDiscount = discount ? discount : 0
        form.setFieldsValue({ total: formatPriceVND(currentPrice - currentDiscount) });
    }, [price, discount])

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsUpdateModalOpen(false);
    }

    const onFinish = async (values: ICreateProductForm) => {
        try {
            const dataConfig: ICreateProductRequest = {
                cate_id: values.cate_id,
                pro_name: values.pro_name,
                pro_price: values.pro_price,
                pro_discount: values.pro_discount,
                pro_size: values.pro_size,
                pro_description: values.pro_description,
                pro_picture: urlUpload ? urlUpload : data?.pro_picture + ""
            }
            setLoading(true);
            const res = await updateProductAPI(data?._id!, dataConfig)
            if (res.statusCode === 200) {
                notification.success({ message: res.message })
                setLoading(false)
                form.resetFields()
                setRefreshProduct(!refreshProduct)
                setIsUpdateModalOpen(false);
                return;
            }
            return notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const propsUpload: UploadProps = {
        action: `${import.meta.env.VITE_API_KEY}/api/v1/upload-single-file`,
        method: 'POST',
        name: "fileName",
        listType: "picture",
        maxCount: 1,
        accept: ".jpg,.jpeg,.png",
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully`);
                setUrlUpload(info.file.response.data.downloadURL)
            } else if (info.file.status === 'error') {
                // message.error(`${info.file.name} file upload failed.`);
                notification.error({ message: `${info.file.name} file upload failed.` })
            }
        },
    };

    useEffect(() => {
        form.setFieldValue("cate_id", data?.cate_id._id)
        form.setFieldValue("pro_name", data?.pro_name)
        form.setFieldValue("pro_price", data?.pro_price)
        form.setFieldValue("pro_discount", data?.pro_discount)
        form.setFieldValue("pro_description", data?.pro_description)
        form.setFieldValue("pro_size", data?.pro_size)
        form.setFieldValue("update_at", data?.update_at)
        form.setFieldValue("create_at", data?.create_at)
        form.setFieldValue("pro_picture", [
            {
                uid: '-1',
                name: 'OldImage.png',
                status: 'done',
                url: data?.pro_picture,
            }
        ])
    }, [isUpdateModalOpen, data])

    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Update product"
                open={isUpdateModalOpen}
                // onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={() => handleCloseCreateModal()}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
                        Save
                    </Button>
                ]}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                >
                    <Form.Item hasFeedback name="cate_id" label="Category" rules={[{ required: true, message: "Please choose category" }]}>
                        <Select
                            placeholder="Choose category for product"
                            allowClear>
                            {
                                listCate && listCate.length > 0 && listCate.map((item, index) => (
                                    <Option key={item._id + index} value={item._id}>{item.cate_name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        label="Name"
                        name="pro_name"
                        rules={[{ required: true, message: 'Please input your product name!' },

                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Row gutter={[15, 15]}>
                        <Col span={24} md={8}>
                            <Form.Item
                                extra={formatPriceVND(`${!price ? 0 : price}`)}
                                hasFeedback
                                label="Price"
                                name="pro_price"
                                rules={[{ required: true, message: "Please input your product price!" },
                                () => ({
                                    validator(_, value) {
                                        if (!value || Number(value) > 0) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Price must be greater than 0!"));
                                    },
                                }),
                                ]}
                            >
                                <InputNumber
                                    style={{ width: 150 }}
                                    type='number'
                                    min={1} />

                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item
                                extra={formatPriceVND(`${!discount ? 0 : discount}`)}
                                hasFeedback
                                label="Discount"
                                name="pro_discount"
                                rules={[{ required: true, message: 'Please input your product discount!' },
                                () => ({
                                    validator(_, value) {
                                        if (!value || Number(value) >= 0) {
                                            if (Number(value) > price) {
                                                return Promise.reject(new Error("Discount price can't be greater than origin price!"));
                                            }
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
                                    max={price}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item
                                extra={price && discount ? calculateDiscountPercentage(price, discount) + " off" : "0% off"}
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
                    <Row>
                        <Form.List name="pro_size">
                            {(fields, { add, remove }) => (
                                <div>
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>Add sizes</Button>
                                    </Form.Item>
                                    <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {fields.map((field) => (
                                            <Form.Item
                                                key={field.key}
                                            >
                                                <Space
                                                    style={{ position: "relative" }}>
                                                    <Form.Item
                                                        hasFeedback
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[{ required: true, message: 'Please input your product size!' }]}
                                                        noStyle
                                                    >
                                                        <Input style={{ width: 100 }} placeholder="Enter size" type='text' />
                                                    </Form.Item>
                                                    {fields.length > 1 && <MinusCircleOutlined
                                                        style={{
                                                            position: "absolute",
                                                            top: -5,
                                                            right: 0,
                                                            color: "#2d3436"
                                                        }}
                                                        onClick={() => remove(field.name)} />}
                                                </Space>
                                            </Form.Item>
                                        ))}
                                    </Space>
                                </div>
                            )}
                        </Form.List>
                    </Row>
                    <Row>
                        <Form.Item
                            name="pro_picture"
                            label="Picture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Must be .jpg, .png, .jpeg"
                            rules={[
                                {
                                    validator: (_, fileList) => {
                                        if (fileList && fileList.length > 0) {
                                            const isImage = fileList[0].type === 'image/png' || fileList[0].type === 'image/jpeg';
                                            if (image) {
                                                return Promise.resolve();
                                            }
                                            if (!isImage) {
                                                return Promise.reject(new Error('You can only upload PNG or JPG images!'));
                                            }
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Please upload an image!'));
                                    }
                                }
                            ]}
                        >
                            <Upload
                                {...propsUpload}
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>

                        </Form.Item>

                    </Row>
                    <Form.Item
                        label="Description"
                        name="pro_description"
                        rules={[{ required: true, message: 'Please input your product description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

export default UpdateProductModal;
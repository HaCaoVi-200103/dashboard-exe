import {
    Modal, Input, Form, Row,
    notification,
    Button,
    UploadProps,
    Image,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import Cookies from "js-cookie";
import { useAppContext } from '../../context/AppContext';
import { updateBlogAPI } from '../../api/blog';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    data: IBlog | null,
}

const UpdateBlogModal = (props: IProps) => {
    const {
        isUpdateModalOpen, setIsUpdateModalOpen, data
    } = props;
    const { refreshBlog, setRefreshBlog } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imagesArr, setImagesArr] = useState<string[] | []>([])
    const [listPicture, setListPicture] = useState<string[]>([])
    const uploadErrorShown = useRef(false);

    useEffect(() => {
        if (data) {
            setImagesArr(data.images)
        }
    }, [data])

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsUpdateModalOpen(false);
    }

    const onFinish = async (values: { title: string, images: string[], description: string }) => {
        try {
            const images: string[] = [...imagesArr, ...listPicture] as string[]
            const dataConfig: { title: string, images: string[], description: string } = {
                title: values.title,
                description: values.description,
                images: images
            }
            setLoading(true);
            const res = await updateBlogAPI(data?._id!, dataConfig)
            if (res.statusCode === 200) {
                notification.success({ message: res.message })
                setLoading(false)
                form.resetFields()
                setRefreshBlog(!refreshBlog)
                setIsUpdateModalOpen(false);
                return;
            }
            setIsUpdateModalOpen(false);
            return notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    };

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        const fileList = e?.fileList || [];
        if (fileList.length > 6) {
            if (!uploadErrorShown.current) {
                notification.error({ message: "You can only upload up to 6 images!" });
                uploadErrorShown.current = true;
            }
            setListPicture([]);
            form.resetFields(["pro_picture"]);
            return [];
        }
        uploadErrorShown.current = false;
        return fileList;
    };

    const propsUpload: UploadProps = {
        action: `${import.meta.env.VITE_API_KEY}/api/v1/upload-multiple-file`,
        method: 'POST',
        name: "fileList",
        multiple: true,
        listType: "picture",
        maxCount: undefined,
        accept: ".jpg,.jpeg,.png",
        withCredentials: true,
        headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
        },
        beforeUpload: (__, fileList) => {
            if (fileList.length > 6) {
                if (!uploadErrorShown.current) {
                    notification.error({ message: "You can only upload up to 6 images!" });
                    uploadErrorShown.current = true;
                }
                setListPicture([]);
                form.resetFields(["pro_picture"]);
                return false
            }
            uploadErrorShown.current = false;
            return true;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                const newUrls = info.file.response.data;
                setListPicture([...listPicture, ...newUrls])
            } else if (info.file.status === 'error') {
                notification.error({ message: `${info.file.name} file upload failed.` })
            }
        },
    };

    useEffect(() => {
        form.setFieldValue("title", data?.title)
        form.setFieldValue("description", data?.description)
    }, [isUpdateModalOpen, data])

    const handleRemoveImage = (url: string) => {
        setImagesArr(imagesArr.filter(x => x !== url))
    }
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
                    <Form.Item
                        hasFeedback
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your product name!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {imagesArr && imagesArr.length > 0 && <div>Current gallery</div>}
                    <div style={{
                        display: "flex", gap: 10, marginBottom: 15
                    }} >
                        {
                            imagesArr && imagesArr.length > 0 && imagesArr.map((item, index) => (
                                <div key={index}
                                    style={{
                                        position: "relative"
                                    }}
                                >
                                    <Image style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",

                                    }} src={item} alt={item} />
                                    <DeleteOutlined style={{
                                        fontSize: "20px",
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        zIndex: 1,
                                        background: "white",
                                        padding: 1,
                                        borderTop: "1px solid black",
                                        borderRight: "1px solid black"
                                    }}
                                        onClick={() => handleRemoveImage(item)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <Row>
                        <Form.Item
                            name="images"
                            label="Picture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Maximum 6 picture. Must be .jpg, .png, .jpeg"
                            rules={[
                                {
                                    validator: (_, fileList) => {
                                        if (fileList && fileList.length > 0) {
                                            const isImage = fileList[0].type === 'image/png' || fileList[0].type === 'image/jpeg';
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
                            <Dragger
                                height={100}
                                {...propsUpload}
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Dragger>
                        </Form.Item>
                    </Row>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your product description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

export default UpdateBlogModal;
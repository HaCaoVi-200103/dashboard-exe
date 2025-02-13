import {
    Modal, Form,
    notification,
    Button,
    UploadProps,
    Input,
} from 'antd';
import Cookies from "js-cookie";
import { useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { createBlogAPI } from '../../api/blog';
import { useAppContext } from '../../context/AppContext';

interface IProps {
    isModalOpen: boolean;
    setIsModalOpen: (v: boolean) => void;
}

const AddGalleryModal = (props: IProps) => {
    const {
        isModalOpen, setIsModalOpen
    } = props;
    const { refreshBlog, setRefreshBlog } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [listPicture, setListPicture] = useState<string[]>([])
    const uploadErrorShown = useRef(false);

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsModalOpen(false);
    }

    const onFinish = async (value: any) => {
        try {
            setLoading(true)
            const dataConfig: { title: string, images: string[], description: string } = {
                title: value.title,
                images: listPicture,
                description: value.description
            }
            console.log(dataConfig);

            const res = await createBlogAPI(dataConfig!)

            if (res.statusCode === 201) {
                notification.success({ message: res.message })
                setLoading(false)
                form.resetFields()
                setRefreshBlog(!refreshBlog)
                setIsModalOpen(false);
                return;
            }

            notification.success({ message: res.message })
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

    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Add Blog"
                open={isModalOpen}
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
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your category name!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="pro_picture"
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
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your product description!' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>

            </Modal>
        </div >
    )
}

export default AddGalleryModal;
import {
    Modal, Form,
    notification,
    Button,
    UploadProps,
    Image,
} from 'antd';
import Cookies from "js-cookie";
import { useRef, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { createGalleryAPI, deleteGalleryAPI } from '../../api/gallery';

interface IProps {
    isGalleryModalOpen: boolean;
    setIsGalleryModalOpen: (v: boolean) => void;
    id: string;
    listGallery: IGallery[];
}

const AddGalleryModal = (props: IProps) => {
    const {
        isGalleryModalOpen, setIsGalleryModalOpen, id, listGallery,
    } = props;
    const { refreshProduct, setRefreshProduct } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [listPicture, setListPicture] = useState<string[]>([])
    const uploadErrorShown = useRef(false);

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsGalleryModalOpen(false);
    }

    const onFinish = async () => {
        try {
            setLoading(true)
            const res = await createGalleryAPI(id, listPicture)

            if (res.statusCode === 201) {
                notification.success({ message: res.message })
                setLoading(false)
                form.resetFields()
                setRefreshProduct(!refreshProduct)
                setIsGalleryModalOpen(false);
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

    const handleRemoveImage = async (id: string) => {
        try {
            const res = await deleteGalleryAPI(id)

            if (res.statusCode === 200) {
                return notification.success({ message: res.message })
            }
            return notification.error({ message: res.message })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Add gallery"
                open={isGalleryModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                maskClosable={false}
                loading={loading}
            >
                <div>Current gallery</div>
                <div style={{
                    display: "flex", gap: 10, marginBottom: 15
                }} >
                    {
                        listGallery && listGallery.length > 0 && listGallery.map((item, index) => (
                            <div key={index}
                                style={{
                                    position: "relative"
                                }}
                            >
                                <Image style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",

                                }} src={item.gal_picture} alt={item.gal_picture} />
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
                                    onClick={() => handleRemoveImage(item._id)}
                                />
                            </div>
                        ))
                    }
                </div>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                >
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
                </Form>
            </Modal>
        </div >
    )
}

export default AddGalleryModal;
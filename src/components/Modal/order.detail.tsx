import {
    Modal, Form,
    Image,


} from 'antd';
import { CSSProperties, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatPriceVND } from '../../utils';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    data?: any[]
}

const OrderDetailsModal = (props: IProps) => {
    const {
        isUpdateModalOpen, data, setIsUpdateModalOpen
    } = props;
    const { } = useAppContext()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCloseCreateModal = () => {
        form.resetFields()
        setLoading(false)
        setIsUpdateModalOpen(false);
    }

    return (
        <div>
            <Modal
                style={{ top: 50 }}
                title="Order details"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                maskClosable={false}
                loading={loading}
            >
                <table style={tableStyle}>
                    <thead>
                        <tr style={headerRowStyle}>
                            <th style={headerStyle}>Image</th>
                            <th style={headerStyle}>Name</th>
                            <th style={headerStyle}>Quantity</th>
                            <th style={headerStyle}>Size</th>
                            <th style={headerStyle}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 && data.map((item, index) => (
                            <tr key={index} style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                                <td style={cellStyle}>
                                    <Image
                                        src={item.pro_id.pro_picture}
                                        alt={item.pro_id.pro_picture}
                                        width={70}
                                        height={70}
                                        style={imageStyle}
                                    />
                                </td>
                                <td style={cellStyle}>{item.pro_id.pro_name}</td>
                                <td style={cellStyle}>{item.quantity}</td>
                                <td style={cellStyle}>{item.size}</td>
                                <td style={cellStyle}>{formatPriceVND(item.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
        </div >
    )
}

// Define styles with type CSSProperties
const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
};

const headerRowStyle: CSSProperties = {
    backgroundColor: "#f4f4f4"
};

const headerStyle: CSSProperties = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center" as const, // Fix lỗi TypeScript
    fontWeight: "bold"
};

const cellStyle: CSSProperties = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center" as const // Fix lỗi TypeScript
};

const rowEvenStyle: CSSProperties = {
    backgroundColor: "#f9f9f9"
};

const rowOddStyle: CSSProperties = {
    backgroundColor: "#ffffff"
};

const imageStyle: CSSProperties = {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "3px"
};

export default OrderDetailsModal;
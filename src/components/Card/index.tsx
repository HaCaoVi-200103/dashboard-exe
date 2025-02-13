import React, { ReactNode } from 'react';
import { Card, Space } from 'antd';
interface IProps {
    title: string;
    content: ReactNode,
    background?: string
}
const CardCustomize: React.FC<IProps> = (props) => {
    const { title, content, background } = props
    return (
        <Space direction="vertical" styles={{
            item: {
                color: "white"
            },
        }} size={30}>
            <Card styles={{
                header: {
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                },
            }} title={<span style={{ color: "white" }}>{title}</span>} style={{ width: 300, background: background, color: "white" }}>
                {content}
            </Card>
        </Space>
    )
}

export default CardCustomize;
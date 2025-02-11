import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        type: 'group',
        label: 'Group title',
        children: [
            {
                key: '1-1',
                label: '1st menu item',
            },
            {
                key: '1-2',
                label: '2nd menu item',
            },
        ],
    },
    {
        key: '2',
        label: 'sub menu',
        children: [
            {
                key: '2-1',
                label: '3rd menu item',
            },
            {
                key: '2-2',
                label: '4th menu item',
            },
        ],
    },
];

const DropdownCustomize: React.FC = () => {
    return (
        <Dropdown menu={{ items }} >
            <Space >
                Cascading menu
                <DownOutlined />
            </Space>
        </Dropdown>
    )
};

export default DropdownCustomize;
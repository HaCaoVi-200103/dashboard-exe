import React, { ReactNode } from 'react';
import { Select } from 'antd';
interface IProps {
    icon?: ReactNode,
    selected: string,
    setSelected: any,
    data: ICategory[]
    placeholder: string
}

const SelectCustomize: React.FC<IProps> = (props) => {
    const { icon, selected, setSelected, data, placeholder } = props
    const { Option } = Select;

    return (
        <Select
            style={{ width: 150 }}
            value={selected}
            placeholder={placeholder}
            menuItemSelectedIcon={icon}
            onChange={setSelected} allowClear>
            {
                data && data.length > 0 && data.map((item) => (
                    <Option key={item._id} value={item._id}>{item.cate_name}</Option>
                ))
            }

        </Select>
    )
}

export default SelectCustomize;
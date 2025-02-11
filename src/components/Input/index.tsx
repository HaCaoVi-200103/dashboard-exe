import { Input } from "antd"
import { ReactNode } from "react"

interface IProps {
    value: any,
    setValue: any,
    icon: ReactNode,
    placeholder: string
}
const InputCustomize = (props: IProps) => {
    const { icon, setValue, value, placeholder } = props
    return (
        <Input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} addonAfter={icon} />
    )
}

export default InputCustomize
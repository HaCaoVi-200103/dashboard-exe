import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps, Space } from "antd";
import { useAppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const DashboardHeader = () => {
    const { Header } = Layout;
    const { collapseMenu, setCollapseMenu } = useAppContext()!;
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            // disabled: true,
        },

        {
            key: '4',
            danger: true,
            label: <div onClick={() => handleLogout()}>Logout</div>,
        },
    ];

    const handleLogout = async () => {
        Cookies.remove("token")
        navigate("/login")
    }
    return (
        <>
            <Header
                style={{
                    padding: 0,
                    display: "flex",
                    background: "#f5f5f5",
                    justifyContent: "space-between",
                    alignItems: "center"
                }} >

                <Button
                    type="text"
                    icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapseMenu(!collapseMenu)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Dropdown menu={{ items }} >
                    <a onClick={(e) => e.preventDefault()}
                        style={{ color: "unset", lineHeight: "0 !important", marginRight: 20 }}
                    >
                        <Space>
                            Welcome Admin
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Header>
        </>
    )
}

export default DashboardHeader;
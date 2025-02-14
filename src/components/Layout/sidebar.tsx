import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    DollarOutlined,
    TeamOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAppContext } from "../../context/AppContext";
import { Link, useLocation } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];
const DashboardSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useAppContext()!;
    const location = useLocation();

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'Joyfull Letter',
            type: 'group',
            children: [
                {
                    key: "/",
                    label: <Link to={'/'}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "/management-product",
                    label: <Link to={"/management-product"}>Product</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "/management-category",
                    label: <Link to={"/management-category"}>Category</Link>,
                    icon: <UnorderedListOutlined />,
                },
                {
                    key: "/management-blog",
                    label: <Link to={"/management-blog"}>Blog</Link>,
                    icon: <AppstoreAddOutlined />,
                },
                {
                    key: "/management-order",
                    label: <Link to={"/management-order"}>Order</Link>,
                    icon: <DollarOutlined />,
                },
                {
                    type: 'divider',
                },
            ],
        },
    ];


    return (
        <Sider
            collapsed={collapseMenu}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default DashboardSideBar;
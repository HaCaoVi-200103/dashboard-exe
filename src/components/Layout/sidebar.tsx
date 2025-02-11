import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    DollarOutlined,
    FileImageOutlined,
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
                    key: "/management-gallery",
                    label: <Link to={"/management-gallery"}>Gallery</Link>,
                    icon: <FileImageOutlined />,
                },
                {
                    key: "/management-order",
                    label: <Link to={"/management-order"}>Order</Link>,
                    icon: <DollarOutlined />,
                },
                // {
                //     key: 'sub1',
                //     label: 'Navigation One',
                //     icon: <MailOutlined />,
                //     children: [
                //         {
                //             key: 'g1',
                //             label: 'Item 1',
                //             type: 'group',
                //             children: [
                //                 { key: '1', label: 'Option 1' },
                //                 { key: '2', label: 'Option 2' },
                //             ],
                //         },
                //         {
                //             key: 'g2',
                //             label: 'Item 2',
                //             type: 'group',
                //             children: [
                //                 { key: '3', label: 'Option 3' },
                //                 { key: '4', label: 'Option 4' },
                //             ],
                //         },
                //     ],
                // },
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
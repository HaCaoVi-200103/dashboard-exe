import { Layout } from 'antd';

const DashboardFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Joyfull Letter ©{new Date().getFullYear()} Created by @Joy Team
            </Footer>
        </>
    )
}

export default DashboardFooter;
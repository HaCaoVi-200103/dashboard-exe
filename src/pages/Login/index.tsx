import { AntDesignOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import "./style.css"
import { Button, Form, FormProps, Input, notification } from "antd"
import { useNavigate } from "react-router";
import { loginAPI } from "../../api/login";
import Cookies from "js-cookie";
import { useEffect } from "react";
type FieldType = {
    email?: string;
    password?: string;
};
const Login = () => {
    const navigate = useNavigate();
    const token = Cookies.get("token")
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res: IBEResponse<ILogin> = await loginAPI(values.email!, values.password!)

            if (res.data) {
                return navigate("/")
            }

            if (res.statusCode === 404) {
                return notification.warning({
                    message: res.message
                })
            } else if (res.statusCode === 400) {
                notification.warning({
                    message: res.message
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])
    return (
        <div className="containerLogin">
            <div style={{ display: "flex", justifyContent: "center", gap: 10, alignItems: "center" }}>
                <AntDesignOutlined className="iconLogin" />
                <h1>Welcome Joy</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <h4 style={{ color: "black" }}>Log in to the system</h4>
            </div>
            <div style={{ width: "200px", borderBottom: "1px", borderColor: "black", borderStyle: "solid", margin: "auto", marginTop: "4px" }}></div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ marginTop: "10px" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" prefix={<UserOutlined />} style={{ width: 300 }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} style={{ width: 300 }} />
                    </Form.Item>


                    <Button style={{ width: 300 }} type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login
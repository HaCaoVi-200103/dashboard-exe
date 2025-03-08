import { useEffect, useState } from "react";
import TotalDashboardCard from "../../components/Card/cart.dashboard";
import { Line, Pie } from '@ant-design/charts';
import { getTotalAPI } from "../../api/login";
import { getOrderAllAPI } from "../../api/order";
import { useSearchParams } from "react-router";
const Dashboard = () => {
    const [dataRaw, setDataRaw] = useState<any[]>([])
    const [searchParams] = useSearchParams();
    const current = searchParams.get("current") || "1";
    const pageSize = searchParams.get("pageSize") || "5";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOrderAllAPI(+current, +pageSize);
                setDataRaw(res.data?.result || []);


            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [current, pageSize]);


    // Chuyển đổi dữ liệu để vẽ biểu đồ
    const data = dataRaw.map(order => ({
        date: new Date(order.createdAt).toLocaleDateString(), // Chuyển thời gian thành ngày
        total_price: order.total_price
    }));

    const config = {
        data,
        width: 900,
        height: 400,
        xField: "date", // Trục X là ngày đặt hàng
        yField: "total_price", // Trục Y là tổng giá trị đơn hàng
        point: {
            size: 5,
            shape: "circle",
        },
        label: {
            style: {
                fontSize: 12,
                fill: "#000",
            },
        },
    };


    const [total, setTotal] = useState<any>({})

    useEffect(() => {
        (async () => {
            const res = await getTotalAPI();
            if (res.statusCode === 200) {
                setTotal(res.data)
            }
        })()
    }, [])
    return (
        <div style={{
            display: "flex",
            gap: 30
        }}>
            <div>
                <div style={{
                    display: "flex",
                    gap: 30
                }}>
                    <TotalDashboardCard bg="linear-gradient(to right, #e6dada, #274046)" title="Total Product" total={total ? total.product : 0} />
                    <TotalDashboardCard bg="linear-gradient(to right, #f46b45, #eea849)" title="Total Blog" total={total ? total.blog : 0} />
                    <TotalDashboardCard bg="linear-gradient(to right, #649173, #dbd5a4)" title="Total Order" total={total ? total.order : 0} />
                </div>
                <div style={{
                    display: "flex",
                    gap: 30,
                    marginTop: "30px",
                }}>
                    <div
                        style={{
                            background: "black"
                        }}>
                        <div style={{
                            border: "1px solid #ecf0f1",
                            width: "fit-content",
                            borderRadius: 10,
                            background: "white"
                        }}>
                            <Line  {...config} />
                        </div>
                    </div>
                    <div>
                        <div style={{
                            background: "black"
                        }}>
                            <div style={{
                                border: "1px solid #ecf0f1",
                                width: "fit-content",
                                height: 350,
                                borderRadius: 10,
                                background: "white",
                            }}>
                                {/* <Pie width={300} {...configPie} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
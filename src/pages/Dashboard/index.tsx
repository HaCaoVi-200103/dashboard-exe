import TotalDashboardCard from "../../components/Card/cart.dashboard";
import { Area, Bar, Funnel, Gauge, Heatmap, Line, Pie, Radar, Rose, Sunburst } from '@ant-design/charts';
const Dashboard = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',

    };
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
                    <TotalDashboardCard bg="linear-gradient(to right, #e6dada, #274046)" title="Total Product" total={100} />
                    <TotalDashboardCard bg="linear-gradient(to right, #649173, #dbd5a4)" title="Total Order" total={100} />
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
                            <Line width={900} {...config} />
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
                                <Pie width={300} {...config} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
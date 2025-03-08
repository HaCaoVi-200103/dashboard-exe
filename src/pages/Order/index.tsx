import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { notification, Skeleton } from "antd";
import { getOrderAllAPI } from "../../api/order";
import OrderTable from "../../components/Table/order.table";

const Order = () => {
    const [searchParams] = useSearchParams();
    const current = searchParams.get("current") || "1";
    const pageSize = searchParams.get("pageSize") || "5";
    const [data, setData] = useState<IBlog[] | []>([]);
    const [meta, setMeta] = useState({ current: 1, pageSize: 10, total: 1 });
    const { refreshBlog } = useAppContext()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getOrderAllAPI(+current, +pageSize);
                setLoading(false)

                if (res.statusCode !== 200) {
                    return notification.warning({ message: "Can't take data category" })
                }

                setData(res.data?.result || []);
                setMeta({
                    current: res.data?.meta?.current || 1,
                    pageSize: res.data?.meta?.pageSize || 10,
                    total: res.data?.meta?.total || 1,
                });

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [current, pageSize, refreshBlog]);

    if (loading) {
        return <Skeleton />
    }
    return (
        <div>
            <OrderTable metaDefault={{ current: +current, LIMIT: +pageSize }} dataSource={data || []} meta={meta} />
        </div>
    )
}

export default Order;
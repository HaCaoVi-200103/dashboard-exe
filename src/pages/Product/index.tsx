import { useSearchParams } from "react-router";
import ProductTable from "../../components/Table/product.table";
import { useEffect, useState } from "react";
import { getProductListAPI } from "../../api/product";
import { useAppContext } from "../../context/AppContext";
import { notification, Skeleton } from "antd";

const Product = () => {
    const [searchParams] = useSearchParams();
    const current = searchParams.get("current") || "1";
    const pageSize = searchParams.get("pageSize") || "5";
    const [data, setData] = useState<IProduct[] | []>([]);
    const [meta, setMeta] = useState({ current: 1, pageSize: 10, total: 1 });
    const { refreshProduct } = useAppContext()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(false)
                const res = await getProductListAPI(current, pageSize);
                if (res.statusCode !== 200) {
                    return notification.warning({ message: "Can't take data product" })
                }

                setData(res.data?.result || []);
                setMeta({
                    current: res.data?.meta?.current || 1,
                    pageSize: res.data?.meta?.pageSize || 10,
                    total: res.data?.meta?.total || 1,
                });
                setLoading(true)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [current, pageSize, refreshProduct]);

    if (!loading) {
        return <Skeleton />
    }

    return (
        <div>
            <ProductTable metaDefault={{ current: +current, LIMIT: +pageSize }} dataSource={data || []} meta={meta} />
        </div>
    )
}

export default Product;
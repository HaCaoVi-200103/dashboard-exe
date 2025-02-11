import { useSearchParams } from "react-router";
import ProductTable from "../../components/Table/product.table";
import { useEffect, useState } from "react";
import { getProductListAPI } from "../../api/product";
import { useAppContext } from "../../context/AppContext";

const Product = () => {
    const [searchParams] = useSearchParams();
    const current = searchParams.get("current") || "1";
    const pageSize = searchParams.get("pageSize") || "5";
    const [data, setData] = useState<IProduct[] | []>([]);
    const [meta, setMeta] = useState({ current: 1, pageSize: 10, total: 1 });
    const { refreshProduct } = useAppContext()
    useEffect(() => {
        const fetchData = async () => {
            const res = await getProductListAPI(current, pageSize);
            setData(res.data?.result || []);
            setMeta({
                current: res.data?.meta?.current || 1,
                pageSize: res.data?.meta?.pageSize || 10,
                total: res.data?.meta?.total || 1,
            });
        };
        fetchData();
    }, [current, pageSize, refreshProduct]);
    return (
        <div >
            <ProductTable metaDefault={{ current: +current, LIMIT: +pageSize }} dataSource={data || []} meta={meta} />
        </div>
    )
}

export default Product;
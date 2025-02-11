import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CategoryTable from "../../components/Table/category.table";
import { getCategoryListAPI } from "../../api/category";

const Category = () => {
    const [searchParams] = useSearchParams();
    const current = searchParams.get("current") || "1";
    const pageSize = searchParams.get("pageSize") || "5";
    const [data, setData] = useState<ICategory[] | []>([]);
    const [meta, setMeta] = useState({ current: 1, pageSize: 10, total: 1 });
    const { refreshProduct } = useAppContext()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCategoryListAPI(+current, +pageSize);
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
    }, [current, pageSize, refreshProduct]);
    return (
        <div>
            <CategoryTable metaDefault={{ current: +current, LIMIT: +pageSize }} dataSource={data || []} meta={meta} />
        </div>
    )
}

export default Category;
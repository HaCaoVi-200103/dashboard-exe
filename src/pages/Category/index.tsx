import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CategoryTable from "../../components/Table/category.table";
import { getCategoryListAPI } from "../../api/category";
import { notification, Skeleton } from "antd";

const Category = () => {
    const [searchParams] = useSearchParams();
    const current = searchParams.get("current") || "1";
    const pageSize = searchParams.get("pageSize") || "5";
    const [data, setData] = useState<ICategory[] | []>([]);
    const [meta, setMeta] = useState({ current: 1, pageSize: 10, total: 1 });
    const { refreshProduct } = useAppContext()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(false)
                const res = await getCategoryListAPI(+current, +pageSize);

                if (res.statusCode !== 200) {
                    return notification.warning({ message: "Can't take data category" })
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
            <CategoryTable metaDefault={{ current: +current, LIMIT: +pageSize }} dataSource={data || []} meta={meta} />
        </div>
    )
}

export default Category;
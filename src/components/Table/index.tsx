import { useEffect, useState } from "react";
import { Table } from "antd";
import { useSearchParams, useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";
import { FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig } from "antd/es/table/interface";
interface IProps<T> {
    dataSource: T[];
    columns: ColumnsType<T>;
    meta: {
        current: number,
        pageSize: number,
        total: number,
    }
}
const TableCustomize = <T,>(props: IProps<T>) => {
    const { dataSource, meta, columns } = props
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[], extra: TableCurrentDataSource<T>) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set('current', pagination.current.toString());
            navigate(`?${params.toString()}`);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (dataSource) setIsLoading(false);
    }, [dataSource]);

    return (
        <Table
            onChange={onChange}
            columns={columns}
            rowKey={"_id"}
            pagination={meta}
            loading={isLoading}
            dataSource={dataSource}
        />
    );
};

export default TableCustomize;

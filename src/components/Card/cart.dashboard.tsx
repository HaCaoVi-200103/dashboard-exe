import { useEffect, useState } from "react";
import CardCustomize from "../../components/Card";

interface IProps {
    title: string;
    total: number;
    bg?: string
}

const TotalDashboardCard = (props: IProps) => {
    const { title, total, bg } = props;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const step = Math.ceil(total / 100);
        const interval = setInterval(() => {
            current += step;
            if (current >= total) {
                setCount(total);
                clearInterval(interval);
            } else {
                setCount(current);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [total]);

    return (
        <div>
            <CardCustomize
                background={bg}
                title={title}
                content={
                    <div
                        style={{
                            fontSize: 50,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {count}
                    </div>
                }
            />
        </div>
    );
};

export default TotalDashboardCard;

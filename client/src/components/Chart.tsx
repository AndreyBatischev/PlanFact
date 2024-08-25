import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    data: Array<{
        month: string;
        totalPlanAmount?: string;
        totalFactAmount?: string;
        cumulativePlanAmount?: string;
        cumulativeFactAmount?: string;
    }>;
    cumulative: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, cumulative }) => {
    const chartData = {
        labels: data.map((row) => row.month),
        datasets: [
            {
                label: 'Плановая сумма',
                data: cumulative
                    ? data.map((row) => Number(row.cumulativePlanAmount))
                    : data.map((row) => Number(row.totalPlanAmount)),
                fill: false,
                borderColor: 'blue',
            },
            {
                label: 'Фактическая сумма',
                data: cumulative
                    ? data.map((row) => Number(row.cumulativeFactAmount))
                    : data.map((row) => Number(row.totalFactAmount)),
                fill: false,
                borderColor: 'red',
            },
        ],
    };

    return <Line data={chartData} />;
};

export default Chart;

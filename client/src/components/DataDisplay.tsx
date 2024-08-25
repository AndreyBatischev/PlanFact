import React from 'react';
import '../styles/components/DataDisplay.css';

interface DataDisplayProps {
    data: Array<{
        month: string;
        object: string;
        workType: string;
        totalPlanAmount?: string;
        totalFactAmount?: string;
        cumulativePlanAmount?: string;
        cumulativeFactAmount?: string;
    }>;
    cumulative: boolean;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, cumulative }) => {
    return (
        <div className={`data-display ${cumulative ? 'cumulative' : ''}`}>
            <div className="data-row header">
                <div className="data-cell">Месяц</div>
                <div className="data-cell">Объект</div>
                <div className="data-cell">Тип работ</div>
                <div className="data-cell">Плановая сумма</div>
                <div className="data-cell">Фактическая сумма</div>
                {cumulative && (
                    <>
                        <div className="data-cell">Накопительный план</div>
                        <div className="data-cell">Совокупный факт</div>
                    </>
                )}
            </div>
            {data.map((row, index) => (
                <div key={index} className="data-row">
                    <div className="data-cell">{row.month}</div>
                    <div className="data-cell">{row.object}</div>
                    <div className="data-cell">{row.workType}</div>
                    <div className="data-cell">{row.totalPlanAmount || row.cumulativePlanAmount}</div>
                    <div className="data-cell">{row.totalFactAmount || row.cumulativeFactAmount}</div>
                    {cumulative && (
                        <>
                            <div className="data-cell">{row.cumulativePlanAmount}</div>
                            <div className="data-cell">{row.cumulativeFactAmount}</div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DataDisplay;

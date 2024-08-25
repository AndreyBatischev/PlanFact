import React from 'react';
import '../styles/components/Filters.css';

interface FiltersProps {
    filters: {
        startDate: string;
        endDate: string;
        object: string;
        workType: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        startDate: string;
        endDate: string;
        object: string;
        workType: string;
    }>>;
    fetchData: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, fetchData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="filters-container">
            <div className="filter-item">
                <label>Дата начала:</label>
                <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
            </div>
            <div className="filter-item">
                <label>Дата окончания:</label>
                <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
            </div>
            <div className="filter-item">
                <label>Объект:</label>
                <input type="text" name="object" value={filters.object} onChange={handleChange} />
            </div>
            <div className="filter-item">
                <label>Тип работ:</label>
                <input type="text" name="workType" value={filters.workType} onChange={handleChange} />
            </div>
            <button className="filter-button" onClick={fetchData}>Применить</button>
        </div>
    );
};

export default Filters;

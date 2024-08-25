import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import DataDisplay from './components/DataDisplay';
import Chart from './components/Chart';
import { fetchPlanFactData } from './utils/api';
import './App.css';

interface DataItem {
  month: string;
  object: string;
  workType: string;
  totalPlanAmount?: string;
  totalFactAmount?: string;
  cumulativePlanAmount?: string;
  cumulativeFactAmount?: string;
}

const App: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    object: '',
    workType: '',
  });
  const [groupedData, setGroupedData] = useState<DataItem[]>([]);
  const [cumulativeData, setCumulativeData] = useState<DataItem[]>([]);

  const fetchData = async () => {
    const data = await fetchPlanFactData(filters);
    setGroupedData(data.groupedData);
    setCumulativeData(data.cumulativeData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>План-факт анализ</h1>
      <Filters filters={filters} setFilters={setFilters} fetchData={fetchData} />
      <div className="container">
        <div className="data-container">
          <h2>Сгруппированные данные</h2>
          <DataDisplay data={groupedData} cumulative={false} />
          <Chart data={groupedData} cumulative={false} />
        </div>
        <div className="data-container">
          <h2>Совокупные данные</h2>
          <DataDisplay data={cumulativeData} cumulative={true} />
          <Chart data={cumulativeData} cumulative={true} />
        </div>
      </div>
    </div>
  );
};

export default App;

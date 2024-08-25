import axios from 'axios';

export const fetchPlanFactData = async (filters) => {
    try {
        const response = await axios.get('http://localhost:3001/api/plan-facts/grouped', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { groupedData: [], cumulativeData: [] };
    }
};

import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001';

//api call to get jobs
export const fetchJobs = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        if (response.status !== 200) throw new Error('Network response was not ok');
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs', error)
        throw error;

    }

}
//api call to crate job

export const createJob = async () => {
    const response = await axios.post(`${API_BASE_URL}/jobs`);
    return response.data;
}
//api call to get job by id

export const getJobById = async (jobId: string) => {
    const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
    return response.data;
}
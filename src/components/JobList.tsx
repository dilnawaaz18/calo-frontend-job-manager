import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, Typography, List, ListItem, CircularProgress } from '@mui/material'
import { fetchJobs, getJobById } from '../services/jobServices';


interface Job {
    id: string;
    status: 'pending' | 'resolved' | string;
    result?: string;
}
const JobList: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState<Job[]>([]);

    const loadJobsData = useCallback(async () => {
        try {
            const data = await fetchJobs();
            setJobs(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load jobs', error);
        }

    }, [])


    useEffect(() => {
        loadJobsData();
    }, []);

    useEffect(() => {
        // used for pooling to check new jobs after 5 seconds
        const interval = setInterval(async () => {
            const jobs = await fetchJobs();
            setJobs(jobs)
            for (const job of jobs) {
                console.log('=======>', job)
                if (job.status === 'pending') {
                    const newJob = await getJobById(job.id)
                    if (newJob.status === 'resolved') {
                        const updateJobs = jobs.map((j: Job) => (j.id === job.id ? newJob : j))
                        setJobs(updateJobs);

                    }
                }
            }

        }, 5000)
        return () => clearInterval(interval);

    }, [jobs])
    return (
        <Card className='bg-black shadow-md rounded p-4'><CardContent>
            <Typography variant='h5'>Job List</Typography>
            {loading ? (<div className="flex justify-center items-center">
                <CircularProgress />
            </div>) : (<div>
                <List>
                    {jobs.map(job => (
                        <Card key={job.id} className="max-w-sm m-4 mx-auto">
                            <CardContent>
                                <Typography component="div">{`Job Id: ${job.id}`}</Typography>
                                {job.status === 'resolved' ? (
                                    <img src={job.result} alt="Food" className="w-full h-auto mt-2" />
                                ) : (
                                    <Typography>Status: {job.status}</Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </List>
            </div>)}
        </CardContent></Card>
    )
}

export default JobList

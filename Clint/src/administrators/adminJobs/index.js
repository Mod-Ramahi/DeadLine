import React, { useEffect, useState } from "react";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { getAllProject } from "../../api";

export default function AdminJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            const response = await getAllProject()
            setJobs(response)
        }
        getJobs()
    }, []);

    const renderJobs = jobs.map((job, idx) => {
        return (
            <div key={idx}>
                <JobCardResult job={job} />
            </div>
        )
    })

    return (
        <>
            <p>Admin Jobs</p>
            <div style={{backgroundColor:'red', height:'25rem', display:'flex'}}>
                {renderJobs}
            </div>
        </>
    )
}
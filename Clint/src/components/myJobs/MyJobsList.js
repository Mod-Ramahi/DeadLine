import React from "react";
import { Jobs } from "../../data/Jobs";
import JobCardResult from "../../components/jobCardResults/JobCardResult";

export default function MyJobsList () {
    const myJob = Jobs.slice(0, 2).map((job, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '2rem', alignItems:'center' }}>
            <JobCardResult job={job} />
            <div style={{width:'35%', display: 'flex', gap: '1rem' }}>
                <span>Status: Active</span>
                <button style={{height:'20%'}}>delete</button>
            </div>
        </div>
    ))
    return(
        <div style={{ marginTop: '15rem', width: '70%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myJob}
        </div>               
    )
}
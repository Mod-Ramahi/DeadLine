import React from "react";
import { Jobs } from "../../data/Jobs";
import JobCardResult from "../../components/jobCardResults/JobCardResult";
import { useNavigate } from "react-router-dom";

export default function HireFreelancer() {
    const myJob = Jobs.slice(0, 2).map((job, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <JobCardResult job={job} />
            <div style={{ width: '35%', display: 'flex', gap: '1rem' }}>
                <button style={{ height: '20%' }}>Invite</button>
            </div>
        </div>
    ))

    const navigate = useNavigate()
    return (
        <>
            <div style={{ marginTop: '20%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div style={{border: '1px solid black', borderRadius: '5px', width:'70%', display:'flex', gap:'1rem', justifyContent:'center', padding:'1rem'}}>
                    <span style={{fontSize:'1.5rem'}}> Invite To one of your jobs or add new job </span>
                <button> Add New Job </button>
                </div>
                <div style={{border: '1px solid black', borderRadius: '5px', width:'70%', display:'flex', gap:'1rem', justifyContent:'center', padding:'1rem'}}>
                    <span style={{fontSize:'1.5rem'}}> Send a message to the freelancer </span>
                <button onClick={() => navigate('/chat')}> Chat </button>
                </div>
                <div style={{ marginTop: '3rem', width: '70%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {myJob}
                </div>
            </div>
        </>
    )
}
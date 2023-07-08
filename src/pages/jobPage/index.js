import React, { useState, useEffect } from "react";
import './Job.scss';
import JobProfile from "../../components/jobProfile/JobProfile";
import { useParams } from "react-router-dom";
import { Jobs } from "../../data/Jobs";

export default function Job (){
    const {JobID} = useParams();
    const [clickedJob, setClickedJob]= useState(null);

    useEffect (() => {
        const targetJob = Jobs.find(job => job.id === parseInt(JobID))
        setClickedJob(targetJob);
    }, [JobID]);
    if (!clickedJob) {
        return <p>Loading...</p>;
      }
    

    return (
        <>
        <JobProfile job={clickedJob} />
        
        </>
    )
}
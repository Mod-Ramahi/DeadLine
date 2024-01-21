import React, { useState, useEffect } from "react";
import './Job.scss';
import JobProfile from "../../components/jobProfile/JobProfile";
import { useParams } from "react-router-dom";
// import { Jobs } from "../../data/Jobs";
import { getProjectById } from "../../api";

export default function Job (){
    const {JobID} = useParams();
    const [clickedJob, setClickedJob]= useState(null);

    useEffect (() => {
        const getProject = async () =>{

            const response = await getProjectById(JobID)
            console.log('clicked job',response)
            setClickedJob(response)
        }
        getProject();
    }, [JobID]);
    
    // useEffect (() => {
    //     const targetJob = Jobs.find(job => job.id === parseInt(JobID))
    //     setClickedJob(targetJob);
    // }, [JobID]);
    console.log(clickedJob,66)
    if (!clickedJob) {
        return <p>Loading...</p>;
      }
    

    return (
        <>{clickedJob &&
        <JobProfile job={clickedJob} />}
        </>
    )
}
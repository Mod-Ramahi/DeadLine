import React, { useState, useEffect } from "react";
import './Job.scss';
import JobProfile from "../../components/jobProfile/JobProfile";
import { useParams } from "react-router-dom";
// import { Jobs } from "../../data/Jobs";
import { getAllProject } from "../../api";

export default function Job (){
    const {JobID} = useParams();
    const [clickedJob, setClickedJob]= useState(null);
    const [jobs, setJobs] = useState([])

    // useEffect (() => {
    //     const getProduct = async () => {
    //         const response = await getAllProject();
    //         setJobs(response)
    //     }
    //     getProduct()
    //     // const targetJob = Jobs.find(job => job.id === parseInt(JobID))
    //     const targetJob = jobs.find(job => job._id === JobID)

    //     setClickedJob(targetJob);
    // }, [JobID]);
    useEffect (() => {
        const fetchData = async () => {
            const response = await getAllProject();
            setJobs(response);

            const targetJob = response.find(job => job._id === JobID);
            setClickedJob(targetJob);
        }

        fetchData();
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
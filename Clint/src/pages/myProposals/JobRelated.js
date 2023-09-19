import React, { useEffect, useState } from "react";
import { getProjectById } from "../../api";
import JobCardResult from "../../components/jobCardResults/JobCardResult";

export default function JobRelated({jobId}) {
    const [job, setJob] =useState()
    useEffect(() => {
        const getJob = async () => {
            
            if (jobId) {
                try{
                    const response = await getProjectById(jobId)
                    if(response.status === 404){
                        console.log('its 404 error')
                    }
                    console.log('rrrressssponse:', response)
                    if(response){
                        setJob(response)
                    }
                    
                }catch(error){
                    console.log(error)
                }
                // getProjectById(jobId).then((job) => {
                //     if (job){
                //         console.log('ttttttttttttttttt',job)
                //     }else{
                //         console.log('not foundffffffffffffff')
                //     }
                // })
            }else{
                console.log('BBBBBBBBBBBBBBBBBBBBBBB')
            }
        }
        getJob()
    }, [jobId])

    return(
        <>
            <JobCardResult job={job}/>
        </>
    )
}
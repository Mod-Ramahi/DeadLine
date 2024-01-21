import React, { useEffect, useState } from "react";
import './JobCardResult.scss'
import { getUserById } from "../../api";
import DefaultPhoto from './defaultPhoto.jpg'
import { useLocation } from "react-router-dom";

export default function JobCardResult({ job }) {

    const [jobPostedBy, setJobPostedBy] = useState()
    // const [userId, setUserId] = useState()
    const location = useLocation()

    useEffect(() => {
        const jobCreator = (userID) => {
            getUserById(userID).then((user) => {
                const jobcreator = user;
                setJobPostedBy(jobcreator)
                console.log('zzzzzzzzzzzzzzzzz:', userID, 'job:', job)
            }).catch((error) => {
                console.log('error', error)
            })
        }
        if (location.pathname === '/myfollowing') {
            const userID = job?.createdBy
            if (userID) {
                // setUserId(userID)
                jobCreator(userID)
            }

        } else {
            const userID = job?.createdBy;
            if (userID) {
                // setUserId(userID)
                jobCreator(userID)
            }
        }

        // console.log('zzzzzzzzzzzzzzzzz:', userId, 'job:', job)
        // if (userId) {
        //     getUserById(userId).then((user) => {
        //         const jobcreator = user;
        //         setJobPostedBy(jobcreator)
        //     }).catch((error) => {
        //         console.log('error', error)
        //     })
        // }
    }, [])
    return (
        <div className="job-card" >
            <div className="up">
                <div className="job-image">
                    {/* <div className="img">job</div> */}
                    {/* {job?.createdBy?.image} */}
                    <img alt="a" src={DefaultPhoto} className="img" />
                </div>
                <div className="job-title">
                    <span className="j-title">{job?.title}</span>
                    <div className="job-price">
                        <span>{job?.salary}$</span>
                        <span>{job?.paymentMethod}</span>
                    </div>
                </div>
            </div>
            <div className="down">
                <div className="catego-section">
                    <span className="job-category">{job?.category}</span>
                </div>
                <hr />
                <div className="short-description-section">
                    <span className="job-short-description"> {job?.shortDescription}</span>
                </div>
            </div>
            <div className="company-name">
                <span className="real-name">Job Posted By: {jobPostedBy ? jobPostedBy.proname : ""}</span>
                <span className="reviews">User review: No Reviews</span>
            </div>
        </div>
    )
}
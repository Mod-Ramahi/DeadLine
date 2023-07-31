import React from "react";
import './JobCardResult.scss'
import {Users} from '../../data/Users'

export default function JobCardResult({ job, onJobClick }) {
    
    const GetJobID = () => {
        onJobClick(job.id)
    }
    const user = Users.find(user => user.id === job.userPostedId)
    return (
        <div className="job-card" onClick={GetJobID}>
            <div className="up">
                <div className="job-title">
                    <span className="j-title">(Project) {job.jobTitle}</span>
                </div>
                <div className="job-price">
                    <span>{job.jobPrice}</span>
                    <span>{job.paymentMethod}</span>
                </div>
            </div>
            <div className="down">
                <span className="job-category">{job.jobCategory}</span>
            </div>
            <div className="card-title">
                <span className="real-name">Job Posted By: {user.name}</span>
                <span className="reviews">{user.avgRate}</span>
            </div>
        </div>
    )
}
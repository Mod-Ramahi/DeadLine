import React from "react";
import './JobCardResult.scss'
import {Users} from '../../data/Users'

export default function JobCardResult({ job, onJobClick }) {
    
    const GetJobID = () => {
        onJobClick(job.id)
    }
    const user = Users.find(user => user.id === job.userPostedId)
    return (
        <div className="job_card" onClick={GetJobID}>
            <div className="up">
                <div className="job_title">
                    <span className="j_title">(Project) {job.jobTitle}</span>
                </div>
                <div className="job_price">
                    <span>{job.jobPrice}</span>
                    <span>{job.paymentMethod}</span>
                </div>
            </div>
            <div className="down">
                <span className="job_category">{job.jobCategory}</span>
            </div>
            <div className="card_title">
                <span className="real_name">Job Posted By: {user.name}</span>
                <span className="reviews">{user.avgRate}</span>
            </div>
        </div>
    )
}
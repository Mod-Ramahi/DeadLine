import React from "react";
import './JobCardResult.scss'

export default function JobCardResult({ job }) {
    
    return (
        <div className="job-card" >
            <div className="up">
                <div className="job-title">
                    <span className="j-title">(Project) {job.title}</span>
                </div>
                <div className="job-price">
                    <span>{job.salary}</span>
                    <span>{job.paymentMethod}</span>
                </div>
            </div>
            <div className="down">
                <span className="job-category">{job.category}</span>
            </div>
            <div className="card-title">
                <span className="real-name">Job Posted By: {job?.createdBy?.email}</span>
                {/* <span className="reviews">{user.avgRate}</span> */}
            </div>
        </div>
    )
}
import React from "react";
import './JobCardResult.scss'

export default function JobCardResult({ job }) {

    return (
        // <div className="job-card" >
        //     <div className="up">
        //         <div className="job-title">
        //             <span className="j-title">(Project) {job.title}</span>
        //         </div>
        //         <div className="job-price">
        //             <span>{job.salary}</span>
        //             <span>{job.paymentMethod}</span>
        //         </div>
        //     </div>
        //     <div className="down">
        //         <span className="job-category">{job.category}</span>
        //     </div>
        //     <div className="card-title">
        //         <span className="real-name">Job Posted By: {job?.createdBy?.email}</span>
        //         {/* <span className="reviews">{user.avgRate}</span> */}
        //     </div>
        // </div>
        <div className="job-card" >
            <div className="up">
                <div className="job-image">
                    <div className="img">job</div>
                    {/* {job?.createdBy?.image} */}
                    {/* <img alt="a" src={job?.createdBy?.image} className="img"/> */}
                </div>
                <div className="job-title">
                    <span className="j-title">{job.title}</span>
                    <div className="job-price">
                        <span>{job.salary} $</span>
                        <span>{job.paymentMethod}</span>
                    </div>
                </div>
            </div>
            <div className="down">
                <div className="catego-section">
                    <span className="job-category">{job.category}</span>
                </div>
                <hr />
                <div className="short-description-section">
                    <span className="job-short-description">Short Description for the posted job to show some main details{job.shortDescriptioncategory}</span>
                </div>
            </div>
            <div className="company-name">
                <span className="real-name">Job Posted By: {job?.createdBy?.email}</span>
                <span className="reviews">User review: No Reviews</span>
            </div>
        </div>
    )
}
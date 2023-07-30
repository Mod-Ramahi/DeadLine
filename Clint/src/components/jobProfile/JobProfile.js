import React from "react";
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import { Users } from "../../data/Users";
import { Link } from "react-router-dom";

export default function JobProfile({ job }) {
    const user = Users.find(user => user.id === job.userPostedId)
    return (
        <div className="userprofile">
            <div className="uppersection">
                <span className="upper"> Project </span>
            </div>
            <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        <img className="photo" alt="profilephoto" src={job.jobPhoto} />
                        <p className="name">{user.name}</p>
                    </div>
                    <div className="info">
                        <div className="country">
                            {/* <img className="countryimage" alt="" src={CountryFlag} /> */}
                            <p className="countryname">{user.country}</p>
                        </div>
                        <div className="time">
                            <img className="timeicon" alt="time" src={Time} />
                            <p className="timezone">TimeZone:{user.timezone}</p>
                        </div>
                        <div className="joined">
                            <img className="joinedicon" alt="" src={Joined} />
                            <p className="joinedtime">{user.joined}</p>
                        </div>
                        <div className="recommendation">
                            <img className="recommendationimage" alt="" src={Recommendation} />
                            <p className="recommendationnumber">recommendation: 5</p>
                        </div>
                    </div>
                </div>
                <div className="middlesection">
                    <div className="nickname">
                        <p>{job.jobTitle}</p>
                        <p>{user.nickname}</p>
                    </div>
                    <div className="title_review">
                        <div className="review">
                            <p>{user.avgRate}</p>
                            <p>(4 reviews)</p>
                        </div>
                    </div>
                    <div className="userstatistic">
                        <div className="stat">
                            <div className="job_complete">
                                <p className="n">5</p>
                                <p>projects Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="serviceinfo">
                        <p className="myoffers">
                            {job.jobDescription}
                        </p>
                        <ul>
                            {job.jobSkills.map((skill, idx) => {
                                return (
                                    <li key={idx}>{skill}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="rightsection">
                    <div className="upperbox">
                        <Link to='/bidproposal' style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div className="hirebtn">
                                <span>bid On Job</span>
                            </div>
                        </Link>
                        <div className="boxinfo">
                            <span>Top Skills</span>
                            <div className="pboxinfo">
                                <ul>
                                    {job.jobSkills.map((skill, idx) => {
                                        return (
                                            <li key={idx}>{skill}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <span>Category</span>
                            <div className="pboxinfo">
                                <p>{job.jobCategory}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lowerads">
                        <div className="imgads">
                            {/* {AdsPhotos} */}
                            <p>Ads/recommended</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="reviewssection">
                <span>Reviews</span>
                <div>
                    {/* {Reviews} */}
                </div>
            </div>
            <hr />
            <div className="reviewssection">
                <span>Proposals</span>
                <div>
                    {/* {Reviews} */}
                </div>
            </div>
        </div>
    )
}
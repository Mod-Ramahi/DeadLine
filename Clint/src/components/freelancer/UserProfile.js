import React from "react"
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import Asseta from "./Asseta.png"
import { Link } from "react-router-dom"

export default function UserProfile({user}){
    return (
        <div className="userprofile">
            <div className="uppersection">
                <span className="upper"> FreeLancer </span>
            </div>
            <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        <img alt="profilephoto" src={user.profilephoto} />
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
                        <p>{user.name}</p>
                        <p>{user.nickname}</p>
                    </div>
                    <hr/>
                    <div className="title_review">
                        <p>{user.headline}</p>
                        <div className="review">
                            <p>{user.avgRate}</p>
                            <p>(4 reviews)</p>
                        </div>
                    </div>
                    <div className="userstatistic">
                        <div className="stat">
                            <div className="job_complete">
                                <p className="n">5</p>
                                <p>Jobs Completed</p>
                            </div>
                            <div className="job_complete">
                                <p className="n">100%</p>
                                <p>On Budget</p>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="job_complete">
                                <p className="n">20%</p>
                                <p>Repeat hire rate</p>
                            </div>
                            <div className="job_complete">
                                <p className="n">100%</p>
                                <p>On Time</p>
                            </div>
                        </div>
                    </div>
                    <div className="serviceinfo">
                        <p className="aboutme">
                            {user.maininfo}
                        </p>
                        <p className="myoffers">
                            {user.servicesinfo}
                        </p>
                            <ul>
                                {user.skills.map((skill, idx)=>{
                                return(
                                    <li key={idx}>{skill}</li>
                                )
                            })}
                            </ul>
                    </div>
                </div>
                <div className="rightsection">
                    <div className="upperbox">
                        <Link to='/hire-freelancer'>
                        <div className="hirebtn">
                            <span>Hire</span>
                        </div>
                        </Link>
                        <div className="boxinfo">
                            <span>Top Skills</span>
                            <div className="pboxinfo">
                                <ul>
                                {user.topSkills.map((topskill, idx)=>{
                                return(
                                    <li key={idx}>{topskill}</li>
                                )
                            })}
                                </ul>
                            </div>
                            <span>Category</span>
                            <div className="pboxinfo">
                                <p>{user.category}</p>
                            </div>
                            <span>My expertise</span>
                            <div className="pboxinfo">
                            <ul>
                                {user.experties.map((expert, idx)=>{
                                return(
                                    <li key={idx}>{expert}</li>
                                )
                            })}
                                </ul>
                            </div>
                            <span>Clients:</span>
                            <div className="pboxinfo">
                                <p>5</p>
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
            <div className="userprojects">
                <hr />
                <div className="userprojectsimage">
                    {/* {PortfolioPhotos} */}
                    <img alt="portfolio" src={Asseta}/>
                    <img alt="portfolio" src={Asseta}/>
                    <img alt="portfolio" src={Asseta}/>
                    <img alt="portfolio" src={Asseta}/>
                </div>
                <hr />
            </div>
            <div className="reviewssection">
                <span>Reviews</span>
                <div>
                    {/* {Reviews} */}
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react"
import Joined from './Joined.png'
import Time from './Time.png'
import Recommendation from './Recommendation.png'
import Asseta from "./Asseta.png"
import { Link } from "react-router-dom"
import { getProfileProjectByCreatorId, getUserById } from "../../api"
import DefaultPhoto from './defaultPhoto.jpg'
import Portfolio from "../portfolioCard/Portfolio"

export default function UserProfile({ user }) {
    const [profileUser, setProfileUser] = useState()
    const [thePortfolio, setThePortfolio] = useState([])
    useEffect(() => {
        const checkProfile = () => {
            if(user){
                const profileId = user.createdBy;
            console.log('user from profile id:', profileId)
            if (profileId) {
                getUserById(profileId).then((freelancer) => {
                    const profileCreator = freelancer;
                    setProfileUser(profileCreator);
                    if(profileCreator){
                        getPortfolios(profileCreator)
                    }
                }).catch((error) => {
                    console.error(error)
                })
            }
            }else {
                console.log('no profile')
            }
        }
        checkProfile()
        const getPortfolios = (profileCreator) => {
            const useid = profileCreator._id
            console.log('aaaa',useid)
            getProfileProjectByCreatorId(useid).then((profile) => {
                setThePortfolio(profile)
                console.log('bbbbb',profile)
            }).catch((error) => {
                console.error(error)
            })
        }
        console.log("userrrr:", profileUser)
    }, [])

    const RenderPortfolio = thePortfolio.map((project) => (
        <Link style={{color:'inherit', textDecoration:'none'}} to={`/portfolioProject/${project._id}`} key={project._id}>
            <Portfolio portfolioProject={project}/>
        </Link>
    ))
    return (
        <div className="userprofile">
            <div className="uppersection">
                <span className="upper"> FreeLancer </span>
            </div>
            <div className="lowersection">
                <div className="leftsection">
                    <div className="profilephoto">
                        <img alt="profilephoto" src={DefaultPhoto}/>
                        <span className="name">{profileUser ? profileUser.name : "user"}</span>
                    </div>
                    <hr />
                    <div className="info">
                        <div className="country">
                            {/* <img className="countryimage" alt="" src={CountryFlag} /> */}
                            <span className="countryname">{profileUser ? profileUser.country : "N/A"}</span>
                        </div>
                        <div className="time">
                            <img className="timeicon" alt="time" src={Time} />
                            <span className="timezone">TimeZone:{profileUser ? profileUser.timezone : "N/A"}</span>
                        </div>
                        <div className="joined">
                            <img className="joinedicon" alt="" src={Joined} />
                            <span className="joinedtime">{profileUser ? profileUser.joined : 'N/A'}</span>
                        </div>
                        <div className="recommendation">
                            <img className="recommendationimage" alt="" src={Recommendation} />
                            <span className="recommendationnumber">recommendation: 5</span>
                        </div>
                    </div>
                </div>
                <div className="middlesection">
                    <div className="nickname">
                        <span>{profileUser ? profileUser.proname : "@user"}</span>
                        <span className="categ-span">{user?.mainCategory}</span>
                        <span className="budget">{user?.hourPrice}$</span>
                    </div>
                    <div className="title_review">
                        <span>{user?.headline}</span>
                        <div className="review">
                            {/* <span>{user.avgRate}</span> */}
                            <span>(4 reviews)</span>
                        </div>
                    </div>
                    <hr />
                    <div className="userstatistic">
                        <div className="stat">
                            <div className="job_complete">
                                <span className="n">5</span>
                                <span>Jobs Completed</span>
                            </div>
                            <div className="job_complete">
                                <span className="n">100%</span>
                                <span>On Budget</span>
                            </div>
                        </div>
                        <div className="stat">
                            {/* <div className="job_complete">
                                <p className="n">20%</p>
                                <p>Repeat hire rate</p>
                            </div> */}
                            <div className="job_complete">
                                <span className="n">100%</span>
                                <span>On Time</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="serviceinfo">
                        <span className="aboutme">
                            {user?.aboutMe}
                        </span>
                        <span className="myoffers">
                            {user?.serviceSummary}
                        </span>
                        <hr />
                        <span className="myoffers">
                            {user?.aboutService}
                        </span>
                        {/* <ul>
                                {user.skills.map((skill, idx)=>{
                                return(
                                    <li key={idx}>{skill}</li>
                                )
                            })}
                            </ul> */}
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
                                    {user?.topSkills.map((topskill, idx) => {
                                        return (
                                            <li key={idx}>{topskill}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <span>Clients:</span>
                            <div className="pboxinfo">
                                <span>5</span>
                            </div>
                            <hr style={{ margin: '0.3rem' }} />
                            <div className="pboxinfo">
                                <span>{user?.subCategory}</span>
                            </div>

                        </div>
                    </div>
                    <div className="lowerads">
                        <div className="imgads">
                            {/* {AdsPhotos} */}
                            <span>Ads/recommended</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userprojects">
                <hr />
                <span className="portfolio-projects-span">Protfolio projects:</span>
                <div className="userprojectsimage">
                    {/* <Portfolio creator={profileUser}/> */}
                    {thePortfolio && RenderPortfolio}
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
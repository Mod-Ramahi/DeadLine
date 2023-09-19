import React, { useEffect, useState } from "react";
import DefaultImg from './Default.png'
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolioProjectById, getProfileByCreator } from "../../api";
import './PortfolioUser.scss'

export default function PortfolioUser() {
    const { id } = useParams();
    const [portfolioProject, setPortfolioProject] = useState()
    const [projectCreator, setProjectCreator] = useState()
    const [projectProfile, setProjectProfile] = useState()
    const [profileRoute, setProfileRoute] = useState()
    const navigate = useNavigate()

    useEffect (() => {
        const getPortfolio = () => {
            const portfolioId = id;
            getPortfolioProjectById(portfolioId).then((project)=> {
                const projectFound = project
                const projectCreator = project.createdBy
                setPortfolioProject(projectFound);
                setProjectCreator(projectCreator);
                console.log('projectFound:', projectFound, 'projectCreator:', projectCreator)
                if (projectCreator){
                    getProfile(projectCreator)
                }
            }).catch((err) => {
                console.error(err)
            })
        }
        getPortfolio();
        const getProfile = (projectCreator) => {
            getProfileByCreator(projectCreator).then((profile) => {
                const profileFound = profile;
                console.log('project Profile:', profile)
                const profileId = profile._id
                setProjectProfile(profileFound)
                setProfileRoute(profileId)
                
            })
        }
    },[]);

    const GoToProfile = () => {
        navigate(`/freelancer/${profileRoute}`)
    }
    return (
        <div className="portfolio-container">
            <div className="project-div">
                <div className="portfolio-name">
                    <span className="name-span">{portfolioProject?.portfolioName}</span>
                </div>
                <div className="file-attached">
                    <div className="image">
                        <img className="img" alt="" src={DefaultImg} />
                    </div>
                </div>
                <hr className="hr"/>
                <div className="portfolio-description">
                    <span className="description-span">
                        {portfolioProject?.portfolioDescription}
                    </span>
                </div>
            </div>
            <div className="creator-profile">
                <div className="service-info">
                    <img className="profile-img" alt="" src={DefaultImg} />
                    <span className="headline-span">{projectProfile?.headline}</span>
                </div>
                <hr className="hr-white" />
                <div className="service-description">
                    <span className="summary-span"> {projectProfile?.serviceSummary}</span>
                    <button className="go-profile" onClick={GoToProfile}>User Profile</button>
                </div>
            </div>
        </div>
    )
}
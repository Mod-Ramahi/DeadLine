import React, { useEffect, useState } from "react";
import './Portfolio.scss';
import Project from './project.jpg'
import { getProfileProjectByCreatorId } from "../../api";

export default function Portfolio ({portfolioProject, classPass}) {
    const [projectRelated, setProjectRelated] = useState()
    const [addClass, setAddClass]= useState('')
    useEffect(() => {
        console.log('portfolioProject/profile:', portfolioProject)
        const getProject = () => {
            if(portfolioProject){
                setProjectRelated(portfolioProject)
                if(classPass){
                setAddClass(classPass)
            }
            }else{
                console.log('no portfolioProject')
            }
        }
        getProject()
    },[portfolioProject])
    return (//dont forget to complete and do the map in the profile page for the portfolio projects
        <div className={!addClass?"portfolio-card": `portfolio-card ${addClass}`  }>
            <div className="top">
                <div className="right">
                    <img src={Project} alt=""/>
                </div>
                <div className="left">
                    <span className="project-name">{projectRelated?.portfolioName}</span>
                </div>
            </div>
            <div className="bottom">
                <span className="project-description">{projectRelated?.portfolioDescription}</span>
            </div>
        </div>
    )
}
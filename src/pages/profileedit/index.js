import React, { useState } from "react";
import { CategoryList } from "../../CategoryList";
import { Link } from "react-router-dom";
import './ProfileEdit.scss'

export default function ProfileEdit() {
    const [myCountry, setMyCountry] = useState()
    const [nickName, setNickName] = useState()
    const [headline, setHeadline] = useState()
    const [aboutMe, setAboutMe] = useState()
    const [myService, setMyService] = useState()
    const [mainSkills, setMainSkills] = useState([])
    const [allSkills, setAllSkills] = useState([])
    const [category, setCategory] = useState()
    const [experiences, setExperiences] = useState()

    const handleProfilePhoto = (event) => {
        const file = (event.target.value);
        const maxSize = 10971520;
        if (file && file.size > maxSize) {
            alert("Maximum file size exceeded. Please choose a smaller file.");
            event.target.value = null;
        } else {
            alert("Photo uploaded");
        }
    }
    const handleMyCountry = (event) => {
        setMyCountry(event.target.value)
    }
    const handleNickName = (event) => {
        setNickName(event.target.value)
    }
    const handleHeadline = (event) => {
        setHeadline(event.target.value)
    }
    const handleAboutMe = (event) => {
        setAboutMe(event.target.value)
    }
    const handleMyService = (event) => {
        setMyService(event.target.value)
    }
    const handleMainSkills = (event) => {
        const mainSkillsSelected = (event.target.value)
        if (mainSkillsSelected !== '' && !mainSkills.includes(mainSkillsSelected)) {
            const mainSkillsArray = [...mainSkills, mainSkillsSelected].slice(0, 3)
            setMainSkills(mainSkillsArray)
        }
    }
    const handleAllSkills = (event) => {
        const allSkillsSelected = (event.target.value)
        if (allSkillsSelected !== '' && !allSkills.includes(allSkillsSelected)) {
            const allSkillsArray = [...allSkills, allSkillsSelected].slice(0, 7)
            setAllSkills(allSkillsArray)
        }
    }
    const handleCategory = (event) => {
        if (category !== '') {
            setCategory(event.target.value)
        }
    }
    const handleExperiences = (event) => {
        setExperiences(event.target.value)
    }
    return (
        <div className="userprofile2">
            <div className="uppersection2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="upper"> My Profile Edit </span>
            </div>
            <div className="lowersection2">
                <div className="leftsection">
                    <div className="profilephoto">
                        <label htmlFor="image">Upload Your Photo</label>
                        <input type="file" accept=".png, .jpg" id="image" onChange={handleProfilePhoto} />
                    </div>
                    <div className="info">
                        <div className="country">
                            <select id="mycountry" onChange={handleMyCountry}>
                                <option value='Jordan'> Jordan </option>
                                <option value='USA'>USA</option>
                                <option value='Canada'>Canada</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="middlesection2">
                    <div className="nickname">
                        <label htmlFor="mynickname">My Nick Name</label>
                        <input id="mynickname" type="text" onChange={handleNickName} />
                    </div>
                    <div className="title_review">
                        <label htmlFor="headline">Your proffesional headline</label>
                        <input type="textarea" id="headline" onChange={handleHeadline} />
                    </div>
                    <div className="serviceinfo">
                        <label htmlFor="aboutme">About Me</label>
                        <input type="textarea" id="aboutme" onChange={handleAboutMe} />
                        <label htmlFor="myservice">My Services/ My Company service</label>
                        <input type="textarea" id="myservice" onChange={handleMyService} />
                        <div className="skillsmain">
                            <p>`Select Main Skills (max:3)`</p>
                            <select id="mainskills" onChange={handleMainSkills}>
                                <option value=''>Select</option>
                                <option value='skillone'>skill1</option>
                                <option value='skilltwo'>skill2</option>
                                <option value='skillthree'>skill3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="rightsection2">
                    <div className="upperbox">
                        <div className="boxinfo">
                            <span>All Skills</span>
                            <div className="pboxinfo">
                                <select id="mainskills" onChange={handleAllSkills}>
                                    <option value=''>Select</option>
                                    <option value='skillone'>skill1</option>
                                    <option value='skilltwo'>skill2</option>
                                    <option value='skillthree'>skill3</option>
                                </select>
                            </div>
                            <div className="pboxinfo">
                                <p>Select Category</p>
                                <select id="category" onChange={handleCategory}>
                                    <option value=''>Select</option>
                                    {CategoryList.map((catego, idx) => (
                                        <option value={catego.categoryname} key={idx}>{catego.categoryname}</option>
                                    ))}
                                </select>
                            </div>
                            <span>My expertise</span>
                            <div className="pboxinfo">
                                <label htmlFor="experiences">Experiences </label>
                                <input id="experiences" type="text" onChange={handleExperiences} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userprojects2">
                <hr />
                <div className="userprojectsimage">
                    <Link to='addportfolio'>Add portfolio</Link>
                </div>
                <hr />
            </div>
        </div>
    )
}
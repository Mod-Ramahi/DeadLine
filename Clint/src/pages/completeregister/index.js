import React, { useState } from "react";
import { CategoryList } from "../../CategoryList";
import { useNavigate } from "react-router-dom";
import './CompleteRegister.scss'

export default function CompleteRegister() {
    const [businessType, setBusinesstype] = useState()
    const [maincategory, setMainCategory] = useState()
    const [skillsSelected, setSkillsSelected] = useState([])
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/userhome')
    }
    const handleBusType = (event) => {
        setBusinesstype(event.target.value)
    }
    const handleMaincategory = (event) => {
        setMainCategory(event.target.value)
    }

    const handleSkillsSelection = (event) => {
        const selectedskill = (event.target.value);
        if (selectedskill !== '' && !skillsSelected.includes(selectedskill)) {
            const skillsArray = [...skillsSelected, selectedskill].slice(0, 4)
            setSkillsSelected(skillsArray)
        }
        if( selectedskill === 'reset'){
            setSkillsSelected([])
        }
        // setSkillsSelected([...skillsSelected, selectedskill].slice(0,4))
    }

    return (
        <div className="complete_container">
            <span className="title">Complete registration</span>
            <form onSubmit={handleSubmit}>
                <div className="business_type">
                    <span>Choose your main business type / you can always change it and access both types</span>
                    <select id="businesstype" onChange={handleBusType}>
                        <option value='seller'> looking for jobs</option>
                        <option value='buyer'> looking for freelancers</option>
                    </select>
                </div>
                <div className="select_category">
                    <span> Select your preferred business categories </span>
                    <select id="category" onChange={handleMaincategory}>
                        {CategoryList.map((item, idx) => (
                            <option key={idx} value={item.categoryname}>{item.categoryname}</option>
                        ))}
                    </select>
                    <div className="select_skills">
                        <span className="add_skills"> Choose at least 2 skills and up to 5</span>
                        <select id="skill" onChange={handleSkillsSelection}>
                            <option value=''>Select</option>
                            <option value='reset'>Reset</option>
                            <option value='skill1'>Skill one</option>
                            <option value='skill2'>Skill two</option>
                            <option value='skill3'>Skill three</option>
                            <option value='skill4'>Skill four</option>
                            <option value='skill5'>Skill five</option>
                            <option value='skill6'>Skill six</option>
                            <option value='skill7'>Skill seven</option>
                            <option value='skill8'>Skill eight</option>
                        </select>
                        <div className="skills box">
                            <span>Your selected skills: </span>
                            {skillsSelected.map((skill, idx) => (
                                < span key={idx} > {skill},</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="submit_links">
                    <button className="sbmtbtn" type="submit">Done</button>
                </div>
            </form >

        </div >
    )
}
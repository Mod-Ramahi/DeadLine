import React, { useState } from "react";
import * as Yup from 'yup'
import {completeRegisterRequest} from "../../api"
import { CategoryList } from "../../CategoryList";
import { useNavigate } from "react-router-dom";
import './CompleteRegister.scss'

export default function CompleteRegister() {
    const [businessType, setBusinesstype] = useState(null)
    const [profileImg, setProfileImg] = useState(null)
    const [proNickname, setProNickname] = useState(null)
    const [maincategory, setMainCategory] = useState(null)
    const [skillsSelected, setSkillsSelected] = useState([])
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        businessType: Yup.string()
            .oneOf(['seller', 'buyer'], 'please select a valid business type'),
        proNickname: Yup.string().required('professional name is required')
            .min(3, 'must be atleast  characters')
            .max(25, 'must not exceed 25 characters'),
        maincategory: Yup.string().test('category', 'Please select a category', (value) => {
            return value !== '';
        }),
        skillsSelected: Yup.array().min(1, 'pleaseselect atleast 1 skill'),
    })

    const handleBusType = (event) => {
        const BusType = event.target.value
        setBusinesstype(BusType)
    }

    const handleProfileImage = (event) => {
        const files = event.target.files
        if (!files || files.length === 0) {
            setProfileImg("")
            return;
        }
        const file = files[0]
        if (!file.type.startsWith("image/")) {
            setValidationErrors({ profileImg: "Please select a valid image file." });
            return;
        }
        if (file.size > 3 * 1024 * 1024) {
            setValidationErrors({ profileImg: "File size exceeds the maximum limit (3MB)." });
            return;
        }

        if (file) {
            setProfileImg(file)
        }
        else {
            alert('failed uploading image')
        }
    }
    const handleNickname = (event) => {
        const proName = event.target.value
        setProNickname(proName)
        if (validationErrors.proNickname) {
            setValidationErrors((prevError) => ({
                ...prevError,
                proNickname: ''
            }))
        }
    }

    const handleMaincategory = (event) => {
        const selectedCategory = event.target.value
        setMainCategory(selectedCategory)
    }

    const handleSkillsSelection = (event) => {
        const selectedskill = (event.target.value);
        if(selectedskill === ''){
            return;
        }
        if (selectedskill !== '' && !skillsSelected.includes(selectedskill)) {
            const skillsArray = [...skillsSelected, selectedskill].slice(0, 3)
            setSkillsSelected(skillsArray)
        }
        if (selectedskill === 'reset') {
            setSkillsSelected([])
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // navigate('/userhome')
        try {
            await validationSchema.validate(
                { businessType, proNickname, profileImg, maincategory, skillsSelected },
                { abortEarly: false }
            );
            const formData = {
                businessType,
                proNickname,
                profileImg,
                maincategory,
                skillsSelected
            }
            const response = await completeRegisterRequest(formData)
            if (response.status === 200) {
                navigate('/userhome')
            }  if (response.status === 500){
                console.log('errrrrrorr 500')
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message
                });
                setValidationErrors(validationErrors)
                console.log(validationErrors)
            } else {
                alert('somthing went wrong')
                console.log(error)
            }
        }
    }

    return (
        <div className="complete_container">
            <span className="title">Complete registration</span>
            <form onSubmit={handleSubmit}>
                <div className="business_type">
                    <span>Choose your main business type / you can always change it from your settings</span>
                    <div className="handle-input">
                        <select id="businesstype" onChange={handleBusType}>
                            <option value=''>Select an option</option>
                            <option value='seller'> I am a freelancer, and I am looking for jobs</option>
                            <option value='buyer'> I am a buyer / company, and looking for freelancers</option>
                        </select>
                        {validationErrors.businessType && <span className="errors">{validationErrors.businessType}</span>}
                    </div>
                </div>
                <div className="user-nickname">
                    <span className='nickname-span'>Your professional name</span>
                    <div className="handle-input">
                        <input type="text" id="nickname" onChange={handleNickname} required />
                        {validationErrors.proNickname && <span className="errors">{validationErrors.proNickname}</span>}
                    </div>
                </div>
                <div className="profile-image">
                    <span className='profile-img-span'>Profile image <small>(optional) max:3MB</small> </span>
                    <div className="handle-input">
                        <input type="file" id="profileimg" name="profileImage" accept="image/*" onChange={handleProfileImage} />
                        {validationErrors.profileImg && <span className="errors">{validationErrors.profileImg}</span>}
                    </div>
                </div>
                <div className="select_category">
                    <span> Select your preferred business categories </span>
                    <div className="handle-input">
                        <select id="category" onChange={handleMaincategory} required>
                            <option value=''>Please select one</option>
                            {CategoryList.map((item, idx) => (
                                <option key={idx} value={item.categoryname}>{item.categoryname}</option>
                            ))}
                        </select>
                        {validationErrors.maincategory && <span className="errors">{validationErrors.maincategory}</span>}
                    </div>
                    <div className="select_skills">
                        <span className="add_skills"> Choose at least 1 and up to 4 skills</span>
                        <div className="handle-input">
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
                            {validationErrors.skillsSelected && <span className="errors">{validationErrors.skillsSelected}</span>}
                        </div>
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
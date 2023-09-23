import React, { useState, useEffect } from "react";
import { CategoryList } from "../../CategoryList";
import * as Yup from 'yup'
import './Settings.scss';
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { SettingsRequest, changeEmailRequest, completeRegisterRequest, getUserById } from "../../api";

export default function Settings() {
    const [validationErrors, setValidationErrors] = useState({})

    const [businessType, setBusinessType] = useState(null)
    const [profileImg, setProfileImg] = useState(null)
    const [proNickname, setProNickname] = useState(null)
    const [maincategory, setMainCategory] = useState(null)
    const [skillsSelected, setSkillsSelected] = useState([])

    const [newEmail, setNewEmail] = useState()
    const [currentPass, setCurrentPass] = useState()
    const [newPassword, setNewPassword] = useState()
    const [rePassword, setRePassword] = useState()

    const [showCrntPass, setShowCrntPass] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const getTokenId = () => {
            const token = getItem('token')
            if (token) {
                const decodeToken = jwtDecode(token)
                const tokenId = decodeToken.id
                getUserById(tokenId).then((user) => {
                    setBusinessType(user.userType)
                    setProfileImg(user.avatar)
                    setProNickname(user.proname)
                    setMainCategory(user.category)
                    setSkillsSelected(user.skills)
                }).catch((err) => {
                    console.error(err)
                })
            }
        }
        getTokenId()
    }, [])

    const validationSchema = Yup.object().shape({
        businessType: Yup.string()
            .oneOf(['seller', 'buyer'], 'please select a valid business type'),
        proNickname: Yup.string()
            .min(3, 'professional name must be atleast 3 characters')
            .max(25, 'must not exceed 25 characters'),
        maincategory: Yup.string().test('category', 'Please select a category', (value) => {
            return value !== '';
        }),
        skillsSelected: Yup.array().min(1, 'please select atleast 1 skill'),
        currentPass: Yup.string().min(8, '8 chracters for password atleast'),
        newPassword: Yup.string().min(8, 'password must be at least 8 characters')
            .max(20, 'password must not exceed 20 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]+$/,
                'Password must include at least one letter and one number'
            ),
        rePassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'password must match')
    })

    const handleBusType = (event) => {
        const BusType = event.target.value
        setBusinessType(BusType)
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
        if (selectedskill === '') {
            return;
        }
        if (selectedskill !== '' && !skillsSelected.includes(selectedskill)) {
            const skillsArray = [...skillsSelected, selectedskill].slice(0, 3)
            setSkillsSelected(skillsArray)
            if (validationErrors.skillsSelected) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    Skills: ''
                }))
            }
        }
        if (selectedskill === 'reset') {
            setSkillsSelected([])
        }
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
    const handleEmailChange = (event) => {
        const changed = event.target.value
        setNewEmail(changed)
    }
    const handleOldPassword = (event) => {
        const OldPass = event.target.value
        setCurrentPass(OldPass)
    }
    const handleNewPassword = (event) => {
        const newPass = event.target.value
        setNewPassword(newPass)
    }
    const handleRepeatPassword = (event) => {
        const reEnterPass = event.target.value
        setRePassword(reEnterPass)
    }
    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    const handleShowCrntPass = () => {
        setShowCrntPass(!showCrntPass)
    }
    const submitEdits = async (event) => {
        event.preventDefault();
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
            } else {
                alert('something went wrong')
                console.log('failed updating youd data')
            }
        } catch (error) {
            alert('something went wrong')
            console.error('Validation error:', error.errors);
            console.error('Error details:', error);
        }
    }
    const submitEmail = async (event) => {
        event.preventDefault()
        try{
            if (newEmail) {
                await validationSchema.validate(
                    { newEmail },
                    { abortEarly: false }
                )
                const response = await changeEmailRequest(newEmail)
                console.log(response)
                if (response.status === 200) {
                    console.log('ok')
                    navigate('/userhome')
                }
            }
            if (!newEmail) {
                alert('you did not enter any new value for Email')
            }
        }catch(error){
            alert('something went wrong')
            console.error('Validation error:', error.errors);
            console.error('Error details:', error);
        }
    }
    const submitChanges = async (event) => {
        event.preventDefault();
        try {
                await validationSchema.validate(
                    { newPassword, rePassword },
                    { abortEarly: false }
                )
                const data = { currentPass: currentPass, newPassword:newPassword }
                const response = await SettingsRequest(data)
                console.log(response)
                if (response.status === 200) {
                    console.log('ok')
                    navigate('/userhome')
                } else {
                    console.log('abcdabcd', response)
                }
            
            if (!newPassword) {
                alert('you did not enter any new value for password')
            }
            console.log('ok')
        } catch (error) {
            console.error(error)
            console.error('Validation error:', error.errors);
            console.error('Error details:', error);
        }
    }
    return (
        <div className="settings">
            <form onSubmit={submitEdits} className="form">
                <div className="block">
                    <div className="handle-input">
                        <span>Your Current business type:</span>
                        <select value={businessType} className="select" id="businesstype" onChange={handleBusType}>
                            <option value=''>Select an option</option>
                            <option value='seller'> I am a freelancer, and I am looking for jobs</option>
                            <option value='buyer'> I am a buyer / company, and looking for freelancers</option>
                        </select>
                    </div>
                    <hr className="hr-soft" />
                    <div className="handle-input">
                        <span className='nickname-span'>Your professional name</span>
                        <input value={proNickname} type="text" id="nickname" onChange={handleNickname} required />
                    </div>
                    <hr className="hr-soft" />
                    <div className="handle-input">
                        <span className='profile-img-span'>Profile image <small>(optional) max:3MB</small> </span>
                        <input value={profileImg} type="file" id="profileimg" name="profileImage" accept="image/*" onChange={handleProfileImage} />
                    </div>
                    <hr className="hr-soft" />
                    <div className="handle-input">
                        <span> Select your preferred business categories </span>
                        <select value={maincategory} className="select" id="category" onChange={handleMaincategory} required>
                            <option value=''>Please select one</option>
                            {CategoryList.map((item, idx) => (
                                <option key={idx} value={item.categoryname}>{item.categoryname}</option>
                            ))}
                        </select>
                    </div>
                    <hr className="hr-soft" />
                    <div className="handle-input">
                        <span className="add_skills"> Choose at least 1 and up to 3 skills</span>
                        <select className="select" id="skill" onChange={handleSkillsSelection}>
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
                    </div>
                    <div className="skills box">
                        <span>Your selected skills: </span>
                        {skillsSelected.map((skill, idx) => (
                            < span key={idx} > {skill},</span>
                        ))}
                    </div>
                    <button className="save" type="submit">Save Edits</button>
                </div>
            </form>
            <form onSubmit={submitEmail} className="form">
                <div className="block">
                    <span className="password-span">Change Password / Email:</span>
                    <div className="handle-input">
                        <span className="email-span">New email</span>
                        <input type="email" id="emailinput" onChange={handleEmailChange} />
                    </div>
                    <button className="save" type="submit">Change email</button>
                    <hr className="hr-soft" />
                </div>
            </form>
            <form onSubmit={submitChanges} className="form">
                <div className="block">
                    <div className="handle-input">
                        <span className="pass-span">Your Current password</span>
                        <div className="pass-div">
                            <input type={showCrntPass ? "text" : "password"} id="oldpass" onChange={handleOldPassword} />
                            <span className="show-hide" onClick={handleShowCrntPass}>{showCrntPass ? "hide" : "show"}</span>
                        </div>
                        <span className="pass-span">Your new password</span>
                        <div className="pass-div">
                            <input type={showPass ? "text" : "password"} id="newpass" onChange={handleNewPassword} />
                            <span className="show-hide" onClick={handleShowPass}>{showPass ? "hide" : "show"}</span>
                        </div>
                        <span className="pass-span">Enter new password again</span>
                        <div className="pass-div">
                            <input type={showPass ? "text" : "password"} id="repeatpass" onChange={handleRepeatPassword} />
                            <span className="show-hide" onClick={handleShowPass}>{showPass ? "hide" : "show"}</span>
                        </div>
                    </div>
                    <button className="save" type="submit">Save new password</button>
                </div>
            </form>
        </div>
    )
}
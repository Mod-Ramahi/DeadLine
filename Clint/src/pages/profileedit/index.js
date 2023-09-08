import React, { useEffect, useState } from "react";
import { CategoryList } from "../../CategoryList";
import './ProfileEdit.scss'
import * as Yup from 'yup'
import { getUserById, postProfileRequest, postProjectRequest } from "../../api";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorge";
import jwt_decode from 'jwt-decode';

export default function ProfileEdit() {
    const [validationErrors, setValidationErrors] = useState({})

    const [headline, setHeadline] = useState()
    const [aboutMe, setAboutMe] = useState()
    const [aboutService, setAboutService] = useState()
    const [serviceSummary, setServiceSummary] = useState()
    const [mainCategory, setMainCategory] = useState('')
    const [subCategory, setsubCategory] = useState()
    const [topSkills, setTopSkills] = useState([])
    const [portfolioName, setPortfolioName] = useState()
    const [portfolioDescription, setPortfolioDescription] = useState()
    const [notTypePermission, setNotTypePermission] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const checkType = (() => {
            const tokenType = getItem('token');
            if (tokenType) {
                const jwtoken = jwt_decode(tokenType)
                const idOfUser = jwtoken.id;
                getUserById(idOfUser).then((user) => {
                    const UserType = user.UserType;
                    if (UserType === 'buyer') {
                        setNotTypePermission(true)
                    } else {
                        setNotTypePermission(false)
                    }
                }).catch((error) => {
                    console.log(error)
                    alert("something went wrong")
                })
            } else {
                console.log('user may be not signed in')
            }
        })
        checkType()
    }, [])

    const validationSchema = Yup.object().shape({
        headline: Yup.string().min(10, 'service headline must be atleast 10 characters')
            .max(50, 'service headline must not exceed 50 characters'),
        aboutMe: Yup.string().min(40, 'About me must be atleast 40 characters')
            .max(200, 'About me must not exceed 200 characters'),
        aboutService: Yup.string().min(70, 'Service info must be atleast 70 characters')
            .max(600, 'Service info must not exceed 600 characters'),

        serviceSummary: Yup.string().min(30, 'Service summary must be atleast 30 character')
            .max(100, 'Service summary must not exceed 100 character'),
        mainCategory: Yup.string().notOneOf(
            ['', 'select'],
            'please select category'
        ),
        portfolioName: Yup.string().min(5, 'Project name must be atleast 5 characters')
            .max(30, 'Project name must not exceed 30 characters'),
        portfolioDescription: Yup.string().min(20, 'project description must be atleast 20 characters')
            .max(200, 'Project description must not exceed 200 character')
    })

    const handleHeadline = (event) => {
        const Headline = event.target.value;
        setHeadline(Headline);
        if (validationErrors.headline) {
            setValidationErrors((prevError) => ({
                ...prevError,
                headline: ""
            }))
        }
    }

    const handleAboutMe = (event) => {
        const Aboutme = event.target.value;
        setAboutMe(Aboutme);
        if (validationErrors.aboutMe) {
            setValidationErrors((prevError) => (
                {
                    ...prevError,
                    aboutMe: ''
                }
            ))
        }
    }

    const handleServiceInfo = (event) => {
        const AboutService = event.target.value;
        setAboutService(AboutService);
        if (validationErrors.aboutService) {
            setValidationErrors((prevError) => (
                {
                    ...prevError,
                    aboutService: ''
                }
            ))
        }
    }

    const handleServiceSummary = (event) => {
        const ServiceSummary = event.target.value;
        setServiceSummary(ServiceSummary);
        if (validationErrors.serviceSummary) {
            setValidationErrors((prevError) => ({
                ...prevError,
                serviceSummary: ''
            }))
        }
    }

    const handleMainCategory = (event) => {
        const MainCategory = event.target.value;
        setMainCategory(MainCategory)
    }

    const handleSubCategory = (event) => {
        const SubCategory = event.target.value;
        setsubCategory(SubCategory)
    }

    const handleTopSkills = (event) => {
        const TopSkills = event.target.value

        if (TopSkills !== '' && !topSkills.includes(TopSkills)) {
            const skillsArray = [...topSkills, TopSkills].slice(0, 3)
            setTopSkills(skillsArray)
        }
        if (TopSkills === 'reset') {
            setTopSkills([])
        }
        console.log(topSkills)
    };



    const handlePortfolioName = (event) => {
        const PortfolioName = event.target.value;
        setPortfolioName(PortfolioName)
    }

    const handlePortfolioDescription = (event) => {
        const PortfolioDescription = event.target.value;
        setPortfolioDescription(PortfolioDescription)
    }
    const CloseWrongWindow = () => {
        navigate('/userhome');
        setNotTypePermission(false)
    }
    const findSubCateg = CategoryList.find((item) =>
        item.categoryname === mainCategory
    )

    const handlePortfolio = async (event) => {
        event.preventDefault()
        try {
            await validationSchema.validate(
                {
                    portfolioName,
                    portfolioDescription
                },
                { abortEarly: false }
            );
            const response = await postProjectRequest({ portfolioName, portfolioDescription });
            if (response.status === 200) {
                console.log('project added:', response)
            } else {
                if (response.response.status === 401) {
                    console.log('authentication error:', response)
                } else {
                    console.log('something went wrong: ', response)
                }
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                console.log('validation errorrrrrs:',validationErrors)
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                    console.log('validation errrrr:',validationErrors)

                });
                setValidationErrors(validationErrors)
                console.log('validation erroooo:',validationErrors)

            } else {
                console.log('error occured:', error)
                alert('something went wrong')
            }
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate(
                {
                    headline,
                    aboutMe,
                    aboutService,
                    serviceSummary,
                    mainCategory
                },
                { abortEarly: false }
            );
            const formData = {
                headline,
                aboutMe,
                aboutService,
                serviceSummary,
                mainCategory,
                subCategory,
                topSkills
            }
            const response = await postProfileRequest(formData)
            if (response.status === 200) {
                navigate('/userhome')
            } else {
                if (response.response.status === 401) {
                    alert('you need to sign in')
                    navigate('/home')
                } else {
                    alert('somthing went wrong')
                }
                console.log(response)
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                console.log('validation errrrr:',validationErrors)
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                    console.log('validation errrrr:',validationErrors)

                });
                setValidationErrors(validationErrors)
            } else {
                console.log(error)
                alert('Something went wrong')
            }
        }
    }

    return (
        <div className="profile-edit">
            {notTypePermission && <div className="wrong-window"> <div className="wrong-window-message"><span className="wrong-window-span">Only freelancers and sellers can post a service profile. You can change your business type from the settings</span> <button className="wrong-window-button" onClick={CloseWrongWindow}>Ok</button></div></div>}
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="input-div headline">
                    <span>Freelancer Headline:</span>
                    <div className="handle-input">
                        <input type="text" id="headlinetextarea" placeholder="your service headline. min=10, max=50" onChange={handleHeadline} maxLength={50} />
                        {validationErrors.headline && <span className="errors">{validationErrors.headline}</span>}
                    </div>
                </div>
                <div className="input-div aboutme">
                    <span>About me:</span>
                    <div className="handle-input">
                        <textarea type="textarea" className="textarea" id="aboutmetextarea" placeholder="min=40, max=200" onChange={handleAboutMe} maxLength={200} />
                        {validationErrors.aboutMe && <span className="errors">{validationErrors.aboutMe}</span>}
                    </div>
                </div>
                <hr />
                <div className="input-div myoffers">
                    <span>About my service:</span>
                    <div className="handle-input">
                        <textarea type="textarea" className="textarea" id="aboutmyservicetextarea" placeholder="tell about you service. min=70, max=600" onChange={handleServiceInfo} maxLength={600} />
                        {validationErrors.aboutService && <span className="errors">{validationErrors.aboutService}</span>}
                    </div>
                </div>
                <div className="input-div servicesummary">
                    <span>Summary about my service:</span>
                    <div className="handle-input">
                        <textarea type="textarea" className="textarea" id="summaryaboutmyservicetextarea" placeholder="summary about your service to be shown in your card. min=30, max=100" onChange={handleServiceSummary} maxLength={100} />
                        {validationErrors.serviceSummary && <span className="errors">{validationErrors.serviceSummary}</span>}
                    </div>
                </div>
                <hr />
                <div className="input-div maincategory">
                    <span>Select the service's category:</span>
                    <div className="handle-input">
                        <select id="maincategory" onChange={handleMainCategory}>
                            <option value='select'>Select</option>
                            {CategoryList.map((catego, idx) => (
                                <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                            ))}
                        </select>
                        {validationErrors.mainCategory && <span className="errors">{validationErrors.mainCategory}</span>}
                    </div>

                </div>
                <div className="input-div subcategory">
                    <span>Select the service's category:</span>
                    <div className="handle-input">
                        <select id="subcategory" onChange={handleSubCategory}>
                            <option value='select'>Select</option>
                            {findSubCateg && findSubCateg.subCategory.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))
                            }
                        </select>
                        {validationErrors.subCategory && <span className="errors">{validationErrors.subCategory}</span>}
                    </div>

                </div>
                <div className="input-div skillsselect">
                    <span>Select your top skills: "you can select 3" </span>
                    <select id="skilll" onChange={handleTopSkills}>
                        <option value="">No specifec Skills</option>
                        <option value="reset">Reset</option>
                        <option value='optionOne'>skill 1</option>
                        <option value='optionTwo'>skill 2</option>
                        <option value='optionThree'>skill 3</option>
                        <option value='optionFour'>skill 4</option>
                        <option value='option5'>skill 5</option>
                        <option value='option6'>skill 6</option>
                        <option value='option7'>skill 7</option>
                    </select>
                    <span>You selected: {topSkills.join(', ')}</span>
                </div>
                <hr />
                <div className="input-div">
                    <span className="portfolio-description">(optional)You can showcase your previous work here "Describe your project and attach an image for each text" </span>
                    <span className="portfolio-span">Project name:</span>
                    <div className="handle-input">
                        <input type="text" id="portfolioname" placeholder="min=5. max=30" onChange={handlePortfolioName} maxLength={30} />
                        {validationErrors.portfolioName && <span className="errors">{validationErrors.portfolioName}</span>}
                    </div>
                    <span className="portfolio-span">Project description:</span>
                    <div className="handle-input">
                        <textarea type="textarea" className="textarea" id="portfolioinput" placeholder="min=20. max=200" onChange={handlePortfolioDescription} maxLength={200} />
                        {validationErrors.portfolioDescription && <span className="errors">{validationErrors.portfolioDescription}</span>}
                    </div>
                    <span className="portfolio-span">Project cover photo:</span>
                    <input type="file" id="attach" accept=".jpg, .png, .jpeg" />
                    <div> <button onClick={handlePortfolio}>Add the project to my portfolio profile</button> <span> you can have 3 projects</span></div>
                    <span>Your already exist projects: </span>
                </div>
                <hr />
                <button type="submit" className="submit-profile">Save & publish</button>

                <span className="last-span">you can change other main info from the settings.</span>
            </form>
        </div >
    )
}
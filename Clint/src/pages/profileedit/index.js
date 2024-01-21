import React, { useEffect, useState } from "react";
import { CategoryList } from "../../CategoryList";
import './ProfileEdit.scss'
import * as Yup from 'yup'
import { editProfileRequest, getPlanById, getProfileByCreator, getUserById, postProfileRequest, postProjectRequest } from "../../api";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorge";
import jwt_decode from 'jwt-decode';
import Portfolio from "../../components/portfolioCard/Portfolio";

export default function ProfileEdit() {
    const [validationErrors, setValidationErrors] = useState({})

    const [headline, setHeadline] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [aboutService, setAboutService] = useState('')
    const [serviceSummary, setServiceSummary] = useState('')
    const [mainCategory, setMainCategory] = useState('')
    const [subCategory, setsubCategory] = useState('')
    const [topSkills, setTopSkills] = useState([])
    const [hourPrice, setHourPrice] = useState(10)
    const [portfolioName, setPortfolioName] = useState('')
    const [portfolioDescription, setPortfolioDescription] = useState('')
    const [notTypePermission, setNotTypePermission] = useState(false)
    const [signedInUser, setSignedInUser] = useState()
    const [checkInput, setCheckInput] = useState(false)
    const [creator, setCreator] = useState()
    const [oldProfile, setOldProfile] = useState(false)
    const [userSkills, setUserSkills] = useState (0)
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const checkType = (() => {
            const tokenType = getItem('token');
            if (tokenType) {
                const jwtoken = jwt_decode(tokenType)
                const idOfUser = jwtoken.id;
                getUserById(idOfUser).then((user) => {
                    setCreator(user)
                    const UserType = user.userType;
                    setSignedInUser(UserType)
                    console.log(UserType)
                    if (UserType === 'buyer') {
                        setNotTypePermission(true)
                    } else {
                        setNotTypePermission(false)
                        getProfileByCreator(idOfUser).then((profile) => {
                            if (profile) {
                                getMyProfile(profile)
                                setOldProfile(true)
                            } else {
                                setOldProfile(false)
                            }
                        })
                    }
                    if (!user.membershipID) {
                        navigate('/membership')
                    } else {
                        checkUser(user.membershipID)
                    }
                }).catch((error) => {
                    console.error(error)
                    alert("something went wrong")
                })
            } else {
                console.log('user may be not signed in')
            }
            console.log('signed:', signedInUser)
        })
        checkType();
        const getMyProfile = (profile) => {
            setHeadline(profile.headline);
            setAboutMe(profile.aboutMe);
            setAboutService(profile.aboutService);
            setServiceSummary(profile.serviceSummary);
            setMainCategory(profile.mainCategory);
            setsubCategory(profile.SubCategory);
            setTopSkills(profile.topSkills);
            setHourPrice(profile.hourPrice);
        }
        const checkUser = (planId) => {
            getPlanById(planId).then((plan) => {
                const skillsAllowed = plan.skillsNumber
                setUserSkills(skillsAllowed)
                // console.log('plan skills number:', skillsAllowed)
            }).catch((error) => {
                console.error(error)
            })
        }

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
        hourPrice: Yup.number().min(10, 'minimum price is 10$'),
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
            const skillsArray = [...topSkills, TopSkills].slice(0, userSkills)
            setTopSkills(skillsArray)
        }
        if (TopSkills === 'reset') {
            setTopSkills([])
        }
        console.log(topSkills)
    };

    const handlePrice = (event) => {
        const price = event.target.value;
        setHourPrice(price)
    }

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
                setPortfolioName('')
                setPortfolioDescription('')
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
                console.log('validation errorrrrrs:', validationErrors)
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                    console.log('validation errrrr:', validationErrors)

                });
                setValidationErrors(validationErrors)
                console.log('validation erroooo:', validationErrors)

            } else {
                console.log('error occured:', error)
                alert('something went wrong')
            }
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setCheckInput(true);
        try {
            await validationSchema.validate(
                {
                    headline,
                    aboutMe,
                    aboutService,
                    serviceSummary,
                    mainCategory,
                    hourPrice
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
                topSkills,
                hourPrice,
            }
            console.log('formdata :', formData)
            const response = await postProfileRequest(formData)
            if (response.status === 200) {
                navigate('/userhome')
            } else {
                if (response.response.status === 401) {
                    alert('you need to sign in')
                    navigate('/')
                } else {
                    alert('somthing went wrong')
                }
                console.log(response)
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                console.log('validation errrrr:', validationErrors)
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                    console.log('validation errrrr:', validationErrors)
                });
                setValidationErrors(validationErrors);
                setCheckInput(true);

            } else {
                console.error(error)
                alert('Something went wrong')
            }
        }
    }

    const handleEdit = async (event) => {
        event.preventDefault();
        setCheckInput(true);
        try {
            await validationSchema.validate(
                {
                    headline,
                    aboutMe,
                    aboutService,
                    serviceSummary,
                    mainCategory,
                    hourPrice
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
                topSkills,
                hourPrice,
            }
            const response = await editProfileRequest(formData);
            if (response.status === 200) {
                navigate('/myprofile')
            } else {
                if (response.response.status === 401) {
                    alert('authentication error. make sure you still signed in')
                    navigate('/')
                } else {
                    alert('something went wrong')
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="profile-edit">
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="input-div headline">
                    <span>Freelancer Headline:</span>
                    <div className="handle-input">
                        <input value={headline} className="input" type="text" id="headlinetextarea" placeholder="your service headline. min=10, max=50" onChange={handleHeadline} maxLength={50} />
                        {validationErrors.headline && <span className="errors">{validationErrors.headline}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="input-div aboutme">
                    <span>About me:</span>
                    <div className="handle-input">
                        <textarea value={aboutMe} type="textarea" className="textarea" id="aboutmetextarea" placeholder="min=40, max=200" onChange={handleAboutMe} maxLength={200} />
                        {validationErrors.aboutMe && <span className="errors">{validationErrors.aboutMe}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="input-div myoffers">
                    <span>About my service:</span>
                    <div className="handle-input">
                        <textarea value={aboutService} type="textarea" className="textarea" id="aboutmyservicetextarea" placeholder="tell about you service. min=70, max=600" onChange={handleServiceInfo} maxLength={600} />
                        {validationErrors.aboutService && <span className="errors">{validationErrors.aboutService}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="input-div servicesummary">
                    <span>Summary about my service:</span>
                    <div className="handle-input">
                        <textarea value={serviceSummary} type="textarea" className="textarea" id="summaryaboutmyservicetextarea" placeholder="summary about your service to be shown in your card. min=30, max=100" onChange={handleServiceSummary} maxLength={100} />
                        {validationErrors.serviceSummary && <span className="errors">{validationErrors.serviceSummary}</span>}
                    </div>
                </div>
                <hr className="hr-break" />
                <div className="input-div maincategory">
                    <span>Select the service's category:</span>
                    <div className="handle-input">
                        <select value={mainCategory} className="select" id="maincategory" onChange={handleMainCategory}>
                            <option value='select'>Select</option>
                            {CategoryList.map((catego, idx) => (
                                <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                            ))}
                        </select>
                        {validationErrors.mainCategory && <span className="errors">{validationErrors.mainCategory}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="input-div subcategory">
                    <span>Select the service's Subcategory:</span>
                    <div className="handle-input">
                        <select value={subCategory} className="select" id="subcategory" onChange={handleSubCategory}>
                            <option value='select'>Select</option>
                            {findSubCateg && findSubCateg.subCategory.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))
                            }
                        </select>
                        {validationErrors.subCategory && <span className="errors">{validationErrors.subCategory}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="input-div skillsselect">
                    <span>Select your top skills: "you can select {userSkills}" </span>
                    <select className="select" id="skilll" onChange={handleTopSkills}>
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
                <hr className="hr" />
                <div className="input-div priceset">
                    <span id='hourprice'>Set your Hourly price</span>
                    <div className="handle-input">
                        <input value={hourPrice} className="input" type="number" min={10} max={500} id="setpriceinput" placeholder="min= 10$" onChange={handlePrice} />
                        {validationErrors.hourPrice && <span className="errors">{validationErrors.hourPrice}</span>}
                    </div>
                </div>
                <hr className="hr-break" />
                <div className="input-div portfolio">
                    <span className="portfolio-description-title"> (OPTIONAL / YOU CAN SKIP THIS PART)</span>
                    <span className="portfolio-description"> You can showcase your previous work here "Describe your project and attach an image for each text" </span>
                    <span className="portfolio-span">Project name:</span>
                    <div className="handle-input">
                        <input className="input" type="text" id="portfolioname" placeholder="min=5. max=30" onChange={handlePortfolioName} maxLength={30} />
                        {validationErrors.portfolioName && <span className="errors">{validationErrors.portfolioName}</span>}
                    </div>
                    <span className="portfolio-span">Project description:</span>
                    <div className="handle-input">
                        <textarea type="textarea" className="textarea" id="portfolioinput" placeholder="min=20. max=200" onChange={handlePortfolioDescription} maxLength={200} />
                        {validationErrors.portfolioDescription && <span className="errors">{validationErrors.portfolioDescription}</span>}
                    </div>
                    <div className="file">
                        <span className="portfolio-span">Project cover photo:</span>
                        <input type="file" id="attach" accept=".jpg, .png, .jpeg" />
                    </div>
                    {signedInUser === 'seller' && <div className="submit-portfolio"> <button className="submit-x" onClick={handlePortfolio}>Add the project to my portfolio profile</button> <span> you can have 3 projects</span></div>}
                    <span>Projects you already have in your portfolio: <Portfolio creator={creator} classPass='my-page' /></span>
                </div>
                <hr className="hr-break" />
                {signedInUser === 'seller' &&
                    <div className="handle-input">
                        {!oldProfile ? <button type="submit" className="submit-profile">Save & publish</button>
                            :
                            <button onClick={handleEdit} className="submit-profile">Save edits</button>
                        }
                        {checkInput && (
                            <span className="errors">Validation: Please Check your inputs and try the "Done button" again to complete your register</span>
                        )}
                    </div>}

                <span className="last-span">you can change other main info from the settings.</span>
            </form>
        </div >
    )
}
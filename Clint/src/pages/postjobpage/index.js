import React, { useEffect, useState } from "react";
import './PostJob.scss';
import { CategoryList } from "../../CategoryList";
import { getUserById, postJobRequest } from "../../api";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorge";
import jwt_decode from 'jwt-decode';
import * as Yup from 'yup'

export default function PostJob() {
    const [description, setJobDescription] = useState("");
    const [category, setJobCategory] = useState("");
    const [Skills, setSelectedSkill] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("fixed");
    const [salary, setPrice] = useState(0);
    const [currency, setCurrency] = useState("USdollar");
    const [vipPost, setVipPost] = useState(false);
    const [title, setJobtitle] = useState("");
    const [payByHour, setPayByHour] = useState(false);
    const [jobSubCateg, setJobSubCateg] = useState([]);
    const [shortDescription, setShortDescription] = useState("")
    const [wrongWindow, setWrongWindow] = useState(false);
    const [signedInUser, setSignedInUser] = useState()
    const [notSigned, setNotSigned] = useState(false)
    const [checkInput, setCheckInput] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        const checkType = (() => {
            const tokenType = getItem('token');
            if (tokenType) {
                const tokenT = jwt_decode(tokenType)
                const typeOfUser = tokenT.id;
                setNotSigned(false)
                getUserById(typeOfUser).then((user) => {
                    const type = user.userType
                    setSignedInUser(type);
                    console.log(type)
                    if (type === 'seller') {
                        setWrongWindow(false)
                        console.log("signed seller", type)
                    } else {
                        console.log("signed buyer", type)
                        setWrongWindow(true)
                    }
                }).catch((error) => {
                    console.error('error', error)
                })
            }
            else {
                console.log('else else');
                setWrongWindow(false)
                setNotSigned(true)
            }
        })
        checkType()
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(4, 'Title must be at least 4 characters')
            .max(30, 'Title must not exceed 30 characters'),
        description: Yup.string().min(100, 'Description must be atleast 100 character')
            .max(700, 'Description must not exceed 700 character'),
        shortDescription: Yup.string().min(15, 'Job summary must be at least 15 character')
            .max(90, 'Job summary must not exceed 90 characters'),
        category: Yup.string()
            .notOneOf(["", "select"], 'Please select category'),
        salary: Yup.number().min(30, 'min value is 30$')
            .max(50000, 'max value is 50,000 $')
    })
    const navigate = useNavigate();

    const handleJobTitle = (event) => {
        const jobtitle = event.target.value;
        setJobtitle(jobtitle);
        if (validationErrors.title) {
            setValidationErrors((prevError) => ({
                ...prevError,
                title: ""
            }))
        }
    }

    const handleDescription = (event) => {
        const dscrption = event.target.value
        setJobDescription(dscrption);
        if (validationErrors.description) {
            setValidationErrors((prevError) => ({
                ...prevError,
                description: ''
            }))
        }
    }

    const handleShortDescription = (event) => {
        const summary = event.target.value
        setShortDescription(summary)
        if (validationErrors.shortDescription) {
            setValidationErrors((prevError) => ({
                ...prevError,
                shortDescription: ''
            }))
        }
    }

    const handleJobCategory = (event) => {
        setJobCategory(event.target.value);
    }

    const handleJobSubCategory = (event) => {
        setJobSubCateg(event.target.value)
    }

    const handleSkillList = (event) => {
        const skillSelected = (event.target.value)
        if (skillSelected !== '' && !Skills.includes(skillSelected)) {
            const skillArray = [...Skills, skillSelected].slice(0, 3)
            setSelectedSkill(skillArray)
        }
        if (skillSelected === 'reset') {
            setSelectedSkill([])
        }
        console.log(Skills)
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const maxSize = 20971520; // 20MB

        if (file && file.size > maxSize) {
            alert("Maximum file size exceeded. Please choose a smaller file.");
            event.target.value = null;
        } else {
            alert("file uploaded");
        }
    };

    const handlePaymentMethod = (event) => {
        const payMethod = event.target.value;
        setPaymentMethod(payMethod);
        if (payMethod === 'ByHour') {
            setPayByHour(true);
        } else {
            setPayByHour(false)
        }
    };

    const handlePrice = (event) => {
        const price = event.target.value
        setPrice(price);
        if (validationErrors.salary) {
            setValidationErrors((prevError) => (
                {
                    ...prevError,
                    salary: ''
                }
            ))
        }
    };

    const handleCurrency = (event) => {
        setCurrency(event.target.value)
    };

    const handlePostingPlan = () => {
        setVipPost(!vipPost);
    };
    const CloseWrongWindow = () => {
        navigate('/userhome');
        setWrongWindow(false)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setCheckInput(false)
        try {
            await validationSchema.validate(
                { title, description, shortDescription, category, salary },
                { abortEarly: false }
            );
            const data = {
                title,
                description,
                shortDescription,
                salary,
                Skills,
                payByHour,
                paymentMethod,
                category,
                currency,
                jobSubCateg
            }
            const response = await postJobRequest(data)

            if (response.status === 200) {
                console.log(response)
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
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setValidationErrors(validationErrors)
                setCheckInput(true)
            } else {
                console.log(error)
                alert('Something went wrong')
            }
        }
    }

    const findSubCateg = CategoryList.find((item) =>
        item.categoryname === category
    )
    return (
        <>
            <form onSubmit={handleSubmit} className="post-job">
                <span className="title">Post Your Project</span>
                <div className="job-title">
                    <span>Job Title:</span>
                    <div className="handle-input">
                        <input type="text" id="titlejob" placeholder="job title...(max: 30 letter)" maxLength={30} onChange={handleJobTitle} required />
                        {validationErrors.title && <span className="errors">{validationErrors.title}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="job-title">
                    <label htmlFor="description">Job Description</label>
                    <div className="handle-input">
                        <textarea className="description-area" placeholder="description . . .(max: 700 letter)" maxLength={700} onChange={handleDescription} required />
                        {validationErrors.description && <span className="errors">{validationErrors.description}</span>}
                    </div>
                </div>
                <hr className="hr" />
                <div className="job-title">
                    <label htmlFor="shortdescription">Short Job Description</label>
                    <div className="handle-input">
                        <textarea className="description-area" placeholder="short description . . .(max: 90 letter)" maxLength={90} onChange={handleShortDescription} required />
                        {validationErrors.shortDescription && <span className="errors">{validationErrors.shortDescription}</span>}
                    </div>
                </div>
                <hr className="hr-break" />
                <div className="job-title">
                    <span>Select the related category to your project:</span>
                    <div className="handle-input">
                        <select className="select" id="categlist" onChange={handleJobCategory}>
                            <option value='select'>Select</option>
                            {CategoryList.map((catego, idx) => (
                                <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                            ))}
                        </select>
                        {validationErrors.category && <span className="errors">{validationErrors.category}</span>}
                    </div>

                </div>
                <hr className="hr" />
                <div className="job-title">
                    <span>Select the related Sub category:</span>
                    <select className="select" id="subcateglist" onChange={handleJobSubCategory}>
                        <option value='select'>Select</option>
                        {findSubCateg && findSubCateg.subCategory.map((item, idx) => (
                            <option key={idx} value={item}>{item}</option>
                        ))
                        }
                    </select>
                </div>
                <hr className="hr" />
                <div className="job-title">
                    <span>Select the related skills: </span>
                    <select className="select" id="skill" onChange={handleSkillList}>
                        <option value="">No specifec Skills</option>
                        <option value="reset">Reset</option>
                        <option value='optionOne'>Option 1</option>
                        <option value='optionTwo'>Option 2</option>
                        <option value='optionThree'>Option 3</option>
                        <option value='optionFour'>Option 4</option>
                    </select>
                    <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'rgb(96, 71, 123)' }}>You selected: {Skills.join(', ')}</p>
                </div>
                <hr className="hr" />
                <div className="job-title">
                    <label htmlFor="attach">Attach File</label>
                    <input type="file" id="attach" accept=".jpg, .png, .pdf" onChange={handleFileUpload} />
                </div>
                <hr className="hr-break" />

                <div className="job-title">
                    <div className="payment-method">
                        <span>Choose the payment method:</span>
                        <select className="select" id="method" onChange={handlePaymentMethod} defaultValue="fixed">
                            <option value='fixed' >Fixed Price</option>
                            <option value='ByHour' >Pay by hour</option>
                        </select>
                    </div>
                    <hr className="hr" />
                    <div className="payment-method">
                        {payByHour ?
                            (
                                <>
                                    <label htmlFor="price">first milestone Payment {`(min: 30$`}</label>
                                    <div className="price-input">
                                        <div className="handle-input">
                                            <input type="number" id="price" min='30' onChange={handlePrice} required />
                                            {validationErrors.salary && <span className="errors">{validationErrors.salary}</span>}
                                        </div>
                                        <select id="currency" onChange={handleCurrency}>
                                            <option value="USdollar">$</option>
                                            <option value="JOD">JOD</option>
                                        </select>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <label htmlFor="price">Project Price {`(min: 30$`}</label>
                                    <div className="price-input">
                                        <div className="handle-input">
                                            <input type="number" id="price" min='30' max='50000' onChange={handlePrice} />
                                            {validationErrors.salary && <span className="errors">{validationErrors.salary}</span>}
                                        </div>
                                        <select id="currency" onChange={handleCurrency}>
                                            <option value="USdollar">$</option>
                                            <option value="JOD">JOD</option>
                                        </select>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <hr className="hr" />
                    <div className="post-type">
                        <div className="type">
                            <span>Yor job post now is on the Free Standard posting: your job post will be live and you'll recieve proposals </span>
                            <label >Check the Box if you want your jop post to be on the VIP posting: we'll connect you with one of our experts to help you.</label>
                            <div className="vip">
                                <span>Select the VIP posting plan : 10.99$</span>
                                <input type="checkbox" id="checkbox" checked={vipPost}
                                    onChange={handlePostingPlan} />
                            </div>
                        </div>
                        <div className="handle-input ">
                            {signedInUser === 'buyer' || wrongWindow ?
                                <>
                                    <button onClick={(e) => handleSubmit(e)} className="submit" type="submit">Post The Job</button>
                                    {checkInput && (
                                        <span className="errors">Validation: Please Check our inputs and try the "Done button" again to complete your register</span>
                                    )}
                                </>
                                :
                                (!notSigned ?
                                    <><span className="submit-error">
                                        Only users with business type "Buyer / Company" can post a job. You can check or change your business type from settings
                                    </span>
                                        <button className="not-submit" onClick={() => navigate('/userhome')}> Ok</button></>
                                    :
                                    <><span className="submit-error">
                                        please sign-in or register. Only registered users can post a job.
                                    </span>
                                        <button className="not-submit" onClick={() => navigate('/')}> Ok</button></>
                                )}
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}
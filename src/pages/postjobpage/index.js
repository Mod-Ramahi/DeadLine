import React, { useState } from "react";
import './PostJob.scss';
import { CategoryList } from "../../CategoryList";

export default function PostJob() {
    const [jobDescription, setJobDescription] = useState("");
    const [jobCategory, setJobCategory] = useState("");
    const [selectedSkill, setSelectedSkill] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState("USdollar");
    const [vipPost, setVipPost] = useState(false);
    const [jobTitle, setJobtitle] = useState("");
    const [payByHour, setPayByHour] = useState(false)

    const handleJobTitle = (event) => {
        setJobtitle(event.target.value);
    }

    const handleDescription = (event) => {
        setJobDescription(event.target.value);
    }

    const handleJobCategory = (event) => {
        setJobCategory(event.target.value);
    }

    const handleSkillList = (event) => {
        const skillSelected = (event.target.value)
        if (skillSelected !== '' && !selectedSkill.includes(skillSelected)) {
            const skillArray = [...selectedSkill, skillSelected].slice(0, 3)
            setSelectedSkill(skillArray)
        }
        if (skillSelected === 'reset') {
            setSelectedSkill([])
        }
        console.log(selectedSkill)
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
        setPaymentMethod(event.target.value);
        if (payMethod === 'ByHour') {
            setPayByHour(!payByHour);
        }
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleCurrency = (event) => {
        setCurrency(event.target.value)
    };

    const handlePostingPlan = () => {
        setVipPost(!vipPost);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="post-job">
            <span className="title">Post Your Project</span>
            <div className="job-title color-a">
                <label htmlFor="titlejob">Job Title:</label>
                <input type="text" id="titlejob" placeholder="job title...(max: 30 letter)" maxLength={30} onChange={handleJobTitle}></input>
            </div>
            <div className="job-description job-title color-b">
                <label htmlFor="description">Job Description</label>
                <textarea className="description-area" placeholder="description . . .(max: 700 letter)" maxLength={700} onChange={handleDescription}></textarea>
            </div>
            <div className="job-description job-title color-b">
                <label htmlFor="description">Short Job Description</label>
                <textarea className="description-area" placeholder="short description . . .(max: 90 letter)" maxLength={90} onChange={handleDescription}></textarea>
            </div>
            <hr />
            <div className="select-category job-title color-a">
                <span>Select the related category to your project:</span>
                <select id="categlist" onChange={handleJobCategory}>
                    <option value='select'>Select</option>
                    {CategoryList.map((catego, idx) => (
                        <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                    ))}
                </select>
            </div>
            <div className="skills job-title color-b">
                <span>Select the related skills: </span>
                <select id="skill" onChange={handleSkillList}>
                    <option value="">No specifec Skills</option>
                    <option value="reset">Reset</option>
                    <option value='optionOne'>Option 1</option>
                    <option value='optionTwo'>Option 2</option>
                    <option value='optionThree'>Option 3</option>
                    <option value='optionFour'>Option 4</option>
                </select>
                <p>You selected: {selectedSkill.join(', ')}</p>
            </div>
            <div className="file-attach job-title color-b">
                <label htmlFor="attach">Attach File</label>
                <input type="file" id="attach" accept=".jpg, .png, .pdf" onChange={handleFileUpload}></input>
            </div>
            <hr />
            <div className="pay-method job-title color-a">
                <span>Choose the payment method:</span>
                <select id="method" onChange={handlePaymentMethod}>
                    <option value='fixed'>Fixed Price</option>
                    <option value='ByHour' >Pay by hour</option>
                </select>
            </div>
            <div className="budget job-title">
                <div className="budget-options job-title color-b">
                    {payByHour ?
                        (
                            <>
                                <label htmlFor="price">first milestone Payment {`(min: 30$`}</label>
                                <div className="price-input">
                                    <input type="number" id="price" min='30' max='1500' onChange={handlePrice}></input>
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
                                    <input type="number" id="price" onChange={handlePrice}></input>
                                    <select id="currency" onChange={handleCurrency}>
                                        <option value="USdollar">$</option>
                                        <option value="JOD">JOD</option>
                                    </select>
                                </div>
                            </>
                        )
                    }
                </div>


                <div className="post_type">
                    <div className="type">
                        <span>Yor job post now is on the Free Standard posting: your job post will be live and you'll recieve proposals </span>
                        <label >Check the Box if you want your jop post to be on the VIP posting: we'll connect you with one of our experts to help you.</label>
                        <div className="vip"> <span>Select the VIP posting plan : 10.99$</span> <input type="checkbox" id="checkbox" checked={vipPost}
                            onChange={handlePostingPlan}></input></div>
                    </div>
                    <button className="submit" type="submit">Post The Job</button>
                </div>
            </div>
        </form>

    )
}
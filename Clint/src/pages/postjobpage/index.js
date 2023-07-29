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
        const selectedSkills = Array.from(event.target.selectedOptions, (option) => option.value);
        if (selectedSkills.length === 0 || selectedSkills.includes("")) {
            setSelectedSkill([]);
        } else {
            setSelectedSkill(selectedSkills);
        }
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
        setPaymentMethod(event.target.value);
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
    <form onSubmit={handleSubmit} className="post_job">
        <span className="title">post Your Project</span>
        <div className="job_title">
            <label htmlFor="titlejob">Job Title</label>
            <input type="text" id="titlejob" onChange={handleJobTitle}></input>
        </div>
        <div className="job_description">
            <label htmlFor="description">Job Description</label>
            <textarea className="description_area" placeholder="description . . ." maxLength={500} onChange={handleDescription}></textarea>
        </div>
        <div className="select_category">
            <span>Select the related category to your project:</span>
            <select id="categlist" onChange={handleJobCategory}>
                <option value='select'>Select</option>
                {CategoryList.map((catego, idx) => (
                    <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                ))}
            </select>
        </div>
        <div className="skills">
            <span>Select the related skills:</span>
            <select id="skill" onChange={handleSkillList}>
                <option value="">No specifec Skills</option>
                <option value='option_one'>Option 1</option>
                <option value='option_two'>Option 2</option>
                <option value='option_three'>Option 3</option>
            </select>
            <p>You selected: {selectedSkill.join(', ')}</p>
        </div>
        <div className="file_attach">
            <label htmlFor="attach">Attach File</label>
            <input type="file" id="attach" accept=".jpg, .png, .pdf" onChange={handleFileUpload}></input>
        </div>
        <div className="pay_method">
            <span>Choose the payment method:</span>
            <select id="method" onChange={handlePaymentMethod}>
                <option value='fixed'>Fixed Price</option>
                <option value='By_Hour'>Pay by hour</option>
            </select>
        </div>
        <div className="budget">
            <label htmlFor="price">Project Price</label>
            <div className="price_input">
                <input type="number" id="price" onChange={handlePrice}></input>
                <select id="currency" onChange={handleCurrency}>
                    <option value="USdollar">$</option>
                    <option value="JOD">JOD</option>
                </select>
            </div>
            <div className="post_type">
                <div className="type">
                    <span>Yor job post now is on the Free Standard posting: your job post will be live and you'll recieve proposals </span>
                    <label >Check the Box if you want your jop post to be on the VIP posting: we'll connect you with one of our experts to help you.</label>
                    <div className="vip"> <span>Select the VIP posting plan : 10.99$</span> <input type="checkbox" id="checkbox"  checked={vipPost}
                            onChange={handlePostingPlan}></input></div>
                </div>
                <button className="submit" type="submit">Post The Job</button>
            </div>
        </div>
    </form>

)
}
import React, { useState } from "react";
import "./BidOnJob.scss"
import { postProposalRequest } from "../../api";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function BidOnJob() {
    const { id } = useParams()
    const [validationErrors, setValidationErrors] = useState({})
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [attached, setAttached] = useState()
    const [price, setPrice] = useState()
    const [time, setTime] = useState()
    const [milestone, setMilestone] = useState()
    const [plan, setPlan] = useState("public");

    const validationSchema = Yup.object().shape({
        summary: Yup.string().min(20, 'Proposal summary must be atleast 20 characters')
            .max(120, 'Proposal summary must not exceed 120 characters'),
        description: Yup.string().min(50, 'Proposal description mus be atleast 50 characters')
            .max(500, 'proposal must not exceed 500 charaters'),
        attached: Yup.mixed()
            .test('fileType', 'Invalid file format', (value) => {
                if (!value) return true;
                const supportedFomats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                return supportedFomats.includes(value.type);
            })
            .test('fileSize', 'File size is more than 3MB', (value) => {
                if (!value) return true;
                const maxSizeInBytes = 3 * 1024 * 1024;
                return value.size <= maxSizeInBytes;
            }),
        price: Yup.number().min(20, '20$ is the minimum price value ')
            .max(50000, 'price must not exceed 50000'),

    })
    const navigate = useNavigate()

    const handleSummary = (event) => {
        const summary = event.target.value;
        setSummary(summary);
        if (validationErrors.summary) {
            setValidationErrors((prevError) => ({
                ...prevError,
                summary: ''
            }))
        }
    }
    const handleDescription = (event) => {
        const description = event.target.value;
        setDescription(description)
        if (validationErrors.description) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                description: ''
            }))
        }
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setAttached(file)
    };
    const handlePrice = (event) => {
        const price = event.target.value;
        setPrice(price)
    }
    const handleTime = (event) => {
        const time = event.target.value;
        setTime(time);
    }
    const handleMilestone = (event) => {
        const milestone = event.target.value;
        setMilestone(milestone)
    }
    const handlePlan = (event) => {
        const plan = event.target.value;
        setPlan(plan)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate(
                { summary, description, price },
                { abortEarly: false }
            );
            console.log('validation test')
            // const data = {
            //     summary, description, price, time, milestone, plan
            // }
            // const response = await postProposalRequest(data)
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message
                });
                setValidationErrors(validationErrors)
            } else {
                console.error(error)
                alert('something wen wrong')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bid">
            <span className="title">Bid On Job</span>
            <div className="text-description">
                <span>Proposal summary:</span>
                <div className="handle-input">
                    <textarea className="description-area" maxLength={120} placeholder="Short discription. . .(characters: min=20 max=120)" onChange={handleSummary} />
                    {validationErrors.summary && <span className="error">{validationErrors.summary}</span>}
                </div>
            </div>
            <hr className="hr" />
            <div className="text-description">
                <span>Proposal Description</span>
                <div className="handle-input">
                    <textarea className="description-area" maxLength={500} placeholder="description . . .(characters: min=50 max=500)" onChange={handleDescription} />
                    {validationErrors.description && <span className="error">{validationErrors.description}</span>}
                </div>
            </div>
            <hr className="hr" />
            <div className="text-description">
                <span>File Attachment</span>
                <div className="handle-input">
                    <input type="file" id="attach" accept=".jpg, .png, .pdf" onChange={handleFileUpload} />

                    {validationErrors.attached && <span className="error">{validationErrors.attached}</span>}
                </div>
            </div>
            <hr className="hr-break" />
            <div className="text-description div-price">
                <span>Bid Price $</span>
                <div className="handle-input">
                    <input type="number" id="price" min={20} max={50000} placeholder="min= 20$" onChange={handlePrice} />
                    {validationErrors.price && <span className="error">{validationErrors.price}</span>}
                </div>
            </div>
            <hr className="hr" />
            <div className="text-description">
                <span> Expected delivery Time in days </span>
                <input type="number" className="input" id="time" placeholder="ex: 30 days" onChange={handleTime} />
            </div>
            <hr className="hr" />
            <div className="text-description">
                <span>Add milestone or price and delivery time details if needed</span>
                <input type="text" className="input" id="milestone" placeholder="ex: task, price, time and more details if needed" onChange={handleMilestone} />
            </div>
            <hr className="hr" />
            <div className="text-description">
                <span> Choose plan</span>
                <select className="select" id="proposalplan" onChange={handlePlan}>
                    <option value="public">Basic/Public</option>
                    <option value="private">private</option>
                </select>
            </div>
            <div className="save">
                <div className="handle-input">
                    <button className="submit" type="submit">Submit</button>
                    {validationErrors && (<ul>
                        {Object.keys(validationErrors).map((errorName, idx) => (
                            <li key={idx} className="errors">
                                {validationErrors[errorName]}
                            </li>
                        ))}</ul>
                    )}
                </div>
            </div>
        </form>
    )
}
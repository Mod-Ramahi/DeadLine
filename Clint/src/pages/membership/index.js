import React, { useEffect, useState } from "react";
import "./Membership.scss";
import MembershipImg from "./Mmbrshp.png"
import UserDashboard from "../../components/userDashboard/UserDashboard";
import { getPlans } from "../../api";
import PlanCard from "../../components/planCard/PlanCard";

export default function Membership() {
    const [monthlyClicked, setMonthlyClicked] = useState(true)
    const [annualClicked, setAnnualClicked] = useState(false)
    const [monthPlans, setMonthPlans] = useState([])
    const [yearPlans, setYearPlans] = useState([])

    useEffect(() => {
        const getplansApi = async () => {
            try {
                const response = await getPlans('year')
                if (response.status === 200) {
                    console.log('Monthly plans are:', response.data)
                    setMonthPlans(response.data)
                } else {
                    console.log('cant get monthly plans', response.status)
                }
            } catch (error) {
                console.error('error get monthly plans', error)
            }
        }
        getplansApi()
        const getYearPlans = async () => {
            try {
                const response = await getPlans('month')
                if (response.status === 200) {
                    console.log('Annual plans are:', response.data)
                    setYearPlans(response.data)
                }
                else {
                    console.log('cant get annual plans')
                }
            } catch (error) {
                console.error('error get annual plans', error)
            }
        }
        getYearPlans()
    }, [])

    const handleMonthlyCost = () => {
        setMonthlyClicked(true);
        setAnnualClicked(false);
    }
    const handleAnnualCost = () => {
        setAnnualClicked(true)
        setMonthlyClicked(false)
    }

    const renderPlans = monthPlans.map((p) => (
        <PlanCard p={p} duration='Month' key={p._id}/>
    ))
    const renderYearPlans = yearPlans.map((p) => (
        <PlanCard p={p} duration='Year' key={p._id}/>
    ))
    return (
        <>
            {/* <UserDashboard /> */}

            <div className="membership-head" >
                <div className="inside-txt">
                    <span className="head-span">Try a DEADLINE Membership</span>
                    <span className="txt-span">Designed to maximise your freelancer success and earnings! Save up to 20% on annual plans. Change plans anytime, conditions apply see FAQ.</span>
                </div>
            </div>
            {/* <div style={{ width: '100%', height: '15rem', backgroundColor: 'red' }}>
                {renderPlans}
            </div> */}
            <div className="plan-options">
                <button className={`monthly ${monthlyClicked ? "active" : ""}`} onClick={handleMonthlyCost}>Monthly plans</button>
                <button className={`yearly ${annualClicked ? "active" : ""}`} onClick={handleAnnualCost}>Annual plans</button>
            </div>
            <div className="plans-container-user">
                {monthlyClicked ? (renderPlans) : (renderYearPlans)}
            </div>
            <hr className="hr-plans" />
            <div className="faq-section">
                <span className="faqs">FAQs</span>
                <div className="q">
                    <span>Why should I upgrade?</span>
                    <div className="a">
                        <span>You get more earning opportunities and better savings as a Basic, Plus, Professional or Premier member. Bid on more projects,
                            add more skills, save on project listing upgrades and unlock special rewards!
                        </span>
                    </div>
                </div>
                <div className="q">
                    <span>Can I change plans?</span>
                    <div className="a">
                        <span>Of course! Upgrade your membership plan at anytime to get additional benefits immediately. Alternatively,
                            you can downgrade your membership and continue to receive the benefits of your current membership until it expires,
                            before switching to the lower membership tier.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
import React, { useState } from "react";
import "./Membership.scss";
import MembershipImg from "./Mmbrshp.png"
import UserDashboard from "../../components/userDashboard/UserDashboard";

export default function Membership() {
    const [monthlyClicked, setMonthlyClicked] = useState(true)
    const [annualClicked, setAnnualClicked] = useState(false)

    const handleMonthlyCost = () => {
        setMonthlyClicked(true);
        setAnnualClicked(false);
    }
    const handleAnnualCost = () => {
        setAnnualClicked(true)
        setMonthlyClicked(false)
    }
    return (
        <>
            <UserDashboard />

            <div className="membership-head" >
                <div className="inside-txt">
                    <span className="head-span">Try a DEADLINE Membership</span>
                    <span className="txt-span">Designed to maximise your freelancer success and earnings! Save up to 20% on annual plans. Change plans anytime, conditions apply see FAQ.</span>
                </div>
            </div>
            <div className="plan-options">
                <button className={`monthly ${monthlyClicked ? "active" : ""}`} onClick={handleMonthlyCost}>Monthly plans</button>
                <button className={`yearly ${annualClicked ? "active" : ""}`} onClick={handleAnnualCost}>Annual plans</button>
            </div>
            <div className="plans-container">
                <div className="plan">
                    <div className="plan-box">
                        <div className="plan-name">
                            <span>Trial</span>
                        </div>
                        <div className="price">
                            <span>Free</span>
                            <span className="per">/one time</span>
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>* 4 bids</p>
                            <p>* 5 skills</p>
                            <p>* 3 followings</p>
                        </div>
                    </div>
                </div>
                <div className="plan">
                    <div className="plan-box">
                        <div className="plan-name">
                            <span>Basic</span>
                        </div>
                        <div className="price">
                            {monthlyClicked ? (
                                <>
                                    <span>19.99$</span>
                                    <span className="per">/Month</span>
                                </>
                            ) : (
                                <>
                                    <span>189.99$</span>
                                    <span className="per">/Year</span>
                                </>
                            )}
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>* 20 bids</p>
                            <p>* 10 skills</p>
                            <p>* 2 private bids</p>
                            <p>* 7 followings</p>
                        </div>
                    </div>
                </div>
                <div className="plan">
                    <div className="plan-box">
                        <div className="plan-name">
                            <span>Plus</span>
                        </div>
                        <div className="price">
                        {monthlyClicked ? (
                                <>
                                    <span>27.99$</span>
                                    <span className="per">/Month</span>
                                </>
                            ) : (
                                <>
                                    <span>279.99$</span>
                                    <span className="per">/Year</span>
                                </>
                            )}
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>* 30 bids</p>
                            <p>* 15 skills</p>
                            <p>* 5 private bids</p>
                            <p>* 15 followings</p>
                            <p>* Verified professional</p>
                        </div>
                    </div>
                </div>
                <div className="plan">
                    <div className="plan-box">
                        <div className="plan-name">
                            <span>Premier</span>
                        </div>
                        <div className="price">
                        {monthlyClicked ? (
                                <>
                                    <span>39.99$</span>
                                    <span className="per">/Month</span>
                                </>
                            ) : (
                                <>
                                    <span>389.99$</span>
                                    <span className="per">/Year</span>
                                </>
                            )}
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>* 60 bids</p>
                            <p>* 20 skills</p>
                            <p>* unlimeted private bids</p>
                            <p>* 50 followings</p>
                            <p>* Verified Professional</p>
                            <p>* Show your profile as a recommended freelancer</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
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
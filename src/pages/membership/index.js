import React from "react";
import "./Membership.scss";
import MembershipImg from "./Mmbrshp.png"
import UserDashboard from "../../components/userDashboard/UserDashboard";

export default function Membership() {
    return (
        <>
            <UserDashboard />

            <div className="memberhead" >
                <div className="insidetxt">
                    <span className="headspan">Try a DEADLINE Membership</span>
                    <span className="txtspan">Designed to maximise your freelancer success and earnings! Save up to 20% on annual plans. Change plans anytime, conditions apply see FAQ.</span>
                </div>
            </div>
            <div className="plan_options">
                <button className="monthly">Monthly plans</button>
                <button className="yearly">Annual plans</button>
            </div>
            <div className="plans_container">
                <div className="plan">
                    <div className="plan_box">
                        <div className="planName">
                            <span>Basic</span>
                        </div>
                        <div className="price">
                            <span>14.99$</span>
                            <span className="per">/month</span>
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>50 bids</p>
                            <p>10 skills</p>
                            <p>5 private bids</p>
                            <p>5 followings</p>
                        </div>
                    </div>
                </div>
                <div className="plan">
                    <div className="plan_box">
                        <div className="planName">
                            <span>Plus</span>
                        </div>
                        <div className="price">
                            <span>49.99$/month</span>
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>50 bids</p>
                            <p>10 skills</p>
                            <p>5 private bids</p>
                            <p>5 followings</p>
                        </div>
                    </div>
                </div>
                <div className="plan">
                    <div className="plan_box">
                        <div className="planName">
                            <span>Premier</span>
                        </div>
                        <div className="price">
                            <span>100$/month</span>
                        </div>
                        <div className="subscribe">
                            <button>Subscribe</button>
                        </div>
                        <div className="features">
                            <p>50 bids</p>
                            <p>10 skills</p>
                            <p>5 private bids</p>
                            <p>5 followings</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="faq_section">
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
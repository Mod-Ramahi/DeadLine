import React from "react";
import howWorkHead from "./howWorkHead.png"
import "./HowItWorks.scss"
import HowWork1 from "./HowWork1.png";
import HowWork2 from "./HowWork2.png";
import HowWork3 from "./HowWork3.png";

export default function HowItWorks() {
    const HowWorkIcon = [
        { icon: HowWork3, title: "Any size project", txt1: "get any job done.", txt2: "Form small one-off tasks to large,", txt3: "multi-stage projects" },
        { icon: HowWork2, title: "Flexible payment terms", txt1: "pay your freelancers a fixed.", txt2: "price or by the hour. All secured by", txt3: "the Milestone Payments system." },
        { icon: HowWork1, title: "Diverse talent", txt1: "Choose from expert", txt2: "freelancers in over 1800 skill sets,", txt3: "from all around the globe" }
    ];
    return (
        <div className="howitworks">
            <div className="howworkhead" style={{ backgroundImage: `url(${howWorkHead})` }}>
                <div className="howworktitle">
                    <span className="titlespan">How Can Freekancer help your business?</span>
                    <p className="titlep">THE POSIBILITIES ARE ENDLESS. WE HAVE EXPERT FREELANCERS WHO WORK IN ECERY TECHNICAL, PROFESSIONAL, AND CREATIVE FIELD IMAGIMABLE</p>
                </div>
                <div className="howworkbtns">
                    <button>Find a Job</button>
                    <button>Hire Freelancer</button>
                </div>
            </div>
            <div className="howworkcontent">
                <div className="howworktxt">
                    <span className="txtspan">Choose from endless possibilities</span>
                    <p className="txtp">Get anything done, exactly how you want it. Turn that spark of an idea into reality</p>
                </div>
                <div className="howworkicon">
                    <div className="mapicons">
                        {HowWorkIcon.map((icon, idx) => (
                            <div className="iconmap" key={idx}>
                                <img alt="icon" src={icon.icon} />
                                <span className="spantitle">{icon.title}</span>
                                <span className="txt1span">{icon.txt1}</span>
                                <span className="txt1span">{icon.txt2}</span>
                                <span className="txt1span">{icon.txt3}</span>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
                <div className="howdoesitwork">
                    <span className="howdoes">How does it work?</span>
                    <span className="span1">1. Post a project or contest</span>
                    <p className="scndp">Simply post a project or contest for what you need done and receive competitive
                        bids from freelancers within minutes.</p>
                    <span className="span1">2. Choose the perfect freelancer</span>
                    <p className="scndp">Browse freelancer profiles. Chat in real-time. Compare proposals and select the best one.
                        Award your project and your freelancer starts work.</p>
                    <span className="span1">3. Pay when you're satisfied</span>
                    <p className="scndp">Pay securely using our Milestone Payment system. Release payments when it
                        has been completed and you're 100% satisfied.</p>
                </div>
            </div>
        </div>
    )
}
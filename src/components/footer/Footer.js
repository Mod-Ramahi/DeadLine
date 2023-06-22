import React from "react";
import { CategoryList } from "../../CategoryList";
import "./Footer.scss";
import FooterLogo from "./FooterLogo.png"
import send from"./send.png";

export default function Footer() {
    const FooterContent= () => {
        return (
            CategoryList.slice(0, 3).map((catego, idx) => (
                <div key={idx} className="footercontent">
                    <div className="footercatego">
                        <div className="categhead">
                        <span>
                            {catego.categoryname}
                        </span>
                        </div>
                        {catego.subCategory.map((subcatego, index) => (
                            <p className="footersubcatego" key={index}>
                                {subcatego}
                            </p>
                        ))}
                    </div>
                    <div><hr/></div>
                </div>
            ))
        )
    }
    return(
        <div className="footercontainer">
            <div className="footerlogo">
                <img alt="flogo" src={FooterLogo}/>
            </div>
            <div className="flex">
                <FooterContent/>
                <div className="about">
                    <span>About Us</span>
                    <span>Contact Us</span>
                    <div className="messagebox">
                        <span>Send your message</span>
                        <div className="msgbox">
                        <textarea className="txtarea" placeholder="message . . ."></textarea>
                        <button className="sendbtn"><img alt="sndicon" src={send}/></button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}
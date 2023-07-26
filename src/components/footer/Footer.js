import React, { useEffect, useState } from "react";
import { CategoryList } from "../../CategoryList";
import "./Footer.scss";
import FooterLogo from "./FooterLogo.png"
import send from "./send.png";
import { Link } from "react-router-dom";

export default function Footer() {
    const [mobileSize, setMobileSize] = useState(false);

    useEffect(() => {
        const SizeScreen = () => {
            setMobileSize(window.innerWidth <= 1050);
        };

        SizeScreen();
        window.addEventListener('resize', SizeScreen);

        return () => {
            window.removeEventListener('resize', SizeScreen)
        };
    }, []);
    const FooterContent = () => {
        return (
            CategoryList.slice(0, 3).map((catego, idx) => (
                <div key={idx} className="footercontent">
                    <div className="footercatego">
                        <div className="categhead">
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={{ pathname: '/resultssearch', search: `?category=${catego.categoryname}` }}>
                                <span>
                                    {catego.categoryname}
                                </span>
                            </Link>
                        </div>
                        {catego.subCategory.map((subcatego, index) => (
                            <Link key={index} style={{ color: 'inherit', textDecoration: 'none' }} to={{ pathname: '/resultssearch', search: `?category=${catego.categoryname}&subCategory=${subcatego}` }}>
                                <p className="footersubcatego" >
                                    {subcatego}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <div><hr /></div>
                </div>
            ))
        )
    }
    return (
        <>
            {mobileSize ?
                (<div className="footercontainer">
                    <div className="footerlogo2">
                        <img alt="flogo" src={FooterLogo} />
                    </div>
                    <hr className="hr2" />
                    <div className="mobile_category">
                        {CategoryList.map((category, idx) => (
                            <Link key={idx} style={{ textDecoration: 'none', color: 'inherit' }} to="/categories">
                                <span>{category.categoryname}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="about2">
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/aboutus'><span>About Us</span></Link>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/aboutus'><span>help</span></Link>
                    </div>

                </div>)
                :
                (<div className="footercontainer">
                    <div className="footerlogo">
                        <img alt="flogo" src={FooterLogo} />
                    </div>
                    <div className="flex">
                        <FooterContent />
                        <div className="about">
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/aboutus'}>
                                <span>About Us</span>
                            </Link>
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/help'}>
                                <span>Contact Us</span>
                            </Link>
                            <div className="messagebox">
                                <span>Send your message</span>
                                <div className="msgbox">
                                    <textarea className="txtarea" placeholder="message . . ."></textarea>
                                    <button className="sendbtn"><img alt="sndicon" src={send} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    )
}
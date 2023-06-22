import React, { useEffect, useState, useRef } from 'react';
import './Navbar.scss';

import LogoImg from './Logoimg.png';
import DropMenu from './DropMenu.png';
import DownMenu from './Downmenu.png';
import UserIcon from './Icn1.png';
import MsgIcon from './Icn4.png';
import NotificationIcon from './Icn3.png';
import MngmtnCaseIcon from './Icn2.png';

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import { CategoryList } from '../../CategoryList';
import SearchBar from '../searchbar/SearchBar';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolledDown, setScrolledDown] = useState(false);
    const { pathname } = useLocation();
    const [categBarOpen, setCategBarOpen] = useState({});
    const [userOpen, setUserOpen] = useState(false);
    const [mngrCaseOpen, setMngrCaseOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {

        const screenSize = () => {
            setIsMobile(window.innerWidth <= 595);
        };

        screenSize();
        window.addEventListener('resize', screenSize);

        const PageDown = () => {
            setScrolledDown(window.scrollY > 350)
        };

        window.addEventListener('scroll', PageDown);

        const OutsideClickHandler = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setCategBarOpen({});
            }
        };

        document.addEventListener('click', OutsideClickHandler)

        return () => {
            window.removeEventListener('resize', screenSize);
            window.removeEventListener('scroll', PageDown);
            document.removeEventListener('click', OutsideClickHandler);
        };
    }, []);

    const languageDiv =
        (
            <>
                {i18n.language === 'en' && <Link className='language' onClick={() => {
                    i18n.changeLanguage('ar')
                }}> عر </Link>}
                {i18n.language === 'ar' && <Link className='language' onClick={() => {
                    i18n.changeLanguage('en')
                }}> EN </Link>}
            </>
        );

    const DownIcon = (
        <img className='downicon' alt='icon down' src={DownMenu} />
    );

    const Dropmenuhandler = (itemId) => {
        setCategBarOpen((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }))
    }

    const SignedUser = true;

    // const MngCaseIsOpen = () => {
    //     setMngrCaseOpen(!MngCaseIsOpen)
    // }

    return (
        <>
            {isMobile ?
                (
                    <div className='navbar mobilebar'>
                        <div className='mobilelogo'><img alt='mhomelogo' src={LogoImg} /></div>
                        <div className='mobilebaroptions'>
                            {languageDiv}
                            <button className='mobilejoinbtn'>Join/Log in</button>
                            <div className="dropdown">
                                <img alt='a' src={DropMenu} className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} />
                                {isOpen && (
                                    <div className="dropdownmenu">
                                        <Link className='menuoption' to="/page1">Post a job</Link>
                                        <Link className='menuoption' to="/howitworks">How it Works?</Link>
                                        <Link className='menuoption' to="/page3">membership plans</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <>
                        <div className='contain'>
                            <div className={pathname === "/category" || pathname === "/howitwork" || scrolledDown ? 'navbar barcolor' : 'navbar'} >
                                <div className='logo'>
                                    <Link to="/" ><img alt='homelogo' src={LogoImg} /> </Link>
                                    <div className='searchontop'>
                                        <SearchBar />
                                    </div>
                                </div>
                                {SignedUser && pathname !== "/" ?
                                    (<div className='baroptions'>
                                        <div className='barlinks'>
                                            <Link className='bartext' to='/postjob'>Post a Job</Link>
                                            {languageDiv}
                                            <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                                <img alt='mngcaseicon' className='bartext' src={MngmtnCaseIcon}
                                                    // ref={menuRef}
                                                    onClick={() => setMngrCaseOpen(!mngrCaseOpen)}
                                                />
                                                {mngrCaseOpen && (
                                                    <div style={{
                                                        // display: "flex",
                                                        // flexDirection: "column",
                                                        // minWidth:"7em",
                                                        backgroundColor: "rgba(255,255,255, 0.8)",
                                                        boxShadow: "1px 1px 5px black",
                                                        cursor: "pointer",
                                                        position: "absolute",
                                                        minWidth: "8em",
                                                        top: "40px",
                                                        right:"3px",
                                                        padding:"6px"
                                                    }}>
                                                        <p>option one</p> <p>transaction history</p> <p>add funds</p> <p>Withdraw Request</p>
                                                    </div>
                                                )}
                                            </div>
                                            <img alt='notificicon' className='bartext' src={NotificationIcon} />
                                            <img alt='msgicon' className='bartext' src={MsgIcon} />
                                        </div>
                                        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                            <img alt='usericon' src={UserIcon} onClick={() => setUserOpen(!userOpen)} />
                                            {userOpen && (
                                                <div style={{
                                                    // display: "flex",
                                                    // flexDirection: "column",
                                                    // minWidth:"7em",
                                                    backgroundColor: "rgba(255,255,255, 0.8)",
                                                    boxShadow: "1px 1px 5px black",
                                                    cursor: "pointer",
                                                    position: "absolute",
                                                    minWidth: "8em",
                                                    top: "50px",
                                                    right: "4px",
                                                    padding:"6px"
                                                }}>
                                                    <p>Profile</p> <p>Membership</p> <p>Invite friend</p> <p>Settings</p> <p>Help</p> <p>Log out</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>)
                                    :
                                    (<div className='baroptions'>
                                        <div className='barlinks'>
                                            {languageDiv}
                                            <Link className='bartext' to='/howitworks'>How it Works?</Link>
                                            <Link className='bartext' to='/postjob'>Post a Job</Link>
                                        </div>
                                        <div className='login'>
                                            <Link className='signlink' to='/signin'>Sign In</Link>
                                            <Link to='/category'><button className='joinbtn'>{t('register')}</button></Link>
                                        </div>
                                    </div>)}
                            </div>
                            <div className='categorybar' ref={menuRef}>
                                {CategoryList.map((item) => (
                                    <div className='categoryoption' key={item.id}
                                        onClick={() => Dropmenuhandler(item.id)}
                                    >
                                        <span className='categonamespan'>{item.categoryname}</span>

                                        {DownIcon}
                                        {categBarOpen[item.id] && (
                                            <div className='submenu'>
                                                {item.subCategory.map((subc, idx) => (
                                                    <span key={idx}>{subc}</span>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>


                    </>
                )
            }
        </>
    );


}

export default Navbar;
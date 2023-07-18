import React, { useEffect, useState, useRef } from 'react';
import './Navbar.scss';
import LogoImg from './Logoimg.png';
import DropMenu from './DropMenu.png';
import DownMenu from './Downmenu.png';
import UserIcon from './Icn1.png';
import MsgIcon from './Icn4.png';
import NotificationIcon from './Icn3.png';
import MngmtnCaseIcon from './Icn2.png';

import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const [popOpen, setPopOpen] = useState(false)
    const [fundAdd, setFundAdd] = useState(0)
    const [requestWithdraw, setRequestWithdraw] = useState(0)
    const navigate = useNavigate()
    // const location = useLocation()

    useEffect(() => {

        const screenSize = () => {
            setIsMobile(window.innerWidth <= 1200);
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
    const ClosePopUp = () => {
        setPopOpen(!popOpen)
    }
    const HandleFundChange = (event) => {
        const fund = event.target.value;
        setFundAdd(fund)
    }
    const HandleWithdrawChange = (event) => {
        const withdraw = event.target.value
        setRequestWithdraw(withdraw)
    }
    const AddFund = () => {
        console.log(fundAdd)
        navigate('/payment')
        ClosePopUp();
    }
    const Withdraw = () => {
        console.log(requestWithdraw)
        ClosePopUp();
    }

    return (
        <>
            {isMobile ?
                (<div className='navbar mobilebar'>
                    <div className='mobilelogo'><Link to='/'><img alt='mhomelogo' src={LogoImg} /></Link></div>
                    <div className='mobilebaroptions'>
                        {languageDiv}
                        <div className="dropdown">
                            <img alt='a' src={DropMenu} className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} />
                            {isOpen && (
                                <div className="dropdownmenu">
                                    <Link className='menuoption' to="/postjob">Post a job</Link>
                                    <Link className='menuoption' to="/resultssearch">Find freelancer</Link>
                                    <Link className='menuoption' to="/howitworks">How it Works?</Link>
                                    <Link className='menuoption' to="/categories">categories</Link>
                                    <Link className='menuoption' to="/membership">membership plans</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>) :
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
                                                        backgroundColor: "rgba(255,255,255, 0.8)",
                                                        boxShadow: "1px 1px 5px black",
                                                        cursor: "pointer",
                                                        position: "absolute",
                                                        minWidth: "8em",
                                                        top: "40px",
                                                        right: "3px",
                                                        padding: "6px",
                                                        zIndex: "1"
                                                    }}>
                                                        <p>transaction history</p> <p onClick={ClosePopUp}>add funds</p> <p onClick={ClosePopUp}>Withdraw Request</p>
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
                                                    backgroundColor: "rgba(255,255,255, 0.8)",
                                                    boxShadow: "1px 1px 5px black",
                                                    cursor: "pointer",
                                                    position: "absolute",
                                                    minWidth: "8em",
                                                    top: "50px",
                                                    right: "4px",
                                                    padding: "6px"
                                                }}>
                                                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/myprofile"><p>Profile</p></Link>
                                                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/membership"><p>Membership</p></Link>
                                                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/settings"><p>Settings</p></Link>
                                                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/help"><p>Help</p></Link>
                                                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/invitefriend"><p>Invite friend</p></Link>

                                                    <p>Log out</p>
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
                                            <Link to='/register'><button className='joinbtn'>{t('register')}</button></Link>
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
                                                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={{
                                                        pathname: '/resultssearch',
                                                        search: `category=${item.categoryname}&subCategory=${subc}`,
                                                    }} key={idx}><span className='link'>{subc}</span></Link>
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
            {isMobile && SignedUser && pathname !== "/" &&
                <div className='navbar mobilebar'>
                    <div className='mobilelogo'><Link to='/'><img alt='mhomelogo' src={LogoImg} /></Link></div>
                    <div className='mobilebaroptions'>
                        {languageDiv}
                        <div className="dropdown">
                            <img alt='a' src={DropMenu} className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} />
                            {isOpen && (
                                <div className="dropdownmenu">
                                    <Link className='menuoption' to="/myprofile">Profile</Link>
                                    <Link className='menuoption' to="/postjob">Post a job</Link>
                                    <Link className='menuoption' to="/resultspage">Find freelancer</Link>
                                    <Link className='menuoption' to="/howitworks">How it Works?</Link>
                                    <Link className='menuoption' to="/categories">categories</Link>
                                    <Link className='menuoption' to="/membership">membership plans</Link>
                                    <Link className='menuoption' to="/settings">Settings</Link>
                                    <Link className='menuoption' to="/help">Help</Link>
                                    <span style={{ cursor: 'pointer', width: '99%' }} className='menuoption' onClick={ClosePopUp}>Add fund</span>
                                    <Link className='menuoption' to="/invitefriend">Invite friend</Link>
                                    <Link className='menuoption' to="/page3">Log out</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
            {popOpen &&
                <div className='pop_container'>
                    <div className='pop_up'>
                        <div className='close_pop_up'>
                            <span>Close</span>
                            <button className='btn_closepopup' onClick={ClosePopUp}>X</button>
                        </div>
                        <div className='pop_window'>
                            <span>Add Fund</span>
                            <input type='number' placeholder='enter amount' min={15} max={5000} onChange={HandleFundChange} />
                            <button onClick={AddFund}>Add</button>
                            <span>Request Withdraw</span>
                            <input type='number' placeholder='enter amount' min={15} max={5000} onChange={HandleWithdrawChange} />
                            <button onClick={Withdraw}>Withdraw</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );


}

export default Navbar;
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

export default function Navbar() {
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
    const [hideBar, setHideBar] = useState()
    const barLastOpenScrollY = useRef(0)
    const mngRef = useRef(null)
    const msgsRef = useRef(null)
    const ntfRef = useRef(null)
    const userRef = useRef(null);
    const mobileRef = useRef(null);
    const [notificationsMenu, setNotificationsMenu] = useState(false)
    const [messageMenu, setMessageMenu] = useState(false)

    useEffect(() => {

        const screenSize = () => {
            setIsMobile(window.innerWidth <= 1200);
        };

        screenSize();
        window.addEventListener('resize', screenSize);

        const PageDown = () => {
            setScrolledDown(window.scrollY > 350)
        };
        const HideBar = () => {
            SubBarHideOnScroll();
        }

        window.addEventListener('scroll', PageDown);

        window.addEventListener('scroll', HideBar);
        // setHideBar(window.scrollY > 300)

        const OutsideClickHandler = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (!event.target.closest('.category-option')) {
                    setCategBarOpen({});
                }
            }
            if (mngRef.current && !mngRef.current.contains(event.target)) {
                if (!event.target.closest('.mng-opt')) {
                    setMngrCaseOpen(false)
                }
            }
            if (ntfRef.current && !ntfRef.current.contains(event.target)) {
                if (!event.target.closest('.ntf-mnu')) {
                    setNotificationsMenu(false)
                }
            }
            if (msgsRef.current && !msgsRef.current.contains(event.target)) {
                if (!event.target.closest('.msg-mnu')) {
                    setMessageMenu(false)
                }
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                if (!event.target.closest('.user-menu')) {
                    setUserOpen(false)
                }
            }
            if(mobileRef.current && !mobileRef.current.contains(event.target)) {
                if(!event.target.closest('.dropdown')){
                    setIsOpen(false)
                }
            }
        };

        document.addEventListener('click', OutsideClickHandler)

        return () => {
            window.removeEventListener('resize', screenSize);
            window.removeEventListener('scroll', PageDown);
            window.removeEventListener('scroll', HideBar);
            document.removeEventListener('click', OutsideClickHandler);
        };
    }, []);

    const SubBarHideOnScroll = () => {
        const currentScroll = window.scrollY
        if (window.scrollY > 350) {
            setHideBar(currentScroll > barLastOpenScrollY.current || currentScroll < barLastOpenScrollY.current)
            barLastOpenScrollY.current = currentScroll
        } else {
            setHideBar(false)
        }


    };

    const Dropmenuhandler = (itemId) => {
        if (categBarOpen[itemId]) {
            setCategBarOpen({})
        } else {
            setCategBarOpen({})
            setCategBarOpen((prevState) => ({
                ...prevState,
                [itemId]: !prevState[itemId]
            }))
        }

    }

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

    const HandleSubBar = () => {
        setHideBar(!hideBar)
    }

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
        <img className='down-icon' alt='icondown' src={DownMenu} />
    );


    const SignedInMobile = (
        <>
            <div className='navbar mobile-bar'>
                <div className='mobile-logo'><Link to='/'><img alt='mhomelogo' src={LogoImg} /></Link></div>
                <div className='mobile-bar-options'>
                    {languageDiv}
                    <div className="dropdown" ref={mobileRef}>
                        <img alt='a' src={DropMenu} className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} />
                        {isOpen && (
                            <div className="drop-down-menu">
                                <Link className='menu-option' to="/myprofile">Profile</Link>
                                <Link className='menu-option' to="/postjob">Post a job</Link>
                                <Link className='menu-option' to="/resultspage">Find freelancer</Link>
                                <Link className='menu-option' to="/howitworks">How it Works?</Link>
                                <Link className='menu-option' to="/categories">categories</Link>
                                <Link className='menu-option' to="/membership">membership plans</Link>
                                <Link className='menu-option' to="/settings">Settings</Link>
                                <Link className='menu-option' to="/help">Help</Link>
                                <span style={{ cursor: 'pointer', width: '99%' }} className='menu-option' onClick={ClosePopUp}>Add fund</span>
                                <Link className='menu-option' to="/invitefriend">Invite friend</Link>
                                <Link className='menu-option' to="/page3">Log out</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    const HideSecondBar = (
        <>
            {hideBar ?
                (
                    <div className='hide-bar' ref={menuRef}>
                        <span onClick={HandleSubBar}> Down Categories Menu {DownIcon} </span>
                    </div>
                )
                :
                (
                    <div className='category-bar' ref={menuRef}>
                        {CategoryList.map((item) => (
                            <div className='category-option' key={item.id} onClick={() => Dropmenuhandler(item.id)}>
                                <span className='catego-name-span' >
                                    {item.categoryname}
                                </span>
                                {DownIcon}
                                {categBarOpen[item.id] && (
                                    <div className='sub-menu'>
                                        {item.subCategory.map((subc, idx) => (
                                            <Link className='link-box' style={{ textDecoration: 'none', color: 'inherit' }} to={{
                                                pathname: '/resultssearch',
                                                search: `category=${item.categoryname}&subCategory=${subc}`,
                                            }} key={idx}><span className='link'>{subc}</span></Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )

            }
        </>
    )

    const SignedInNotMobile = (
        <>
            <div className={pathname === "/category" || pathname === "/howitwork" || scrolledDown ? 'navbar barcolor' : 'navbar'} >
                <div className='logo'>
                    <Link to="/" ><img alt='homelogo' src={LogoImg} /> </Link>
                    <div className='search-on-top'>
                    {pathname !=='/resultssearch' && <SearchBar />}
                    </div>
                </div>
                {pathname !== "/" ?
                    (<div className='bar-options'>
                        <div className='bar-links'>
                            <Link className='bar-text' to='/postjob'>Post a Job</Link>
                            {languageDiv}
                            <div ref={mngRef} className='management-options mng-opt' style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                <img alt='mngcaseicon' className='bar-text' src={MngmtnCaseIcon}
                                    onClick={() => setMngrCaseOpen(!mngrCaseOpen)}
                                />
                                {mngrCaseOpen && (
                                    <div className='user-bar-options'>
                                        <span>transaction history</span> <span onClick={ClosePopUp}>add funds</span> <span onClick={ClosePopUp}>Withdraw Request</span>
                                    </div>
                                )}
                            </div>
                            <div ref={ntfRef} className='management-options ntf-mnu' style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                <img alt='notificicon' className='bar-text' src={NotificationIcon}
                                    onClick={() => setNotificationsMenu(!notificationsMenu)}
                                />
                                {notificationsMenu && (
                                    <div className='user-bar-options' >
                                        <span>transaction history</span> <span onClick={ClosePopUp}>add funds</span> <span onClick={ClosePopUp}>Withdraw Request</span>
                                    </div>
                                )
                                }
                            </div>
                            <div ref={msgsRef} className='management-options msg-mnu' style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                <img alt='msgicon' className='bar-text' src={MsgIcon}
                                    onClick={() => setMessageMenu(!messageMenu)}
                                />
                                {messageMenu && (
                                    <div className='user-bar-options'>
                                        <span>transaction history</span> <span onClick={ClosePopUp}>add funds</span> <span onClick={ClosePopUp}>Withdraw Request</span>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div ref={userRef} className='user-menu' style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                            <img alt='usericon' src={UserIcon} onClick={() => setUserOpen(!userOpen)} />
                            {userOpen && (
                                <div className='main-user-bar-options'>
                                    <span onClick={() => { navigate('/myprofile') }}>Profile</span>
                                    <span onClick={() => { navigate('/membership') }}>Membership</span>
                                    <span onClick={() => { navigate('/settings') }}>Settings</span>
                                    <span onClick={() => { navigate('/help') }}>Help</span>
                                    <span onClick={() => { navigate('/invitefriend') }}>Invite Friend</span>
                                    <span>Log Out</span>
                                </div>
                            )}
                        </div>
                    </div>)
                    :
                    (<div className='bar-options'>
                        <div className='bar-links'>
                            {languageDiv}
                            <Link className='bar-text' to='/howitworks'>How it Works?</Link>
                            <Link className='bar-text' to='/postjob'>Post a Job</Link>
                        </div>
                        <div className='login'>
                            <Link className='sign-link' to='/signin'>Sign In</Link>
                            <Link to='/register'><button className='join-btn'>{t('register')}</button></Link>
                        </div>
                    </div>)}
            </div>
        </>
    )

    const VisitorMobile = (
        <>
            <div className='navbar mobile-bar' >
                <div className='mobile-logo'><Link to='/'><img alt='mhomelogo' src={LogoImg} /></Link></div>
                <div className='mobile-bar-options'>
                    {languageDiv}
                    <div className="dropdown" ref={mobileRef}>
                        <img alt='a' src={DropMenu} className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)} />
                        {isOpen && (
                            <div className="drop-down-menu smaller">
                                <Link className='menu-option' to="/postjob">Post a job</Link>
                                <Link className='menu-option' to="/resultssearch">Find freelancer</Link>
                                <Link className='menu-option' to="/howitworks">How it Works?</Link>
                                <Link className='menu-option' to="/categories">categories</Link>
                                <Link className='menu-option' to="/membership">membership plans</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )

    const VisitorNotMobile = (
        <>
            <div className={pathname === "/category" || pathname === "/howitwork" || scrolledDown ? 'navbar barcolor' : 'navbar'} >
                <div className='logo'>
                    <Link to="/" ><img alt='homelogo' src={LogoImg} /> </Link>
                    <div className='search-on-top'>
                    {pathname !=='/resultssearch' && <SearchBar />}
                    </div>
                </div>
                <div className='bar-options'>
                    <div className='bar-links'>
                        {languageDiv}
                        <Link className='bar-text' to='/howitworks'>How it Works?</Link>
                        <Link className='bar-text' to='/postjob'>Post a Job</Link>
                    </div>
                    <div className='login'>
                        <Link className='sign-link' to='/signin'>Sign In</Link>
                        <Link to='/register'><button className='join-btn'>{t('register')}</button></Link>
                    </div>
                </div>
            </div>
        </>
    )


    const SignedUser = true;

    return (
        <>
            {SignedUser ?
                (
                    <>
                        {isMobile ?
                            (
                                <>
                                    {SignedInMobile}
                                </>
                            ) :
                            (
                                <>
                                    <div className='contain'>
                                        {SignedInNotMobile}
                                        {HideSecondBar}
                                    </div>
                                </>
                            )
                        }
                    </>
                )
                :
                (
                    <>
                        {
                            isMobile ?
                                (
                                    <>
                                        {VisitorMobile}
                                    </>

                                ) :
                                (
                                    <>
                                        <div className='contain'>
                                            {VisitorNotMobile}
                                            {HideSecondBar}

                                        </div>


                                    </>
                                )


                        }

                    </>
                )
            }
        </>
    )

}

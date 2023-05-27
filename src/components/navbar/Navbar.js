import './Navbar.scss'

import LogoImg from './Logoimg.png';
import DropMenu from './DropMenu.png'
import DownMenu from './Downmenu.png'

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { CategoryList } from '../../CategoryList';
import SearchBar from '../searchbar/SearchBar';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolledDown, setScrolledDown] = useState(false);

    useEffect(() => {

        const screenSize = () => {
            setIsMobile(window.innerWidth <= 595);
        };

        screenSize();
        window.addEventListener('resize', screenSize);

        const PageDown = () => {
            setScrolledDown(window.scrollY>210)
        };

        window.addEventListener('scroll', PageDown);

        return () => {
            window.removeEventListener('resize', screenSize);
            window.removeEventListener('scroll', PageDown);
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
                                        <Link className='menuoption' to="/page2">How it Works?</Link>
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
                            <div className={scrolledDown?'navbar barcolor' : 'navbar'} >
                                <div className='logo'>
                                    <img alt='homelogo' src={LogoImg} />
                                    <div className='searchontop'>
                                        <SearchBar/>
                                    </div>
                                </div>
                                <div className='baroptions'>
                                    <div className='barlinks'>
                                        {languageDiv}
                                        <Link className='bartext' to='/howitwork'>How it Works?</Link>
                                        <Link className='bartext' to='/postjob'>Post a Job</Link>
                                    </div>
                                    <div className='login'>
                                        <Link className='signlink' to='/signin'>Sign In</Link>
                                        <button className='joinbtn'>{t('register')}</button>
                                    </div>
                                </div>
                            </div>
                            <div className='categorybar'>
                                    {CategoryList.map((item) => (
                                        <div className='categoryoption' key={item.id}>
                                            <span>{item.category}</span>
                                            {DownIcon}
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
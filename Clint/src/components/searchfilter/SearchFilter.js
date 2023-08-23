import React, { useEffect, useState } from "react";
import './SearchFilter.scss';
import { CategoryList } from "../../CategoryList";
import { useNavigate, useLocation } from "react-router-dom";

export default function SerachFilter({ category, subCategory, user, handleTextSearch }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [countrySelect, setCountrySelect] = useState("");
    const [languageSelect, setLanguageSelect] = useState("");
    const [priceSelect, SetPriceSelect] = useState("");
    const [searchOnline, setSearchOnline] = useState(false);
    const [searchVerified, setSearchVerified] = useState(false);
    const [selectedOption, setSelectedOption] = useState('all')

    const handleSearchText = (event) => {
        const newTextInput = event.target.value;
        setSearchText(newTextInput);
        handleTextSearch(newTextInput);
    }
    const handleCountrySelect = (event) => {
        setCountrySelect(event.target.value);
    }
    const handleLanguageSelect = (event) => {
        setLanguageSelect(event.target.value);
    }
    const handlePrice = (event) => {
        SetPriceSelect(event.target.value);
    }
    const handleOnlineSearch = () => {
        setSearchOnline(!searchOnline)
    }
    const handleVerifiedSearch = () => {
        setSearchVerified(!searchVerified)
    }

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const screenSize = () => {
            setIsMobile(window.innerWidth <= 800);
        };
        screenSize();
        window.addEventListener("resize", screenSize);
        return () => {
            window.removeEventListener("resize", screenSize);
        };
    }, []);
    
    const selectedCategoHandler = (event) => {
        event.preventDefault();

        const selectedCategName = event.target.value;
        setSelectedCategory(selectedCategName);
        setSelectedOption('all')
        navigate(`/resultssearch?category=${selectedCategName}`);

    }

    const handleSubCategoryCheck = (event) => {
        const selectedSub = event.target.value;
        setSelectedSubCategory(selectedSub);
        setSelectedOption(selectedSub)
        navigate(`/resultssearch?category=${selectedCategory}&subcategory=${selectedSub}`, { state: { subCategory: selectedSub } });
    }

    useEffect(() => {
        if (location.state && location.state.subCategory) {
          setSelectedSubCategory(location.state.subCategory);
        } else {
            setSelectedSubCategory(subCategory);
          }
      }, [location.state, subCategory]);
      useEffect(() => {
        setSelectedCategory(category);
        setSelectedSubCategory(subCategory)
    }, [category, subCategory])

    const selectedCategoryData = CategoryList.find((category) =>
        category.categoryname === selectedCategory
    )
    return (
        <>
            {isMobile ?
                (<div className="mobile-filter">
                    <div className="mobile-imgbckg">
                        <div className="Mobile-search-text">
                            <input type="text" id="mobile-srch-txt" placeholder="search..." onChange={handleSearchText} />
                        </div>
                        <div className="mobile-categ-select mobile">
                            <label htmlFor="mobilecategoryselect">Select Category: {selectedCategory} </label>
                            <select id="mobilecategoryselect" onChange={selectedCategoHandler}>
                                <option value="not selected">Select</option>
                                {CategoryList.map((catego, idx) => (
                                    <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div className="mobile-sub-select mobile">
                            <label htmlFor="mobilesubcategory" className="select-categ-label">Select Sub Category: {selectedSubCategory}</label>
                            <select value={selectedOption} id="mobilesubcategory" onChange={handleSubCategoryCheck}>
                                <option value='all'> All </option>
                                {selectedCategoryData &&
                                    (selectedCategoryData.subCategory.map((item, idx) => (
                                        <option key={idx} value={item}>{item}</option>
                                    )))
                                }
                            </select>
                        </div>
                        <div className="mobile-skills-select mobile">
                            <label htmlFor="mobileskills" className="select-categ-label">Select skills: {selectedSubCategory}</label>
                            <select value={selectedOption} id="mobileskills" onChange={handleSubCategoryCheck}>
                                <option value='all'> All </option>
                                {selectedCategoryData &&
                                    (selectedCategoryData.subCategory.map((item, idx) => (
                                        <option key={idx} value={item}>{item}</option>
                                    )))
                                }
                            </select>
                        </div>
                        <div className="mobile-country mobile">
                            <label htmlFor="mobilecountryselect">Select Country</label>
                            <select id="mobilecountryselect" onChange={handleCountrySelect}>
                                <option value="all">All</option>
                                <option value="Jordan">Jordan</option>
                                <option value="USA">USA</option>
                            </select>
                        </div>
                        <div className="mobile-language mobile">
                            <label htmlFor="mobilelanguageselect">Select Language</label>
                            <select id="mobilelanguageselect" onChange={handleLanguageSelect}>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                        </div>
                        <div className="mobile-price mobile">
                            <label htmlFor="mobileprice">Select price range per hour</label>
                            <select id="mobileprice" onChange={handlePrice}>
                                <option value="0-10">0-10 $ per hour</option>
                                <option value="10-20">10-20 $ per hour</option>
                                <option value="20-30">20-30 $ per hour</option>
                                <option value="30-40">30-40 $ per hour</option>
                                <option value="40-50">40-50 $ per hour</option>
                                <option value="50">50 $ and more per hour</option>
                            </select>
                        </div>
                        <div className="mobile-online-users mobile">
                            <label htmlFor="mobileonlinecheck">Online Users Only</label>
                            <input type="checkbox" id="mobileonlinecheck" value="online" onChange={handleOnlineSearch}></input>
                        </div>
                        <div className="mobile-online-users mobile">
                            <label htmlFor="mobileproverified">verified proffesional</label>
                            <input type="checkbox" id="mobileproverified" value="verified" onChange={handleVerifiedSearch}></input>
                        </div>
                    </div>
                </div>)
                :
                (<div className="filter">
                    <div className="img-bckg">
                        <div className="search-text">
                            <input type="text" id="srch-txt" placeholder="search..." onChange={handleSearchText} />
                        </div>
                        <div className="other-filters">
                            <div className="select-country">
                                <label htmlFor="countryselect">Select Country</label>
                                <select id="countryselect" onChange={handleCountrySelect}>
                                    <option value="all">All</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                            <div className="select-country">
                                <label htmlFor="languageselect">Select Language</label>
                                <select id="languageselect" onChange={handleLanguageSelect}>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Arabic">Arabic</option>
                                </select>
                            </div>
                            <div className="select-country">
                                <label htmlFor="price">Select price range per hour</label>
                                <select id="price" onChange={handlePrice}>
                                    <option value="0-10">0-10 $ per hour</option>
                                    <option value="10-20">10-20 $ per hour</option>
                                    <option value="20-30">20-30 $ per hour</option>
                                    <option value="30-40">30-40 $ per hour</option>
                                    <option value="40-50">40-50 $ per hour</option>
                                    <option value="50">50 $ and more per hour</option>
                                </select>
                            </div>
                            <div className="verified-users">
                                <label htmlFor="proverified">verified profesional</label>
                                <input type="checkbox" id="proverified" value="verified" onChange={handleVerifiedSearch}></input>
                            </div>
                            {user && <div className="verified-users">
                                <label htmlFor="onlinecheck">Online Users Only</label>
                                <input type="checkbox" id="onlinecheck" value="online" onChange={handleOnlineSearch}></input>
                            </div>}
                        </div>
                        <div className="filter-options">
                            <div className="select-category">
                                <label htmlFor="categoryselect">Select Category: {selectedCategory} </label>
                                <select id="categoryselect" onChange={selectedCategoHandler}>
                                    <option value="not selected">Select</option>
                                    {CategoryList.map((catego, idx) => (
                                        <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                                    )
                                    )}
                                </select>
                            </div>
                            <div className="selected-catego">
                                <span>Select Category to see the Sub categories list and related skills</span>
                                <hr />
                                <div className="filter-second-options">
                                    <div className="sub-categories">
                                        <label htmlFor="subcategory" className="select_categ_label">Select Sub Category: {selectedSubCategory}</label>
                                        <select value={selectedOption} id="subcategoryselect" onChange={handleSubCategoryCheck}>
                                            <option value='all'> All </option>
                                            {selectedCategoryData &&
                                                (selectedCategoryData.subCategory.map((item, idx) => (
                                                    <option key={idx} value={item}>{item}</option>
                                                )))
                                            }
                                        </select>
                                    </div>
                                    <div className="sub-categories">
                                        <label htmlFor="skills" className="select_categ_label">Select Sub Category: {selectedSubCategory} </label>
                                        <select value={selectedOption} id="skillsselect" onChange={handleSubCategoryCheck}>
                                            <option value='all'> All </option>
                                            {selectedCategoryData &&
                                                (selectedCategoryData.subCategory.map((item, idx) => (
                                                    <option key={idx} value={item}>{item}</option>
                                                )))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>

    )
}
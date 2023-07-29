import React, { useEffect, useState } from "react";
import './SearchFilter.scss';
import { CategoryList } from "../../CategoryList";
import { useNavigate, useLocation } from "react-router-dom";

export default function SerachFilter({ category, subCategory }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [countrySelect, setCountrySelect] = useState("");
    const [languageSelect, setLanguageSelect] = useState("");
    const [priceSelect, SetPriceSelect] = useState("");
    const [searchOnline, setSearchOnline] = useState(false);
    const [searchVerified, setSearchVerified] = useState(false);

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
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
        const selectedCategName = event.target.value;
        setSelectedCategory(selectedCategName);

        navigate(`/resultssearch?category=${selectedCategName}`);

    }

    const handleSubCategoryCheck = (event) => {
        const selectedSub = event.target.value;
        setSelectedSubCategory(selectedSub);
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

    console.log(category)
    console.log(subCategory)
    const selectedCategoryData = CategoryList.find((category) =>
        category.categoryname === selectedCategory
    )
    return (
        <>
            {isMobile ?
                (<div className="mobile_filter">
                    <div className="mobile_imgbckg">
                        <div className="Mobile_search_text">
                            <input type="text" id="mobile_srch_txt" placeholder="search..." onChange={handleSearchText}/>
                        </div>
                        <div className="mobile_categ_select mobile">
                            <label htmlFor="categoryselect">Select Category </label>
                            <select id="categoryselect" onChange={selectedCategoHandler}>
                                <option value="selected">{category ? `${category}` : `All`}</option>
                                {CategoryList.map((catego, idx) => (
                                    <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div className="mobile_sub_select mobile">
                            <label htmlFor="subcategselect">selecy sub category</label>
                            <select id="subcategselect" onChange={handleSubCategoryCheck}>
                                <option value='all'>All</option>
                                {selectedCategoryData ? (selectedCategoryData.subCategory.map((item, idx) => (
                                    <option value={item} key={idx}>{item}</option>
                                ))) : (<option value="select">Select category first</option>)}
                            </select>
                        </div>
                        <div className="mobile_skills_select mobile">
                            <label htmlFor="mobileskillsselect">selecy skills</label>
                            <select id="mobileskillsselect" onChange={handleSubCategoryCheck}>
                                <option value='all'>All</option>
                                {selectedCategoryData ? (selectedCategoryData.subCategory.map((item, idx) => (
                                    <option value={item} key={idx}>{item}</option>
                                ))) : (<option value="select">Select category first</option>)}
                            </select>
                        </div>
                        <div className="mobile_country mobile">
                            <label htmlFor="mobilecountryselect">Select Country</label>
                            <select id="mobilecountryselect" onChange={handleCountrySelect}>
                                <option value="all">All</option>
                                <option value="Jordan">Jordan</option>
                                <option value="USA">USA</option>
                            </select>
                        </div>
                        <div className="mobile_language mobile">
                            <label htmlFor="mobilelanguageselect">Select Language</label>
                            <select id="mobilelanguageselect" onChange={handleLanguageSelect}>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                        </div>
                        <div className="mobile_price mobile">
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
                        <div className="mobile_online_users mobile">
                            <label htmlFor="mobileonlinecheck">Online Users Only</label>
                            <input type="checkbox" id="mobileonlinecheck" value="online" onChange={handleOnlineSearch}></input>
                        </div>
                        <div className="mobile_online_users mobile">
                            <label htmlFor="mobileproverified">verified proffesional</label>
                            <input type="checkbox" id="mobileproverified" value="verified" onChange={handleVerifiedSearch}></input>
                        </div>
                    </div>
                </div>)
                :
                (<div className="filter">
                    <div className="imgbckg">
                        <div className="search_text">
                            <input type="text" id="srch_txt" placeholder="search..." onChange={handleSearchText}/>
                        </div>
                        <div className="filter_options">
                            <div className="select_category">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label htmlFor="categoryselect">Select Category </label>
                                    <select id="categoryselect" onChange={selectedCategoHandler}>
                                        <option value="selected">{category ? `${category}` : `All`}</option>
                                        {CategoryList.map((catego, idx) => (
                                            <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                                        )
                                        )}
                                    </select>
                                </div>
                                <div className="selected_catego">
                                    <p>Select Category to see the Sub categories list and  the Skills related</p>
                                    <div style={{ display: "flex", gap: "2rem" }}>
                                        <div className="sub_categories">
                                            <label htmlFor="subcategory" className="select_categ_label">{subCategory ? `${subCategory}` : `All subcategories`}</label>
                                            {selectedCategoryData ? (selectedCategoryData.subCategory.map((item, idx) => (
                                                <div key={idx} className="sub_menu">
                                                    <label htmlFor={idx}>{item}</label>
                                                    <input type="checkbox" id={idx} value={item} onChange={handleSubCategoryCheck} checked={item === selectedSubCategory}/>
                                                </div>
                                            )))
                                                :
                                                (<input type="checkbox" id="allsub" checked disabled />)}
                                        </div>
                                        <div className="sub_categories">
                                            <label htmlFor="skills" className="select_categ_label"> All SKills</label>
                                            {selectedCategoryData ? (selectedCategoryData.subCategory.map((item, idx) => (
                                                <div key={idx} className="sub_menu">
                                                    <label htmlFor={idx}>{item}</label>
                                                    <input type="checkbox" id={idx} value={item} onChange={handleSubCategoryCheck}/>
                                                </div>
                                            ))) :
                                                (<input type="checkbox" id="allskills" checked disabled />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="select_country justify">
                                <label htmlFor="countryselect">Select Country</label>
                                <select id="countryselect" onChange={handleCountrySelect}>
                                    <option value="all">All</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                            <div className="select_language justify">
                                <label htmlFor="languageselect">Select Language</label>
                                <select id="languageselect" onChange={handleLanguageSelect}>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Arabic">Arabic</option>
                                </select>
                                <div className="online_users justify">
                                    <label htmlFor="onlinecheck">Online Users Only</label>
                                    <input type="checkbox" id="onlinecheck" value="online" onChange={handleOnlineSearch}></input>
                                </div>
                            </div>
                            <div className="select_price justify">
                                <label htmlFor="price">Select price range per hour</label>
                                <select id="price" onChange={handlePrice}>
                                    <option value="0-10">0-10 $ per hour</option>
                                    <option value="10-20">10-20 $ per hour</option>
                                    <option value="20-30">20-30 $ per hour</option>
                                    <option value="30-40">30-40 $ per hour</option>
                                    <option value="40-50">40-50 $ per hour</option>
                                    <option value="50">50 $ and more per hour</option>
                                </select>
                                <div className="online_users justify">
                                    <label htmlFor="proverified">verified proffesional</label>
                                    <input type="checkbox" id="proverified" value="verified" onChange={handleVerifiedSearch}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>

    )
}
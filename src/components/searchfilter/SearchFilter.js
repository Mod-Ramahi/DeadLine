import React, { useState } from "react";
import './SearchFilter.scss';
import { CategoryList } from "../../CategoryList";

export default function SerachFilter() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const selectedCategoHandler = (event) => {
        const selectedCategName = event.target.value;
        setSelectedCategory(selectedCategName);
    }

    const selectedCategoryData = CategoryList.find((category) =>
        category.categoryname === selectedCategory
    )
    return (
        <div className="filter">
            <div className="imgbckg">
                <div className="search_text">
                    <input type="text" id="srch_txt" placeholder="search..." />
                </div>
                <div className="filter_options">
                    <div className="select_category">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label htmlFor="categoryselect">Select Category </label>
                            <select id="categoryselect" onChange={selectedCategoHandler}>
                                <option value="all">All</option>
                                {CategoryList.map((catego, idx) => (
                                    <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div className="selected_catego">
                            <p>Select Category to see the Sub categories list and  the Skills related</p>
                            <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                                <div className="sub_categories">
                                    <label htmlFor="subcategory" className="select_categ_label">All subcategories</label>
                                    {selectedCategoryData ? (selectedCategoryData.subCategory.map((item, idx) => (
                                        <div key={idx} className="sub_menu">
                                            <label htmlFor={idx}>{item}</label>
                                            <input type="checkbox" id={idx} value={item} />
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
                                            <input type="checkbox" id={idx} value={item} />
                                        </div>
                                    ))) :
                                        (<input type="checkbox" id="allskills" checked disabled />)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="select_country">
                        <label htmlFor="countryselect">Select Country</label>
                        <select id="countryselect">
                            <option value="all">All</option>
                            <option value="Jordan">Jordan</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                    <div className="select_language">
                        <label htmlFor="languageselect">Select Language</label>
                        <select id="languageselect">
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>
                    <div className="select_price">
                        <label htmlFor="price">Select price range per hour</label>
                        <select id="price">
                            <option value="0-10">0-10 $ per hour</option>
                            <option value="10-20">10-20 $ per hour</option>
                            <option value="20-30">20-30 $ per hour</option>
                            <option value="30-40">30-40 $ per hour</option>
                            <option value="40-50">40-50 $ per hour</option>
                            <option value="50">50 $ and more per hour</option>
                        </select>
                    </div>
                    <div className="online_users">
                        <label htmlFor="proverified">verified proffesional</label>
                        <input type="checkbox" id="proverified" value="verified"></input>
                    </div>
                    <div className="online_users">
                        <label htmlFor="onlinecheck">Online Users Only</label>
                        <input type="checkbox" id="onlinecheck" value="online"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}
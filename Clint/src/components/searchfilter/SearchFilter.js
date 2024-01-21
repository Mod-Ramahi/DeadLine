import React, { useEffect, useState } from "react";
import './SearchFilter.scss';
import { CategoryList } from "../../CategoryList";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getFilteredJobs, getFilteredProfiles, getallProfiles } from "../../api";
import debounce from "lodash.debounce";
import CardsResults from "../cardsresults/CardsResults";
import JobCardResult from "../jobCardResults/JobCardResult";
export default function SerachFilter({ userCateg }) {
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSubCategory, setSelectedSubCategory] = useState();
    const [searchText, setSearchText] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [countrySelect, setCountrySelect] = useState("");
    const [languageSelect, setLanguageSelect] = useState("");
    const [priceSelect, SetPriceSelect] = useState("");
    const [searchOnline, setSearchOnline] = useState(false);
    const [searchVerified, setSearchVerified] = useState(false);
    const [selectedOption, setSelectedOption] = useState('all')
    const [jobClicked, setJobClicked] = useState(false);
    const [freelancerClicked, setFreelancerClicked] = useState(true);
    const [loading,setLoading] = useState(false)
    const [defaultResult, setDefaultResult] = useState(false)
    const [profilesResult, setProfilesResult] = useState([])
    const [jobsResult,setJobsResult] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    useEffect(() => {
        console.log('first useEffect')
        const category = decodeURIComponent(searchParams.get('category'))
        const subCategory = decodeURIComponent(searchParams.get('subcategory'))
        if(category && category !=='all' && category !== 'null'){
            setSelectedCategory(category)
            console.log('lll', category)
        }
        if(subCategory && subCategory !=='all'){
            console.log('lll sub:', subCategory)
            setSelectedSubCategory(subCategory)
        }
if(selectedSubCategory ==='all'){
    setSelectedSubCategory(null)
}
    }, [location.search])
    useEffect(() => {
        console.log('category changed', selectedCategory)
        if(selectedCategory === 'all' || !selectedCategory){
            setDefaultResult(true)
            debounceProfilesData({defaultResult:true,userCateg, searchText, searchVerified, priceSelect})
        }else{
            if(selectedSubCategory === 'all'){
                debounceProfilesData({selectedCategory, selectedSubCategory:null,searchText, searchVerified, priceSelect})

            }else{
            setDefaultResult(false)
            debounceProfilesData({selectedCategory, selectedSubCategory,searchText, searchVerified, priceSelect})
            }
        }
        
    },[selectedCategory,selectedSubCategory, searchText, searchVerified, priceSelect])
    const filterResults = async (filterData) => {
        try {
            console.log('filterData:', filterData)
            setLoading(true)
            const pageSize = 10
            const response = await getFilteredProfiles(pageSize,filterData)
            // const response = await getallProfiles(pageSize)
            console.log('filtered profiles:',response)
            setProfilesResult(response)
            const res = await getFilteredJobs(pageSize, filterData)
            console.log('filtered jobs:', res)
            setJobsResult(res)
        } catch (error){
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const debounceProfilesData = debounce(filterResults, 300)

    const handleJobClicked = () => {
        setJobClicked(true);
        setFreelancerClicked(false)
    }
    const handleFreelancerClicked = () => {
        setFreelancerClicked(true);
        setJobClicked(false);
    }

    const handleSearchText = (event) => {
        const newTextInput = event.target.value;
        setSearchText(newTextInput);
        // handleTextSearch(newTextInput);
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
        setSelectedSubCategory('all')
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
            // setSelectedSubCategory(subCategory);
        }
    }, [location.state]);
    // useEffect(() => {
    //     setSelectedCategory(category);
    //     setSelectedSubCategory(subCategory)
    // }, [category, subCategory])

    const selectedCategoryData = CategoryList.find((category) =>
        category.categoryname === selectedCategory
    )

    const renderProfiles = profilesResult.map((profile) =>(
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/freelancer/${profile._id}`} key={profile._id}>
            <CardsResults user={profile} />
        </Link> 
    )) 
    const renderJobs = jobsResult.map((job) => (
        <Link to={`/jobprofile/${job._id}`} style={{ color: 'inherit', textDecoration: 'none' }} key={job._id}>
            <JobCardResult job={job} />
        </Link>
    ))
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
                            <select value={selectedCategory} id="mobilecategoryselect" onChange={selectedCategoHandler}>
                                <option value='all'>Select</option>
                                {CategoryList.map((catego, idx) => (
                                    <option key={idx} value={catego.categoryname}>{catego.categoryname}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div className="mobile-sub-select mobile">
                            <label htmlFor="mobilesubcategory" className="select-categ-label">Select Sub Category: {selectedSubCategory}</label>
                            <select value={selectedSubCategory} id="mobilesubcategory" onChange={handleSubCategoryCheck}>
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
                            <select value={selectedSubCategory} id="mobileskills" onChange={handleSubCategoryCheck}>
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
                                    <option value="50-500000">50 $ and more per hour</option>
                                </select>
                            </div>
                            <div className="verified-users">
                                <label htmlFor="proverified">verified profesional</label>
                                <input type="checkbox" id="proverified" value="verified" onChange={handleVerifiedSearch}></input>
                            </div>
                            {freelancerClicked && <div className="verified-users">
                                <label htmlFor="onlinecheck">Online Users Only</label>
                                <input type="checkbox" id="onlinecheck" value="online" onChange={handleOnlineSearch}></input>
                            </div>}
                        </div>
                        <div className="filter-options">
                            <div className="select-category">
                                <label htmlFor="categoryselect">Select Category: {selectedCategory} </label>
                                <select value={selectedCategory} id="categoryselect" onChange={selectedCategoHandler}>
                                    <option value="all">Select</option>
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
                                        <select value={selectedSubCategory} id="subcategoryselect" onChange={handleSubCategoryCheck}>
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
                                        <select value={selectedSubCategory} id="skillsselect" onChange={handleSubCategoryCheck}>
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
            <div className="most-popular-btns">
                <button className={`job-btn ${jobClicked ? "active" : ""}`}
                    onClick={handleJobClicked}>Jobs</button>
                <button className={`freelancer-btn ${freelancerClicked ? "active" : ""}`}
                    onClick={handleFreelancerClicked}>Freelancers</button>
            </div>
            <div className="results-render">
                {jobClicked ? (<div className="jobs-render">{renderJobs}</div>) : (<div className="users-render">{renderProfiles}</div>)/* {userRender} */}
            </div>  
        </>

    )
}
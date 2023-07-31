import './AllcategoryHome.scss';
import { CategoryList } from '../../CategoryList'
import { Link } from 'react-router-dom';

const AllcategoryHome = () => {
    return (
        <div className="all-category-home">
            <span>All Category</span>
            <div className="icons-container">
                {CategoryList.map((item) => (
                    <div className='category-icon' key={item.id}>
                        <Link className='category-icon' to={{pathname:'/resultssearch', search:`?category=${item.categoryname}`}}
                        style={{color:'inherit', textDecoration:'none'}}>
                            <div className='icon'>
                                <img className='icon-img' alt={item.alt} src={item.src} />
                            </div>
                            <div className='icon-name'>
                                <span>{item.categoryname}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllcategoryHome;

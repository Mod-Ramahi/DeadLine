import './AllcategoryHome.scss';
import { CategoryList } from '../../CategoryList'
import { Link } from 'react-router-dom';

const AllcategoryHome = () => {
    return (
        <div className="allcategoryhome">
            <span>All Category</span>
            <div className="iconscontainer">
                {CategoryList.map((item) => (
                    <div className='categoryicon' key={item.id}>
                        <Link className='categoryicon' to={{pathname:'/resultssearch', search:`?category=${item.categoryname}`}}
                        style={{color:'inherit', textDecoration:'none'}}>
                            <div className='icon'>
                                <img className='iconimg' alt={item.alt} src={item.src} />
                            </div>
                            <div className='iconname'>
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

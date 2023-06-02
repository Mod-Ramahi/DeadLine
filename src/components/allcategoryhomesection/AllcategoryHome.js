import './AllcategoryHome.scss';
import {CategoryList} from '../../CategoryList'

const AllcategoryHome = () => {
    return(
        <div className="allcategoryhome">
            <span>All Category</span>
            <div className="iconscontainer">
                {CategoryList.map((item) =>( 
                    <div className='categoryicon' key={item.id}>
                        <div className='icon'><img  className='iconimg' alt={item.alt} src={item.src}/></div>
                        <div className='iconname'><span>{item.categoryname}</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllcategoryHome;

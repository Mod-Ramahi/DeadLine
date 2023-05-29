import './AllcategoryHome.scss';
import {CategoryIcons} from '../../CategoryList'

const AllcategoryHome = () => {
    return(
        <div className="allcategoryhome">
            <span>All Category</span>
            <div className="iconscontainer">
                {CategoryIcons.map((item) =>(
                    <div className='categoryicon' key={item.id}>
                        <div className='icon'><img alt={item.alt} src={item.src}/></div>
                        <div className='iconname'><span>{item.name}</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllcategoryHome;
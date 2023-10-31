import "../styles/filter.css"
import  {useState} from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import chevronLeft from  "../assets/chevron-left.png";
import chevronRight from  "../assets/chevron-right.png";
const Filter = ({isMenuVisible,setIsMenuVisible}) => {
    const [selectedStatus, setSelectedStatus] = useState('Any');
    const [selectedType, setSelectedType] = useState('Apartments');
    const [selectedBathroom, setSelectedBathroom] = useState('Auto');
    const [selectedBedrooms, setSelectedBedrooms] = useState('Studio');
    const [budgetRange, setBudgetRange] = useState([15000, 17000]);
    const [sizeRange, setSizeRange] = useState([150, 200]);
    const [menuVisible,setMenuVisible] = useState(true);


    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };
    const handleBathroomChange = (bathroom) => {
        setSelectedBathroom(bathroom);
    };
    const handleBedroomsChange = (bedrooms) => {
        setSelectedBedrooms(bedrooms);
    };
    const handleTypeChange = (type) => {
        setSelectedType(type);
    };
    return( <div
        className={`filter-container ${menuVisible ? "menu-transition" : "menu-transition"} ${
            menuVisible ? "" : "hidden-menu"
        }`}
    >

        <div className="setting-block" style={{width:336}}>
        <div className="hide-menu" onClick={()=>{setMenuVisible(!menuVisible)
        setIsMenuVisible(menuVisible)}}>
            {menuVisible?
                <img src={chevronLeft}/>:<img src={chevronRight}/>
            }

        </div>
            <div className="name-block">
                Completion status
            </div>
            <div className="buttons-block">
                <button
                    onClick={() => handleStatusChange('Any')}
                    className={selectedStatus === 'Any' ? 'active' : ''}
                >
                    Any
                </button>
                <button
                    onClick={() => handleStatusChange('Off-Plan')}
                    className={selectedStatus === 'Off-Plan' ? 'active' : ''}
                    style={{
                        width:128,height:36,padding:0
                    }}
                >
                    Off-Plan
                </button>
                <button
                    onClick={() => handleStatusChange('Ready')}
                    className={selectedStatus === 'Ready' ? 'active' : ''}
                >
                    Ready
                </button>
            </div>
        </div>

        <div className="setting-block" style={{width:283}}>
            <div className="name-block">
                Property Type
            </div>
            <div className="buttons-block">
                <button
                    onClick={() => handleTypeChange('Apartments')}
                    className={selectedType === 'Apartments' ? 'active' : ''}
                    style={{width:157}}
                >
                    Apartments
                </button>
                <button
                    onClick={() => handleTypeChange('Villa')}
                    className={selectedType === 'Villa' ? 'active' : ''}
                >
                    Villa
                </button>
            </div>
            <div className="buttons-block">
                <button
                    onClick={() => handleTypeChange('Town house')}
                    className={selectedType === 'Town house' ? 'active' : ''}
                    style={{width:162}}
                >
                    Town house
                </button>
                <button
                    onClick={() => handleTypeChange('Land')}
                    className={selectedType === 'Land' ? 'active' : ''}
                >
                    Land
                </button>
            </div>
        </div>
        <div className="setting-block" style={{ width: 320 }}>
            <div className="name-block">Budget</div>
            <RangeSlider min={15000} max={22000} value={budgetRange} onInput={setBudgetRange}/>
            <div className="ranges-block">
                <div className="range">$ 15K</div>
                <div className="range">$ 22K</div>
            </div>
        </div>
        <div className="setting-block" style={{width:343}}>
            <div className="name-block">
                Property room
            </div>
            <div className="name-block-block">
                Bathrooms
            </div>
            <div className="multiple-buttons-container" style={{marginBottom:16}}>
                <button onClick={()=>handleBathroomChange("Auto")} className={`multiple-button ${selectedBathroom === 'Auto' ? 'active' : ''}`}>Auto</button>
                <button onClick={()=>handleBathroomChange("1")}  className={`multiple-button ${selectedBathroom === '1' ? 'active' : ''}`}>1</button>
                <button onClick={()=>handleBathroomChange("2")}  className={`multiple-button ${selectedBathroom === '2' ? 'active' : ''}`}>2</button>
                <button onClick={()=>handleBathroomChange("3")}  className={`multiple-button ${selectedBathroom === '3' ? 'active' : ''}`}>3</button>
                <button onClick={()=>handleBathroomChange("4+")} className={`multiple-button ${selectedBathroom === '4+' ? 'active' : ''}`}
                >4+</button>
            </div>

            <div className="name-block-block">
                Bedrooms
            </div>
            <div className="multiple-buttons-container">
                <button onClick={()=>handleBedroomsChange("Studio")} className={`multiple-button ${selectedBedrooms === 'Studio' ? 'active' : ''}`}>Studio</button>
                <button onClick={()=>handleBedroomsChange("1")}  className={`multiple-button ${selectedBedrooms === '1' ? 'active' : ''}`}>1</button>
                <button onClick={()=>handleBedroomsChange("2")}  className={`multiple-button ${selectedBedrooms === '2' ? 'active' : ''}`}>2</button>
                <button onClick={()=>handleBedroomsChange("3")}  className={`multiple-button ${selectedBedrooms === '3' ? 'active' : ''}`}>3</button>
                <button onClick={()=>handleBedroomsChange("4+")} className={`multiple-button ${selectedBedrooms === '4+' ? 'active' : ''}`}
                >4+</button>
            </div>
        </div>
        <div className="setting-block" style={{ width: 320 }}>
            <div className="name-block">Property size</div>
            <RangeSlider min={150} max={300} value={sizeRange} onInput={setSizeRange    }/>
            <div className="ranges-block">
                <div className="range">150 sqft</div>
                <div className="range">300 sqft</div>
            </div>
        </div>
        <div/>


    </div>)
}
export default Filter
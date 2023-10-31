import Header from "../components/Header.jsx";
import React from "react";
import Select from "react-select";
import locations from "../helps/Locations.jsx";
import map from "../assets/map.png";
import add from "../assets/add.png";
import left from "../assets/arrow_left.png";
import right from "../assets/arrow_right.png";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

const UpdateProject = () => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%',
            border:"none",
            color: '#AEAEB2',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.5px',
            borderRadius: '8px', // Added border-radius
            background: 'var(--D-grey, #F2F2F7)', // Added background
        }),
    };
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    return(
        <div className={"admin-container"}>
            <Header settings={false}/>
            <div className="update-container" style={{padding:60}}>
                <div className="block1">
                    <div className="choose-logo-container">
                        <div className="admin-title">
                            Developer
                        </div>
                        <div className="choose-logo-block">
                            <input className={"admin-location-input"}
                                   placeholder={"Type here"}/>                        </div>
                    </div>
                    <div className="admin-location-block">
                        <div className="admin-location-container">
                            <div className="admin-title">Location</div>
                            <div className="admin-location-find" style={{paddingRight:0}}>
                                <Select styles={customStyles}
                                        className={"admin-location-input"} options={locations}
                                        placeholder={"Type here"}
                                />
                            </div>


                        </div>
                        <div className="admin-popular-location-block">

                            <div className="admin-title">Write your own location</div>
                            <div className="admin-location-find">
                                <input className={"admin-location-input"}
                                       placeholder={"Type here"} />
                            </div>
                        </div>
                    </div>
                    <div className="admin-name-location-block">
                        <div className="admin-project-name">
                            <div className="admin-title">
                                Project Name
                            </div>
                            <input className={"admin-location-input"}

                                   placeholder={"Type here"}/>
                        </div>
                        <div className="admin-location-container">
                            <div className="admin-title">Choose project location</div>
                            <div className="admin-location-find">
                                <input className={"admin-location-input"}  placeholder={"Open map"}/>
                                <img src={map} />
                            </div>


                        </div>
                    </div>
                    <div className="admin-project-type">
                        <div className="admin-title">
                            Select Project Type
                        </div>
                        <div className="buttons-block">
                            <button

                            >
                                Project for investment

                            </button>
                            <button

                            >
                                Project for self-use

                            </button>
                        </div>
                    </div>
                </div>
                <div className="block2">
                    <div className="main-foto-block">
                        <div className="admin-title">
                            Main photo
                        </div>
                        <div className="choose-logo-block">
                            <img src={ add} alt="Click to choose a file"  />
                        </div>

                    </div>
                    <div className="admin-size-price-block">
                        <div className="admin-price-block">
                            <div className="admin-title">
                                Price from
                            </div>
                            <div className="admin-input-text">
                                <input placeholder={"Type here"}

                                />
                                <span>AED</span>
                            </div>
                        </div>
                        <div className="admin-size-block">
                            <div className="admin-title">
                                Property size
                            </div>
                            <div className="admin-input-text">
                                <input placeholder={"Type here"}

                                />
                                <span>sq.ft</span>
                            </div>
                        </div>
                        <div className="admin-handover-block">
                            <div className="admin-title">
                                Handover
                            </div>
                            <div className="handover-input-block">
                                <select id="monthSelect" >
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                </select>
                                <div className="handover-text">
                                    Q
                                </div>
                                <select id="yearSelect" >

                                </select>
                                <div className="admin-title">Year</div>
                            </div>

                        </div>
                    </div>
                    <div className="admin-bed-bath-status">
                        <div className="admin-bed-bath">
                            <div className="admin-bath">
                                <div className="admin-title">
                                    Bathrooms
                                </div>
                                <div className="multiple-buttons-container" style={{marginBottom:16}}>
                                    <button  className={`multiple-button 'active'`}>Auto</button>
                                    <button   className={`multiple-button`}>1</button>
                                    <button   className={`multiple-button`}>2</button>
                                    <button   className={`multiple-button`}>3</button>
                                    <button  className={`multiple-button`}
                                    >4+</button>
                                </div>
                            </div>
                            <div className="admin-bed">
                                <div className="admin-title">
                                    Bedrooms
                                </div>
                                <div className="multiple-buttons-container">
                                    <button className={`multiple-button active`}>Studio</button>
                                    <button className={`multiple-button`}>1</button>
                                    <button  className={`multiple-button`}>2</button>
                                    <button  className={`multiple-button`}>3</button>
                                    <button  className={`multiple-button`}
                                    >4+</button>
                                </div>
                            </div>
                        </div>
                        <div className="admin-completion-status">
                            <div className="admin-title">
                                Completion status
                            </div>
                            <div className="buttons-block">
                                <button

                                >
                                    Any
                                </button>
                                <button

                                    style={{
                                        width:128,height:36,padding:0
                                    }}
                                >
                                    Off-Plan
                                </button>
                                <button

                                >
                                    Ready
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="completion-status-block">
                    <div className="admin-title">
                        Property Type
                    </div>
                    <div className="completion-buttons">
                        <div className="buttons-block">
                            <button

                                style={{width:157}}
                            >
                                Apartments
                            </button>
                            <button

                            >
                                Villa
                            </button>
                        </div>
                        <div className="buttons-block">
                            <button

                                style={{width:162}}
                            >
                                Town house
                            </button>
                            <button

                            >
                                Plots
                            </button>
                        </div>
                    </div>

                </div>

                {/*secondTAB*/}
                <div className="block3" style={{marginTop:40}}>
                    <div className="admin-desc">
                        <div className="admin-title">
                            Description text
                        </div>

                        <div style={{height:"100%",width: 510}}>
                <textarea  maxLength={300}   placeholder="Create a short description of the property"/>

                            <div className={"remaining"} style={{width:"100%",alignItems:"flex-end",justifyContent:"flex-end",display:"flex"}}>0/300</div>
                        </div>
                    </div>
                    <div className="admin-exterior-photo">
                        <div className="admin-title">Exterior photo</div>
                        <div className="choose-logo-block" >
                            <img src={ add} alt="Click to choose a file"  />
                        </div>
                    </div>
                </div>

                {/*thirdTAB*/}
                <div style={{marginTop:40}} className="admin-choose-plan">
                    <div className="admin-choose-apartments-plan">
                        <div className="admin-title">
                            Apartments plan
                        </div>
                        <div className="multiple-buttons-container">
                            <button className={`multiple-button active`}>Studio</button>
                            <button   className={`multiple-button`}>1</button>
                            <button   className={`multiple-button`}>2</button>
                            <button   className={`multiple-button`}>3</button>
                            <button  className={`multiple-button`}
                            >4+</button>
                        </div>

                    </div>
                    <div className="admin-choose-plan-pagination">
                        <div className="arrows">
                            <img src={left} ref={navigationPrevRef}/>
                            <img src={right} ref={navigationNextRef}/>
                        </div>
                    </div>
                </div>
                <div className="admin-plans">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={200}
                        className="mySwiper"

                        modules={[Pagination, Navigation]}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}

                    >
                    </Swiper>

                </div>

                {/*fourthTAB*/}
                {/*fifthTAB*/}
                <div className="infrastructure-desc">
                    <div className="infrastructure-desc-component">
                        <div className="admin-title">
                            Infrastructure amenity 1
                        </div>
                        <div className="infrastructure-desc-component-photo"  >
                            <img src={ add} alt="Click to choose a file" />
                        </div>
                        <input className={"admin-location-input"} placeholder={"Name of amenity"}/>
                        <textarea  placeholder="Create a short description of the property"/>
                    </div>
                    <div className="infrastructure-desc-component">
                        <div className="admin-title">
                            Infrastructure amenity 2
                        </div>
                        <div className="infrastructure-desc-component-photo">
                            <img src={add} alt="Click to choose a file"  />
                        </div>
                        <input className={"admin-location-input"} placeholder={"Name of amenity"}/>
                        <textarea placeholder="Create a short description of the property"/>
                    </div>
                    <div className="infrastructure-desc-component">
                        <div className="admin-title">
                            Infrastructure amenity 3
                        </div>
                        <div className="infrastructure-desc-component-photo"  >
                            <img src={add} alt="Click to choose a file" />
                        </div>
                        <input className={"admin-location-input"} placeholder={"Name of amenity"} />
                        <textarea  placeholder="Create a short description of the property"/>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default UpdateProject;
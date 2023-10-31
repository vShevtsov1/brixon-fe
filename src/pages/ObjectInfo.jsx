import "../styles/objectInfo.css"
import photo from "../assets/images/infoimagehero.png"
import about_house from "../assets/images/about_house.png"
import left_nav from "../assets/left_nav.png"
import right_nav from "../assets/right_nav.png"
import plan from "../assets/plan.png"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import left from "../assets/arrow_left.png";
import right from "../assets/arrow_right.png";
import GoogleMapReact from "google-map-react";
import {Marker} from "@react-google-maps/api";
import MapComponentInfo from "../components/MapComponentInfo.jsx";

const ObjectInfo = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState(null)
    const [selectedGallery, setSelectedGallery] = useState("Architecture")
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedPlanP, setSelectedPlanP] = useState(null);
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    const [location,setLocaion]=useState({})

    const handlePlanClick = (planKey) => {
        setSelectedPlan(planKey);
    };
    const handlePlanPlick = (planKey) => {
        setSelectedPlanP(planKey);
    };
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/projects/' + projectId,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const lngValue = parseFloat(response.data.lng);
                const latValue = parseFloat(response.data.lat);
                if (!isNaN(lngValue) && !isNaN(latValue)) {
                    // Both lngValue and latValue are valid numbers
                    setLocaion({ lng: lngValue, lat: latValue });
                } else {
                    // Handle the case where lngValue or latValue are not valid numbers
                    console.error('Invalid longitude or latitude values in response');
                }
                for (const key in response.data.paymentPlans) {
                    setSelectedPlan(key);
                    setSelectedPlanP(key);
                    break;
                }

                setProject(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [projectId]);
    const center = {
        lat: 25.152033492170037,
        lng: 55.32550889425454,
    };
    if (!project && location===null) {
        return null;
    }
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let paymentTotal = 0;
    let formattedPaymentTotal = 0;
    if(project!=null){
     paymentTotal = parseFloat(project.paymentPlans[selectedPlanP].sum1) +
        parseFloat(project.paymentPlans[selectedPlanP].sum2) +
        parseFloat(project.paymentPlans[selectedPlanP].sum3) +
        parseFloat(project.paymentPlans[selectedPlanP].sum4);
         formattedPaymentTotal = formatNumberWithCommas(paymentTotal.toString());
    }


    if(project===null && selectedPlan===null && selectedPlanP===null){
        return null;
    }

    return (<div className={"object-info-container"}>
        <div className="hero" style={{
            backgroundImage: `
    linear-gradient(347deg, rgba(0, 0, 0, 0.71) 6.13%, rgba(0, 0, 0, 0.00) 25.83%), 
    linear-gradient(91deg, rgba(0, 0, 0, 0.78) 20.63%, rgba(0, 0, 0, 0.25) 79.1%),
    url(${project.imageSrcMain})
  `,
            backgroundSize: '100% 127.409%, 100% 100%, cover',
            backgroundPosition: '0 0, 0 0, center',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        }}>

            <div className="info">
                <div className="info-block1">
                    <div className="location-block">
                        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M7.50014 2C4.02188 2 1.23926 4.43478 1.23926 7.91306C1.23926 11.7391 6.10884 18 7.50014 18C8.89144 18 13.761 11.0435 13.761 7.91306C13.761 4.43478 10.9784 2 7.50014 2ZM7.50014 10.3478C8.65274 10.3478 9.5871 9.41348 9.5871 8.26088C9.5871 7.10829 8.65274 6.17392 7.50014 6.17392C6.34754 6.17392 5.41318 7.10829 5.41318 8.26088C5.41318 9.41348 6.34754 10.3478 7.50014 10.3478Z"
                                  fill="#407BFF"/>
                        </svg>
                        {project.selectedLocation || project.ownLocation}
                    </div>
                    <div className="name-block-info">
                        {project.projectName}
                    </div>
                    <div className="project-type">
                        {project.selectedType}
                    </div>
                </div>
                <div className="learn-more-block">
                    <span></span>
                    <div className="learn-more-text">
                        Learn more
                    </div>
                </div>

            </div>
            <div className="image-container">
                <div className="image-info">
                    <div className="image-info_info">
                        <span>Price</span>
                        <span>{formatNumberWithCommas(project.priceFrom)} AED</span>
                    </div>
                    <div className="image-info_info">
                        <span>Rooms</span>
                        <span>
  {project.selectedBedrooms === "1"
      ? '1'
      : project.selectedBedrooms === 'Studio'
          ? 'Studio'
          : project.selectedBedrooms === "2"
              ? '1-2'
              : project.selectedBedrooms === "3"
                  ? '1-3'
                  : project.selectedBedrooms === '4+'
                      ? '4+'
                      : ''}
</span>
                    </div>
                    <div className="image-info_info">
                        <span>Handover</span>
                        <span>{project.selectedMonth}q 20{project.selectedYear}</span>
                    </div>
                </div>
            </div>
            <div className="header-block">
                <span style={{color:"white",fontFamily:"Montserrat, sans-serif",fontWeight:900,fontSize:20}}>{project.developer}</span>

                <div className="navigation-block">
                    <a href={"#target-div"}>Projects</a>
                    <a href={"#location"}>Location</a>
                    <a href={"#infrastructure"}>Infrastructure</a>
                    <a href={"#payment"}>Plan</a>
                    <a href={"#gallery"}>Gallery</a>
                </div>
                <div className="language-dropdown">
                    <select>
                        <option value="en">En</option>
                        <option value="ru">RU</option>

                    </select>

                </div>
            </div>
        </div>
        <div className="about">
            <div className="about-container">
                <div className="about-project">
                    <div className="title">About the project</div>
                    <div className="info">
                        {project.description}
                    </div>
                </div>
                <img src={project.exterior} alt="About House"/>
            </div>

        </div>
        <div id="infrastructure" className="infrastructure">
            <div className="infrastructure-container">
                <div className="infrastructure-component__title">
                    Infrastructure
                </div>
                <div className="infrastructure-component__blocks">

                    <div className="infrastructure-component__blocks__block">
                        <img
                            src={project.infrastructures[0].imgSrc}/>
                        <div className="infrastructure-component__blocks__block__info">
                            <span>{project.infrastructures[0].name}</span>
                            <span>{project.infrastructures[0].desc}</span>
                        </div>
                    </div>
                    <div className="infrastructure-component__blocks__block">
                        <img
                            src={project.infrastructures[1].imgSrc}/>
                        <div className="infrastructure-component__blocks__block__info">
                            <span>{project.infrastructures[1].name}</span>
                            <span>{project.infrastructures[1].desc}</span>
                        </div>
                    </div>
                    <div className="infrastructure-component__blocks__block">
                        <img
                            src={project.infrastructures[2].imgSrc}/>
                        <div className="infrastructure-component__blocks__block__info">
                            <span>{project.infrastructures[2].name}</span>
                            <span>{project.infrastructures[2].desc}</span>
                        </div>
                    </div>
                </div>


            </div>

        </div>
        <div id="gallery" className="gallery">
            <div className="gallery-container">
                <div className="title-block">
                    <div className="tittle-block__tittle">
                        Gallery
                    </div>
                    <div className="tittle-block-buttons">
                        <div className="tittle-block-buttons-line">
                            <span></span>
                        </div>
                        <div className="tittle-block-buttons-button-block">
                            <div
                                className={`tittle-block-buttons-button${selectedGallery === 'Architecture' ? '-active' : ''}`}
                                onClick={() => setSelectedGallery("Architecture")}
                                style={{cursor: "pointer"}}
                            >
                                Architecture
                            </div>
                            <div
                                className={`tittle-block-buttons-button${selectedGallery === 'Interior' ? '-active' : ''}`}
                                onClick={() => setSelectedGallery("Interior")}
                                style={{cursor: "pointer"}}
                            >
                                Interior
                            </div>
                        </div>
                    </div>
                </div>
                <div className="galerry">
                    <div className="left-section">
                        <img
                            src={selectedGallery === 'Architecture' ? project.interiorGallery[0] : project.architectureGallery[0]}
                        />
                    </div>
                    <div className="right-section">
                        <img
                            src={selectedGallery === 'Architecture' ? project.interiorGallery[1] : project.architectureGallery[1]}/>
                        <img
                            src={selectedGallery === 'Architecture' ? project.interiorGallery[2] : project.architectureGallery[2]}/>
                        <img
                            src={selectedGallery === 'Architecture' ? project.interiorGallery[3] : project.architectureGallery[3]}/>
                        <img
                            src={selectedGallery === 'Architecture' ? project.interiorGallery[4] : project.architectureGallery[4]}/>
                    </div>

                </div>
            </div>
        </div>
        <div className="layout">
            <div className="layout-container">

                <div className="title-block">
                    <div className="title-block-buttons">
                        <div className="tittle-block__tittle">
                            Layout
                        </div>
                        <div className="tittle-block-buttons">
                            <div className="tittle-block-buttons-line">
                                <span></span>
                            </div>
                            <div className="tittle-block-buttons-button-block">

                                {project.plans["Studio"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlan === "Studio" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlan("Studio")}
                                >
                                    Studio
                                </div>
                                }
                                {project.plans["1"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlan === "1" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlan("1")}
                                >
                                    1
                                </div>
                                }
                                {project.plans["2"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlan === "2" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlan("2")}
                                >
                                    2
                                </div>
                                }
                                {project.plans["3"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlan === "3" ? '-active' : ''}`}

                                    onClick={() => setSelectedPlan("3")}>
                                    3
                                </div>
                                }
                                {project.plans["4+"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlan === "4+" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlan("4+")}
                                >
                                    4+
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="title-block-nav">
                        <img src={left_nav} ref={navigationPrevRef}/>
                        <img src={right_nav} ref={navigationNextRef}/>
                    </div>

                </div>
                <div className="gallery-blocks">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={100}
                        modules={[Pagination, Navigation]}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}

                    >
                        {project.plans[selectedPlan].map((plan, index) => (
                            <SwiperSlide key={index}>
                                <div className="gallery-blocks__block" key={index}>
                                    <div className="img-block">
                                        <img src={plan.imgSrc}/> {/* Use the imgSrc from the plan object */}
                                    </div>
                                    <div className="layout-size-prices-block">
                                        <div className="price-block">
                                            <span>AED {formatNumberWithCommas(plan.price)}</span> {/* Use the price from the plan object */}
                                            <span>{(plan.price / plan.size).toFixed(2)} AED/m2</span> {/* Use the size from the plan object */}
                                        </div>
                                        <div className="size-block">
                                            <span>{plan.size}sq.ft</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>


                </div>
            </div>
        </div>
        <div id="payment" className="payment">
            <div className="payment-container">
                <div className="title-block">
                    <div className="title-block-buttons">
                        <div className="tittle-block__tittle">
                            Payment plan
                        </div>
                        <div className="tittle-block-buttons">
                            <div className="tittle-block-buttons-line">
                                <span></span>
                            </div>
                            <div className="tittle-block-buttons-button-block">

                                {project.plans["Studio"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlanP === "Studio" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlanP("Studio")}
                                >
                                    Studio
                                </div>
                                }
                                {project.plans["1"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlanP === "1" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlanP("1")}
                                >
                                    1
                                </div>
                                }
                                {project.plans["2"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlanP === "2" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlanP("2")}
                                >
                                    2
                                </div>
                                }
                                {project.plans["3"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlanP === "3" ? '-active' : ''}`}

                                    onClick={() => setSelectedPlanP("3")}>
                                    3
                                </div>
                                }
                                {project.plans["4+"].length != 0 && <div
                                    className={`tittle-block-buttons-button${selectedPlanP === "4+" ? '-active' : ''}`}
                                    onClick={() => setSelectedPlanP("4+")}
                                >
                                    4+
                                </div>
                                }
                            </div>
                        </div>
                    </div>


                </div>
                <div className="payment-container-main">
                    <div className="payment-table">
                        <table className="custom-table">
                            <thead>
                            <tr>
                                <th style={{height:50,verticalAlign:"top"}}>Stage</th>
                                <th style={{height:50,verticalAlign:"top"}}>Percent</th>
                                <th style={{height:50,verticalAlign:"top"}}>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Booking</td>
                                <td>{project.paymentPlans[selectedPlanP].percent1}%</td>
                                <td>AED {formatNumberWithCommas(project.paymentPlans[selectedPlanP].sum1)}</td>
                            </tr>
                            <tr>
                                <td>During Construction</td>
                                <td>{project.paymentPlans[selectedPlanP].percent2}%</td>
                                <td>AED {formatNumberWithCommas(project.paymentPlans[selectedPlanP].sum2)}</td>
                            </tr>
                            <tr>
                                <td>On Handover</td>
                                <td>{project.paymentPlans[selectedPlanP].percent3}%</td>
                                <td>AED {formatNumberWithCommas(project.paymentPlans[selectedPlanP].sum3)}</td>
                            </tr>
                            <tr>
                                <td>After Handover</td>
                                <td>{project.paymentPlans[selectedPlanP].percent4}%</td>
                                <td>AED {formatNumberWithCommas(project.paymentPlans[selectedPlanP].sum4)}</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="total-container">
                    <div style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        gap: 24,
                        display: 'inline-flex'
                    }}>
                        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                            <div style={{
                                color: 'white',
                                fontSize: 20,
                                fontFamily: 'Montserrat',
                                fontWeight: '500',
                                textTransform: 'capitalize',
                                wordWrap: 'break-word'
                            }}>Total
                            </div>
                            <div style={{width: 24, height: 2, background: '#407BFF', borderRadius: 100}}/>
                        </div>
                        <div style={{
                            color: 'white',
                            fontSize: 20,
                            fontFamily: 'Montserrat',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            wordWrap: 'break-word'
                        }}> AED {formattedPaymentTotal}</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="location" className="location-object">
            <div className="location-container">
                <div className="location-title">
                    <span>Location</span>
                    <span>{project.selectedLocation || project.ownLocation}</span>
                </div>

                <div className="map-location" style={{width: "100%", height: "100%"}}>
                    {location!=null&&(
                        <MapComponentInfo
                            markerCenter={location}
                        />)}

                </div>
            </div>
        </div>
        <div className="footer">
            <div className="footer-logo">
                <span style={{color:"white",fontFamily:"Montserrat, sans-serif",fontWeight:900,fontSize:20}}>{project.developer}</span>
            </div>
            <div className="footer-nav">
                <a href={"#target-div"}>Projects</a>
                <a href={"#location"}>Location</a>
                <a href={"#infrastructure"}>Infrastructure</a>
                <a href={"#payment"}>Plan</a>
                <a href={"#gallery"}>Gallery</a>
            </div>
            <div className="footer-rules">
                <span>© All Rights Reserved.</span>
                <span>Privacy policy</span>
            </div>
        </div>
    </div>)
}
export default ObjectInfo
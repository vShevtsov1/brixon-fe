import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Swiper navigation styles


import SwiperCore from 'swiper/core';

import '../styles/ModalProject.css';
import {Autoplay, Navigation, Pagination} from "swiper/modules";

SwiperCore.use([Autoplay]);
import planModal from "../assets/planModal.png"
import {Data} from "@react-google-maps/api";
import {useNavigate} from "react-router-dom";
const ModalProject = ({project,setModalVisible}) => {
    const [selectedPlan,setSelectedPlan] = useState(null)
    const [selectedPlanP,setSelectedPlanP] = useState(null)
    const [showPlans,setShowPlans] =useState(false);
    const history = useNavigate()
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let paymentTotal = 0;

    let formattedPaymentTotal = 0;
    if(project!=null && selectedPlan!=null){
        paymentTotal = parseFloat(project.paymentPlans[selectedPlan].sum1) +
            parseFloat(project.paymentPlans[selectedPlan].sum2) +
            parseFloat(project.paymentPlans[selectedPlan].sum3) +
            parseFloat(project.paymentPlans[selectedPlan].sum4);
        formattedPaymentTotal = formatNumberWithCommas(paymentTotal.toString());
    }
    useEffect(() => {
        for (const key in project.paymentPlans) {
            setSelectedPlan(key);
            setSelectedPlanP(key);
            break;
        }
    }, []);
    if(selectedPlan===null){
        return null;
    }
    return (
        <div style={{width: "100%", height: "100%",display:"flex",gap:20,flexDirection:"column"}}>
            <div className="close-project" onClick={()=>setModalVisible(false)}>X</div>
            <div className="projects-block1"
                 style={{height: 200, width: "100%", display: "flex", justifyContent: "space-between"}}>
                <div className="projects-images" style={{height: "100%", width: "80%"}}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={5}
                        autoplay={{
                            delay: 1800,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        allowTouchMove={false}
                    >
                        {project.interiorGallery.map((plan, index) => (
                            index !== 0 && (
                                <SwiperSlide key={index}>
                                    <div key={index}>
                                        <img src={plan} alt={`Image ${index}`} style={{
                                            objectFit: "cover",
                                            width: "262px",
                                            height: "180px",
                                            borderRadius: 7
                                        }}/>
                                    </div>
                                </SwiperSlide>
                            )
                        ))}

                        {project.architectureGallery.map((plan, index) => (
                            index !== 0 && (
                                <SwiperSlide key={index}>
                                    <div key={index}>
                                        <img src={plan} alt={`Image ${index}`} style={{
                                            objectFit: "cover",
                                            width: "262px",
                                            height: "180px",
                                            borderRadius: 7
                                        }}/>
                                    </div>
                                </SwiperSlide>
                            )
                        ))}
                    </Swiper>
                </div>
                <div className="open-plans"
                     style={{width: "162px", height: "180px", borderRadius: 23,position:"relative"}}>
                    <img src={planModal} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:23}}/>
                    <div className="show-plans-button" onClick={()=>setShowPlans(true)} style={{
                        width: 95,
                        height: 36,
                        background: "#000",
                        borderRadius: 8,
                        position: "absolute",
                        top: "50%", // Center vertically
                        left: "50%", // Center horizontally
                        transform: "translate(-50%, -50%)", // Center both horizontally and vertically
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>                           <span>
                               Show plans
                           </span>
                    </div>
                </div>


            </div>

            <div className="projects-block2" style={{width:"100%",display:"flex",gap:20}}>
                <div className="project-info-block" style={{width:"30%",display:"flex",flexDirection:"column"}}>
                    <div className="project-name-location">
                        <span>{project.projectName}</span>
                        <span>
                            <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M7.50014 2C4.02188 2 1.23926 4.43478 1.23926 7.91306C1.23926 11.7391 6.10884 18 7.50014 18C8.89144 18 13.761 11.0435 13.761 7.91306C13.761 4.43478 10.9784 2 7.50014 2ZM7.50014 10.3478C8.65274 10.3478 9.5871 9.41348 9.5871 8.26088C9.5871 7.10829 8.65274 6.17392 7.50014 6.17392C6.34754 6.17392 5.41318 7.10829 5.41318 8.26088C5.41318 9.41348 6.34754 10.3478 7.50014 10.3478Z"
                                      fill="#407BFF"/>
                            </svg>
                            {project.selectedLocation || project.ownLocation}
                        </span>
                    </div>
                    <div className={"project-line"} style={{marginBottom:20}}/>
                    <div className="project-variables">
                        <div className="project-variables-block">
                            <span>PRICE</span>
                            <span>{formatNumberWithCommas(project.priceFrom)} AED</span>
                        </div>
                        <div className="project-variables-block">
                            <span>ROOMS</span>
                            <span> {project.selectedBedrooms === "1"
                                ? '1'
                                : project.selectedBedrooms === 'Studio'
                                    ? 'Studio'
                                    : project.selectedBedrooms === "2"
                                        ? '1-2'
                                        : project.selectedBedrooms === "3"
                                            ? '1-3'
                                            : project.selectedBedrooms === '4+'
                                                ? '4+'
                                                : ''}</span>
                        </div>
                        <div className="project-variables-block">
                            <span>HANDOVER</span>
                            <span>{project.selectedMonth}Q 20{project.selectedYear}</span>
                        </div>
                        <div className="project-variables-block">
                            <span>SIZE</span>
                            <span>{project.sizeFrom} sq.ft</span>
                        </div>
                    </div>
                    <div className="project-buttons" style={{marginTop:50}}>
                        <div style={{ cursor: "pointer" }} onClick={() => window.open(`/pdf?projectid=${project._id}`, '_blank')}> <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 22 22" fill="none">
                            <path d="M3.125 13.625C3.125 16.0998 3.125 17.3373 3.89384 18.1061C4.66269 18.875 5.90012 18.875 8.375 18.875H13.625C16.0998 18.875 17.3373 18.875 18.1061 18.1061C18.875 17.3373 18.875 16.0998 18.875 13.625" stroke="white" style={{ stroke: 'white', strokeOpacity: 1 }} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 3.125V14.5M11 14.5L14.5 10.6719M11 14.5L7.5 10.6719" stroke="white" style={{ stroke: 'white', strokeOpacity: 1 }} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                            PDF
                        </div>
                        <div style={{ cursor: "pointer" }} onClick={() => window.open(`/object-info/${project._id}`, '_blank')}>
                            <svg fill="none" height="22px" viewBox="0 0 24 24" width="22px" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m16 2.25h5 .75v.75 5c0 .41421-.3358.75-.75.75s-.75-.33579-.75-.75v-3.18934l-8.7197 8.71964c-.2929.2929-.7677.2929-1.0606 0s-.2929-.7677 0-1.0606l8.7196-8.7197h-3.1893c-.4142 0-.75-.33579-.75-.75s.3358-.75.75-.75zm-7.6 2h-.033c-1.09214-.00001-1.95764-.00001-2.65527.05699-.71338.05828-1.31701.17989-1.86818.46073-.89377.4554-1.62043 1.18205-2.07583 2.07582-.28084.55118-.40245 1.1548-.46073 1.86819-.057.69762-.05699 1.56307-.05699 2.65527v.033 4.2.033c0 1.0922-.00001 1.9577.05699 2.6553.05828.7134.17989 1.317.46073 1.8682.4554.8937 1.18206 1.6204 2.07583 2.0758.55117.2808 1.1548.4024 1.86818.4607.69762.057 1.56312.057 2.65525.057h.03302 4.2.033c1.0922 0 1.9576 0 2.6553-.057.7134-.0583 1.317-.1799 1.8682-.4607.8937-.4554 1.6204-1.1821 2.0758-2.0758.2808-.5512.4024-1.1548.4607-1.8682.057-.6977.057-1.5631.057-2.6553v-.033-1.6h-1.5v1.6c0 1.1325-.0006 1.9367-.052 2.5661-.0507.6206-.1471 1.0049-.3022 1.3094-.3116.6115-.8088 1.1087-1.4203 1.4203-.3045.1551-.6888.2515-1.3094.3022-.6294.0514-1.4336.052-2.5661.052h-4.2c-1.13248 0-1.93673-.0006-2.56612-.052-.62063-.0507-1.00488-.1471-1.30935-.3022-.61152-.3116-1.10871-.8088-1.4203-1.4203-.15514-.3045-.25152-.6888-.30222-1.3094-.05143-.6294-.05201-1.4336-.05201-2.5661v-4.2c0-1.1325.00058-1.93674.05201-2.56612.0507-.62063.14708-1.00488.30222-1.30935.31159-.61153.80878-1.10871 1.4203-1.4203.30447-.15514.68872-.25152 1.30935-.30222.62939-.05143 1.43364-.05201 2.56612-.05201h1.6v-1.5z" fill="white" fill-rule="evenodd"/></svg>
                            Open Offer
                        </div>
                    </div>
                </div>
                <div className="project-payment-plan" style={{width:"70%",display:"flex",flexDirection:"column",gap:20,background:"black",borderRadius:10,padding:20}}>
                    <div className={"projects-payment-header"}>
                        <div>
                            Payment plan
                        </div>
                        <div className="projects-buttons">
                            <div className="tittle-block-buttons-line">
                                <span></span>
                            </div>
                            {project.plans["Studio"].length != 0 && <div
                                className={`project-block-buttons${selectedPlan === "Studio" ? '-active' : ''}`}
                                onClick={()=>setSelectedPlan("Studio")}
                            >
                                Studio
                            </div>
                            }
                            {project.plans["1"].length != 0 && <div
                                className={`project-block-buttons${selectedPlan === "1" ? '-active' : ''}`}
                                onClick={()=>setSelectedPlan("1")}
                            >
                                1
                            </div>
                            }
                            {project.plans["2"].length != 0 && <div
                                className={`project-block-buttons${selectedPlan === "2" ? '-active' : ''}`}
                                onClick={()=>setSelectedPlan("2")}
                            >
                                2
                            </div>
                            }
                            {project.plans["3"].length != 0 && <div
                                className={`project-block-buttons${selectedPlan === "3" ? '-active' : ''}`}
                                onClick={()=>setSelectedPlan("3")}
                                >
                                3
                            </div>
                            }
                            {project.plans["4+"].length != 0 && <div
                                className={`project-block-buttons${selectedPlan === "4+" ? '-active' : ''}`}
                                onClick={()=>setSelectedPlan("4+")}
                            >
                                4+
                            </div>
                            }
                        </div>

                    </div>
                    <div className="projects-table" style={{width:"100%"}}>
                       <div className="projects-table-header" style={{width:"100%"}}>
                           <div className="projects-column">Stage</div>
                           <div className="projects-column">Percent</div>
                           <div className="projects-column">Price</div>
                       </div>
                        <div className="projects-table-body">
                            <div className="row">
                                <div className="column1">Booking</div>
                                <div className="column2">{project.paymentPlans[selectedPlan].percent1}%</div>
                                <div className="column3">{formatNumberWithCommas(project.paymentPlans[selectedPlan].sum1)} AED</div>

                            </div>
                            <div className="row">
                                <div className="column1">During Construction</div>
                                <div className="column2">{project.paymentPlans[selectedPlan].percent2}%</div>
                                <div className="column3">{formatNumberWithCommas(project.paymentPlans[selectedPlan].sum2)} AED</div>
                            </div>
                            <div className="row">
                                <div className="column1">On Handover</div>
                                <div className="column2">{project.paymentPlans[selectedPlan].percent3}%</div>
                                <div className="column3">{formatNumberWithCommas(project.paymentPlans[selectedPlan].sum3)} AED</div>
                            </div>
                            <div className="row">
                                <div className="column1">After Handover</div>
                                <div className="column2">{project.paymentPlans[selectedPlan].percent4}%</div>
                                <div className="column3">{formatNumberWithCommas(project.paymentPlans[selectedPlan].sum4)} AED</div>
                            </div>
                        </div>
                        <div className="projects-table-footer">
                            <div className="tittle-block-buttons-line">
                                <span></span>
                            </div>
                            {formattedPaymentTotal} AED
                        </div>
                    </div>
                </div>

            </div>

            <div className="close-projects" style={{width:"100%",display:"flex",justifyContent:"center"}}>


            </div>
            {showPlans&&
            <div className="project-modal-plan">

                <div className="project-modal-plan-buttons">
                    <div className="project-modal-plan-buttons-container">
                        {project.plans["Studio"].length != 0 && <selectedPlanP
                            className={`project-modal-plan-button${selectedPlan === "Studio" ? '-active' : ''}`}
                            onClick={()=>setSelectedPlanP("Studio")}
                        >
                            S
                        </selectedPlanP>
                        }
                        {project.plans["1"].length != 0 && <div
                            className={`project-modal-plan-button${selectedPlanP === "1" ? '-active' : ''}`}
                            onClick={()=>setSelectedPlanP("1")}
                        >
                            1
                        </div>
                        }
                        {project.plans["2"].length != 0 && <div
                            className={`project-modal-plan-button${selectedPlanP === "2" ? '-active' : ''}`}
                            onClick={()=>setSelectedPlanP("2")}
                        >
                            2
                        </div>
                        }
                        {project.plans["3"].length != 0 && <div
                            className={`project-modal-plan-button${selectedPlanP === "3" ? '-active' : ''}`}
                            onClick={()=>setSelectedPlanP("3")}
                        >
                            3
                        </div>
                        }
                        {project.plans["4+"].length != 0 && <div
                            className={`project-modal-plan-button${selectedPlanP === "4+" ? '-active' : ''}`}
                            onClick={()=>setSelectedPlanP("4+")}
                        >
                            4+
                        </div>
                        }
                    </div>
                </div>
                <div className="project-modal-cards">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={65}

                        modules={[Pagination, Navigation]}
                    >
                        {project.plans[selectedPlanP].map((plan, index) => (
                            <SwiperSlide key={index}>
                                <div className="gallery-blocks__block" key={index}>
                                    <div className="img-block">
                                        <img src={plan.imgSrc}/> {/* Use the imgSrc from the plan object */}
                                    </div>
                                    <div className="layout-size-prices-block">
                                        <div className="price-block">
                                            <span>AED {formatNumberWithCommas(plan.price)}</span> {/* Use the price from the plan object */}
                                            <span>{(parseFloat(plan.price) / parseFloat(plan.size)).toFixed(2)} AED/m2</span> {/* Use the size from the plan object */}
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
                <div className="projects-hide-modal-cards">
                        <div className="projects-hide-button" onClick={()=>setShowPlans(false)}>
                            Hide
                        </div>
                </div>
            </div>
            }
        </div>
    );
};

export default ModalProject;

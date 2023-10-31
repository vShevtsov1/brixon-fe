import React, {useRef, useState} from "react";
import left from "../assets/arrow_left.png"
import right from "../assets/arrow_right.png"
import add from "../assets/add.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import {Store} from "react-notifications-component";


const AdminPage3 = ({dataThird,setFirstTabData}) => {
    const [fileInputRefs, setFileInputRefs] = useState({
        "Studio":[],
        "1":[],
        "2":[],
        "3":[],
        "4+":[]
    });
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    const handleBedroomsChange = (bedrooms) => {
        setFirstTabData({"selectedBedrooms":bedrooms})
    };

    const addNextPlan = () => {

        const prevPlans = dataThird.plans
        prevPlans[dataThird.selectedBedrooms]+=1
        setFirstTabData({"plans":prevPlans})

        setFileInputRefs((prevRefs) => ({
            ...prevRefs,
            [dataThird.selectedBedrooms]: [...prevRefs[dataThird.selectedBedrooms], React.createRef()],
        }));

        const newData = {
            imgSrc: "",
            price: "",
            size: "",
            imageFile:"",
        };
        const updatedData = {
            ...dataThird.data,
            [dataThird.selectedBedrooms]: dataThird.data[dataThird.selectedBedrooms].concat(newData)
        };

        setFirstTabData({"data":updatedData})


    };

    function handleFileChangeMain(planIndex, event) {
        const file = event.target.files[0];
        const maxSize = 500 * 1024; // 500KB

        if (file.size > maxSize) {
            // Show an alert for exceeding the file size limit
            Store.addNotification({
                title: "File Size Exceeded",
                message: "Please select a file smaller than 500KB.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__flipInY"],
                animationOut: ["animate__animated", "animate__flipOutX"],
                dismiss: {
                    duration: 5000
                }
            });
            event.target.value = null;
        } else {
            const selectedBedroom = dataThird.selectedBedrooms;
            const updatedData = { ...dataThird.data };

            updatedData[selectedBedroom] = updatedData[selectedBedroom].map((plan, index) => {
                if (index === planIndex) {
                    return {
                        ...plan,
                        imgSrc: URL.createObjectURL(file),
                        imageFile: file
                    };
                }
                return plan;
            });

            setFirstTabData({ data: updatedData });
        }
    }

    const handlePriceChange = (index, event) => {
        const { value } = event.target;
        const selectedBedroom = dataThird.selectedBedrooms;

        // Remove commas from the value
        const cleanedValue = value.replace(/,/g, '');

        // Clone the data object
        const updatedData = { ...dataThird.data };

        // Update the price for the selected bedroom at the specified index
        updatedData[selectedBedroom] = updatedData[selectedBedroom].map((plan, i) => {
            if (i === index) {
                return {
                    ...plan,
                    price: cleanedValue,
                };
            }
            return plan;
        });

        setFirstTabData({ data: updatedData });
    };

    //
    const handleSizeChange = (index, event) => {
        const { value } = event.target;
        const selectedBedroom = dataThird.selectedBedrooms;
        const updatedData = { ...dataThird.data };

        updatedData[selectedBedroom] = updatedData[selectedBedroom].map((plan, i) => {
            if (i === index) {
                return {
                    ...plan,
                    size: value
                };
            }
            return plan;
        });
        setFirstTabData({data:updatedData})
    };

    function removePlan(index1) {
        const updatedData = { ...dataThird.data };
        const selectedBedroom = dataThird.selectedBedrooms;
        updatedData[selectedBedroom].splice(index1, 1);
        setFirstTabData({data:updatedData})
        setFileInputRefs((prevState) => {
            const updatedFileInputRefs = { ...prevState };
            if (updatedFileInputRefs[selectedBedroom] && Array.isArray(updatedFileInputRefs[selectedBedroom])) {
                updatedFileInputRefs[selectedBedroom].splice(index1, 1);
            }
            return updatedFileInputRefs;
        });
    }
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(<div className={"admin-container"}>
        <div className="admin-choose-plan">
            <div className="admin-choose-apartments-plan">
                <div className="admin-title">
                    Apartments plan
                </div>
                <div className="multiple-buttons-container">
                    <button onClick={()=>handleBedroomsChange("Studio")} className={`multiple-button ${dataThird.selectedBedrooms === 'Studio' ? 'active' : ''}`}>Studio</button>
                    <button onClick={()=>handleBedroomsChange("1")}  className={`multiple-button ${dataThird.selectedBedrooms === '1' ? 'active' : ''}`}>1</button>
                    <button onClick={()=>handleBedroomsChange("2")}  className={`multiple-button ${dataThird.selectedBedrooms === '2' ? 'active' : ''}`}>2</button>
                    <button onClick={()=>handleBedroomsChange("3")}  className={`multiple-button ${dataThird.selectedBedrooms === '3' ? 'active' : ''}`}>3</button>
                    <button onClick={()=>handleBedroomsChange("4+")} className={`multiple-button ${dataThird.selectedBedrooms === '4+' ? 'active' : ''}`}
                    >4+</button>
                </div>

            </div>
            <div className="admin-choose-plan-pagination">
                <button onClick={()=>addNextPlan()}>Add more plans</button>
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
                {dataThird.data[dataThird.selectedBedrooms].map((item, index1) => (
                    <SwiperSlide key={index1}>
                        <div className="plan">
                            <div className="delete-plan-block"  style={{display:"flex",justifyContent:"space-between"}}>
                                <div className="admin-title" style={{width:"40%"}}>
                                    {"Photo plan " + (index1 + 1)}
                                </div>
                                <span style={{
                                    cursor: "pointer",
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: 900,
                                    color: "#407BFF"
                                }} onClick={()=>removePlan(index1)}>X</span>
                            </div>


                            <div
                                className="choose-logo-block"
                                onClick={() => fileInputRefs[dataThird.selectedBedrooms][index1].current && fileInputRefs[dataThird.selectedBedrooms][index1].current.click()}
                            >
                                <img
                                    src={item.imgSrc || add}
                                    alt="Click to choose a file"
                                    style={{ width: item.imgSrc && "361px", height: item.imgSrc && "340px" }}
                                />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRefs[dataThird.selectedBedrooms][index1]}
                                style={{ display: "none" }}
                                onChange={(event) => handleFileChangeMain(index1, event)} // Pass the correct index here
                            />
                            <div className="input-block-plan">
                                <input
                                    placeholder={"Price"}
                                    value={formatNumberWithCommas(item.price)}
                                    onChange={(event) => handlePriceChange(index1, event)}
                                />
                                <span>AED</span>
                            </div>
                            <div className="input-block-plan">
                                <input
                                    placeholder={"Size"}
                                    value={item.size}
                                    onChange={(event) => handleSizeChange(index1, event)}
                                />
                                <span>SQ.FT</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}



            </Swiper>

        </div>
    </div>)

}
export default AdminPage3
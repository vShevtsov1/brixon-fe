import Sidebar from "react-sidebar";
import "../styles/MenuStyle.css";
import {useState} from "react";
import RangeSlider from "react-range-slider-input";

const MenuFilter = ({ isOpen, setIsOpen,menuState,setMenuState,applyFiltersAndFindTheProject,resetFilter }) => {
    const style = {
        root: {
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden"

        },
        sidebar: {
            zIndex: 2,
            position: "absolute",

            top: 0,
            bottom: 0,
            transition: "transform .3s ease-out",
            WebkitTransition: "-webkit-transform .3s ease-out",
            willChange: "transform",
            overflowY: "auto"

        },
        content: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            transition: "left .3s ease-out, right .3s ease-out"
        },
        overlay: {
            zIndex: 10,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            visibility: "hidden",
            transition: "opacity .3s ease-out, visibility .3s ease-out",
            backgroundColor: "rgba(0,0,0,.3)"

        },
        dragHandle: {
            zIndex: 1,
            position: "fixed",
            top: 0,
            bottom: 0,

        }

    };




    const handleStateChange = (key, value) => {
        setMenuState({
            ...menuState,
            [key]: value,
        });
    };


    if (!isOpen) {
        return null;
    }
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <Sidebar sidebar={<div></div>} open={isOpen} styles={style}>
            <div className="sidebar-content" style={{ height: "100vh" }}>
                <div className="filter-container">
                    <div className="close-button" onClick={() => setIsOpen(false)}>
                        X
                    </div>
                    <div className="filter-content">
                        <div className="setting-block" style={{ width: 336 }}>
                            <div className="name-block">Completion status</div>
                            <div className="buttons-block">
                                <button
                                    onClick={() => handleStateChange("selectedStatus", "Any")}
                                    className={menuState.selectedStatus === "Any" ? "active" : ""}
                                >
                                    Any
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedStatus", "Off-Plan")}
                                    className={
                                        menuState.selectedStatus === "Off-Plan" ? "active" : ""
                                    }
                                    style={{
                                        width: 128,
                                        height: 36,
                                        padding: 0,
                                    }}
                                >
                                    Off-Plan
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedStatus", "Ready")}
                                    className={menuState.selectedStatus === "Ready" ? "active" : ""}
                                >
                                    Ready
                                </button>
                            </div>
                        </div>
                        <div className="setting-block" style={{ width: 283 }}>
                            <div className="name-block">Property Type</div>
                            <div className="buttons-block">
                                <button
                                    onClick={() => handleStateChange("selectedType", "Apartments")}
                                    className={
                                        menuState.selectedType === "Apartments" ? "active" : ""
                                    }
                                    style={{ width: 157 }}
                                >
                                    Apartments
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedType", "Villa")}
                                    className={menuState.selectedType === "Villa" ? "active" : ""}
                                >
                                    Villa
                                </button>
                            </div>
                            <div className="buttons-block">
                                <button
                                    onClick={() =>
                                        handleStateChange("selectedType", "Town house")
                                    }
                                    className={
                                        menuState.selectedType === "Town house" ? "active" : ""
                                    }
                                    style={{ width: 162 }}
                                >
                                    Town house
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedType", "Land")}
                                    className={menuState.selectedType === "Land" ? "active" : ""}
                                >
                                    Land
                                </button>
                            </div>
                        </div>
                        <div className="setting-block" style={{ width: 320, marginBottom: 25 }}>
                            <div className="name-block">Budget</div>
                            <RangeSlider
                                min={100000}
                                max={50000000}
                                step={100000}
                                value={menuState.budgetRange}
                                onInput={(value) =>
                                    handleStateChange("budgetRange", value)
                                }
                            />
                            <div className="ranges-block">
                                <div className="range">AED {formatNumberWithCommas(menuState.budgetRange[0].toString())}</div>
                                <div className="range">AED {formatNumberWithCommas(menuState.budgetRange[1].toString())}</div>
                            </div>
                        </div>
                        <div className="setting-block" style={{ width: 343, marginBottom: 25 }}>
                            <div className="name-block">Property room</div>
                            <div className="name-block-block">Bedrooms</div>
                            <div className="multiple-buttons-container">
                                <button
                                    onClick={() => handleStateChange("selectedBedrooms", "Studio")}
                                    className={`multiple-button ${
                                        menuState.selectedBedrooms === "Studio" ? "active" : ""
                                    }`}
                                >
                                    Studio
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedBedrooms", "1")}
                                    className={`multiple-button ${
                                        menuState.selectedBedrooms === "1" ? "active" : ""
                                    }`}
                                >
                                    1
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedBedrooms", "2")}
                                    className={`multiple-button ${
                                        menuState.selectedBedrooms === "2" ? "active" : ""
                                    }`}
                                >
                                    2
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedBedrooms", "3")}
                                    className={`multiple-button ${
                                        menuState.selectedBedrooms === "3" ? "active" : ""
                                    }`}
                                >
                                    3
                                </button>
                                <button
                                    onClick={() => handleStateChange("selectedBedrooms", "4+")}
                                    className={`multiple-button ${
                                        menuState.selectedBedrooms === "4+" ? "active" : ""
                                    }`}
                                >
                                    4+
                                </button>
                            </div>
                        </div>
                        <div className="setting-block" style={{ width: 320, marginBottom: 35 }}>
                            <div className="name-block">Property size</div>
                            <RangeSlider
                                min={100}
                                max={20000}
                                step={100}
                                value={menuState.sizeRange}
                                onInput={(value) => handleStateChange("sizeRange", value)}
                            />
                            <div className="ranges-block">
                                <div className="range">{menuState.sizeRange[0]} sqft</div>
                                <div className="range">{menuState.sizeRange[1]} sqft</div>
                            </div>
                        </div>
                        <div className="apply-filter">
                            <button className={"dont_have"} onClick={()=>applyFiltersAndFindTheProject()}>Apply filters</button>
                            <button className={"have_account"} onClick={()=>resetFilter()}>Reset filter</button>
                        </div>

                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default MenuFilter;
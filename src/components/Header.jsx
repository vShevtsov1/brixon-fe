import React, {useEffect, useState} from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png";
import search from "../assets/Search.png";
import profile from "../assets/profileimg.png";
import {Link} from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import defaultProfile from "../assets/defaultProfile.png"
const Header = ({ isModalOpen, setIsModalOpen,settings ,selectedCurrency,setSelectedCurrency}) => {
    const [generatedCode, setGeneratedCode] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userInfo,setUserInfo] = useState(null);

    const [showMenu,setShowMenu] = useState(false);

    const handleStorageChange = (e) => {
        if (e.key === 'user') {
            setUserInfo(JSON.parse(e.newValue));
        }
    };
    useEffect(() => {
        // Load initial data from localStorage
        const userJSON = localStorage.getItem('user');
        setUserInfo(JSON.parse(userJSON));

        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };


    function handleGenerateCode() {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/users/create-user',
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                setGeneratedCode(response.data.registrationCode)
                setIsOpen(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const customModalStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "15%",
            padding: "20px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },

    };
    if(userInfo === null){
        return null;
    }
    return (
        <header>
            <Link to={"/home"}><img className={"logo-image"} src={logo} alt={"logo-image"} /></Link>


            <div className="profile-block"  >
                <div className="setting-block-container" style={{display:!settings&&"none"}}>
                    <div className="setting-block">
                        <button
                            className={selectedCurrency === 'USD' ? 'active-settings' : 'inactive'}
                            onClick={() => handleCurrencyChange('USD')}
                        >
                            USD
                        </button>
                        <button
                            className={selectedCurrency === 'AED' ? 'active-settings' : 'inactive'}
                            onClick={() => handleCurrencyChange('AED')}
                        >
                            AED
                        </button>
                    </div>

                </div>

                <div className="profile-image"  onClick={()=>setShowMenu(!showMenu)}>
                    {userInfo.image ? (
                        <img src={userInfo.image} alt="profile-image" />
                    ) : (
                        <img src={defaultProfile} alt="default-profile-image" />
                    )}
                </div>
                {showMenu && (
                    <div className="dropdown-content">
                        <div className="menu-option" onClick={()=>{
                            setShowMenu(false)
                            setIsModalOpen(true)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7788 2.15224C14.4085 2 13.939 2 13 2C12.061 2 11.5915 2 11.2212 2.15224C10.7274 2.35523 10.3351 2.74458 10.1306 3.23463C10.0372 3.45834 10.0007 3.7185 9.98635 4.09799C9.96534 4.65568 9.67716 5.17189 9.19017 5.45093C8.70318 5.72996 8.10864 5.71954 7.61149 5.45876C7.27318 5.2813 7.02789 5.18262 6.78599 5.15102C6.25609 5.08178 5.72018 5.22429 5.29616 5.5472C4.97814 5.78938 4.74339 6.1929 4.2739 6.99993C3.80441 7.80697 3.56967 8.21048 3.51735 8.60491C3.44758 9.1308 3.59118 9.66266 3.91655 10.0835C4.06506 10.2756 4.27377 10.437 4.5977 10.639C5.07391 10.936 5.38032 11.4419 5.38029 12C5.38026 12.5581 5.07386 13.0639 4.5977 13.3608C4.27372 13.5629 4.06497 13.7244 3.91645 13.9165C3.59108 14.3373 3.44749 14.8691 3.51725 15.395C3.56957 15.7894 3.80432 16.193 4.2738 17C4.74329 17.807 4.97804 18.2106 5.29606 18.4527C5.72008 18.7756 6.25599 18.9181 6.78589 18.8489C7.02778 18.8173 7.27305 18.7186 7.61133 18.5412C8.10852 18.2804 8.7031 18.27 9.19012 18.549C9.67714 18.8281 9.96533 19.3443 9.98635 19.9021C10.0007 20.2815 10.0372 20.5417 10.1306 20.7654C10.3351 21.2554 10.7274 21.6448 11.2212 21.8478C11.5915 22 12.061 22 13 22C13.939 22 14.4085 22 14.7788 21.8478C15.2726 21.6448 15.6649 21.2554 15.8694 20.7654C15.9628 20.5417 15.9994 20.2815 16.0137 19.902C16.0347 19.3443 16.3228 18.8281 16.8098 18.549C17.2968 18.2699 17.8914 18.2804 18.3886 18.5412C18.7269 18.7186 18.9721 18.8172 19.214 18.8488C19.7439 18.9181 20.2798 18.7756 20.7038 18.4527C21.0219 18.2105 21.2566 17.807 21.7261 16.9999C22.1956 16.1929 22.4303 15.7894 22.4827 15.395C22.5524 14.8691 22.4088 14.3372 22.0835 13.9164C21.9349 13.7243 21.7262 13.5628 21.4022 13.3608C20.9261 13.0639 20.6197 12.558 20.6197 11.9999C20.6197 11.4418 20.9261 10.9361 21.4022 10.6392C21.7263 10.4371 21.935 10.2757 22.0836 10.0835C22.4089 9.66273 22.5525 9.13087 22.4828 8.60497C22.4304 8.21055 22.1957 7.80703 21.7262 7C21.2567 6.19297 21.022 5.78945 20.7039 5.54727C20.2799 5.22436 19.744 5.08185 19.2141 5.15109C18.9722 5.18269 18.7269 5.28136 18.3887 5.4588C17.8915 5.71959 17.2969 5.73002 16.8099 5.45096C16.3229 5.17191 16.0347 4.65566 16.0136 4.09794C15.9993 3.71848 15.9628 3.45833 15.8694 3.23463C15.6649 2.74458 15.2726 2.35523 14.7788 2.15224ZM13 15C14.6695 15 16.0228 13.6569 16.0228 12C16.0228 10.3431 14.6695 9 13 9C11.3305 9 9.97716 10.3431 9.97716 12C9.97716 13.6569 11.3305 15 13 15Z" fill="#F2F2F7"/>
                            </svg>
                            Settings

                        </div>
                        <div className="menu-option">
                            <Link to={"/my-projects"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839ZM14.4983 11.4394C14.8079 11.7146 14.8357 12.1887 14.5606 12.4983L11.8939 15.4983C11.7516 15.6584 11.5476 15.75 11.3333 15.75C11.1191 15.75 10.9151 15.6584 10.7728 15.4983L9.43944 13.9983C9.16426 13.6887 9.19214 13.2146 9.50173 12.9394C9.81131 12.6643 10.2854 12.6921 10.5606 13.0017L11.3333 13.8711L13.4394 11.5017C13.7146 11.1921 14.1887 11.1643 14.4983 11.4394Z" fill="#F2F2F7"/>
                            </svg>
                                My projects</Link>
                        </div>
                        <div className="menu-option">
                            <Link to={"/admin"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.56935 5.00839C2.5 5.37595 2.5 5.81722 2.5 6.69975V13.75C2.5 17.5212 2.5 19.4069 3.67157 20.5784C4.84315 21.75 6.72876 21.75 10.5 21.75H14.5C18.2712 21.75 20.1569 21.75 21.3284 20.5784C22.5 19.4069 22.5 17.5212 22.5 13.75V11.5479C22.5 8.91554 22.5 7.59935 21.7305 6.74383C21.6598 6.66514 21.5849 6.59024 21.5062 6.51946C20.6506 5.75 19.3345 5.75 16.7021 5.75H16.3284C15.1747 5.75 14.5979 5.75 14.0604 5.59678C13.7651 5.5126 13.4804 5.39471 13.2121 5.24543C12.7237 4.97367 12.3158 4.56578 11.5 3.75L10.9497 3.19975C10.6763 2.92633 10.5396 2.78961 10.3959 2.67051C9.77652 2.15704 9.01665 1.84229 8.21557 1.76738C8.02976 1.75 7.83642 1.75 7.44975 1.75C6.56722 1.75 6.12595 1.75 5.75839 1.81935C4.14031 2.12464 2.87464 3.39031 2.56935 5.00839ZM12.5 11C12.9142 11 13.25 11.3358 13.25 11.75V13H14.5C14.9142 13 15.25 13.3358 15.25 13.75C15.25 14.1642 14.9142 14.5 14.5 14.5H13.25V15.75C13.25 16.1642 12.9142 16.5 12.5 16.5C12.0858 16.5 11.75 16.1642 11.75 15.75V14.5H10.5C10.0858 14.5 9.75 14.1642 9.75 13.75C9.75 13.3358 10.0858 13 10.5 13H11.75V11.75C11.75 11.3358 12.0858 11 12.5 11Z" fill="#F2F2F7"/>
                            </svg>
                                Add project
                            </Link>
                        </div>

                        <div className="menu-option">
                            <Link to={"/all-projects"}>
                                <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M2,9H9V2H2ZM4,4H7V7H4Zm7-2V9h7V2Zm5,5H13V4h3ZM2,18H9V11H2Zm2-5H7v3H4Zm7,5h7V11H11Zm2-5h3v3H13Z"></path> </g> </g></svg>                                Projects
                            </Link>
                        </div>
                        {userInfo.userRole==="MANAGER"&&(
                        <div className="menu-option" onClick={()=>handleGenerateCode()}>

                            <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="24"   viewBox="0 0 60 60">

                                    <path d="M22 27h15a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1h-2v-2.5C35 7.467 32.532 5 29.5 5S24 7.467 24 10.5V13h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1zm4-16.5C26 8.57 27.57 7 29.5 7S33 8.57 33 10.5V13h-7v-2.5zM23 15h13v10H23V15zM49 33H11C4.935 33 0 37.935 0 44s4.935 11 11 11h38c6.065 0 11-4.935 11-11s-4.935-11-11-11zm0 20H11c-4.963 0-9-4.038-9-9s4.037-9 9-9h38c4.963 0 9 4.038 9 9s-4.037 9-9 9z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path><path d="M15.553 41.105 13 42.382V39a1 1 0 1 0-2 0v3.382l-2.553-1.276a1 1 0 0 0-.895 1.789l2.928 1.464L8.2 47.4a1 1 0 1 0 1.6 1.2l2.2-2.934 2.2 2.934a.997.997 0 0 0 1.4.2 1 1 0 0 0 .2-1.4l-2.281-3.041 2.928-1.464a1 1 0 0 0-.894-1.79zM27.553 41.105 25 42.382V39a1 1 0 1 0-2 0v3.382l-2.553-1.276a1 1 0 0 0-.895 1.789l2.928 1.464L20.2 47.4a1 1 0 1 0 1.6 1.2l2.2-2.934 2.2 2.934a.997.997 0 0 0 1.4.2 1 1 0 0 0 .2-1.4l-2.281-3.041 2.928-1.464a1 1 0 0 0-.894-1.79zM39.553 41.105 37 42.382V39a1 1 0 1 0-2 0v3.382l-2.553-1.276a1 1 0 0 0-.895 1.789l2.928 1.464L32.2 47.4a1 1 0 1 0 1.6 1.2l2.2-2.934 2.2 2.934a.997.997 0 0 0 1.4.2 1 1 0 0 0 .2-1.4l-2.281-3.041 2.928-1.464a1 1 0 0 0-.894-1.79zM51.553 41.105 49 42.382V39a1 1 0 1 0-2 0v3.382l-2.553-1.276a1 1 0 0 0-.895 1.789l2.928 1.464L44.2 47.4a1 1 0 1 0 1.6 1.2l2.2-2.934 2.2 2.934a.997.997 0 0 0 1.4.2 1 1 0 0 0 .2-1.4l-2.281-3.041 2.928-1.464a1 1 0 0 0-.894-1.79z" fill="#ffffff" opacity="1" data-original="#000000" className="">

                                </path>
                                </svg>
                            Generate code
                        </div>
                        )}
                    </div>
                )}
                <div className="profile-text" onClick={() => setShowMenu(!showMenu)}>
                    {userInfo.company ? `[${userInfo.company}]` : ''} {userInfo.nickName}
                </div>
                <div className="additional-menu-block" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none" onClick={()=>setShowMenu(!showMenu)}>
                        <path d="M6.8294 7.76866C6.43303 8.35712 5.56697 8.35712 5.1706 7.76867L0.987698 1.55866C0.540291 0.894436 1.01624 1.04765e-06 1.81709 9.77641e-07L10.1829 2.46278e-07C10.9838 1.76265e-07 11.4597 0.894433 11.0123 1.55866L6.8294 7.76866Z" fill="white"/>
                    </svg>

                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customModalStyles} // Apply the custom styles
                contentLabel="Generate new code"
            >

                <button className={"modal-button"} onClick={()=>{setIsOpen(false)
                    setGeneratedCode(null)}}>X</button>
                <div className="code-text">Generated code</div>
                <div className="code-fragment">
                    <div className="code-block">{generatedCode && (
                        <>
                            {generatedCode.slice(0, 3)} {generatedCode.slice(3, 6)}
                        </>
                    )}</div>
                </div>

            </Modal>
        </header>
    );
};

export default Header;

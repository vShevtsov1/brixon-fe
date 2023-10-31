import "../styles/profille.css"
import photo from "../assets/profileimg.png"
import React, {useEffect, useRef, useState} from "react";
import defaultProfile from "../assets/defaultProfile.png"
import axios from "axios";
import {Store} from "react-notifications-component";

const Profile = ({setIsModalOpen}) => {
    const [userInfo,setUserInfo] = useState(null);
    const [file,setFile] = useState(null);
    const [choosenPhoto,setChoosenPhoto] = useState(null)
    const fileInputRefMain = useRef(null);
    const token = localStorage.getItem("token")
    const [nickName, setNickName] = useState(null);
    const handleInputChange = (event) => {
        setNickName(event.target.value);
    };
    const handleFileChangeMain = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        setFile( file)
        reader.onload = (e) => {
            setChoosenPhoto( e.target.result )

        };

        reader.readAsDataURL(file);
    };
    useEffect(() => {
        const userJSON = localStorage.getItem("user");
        setUserInfo(JSON.parse(userJSON))
    }, []);
    if(userInfo === null){
        return null;
    }

    function updateUser() {
        const formData = new FormData();
        if(file!=null) {
            formData.append('image', file);
        }

        if(nickName === null){
            formData.append('nickname', userInfo.nickName);
        }
        else {
        formData.append('nickname', nickName)
        }

        axios.post('https://brixon-811bf88a933a.herokuapp.com/api/users/update-data', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                localStorage.setItem("user",JSON.stringify(response.data))
                setIsModalOpen(false)
                Store.addNotification({
                    title: "Profile Information Updated",
                    message: "Your profile information has been successfully updated.",
                    type: "info",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__flipInY"],
                    animationOut: ["animate__animated", "animate__flipOutX"],
                    dismiss: {
                        duration: 5000
                    }

                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(<div className={"profile-container"}>
        <div className="close-container">
            <div className="close-icon" onClick={()=>setIsModalOpen(false)}>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
        <div className="main-content">
           <div className="photo-profile">
               <div className="settings-text">
                   Profile setting
               </div>
               <div className="photo-container">

                       <img src={choosenPhoto || userInfo.image || defaultProfile} className={"profile-image"} alt="profile-image" />


               </div>
               <div className="choose-photo-container">
                   Choose photo
                   <div className="add-new-photo" style={{cursor:"pointer"}} onClick={()=> fileInputRefMain.current.click()}>
                       +
                   </div>
                   <input
                       type="file"
                       ref={fileInputRefMain}
                       style={{ display: 'none' }}
                       onChange={handleFileChangeMain}
                   />
               </div>
           </div>
            <div className="personal-info-container">
                Change name
                <input type={"text"} placeholder={userInfo.nickName}  onChange={handleInputChange}/>
            </div>
            <div className="controls-container">
            <button className={"controls-button-save"} onClick={()=>updateUser()}>Save changes</button>

            </div>
            <div className="languages-container">
                <span>
                     en
                </span>
                <span>
                      ru
                </span>

            </div>
        </div>

    </div>)
}
export default Profile
import add from "../assets/add.png"
import React, {useRef, useState} from "react";
import {Store} from "react-notifications-component";
const AdminPage2 = ( {data,setFirstTabData}) => {

    const fileInputRefMain = useRef(null);
    const handleImageClickMain = () => {
        // Trigger a click on the file input
        fileInputRefMain.current.click();
    };
    const handleFileChangeMain = (event) => {
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
            const reader = new FileReader();
            setFirstTabData({ "imageFile": file });
            reader.onload = (e) => {
                setFirstTabData({ "imageSrc": e.target.result });
            };

            reader.readAsDataURL(file);
        }
    };

    return(<div className={"admin-container"}>
        <div className="block3">
            <div className="admin-desc">
                <div className="admin-title">
                    Description text
                </div>

                <div style={{height:"100%",width: 510}}>
                <textarea value={data.description} maxLength={300}   onChange={(event) => {
                    const { value } = event.target;  // Get the value from the input
                    setFirstTabData({description:value})
                }}  placeholder="Create a short description of the property"/>

                    <div className={"remaining"} style={{width:"100%",alignItems:"flex-end",justifyContent:"flex-end",display:"flex"}}>{data.description.length}/300</div>
            </div>
            </div>
            <div className="admin-exterior-photo">
                <div className="admin-title">Exterior photo</div>
                <div className="choose-logo-block"  onClick={handleImageClickMain}>
                    <img src={data.imageSrc || add} alt="Click to choose a file" style={{width:!data.imageSrc&&"44px",height:!data.imageSrc&&"44px"}} />
                </div>
                <input
                    type="file"
                    ref={fileInputRefMain}
                    style={{ display: 'none' }}
                    onChange={handleFileChangeMain}
                />
            </div>
        </div>
    </div>)
}
export default AdminPage2
import React, {useRef, useState} from "react";
import add from "../assets/add.png"
import {Store} from "react-notifications-component";
const AdminPage4 = ({data,setFirstTabData}) => {
    const [selectedStatus, setSelectedStatus] = useState('Architecture');


    const fileInputRefs = {
        photo1: useRef(null),
        photo2: useRef(null),
        photo3: useRef(null),
        photo4: useRef(null),
        photo5: useRef(null)
    };

    const handleFileChange = (event, photo) => {
        const file = event.target.files[0];
        const maxSize = 500 * 1024; // 500KB

        if (file.size > maxSize) {
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

            reader.onload = (e) => {
                if (selectedStatus === 'interior') {
                    const images = data.imageSrc;
                    images[photo] = e.target.result;
                    images[photo + "File"] = file;

                    setFirstTabData({ imageSrc: images });
                } else if (selectedStatus === 'Architecture') {
                    const images = data.imageSrc1;
                    images[photo] = e.target.result;
                    images[photo + "File"] = file;

                    setFirstTabData({ imageSrc1: images });
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };
    return(<div className={"admin-container"}>
            <div className="block5">
                <div className="galerry-block">
                    <div className="admin-title">
                        Gallery
                    </div>
                    <div className="buttons-block">
                        <button
                            onClick={() => handleStatusChange('Architecture')}
                            className={selectedStatus === 'Architecture' ? 'active' : ''}
                        >
                            Architecture
                        </button>
                        <button
                            onClick={() => handleStatusChange('interior')}
                            className={selectedStatus === 'interior' ? 'active' : ''}
                            style={{
                                width:128,height:36,padding:0
                            }}
                        >
                            Interior
                        </button>
                    </div>
                </div>
                {selectedStatus === 'interior' &&
                <div className="gallery-block-choose-foto">
                    <div className="photo1" onClick={() => fileInputRefs.photo1.current.click()}>
                        <img src={data.imageSrc.photo1 || add} alt="Click to choose a file" style={{ width: data.imageSrc.photo1 && "100%", height: data.imageSrc.photo1 && "580px" }} />
                        <input type="file" ref={fileInputRefs.photo1} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, 'photo1')} />
                    </div>
                    <div className="photos">
                        {['photo2', 'photo3', 'photo4', 'photo5'].map((photo, index) => (
                            <div className="photo" key={index} onClick={() => fileInputRefs[photo].current.click()}>
                                <img src={data.imageSrc[photo] || add} alt="Click to choose a file" style={{ width: data.imageSrc[photo] && "100%", height: data.imageSrc[photo] && "100%" }} />
                                <input type="file" ref={fileInputRefs[photo]} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, photo)} />
                            </div>
                        ))}
                    </div>
                </div>}
                {selectedStatus === 'Architecture' &&
                    <div className="gallery-block-choose-foto">
                        <div className="photo1" onClick={() => fileInputRefs.photo1.current.click()}>
                            <img src={data.imageSrc1.photo1 || add} alt="Click to choose a file" style={{ width: data.imageSrc1.photo1 && "100%", height: data.imageSrc1.photo1 && "580px" }} />
                            <input type="file" ref={fileInputRefs.photo1} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, 'photo1')} />
                        </div>
                        <div className="photos">
                            {['photo2', 'photo3', 'photo4', 'photo5'].map((photo, index) => (
                                <div className="photo" key={index} onClick={() => fileInputRefs[photo].current.click()}>
                                    <img src={data.imageSrc1[photo] || add} alt="Click to choose a file" style={{ width: data.imageSrc1[photo] && "100%", height: data.imageSrc1[photo] && "100%" }} />
                                    <input type="file" ref={fileInputRefs[photo]} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, photo)} />
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>
    </div>)
}
export default AdminPage4
import add from "../assets/add.png";
import React, {useRef, useState} from "react";

const AdminPage8 = ({dataFifth,setFirstTabData}) => {


    const fileInputRefs = {
        photo1: useRef(null),
        photo2: useRef(null),
        photo3: useRef(null),

    };
    const handleFileChange = (event, photo) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {

            const dataPage2 = dataFifth.data
            if(photo==="photo1"){
                dataPage2.block1.image = e.target.result
                dataPage2.block1.imageFile = file
            }
            else if(photo==="photo2"){
                dataPage2.block2.image = e.target.result
                dataPage2.block2.imageFile = file

            }
            else {
                dataPage2.block3.image = e.target.result
                dataPage2.block3.imageFile = file

            }
            setFirstTabData({data:dataPage2})

        };

        reader.readAsDataURL(file);
    };
    return(<div className={"admin-container"}>
        <div className="infrastructure-desc">
            <div className="infrastructure-desc-component">
                <div className="admin-title">
                    Infrastructure amenity 1
                </div>
                <div className="infrastructure-desc-component-photo" onClick={() => fileInputRefs["photo1"].current.click()}  >
                    <img src={dataFifth.data.block1.image || add} alt="Click to choose a file" style={{ width: dataFifth.data.block1.image && "100%", height: dataFifth.data.block1.image && "200px" }} />
                    <input type="file" ref={fileInputRefs["photo1"]} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, "photo1")} />
                </div>
                <input className={"admin-location-input"} placeholder={"Name of amenity"} value={dataFifth.data.block1.nameRu} onChange={(event) => {
                    const { value } = event.target;
                    const data = dataFifth.data
                    data.block1.nameRu = value
                    setFirstTabData({data:data})
                }}/>
                <textarea value={dataFifth.data.block1.descRu} onChange={(event) => {
                    const { value } = event.target;
                    const data = dataFifth.data
                    data.block1.descRu = value
                    setFirstTabData({data:data})
                }}  placeholder="Create a short description of the property"/>
            </div>
            <div className="infrastructure-desc-component">
                <div className="admin-title">
                    Infrastructure amenity 2
                </div>
                <div className="infrastructure-desc-component-photo" onClick={() => fileInputRefs["photo2"].current.click()}>
                    <img src={dataFifth.data.block2.image || add} alt="Click to choose a file" style={{ width: dataFifth.data.block2.image && "100%", height:dataFifth.data.block2.image && "200px" }} />
                    <input type="file" ref={fileInputRefs["photo2"]} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, "photo2")} />
                </div>
                <input className={"admin-location-input"} placeholder={"Name of amenity"} value={dataFifth.data.block2.nameRu} onChange={(event) => {
                    const { value } = event.target;
                    const data = dataFifth.data
                    data.block2.nameRu = value
                    setFirstTabData({data:data})
                }}/>
                <textarea value={dataFifth.data.block2.descRu} onChange={(event) => {
                    const { value } = event.target;
                    const data = dataFifth.data
                    data.block2.descRu = value
                    setFirstTabData({data:data})
                }}  placeholder="Create a short description of the property"/>
            </div>
            <div className="infrastructure-desc-component">
                <div className="admin-title">
                    Infrastructure amenity 3
                </div>
                <div className="infrastructure-desc-component-photo" onClick={() => fileInputRefs["photo3"].current.click()} >
                    <img src={dataFifth.data.block3.image || add} alt="Click to choose a file" style={{ width: dataFifth.data.block3.image && "100%", height: dataFifth.data.block3.image && "200px" }} />
                    <input type="file" ref={fileInputRefs["photo3"]} style={{ display: 'none' }} onChange={(event) => handleFileChange(event, "photo3")} />
                </div>
                <input className={"admin-location-input"} placeholder={"Name of amenity"} value={dataFifth.data.block3.nameRu} onChange={(event) => {
                    const { value } = event.target;
                    const data = dataFifth.data
                    data.block3.nameRu = value
                    setFirstTabData({data:data})
                }}/>
                <textarea value={dataFifth.data.block3.descRu} onChange={(event) => {
                    const { value } = event.target;
                    const data = dataFifth.data
                    data.block3.descRu = value
                    setFirstTabData({data:data})
                }}  placeholder="Create a short description of the property"/>
            </div>
        </div>
    </div>)
}
export default AdminPage8
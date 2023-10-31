import add from "../assets/add.png"
import React, {useRef, useState} from "react";
import Modal from "react-modal";
import ruModal from "../assets/ruModal.png";
import notAll from "../assets/notAll.png";
const AdminPage2 = ( {data,setFirstTabData,showModalRu,setShowModalRu}) => {

    const fileInputRefMain = useRef(null);
    const handleImageClickMain = () => {
        // Trigger a click on the file input
        fileInputRefMain.current.click();
    };
    const modalStyles = {
        content: {
            width: '560px',
            height: '390px',
            borderRadius: '16px',
            margin: 'auto',
            display: 'flex',


            boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)"
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',// Adjust the opacity as needed
            zIndex: 999,
            backdropFilter: "blur(2px)"
        }
    };
    const buttonStyles = {
        borderRadius: '8px',
        background: '#407BFF',
        boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
        display: 'flex',
        width: '280px',
        padding: '12px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',

        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '-0.5px',

    };
    return(<div className={"admin-container"}>
        <div className="block3">
            <div className="admin-desc">
                <div className="admin-title">
                    Description text
                </div>

                <div style={{height:"100%",width: 510}}>
                <textarea value={data.descriptionRu} maxLength={300}   onChange={(event) => {
                    const { value } = event.target;  // Get the value from the input
                    setFirstTabData({descriptionRu:value})
                }}  placeholder="Create a short description of the property"/>

                    <div className={"remaining"} style={{width:"100%",alignItems:"flex-end",justifyContent:"flex-end",display:"flex"}}>{data.description.length}/300</div>
                </div>
            </div>
            <div className="admin-exterior-photo">
                <div className="admin-title">Exterior photo</div>
                <div className="choose-logo-block"  onClick={handleImageClickMain}>
                    <img src={data.imageSrc || add} alt="Click to choose a file" style={{width:!data.imageSrc&&"44px",height:!data.imageSrc&&"44px"}} />
                </div>
            </div>
        </div>
        <Modal
            isOpen={showModalRu}
            style={modalStyles}
        >
            <div style={{paddingLeft: 66, paddingRight: 66, paddingTop: 39, width: "100%"}}>
                <div className="logo-not-field"
                     style={{width: "100%", alignItems: "center", justifyContent: "center", display: "flex"}}>
                    <img src={ruModal}/>
                </div>
                <span style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 20,
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign:"center",
                    marginTop: 15
                }}>You will need to fill out all the following screens in Russian</span>
                <span style={{
                    color: "#AEAEB2",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 15,
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 15,
                    textAlign: "center"
                }}>Please fill out all fields carefully.</span>
                <div className="button-not-all" style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: 'center',
                    marginTop: 20
                }}>
                    <button style={buttonStyles} onClick={() => setShowModalRu(false)}>Close</button>
                </div>

            </div>
        </Modal>
    </div>)
}
export default AdminPage2
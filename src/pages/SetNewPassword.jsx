import login from "../assets/login.png";
import reset from "../assets/resetpass.png"
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Store} from "react-notifications-component";
import PinInput from "react-pin-input";
const SetNewPassword = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const history = useNavigate();

    const [password, setPassword] = useState("");


    function handleReset() {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://brixon-811bf88a933a.herokuapp.com/api/users/reset-password?newPassword=${password}&token=${token}`,
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                if(response.data==="OK"){
                    Store.addNotification({
                        title: "Password Changed",
                        message: "Your password has been successfully changed. You can now log in using your new password.",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__flipInY"],
                        animationOut: ["animate__animated", "animate__flipOutX"],
                        dismiss: {
                            duration: 5000
                        }
                    });
                        history("/login")
                }
                else {
                    Store.addNotification({
                        title: "Password Update Error",
                        message: "There was an issue updating your password. Please double-check the information provided and try again. If the problem persists, contact our support team for assistance.",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__flipInY"],
                        animationOut: ["animate__animated", "animate__flipOutX"],
                        dismiss: {
                            duration: 5000
                        }
                    });
                    history("/login")
                }
            })
            .catch((error) => {
                Store.addNotification({
                    title: "Password Update Error",
                    message: "There was an issue updating your password. Please double-check the information provided and try again. If the problem persists, contact our support team for assistance.",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__flipInY"],
                    animationOut: ["animate__animated", "animate__flipOutX"],
                    dismiss: {
                        duration: 5000
                    }
                });
            });
    }

    return(<div className={"login-block"}>
        <div className="sign-up-code">
            <div className="welcome-image">
                <img src={reset} alt={"welcome-image"} style={{width:300,height:300}}/>
            </div>
            <div className="login-container_container">
                <label>New password</label>
                <PinInput
                    length={6}
                    initialValue=""
                    secret
                    secretDelay={100}
                    onChange={(value, index) => {setPassword(value)}}
                    type="numeric"
                    inputMode="number"
                    placeholder={"X"}
                    style={{width:44,display:"flex"}}
                    inputStyle={{borderRadius: 8,background: "#F2F2F7",borderColor:"white"}}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />

            </div>


            <div className="welcome-buttons">
                <button className={"dont_have"} onClick={()=>handleReset()}>Set new password</button>
             </div>
        </div>
    </div>)
}
export default SetNewPassword;
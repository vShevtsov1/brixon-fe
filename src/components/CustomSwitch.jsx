import React, { useState } from 'react';
import axios from "axios";
import {Store} from "react-notifications-component";

const customSwitchStyles = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    toggle: {
        width: '35px',
        height: '16px',
        borderRadius: '10px',
        background: '#ccc',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    knob: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        transform: 'translateX(0px)',
        transition: 'transform 0.3s',
    },
};

function CustomSwitch({isToggled,setToggled,projectId,projects,setProjects}) {

    const handleToggle = () => {
        setToggled(!isToggled);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/projects/active-project?projectId='+projectId,
        };

        axios
            .request(config)
            .then((response) => {
                const statusMessage = !isToggled ? "activated" : "deactivated";
                Store.addNotification({
                    title: "Project Status Changed",
                    message: `The project has been ${statusMessage} successfully`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__flipInY"],
                    animationOut: ["animate__animated", "animate__flipOutX"],
                    dismiss: {
                        duration: 5000,
                    },
                });

            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div style={customSwitchStyles.container}>
            <div
                style={{
                    ...customSwitchStyles.toggle,
                    backgroundColor: isToggled ? '#407BFF' : '#ccc',
                }}
                onClick={handleToggle}
            >
                <div
                    style={{
                        ...customSwitchStyles.knob,
                        transform: isToggled ? 'translateX(15px)' : 'translateX(0px)',
                    }}
                ></div>
            </div>
        </div>
    );
}

export default CustomSwitch;

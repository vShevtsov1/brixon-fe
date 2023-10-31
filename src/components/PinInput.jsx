import  { useState, useRef } from 'react';
import '../styles/PinInput.css';  // Make sure to create PinInput.css with the provided styles
import React from 'react'

const PinInput = ({pins,setPins}) => {
    const pinInputsRef = Array(6).fill(null).map(() => useRef(null));

    const handlePinChange = (index, value) => {
        // Allow only numbers (digits)
        const numericValue = value.replace(/\D/g, '');

        if (numericValue === '') {
            // Handle backspace: move focus to the previous input
            if (index > 0) {
                pinInputsRef[index - 1].current.focus();
            }
        } else if (index < 5) {
            // Move focus to the next input for other digits
            pinInputsRef[index + 1].current.focus();
        }

        const newPins = [...pins];
        newPins[index] = numericValue;
        setPins(newPins);
    };

    return (
        <div className="pin-input-container">
            {pins.map((pin, index) => (
                <input
                    key={index}
                    ref={pinInputsRef[index]}
                    type="text"
                    inputMode="numeric" // Enable numeric keyboard on mobile
                    value={pin}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    maxLength={1}
                    placeholder="*"
                    className="pin-input"
                />
            ))}
        </div>
    );
};

export default PinInput;
import React, { useState } from "react";
import axios from "axios";
import "./BmiCalculator.css";

function BmiCalculator() {
    const [bmi, setBmi] = useState("");
    const [message, setMessage] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmiList, setBmiList] = useState([]);

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const calculateBmi = (e) => {
        e.preventDefault();
        if (weight && height) {
            const bmiData = {
                weight: weight,
                height: height
            };
            axios.post('http://localhost:8080/api/bmi', bmiData)
                .then(response => {
                    setBmi(`Your BMI is: ${response.data.bmi}`);
                    setMessage(response.data.message);
                    fetchBmiList();
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setBmi('');
            setMessage('');
        }
    };

    const fetchBmiList = () => {
        axios.get('http://localhost:8080/api/bmi')
            .then(response => {
                setBmiList(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the BMI list!', error);
            });
    };

    return (
        <div className="bmi-calculator-container">
            <h2>BMI Calculator</h2>
            <form onSubmit={calculateBmi} className="bmi-calculator-form">
                <div className="form-inputs">
                    <label htmlFor="weight">Weight (in kg)</label>
                    <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="height">Height (in cm)</label>
                    <input
                        id="height"
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                    />
                </div>
                <div className="form-inputs">
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="bmi-messages">
                <h4>{bmi}</h4>
                <p>{message}</p>
            </div>
            <div className="bmi-list">
                <h3>BMI Records</h3>
                <ul>
                    {bmiList.map(bmiItem => (
                        <li key={bmiItem.id}>
                            Weight: {bmiItem.weight}, Height: {bmiItem.height}, BMI: {bmiItem.bmi}, Message: {bmiItem.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BmiCalculator;

import React, {useEffect, useState} from "react";

const AdminPage6 = ({dataThird,data,setFirstTabData,setSixData}) => {
    const [selectedBedrooms, setSelectedBedrooms] = useState(null);
    const [ChnageTab,setChangeTab] = useState(false)
    useEffect(() => {
        if(ChnageTab===false) {
            for (const key in dataThird.plans) {
                if (dataThird.plans[key] !== 0) {
                    setSelectedBedrooms(key);
                    break;
                }
            }
        }
    }, [dataThird,data]);

    const [updateByMe,setUpdateByMe]=useState(true);
    useEffect(() => {
        if(updateByMe&&selectedBedrooms!=null) {
            const updatedData = {...data};

            for (const planKey in dataThird.plans) {
                if (dataThird.plans[planKey] !== 0) {
                    const price = dataThird.data[planKey][0].price;

                    for (const paramKey in updatedData[planKey]) {
                        const percent = updatedData[planKey][paramKey].percent; // Convert percentage to decimal
                        updatedData[planKey][paramKey].summ = (price * percent) / 100;
                    }
                }
            }
            setUpdateByMe(false)
            setSixData(updatedData);
        }

    }, [data, dataThird,selectedBedrooms]);




    const [rightPercent,setRightPercent] = useState(true)

    useEffect(() => {
        if(selectedBedrooms!=null) {
            let totalPercent = 0;

            totalPercent += data[selectedBedrooms].param1.percent
            totalPercent += data[selectedBedrooms].param2.percent
            totalPercent += data[selectedBedrooms].param3.percent
            totalPercent += data[selectedBedrooms].param4.percent

            if (totalPercent === 100) {
                setRightPercent(true)
            } else {
                setRightPercent(false)
            }
        }
    }, [selectedBedrooms,data, dataThird]);
    const handleParam1Change = (event) => {
        const newData = { ...data };
        newData[selectedBedrooms].param1.percent = parseFloat(event.target.value) || 0;
        setUpdateByMe(true)
        setSixData(newData);
    };

    const handleParam2Change = (event) => {
        const newData = { ...data };
        newData[selectedBedrooms].param2.percent = parseFloat(event.target.value) || 0;
        setUpdateByMe(true)

        setSixData(newData);
    };

    const handleParam3Change = (event) => {
        const newData = { ...data };
        newData[selectedBedrooms].param3.percent = parseFloat(event.target.value) || 0;
        setUpdateByMe(true)

        setSixData(newData);
    };
    const handleParam4Change = (event) => {
        const newData = { ...data };
        newData[selectedBedrooms].param4.percent = parseFloat(event.target.value) || 0;
        setUpdateByMe(true)

        setSixData(newData);
    };
    const handleBedroomsChange = (bedrooms) => {
        setChangeTab(true)
        setUpdateByMe(true)
        setSelectedBedrooms(bedrooms);
    };

    if(selectedBedrooms===null){
        return null;
    }
    return(<div className={"admin-container"}>

            <div className="admin-choose-apartments-plan">
        <div className="admin-title">
            Apartments plan
        </div>
        <div className="multiple-buttons-container">
            {dataThird.plans.Studio!==0 &&<button onClick={()=>handleBedroomsChange("Studio")} className={`multiple-button ${selectedBedrooms === 'Studio' ? 'active' : ''}`}>Studio</button>}
            {dataThird.plans["1"]!==0 &&<button onClick={()=>handleBedroomsChange("1")}  className={`multiple-button ${selectedBedrooms === '1' ? 'active' : ''}`}>1</button>}
            {dataThird.plans["2"]!==0 &&<button onClick={()=>handleBedroomsChange("2")}  className={`multiple-button ${selectedBedrooms === '2' ? 'active' : ''}`}>2</button>}
                {dataThird.plans["3"]!==0 &&<button onClick={()=>handleBedroomsChange("3")}  className={`multiple-button ${selectedBedrooms === '3' ? 'active' : ''}`}>3</button>}
                {dataThird.plans["4+"]!==0 &&<button onClick={()=>handleBedroomsChange("4+")} className={`multiple-button ${selectedBedrooms === '4+' ? 'active' : ''}`}
            >4+</button>}
        </div>

    </div>
        <div className="payment-table">
            <div className="admin-price-block">
                <div className="admin-title">
                    Price from
                </div>
                <div className="admin-input-text">
                    <input disabled={true} placeholder={"Type here"} value={dataThird.data[selectedBedrooms][0].price}/>
                    <span>AED</span>
                </div>
            </div>
            <table className="custom-table">
                <thead>
                <tr>
                    <th>Stage</th>
                    <th>Percent</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Booking</td>
                    <td><input value={data[selectedBedrooms].param1.percent} onChange={handleParam1Change} />%
                    </td>
                    <td>AED {data[selectedBedrooms].param1.summ}</td>
                </tr>
                <tr>
                    <td>During construction</td>
                    <td><input value={data[selectedBedrooms].param2.percent} onChange={handleParam2Change} />%</td>
                    <td>AED {data[selectedBedrooms].param2.summ}</td>
                </tr>
                <tr>
                    <td>On handover</td>
                    <td><input value={data[selectedBedrooms].param3.percent} onChange={handleParam3Change} />%</td>
                    <td>AED {data[selectedBedrooms].param3.summ}</td>
                </tr>
                <tr>
                    <td>After handover</td>
                    <td><input value={data[selectedBedrooms].param4.percent} onChange={handleParam4Change} />%</td>
                    <td>AED {data[selectedBedrooms].param4.summ}</td>
                </tr>
                </tbody>
            </table>

        </div>

        <div className="total-price">
            <span>Total  <span style={{background:!rightPercent&&"blue"}}/></span>
            <span>AED {dataThird.data[selectedBedrooms][0].price}</span>
        </div>
    </div>)
}
export default AdminPage6
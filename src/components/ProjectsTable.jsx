import React, {useState} from 'react';
import "../styles/myprojects.css"
import CustomSwitch from "./CustomSwitch.jsx";
const ProjectsTable = ({ data }) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const toggleMenu = (rowIndex) => {
        if (selectedRowIndex === rowIndex) {
            setSelectedRowIndex(null); // Close the menu if it's already open
        } else {
            setSelectedRowIndex(rowIndex);
        }
    };

    const heads = [
        "Project name",
        "Developer",
        "Area",
        "Handover",
        "Property Type",
        "Rooms",
        "Size",
        "Price",

    ];
    const columnWidths = [
        "12%", // Adjust the percentage values as needed for each column
        "12%",
        "12%",
        "12%",
        "12%",
        "13%",
        "13%",
        "13%",

    ];
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const transformedData = data.map((project) => ({
        "Project name": project.projectName,

        "Developer": project.developer,
        "Area": project.selectedLocation || project.ownLocation,
        "Handover": project.selectedMonth + 'Q ' + project.selectedYear,
        "Property Type": project.selectedProperty,
        "Rooms": project.selectedBedrooms,
        "Size": project.sizeFrom+" Sq.Ft",
        "Price": formatNumberWithCommas(project.priceFrom),
    }));
    if(data && !data.length>1){
        return null;
    }

    return (
        <table  className="projects-table" style={{ width: '100%',borderCollapse:"collapse" }}>
            <thead>
            {heads.map((head, index) => (
                <th key={index} className="left-align" style={{ width: columnWidths[index] }}>
                    {head}
                </th>
            ))}
            </thead>
            <tbody>
            {transformedData.map((project, rowIndex) => (
                <tr key={rowIndex} style={{borderColor:"#AEAEB2",borderBottomWidth:1}}>
                    {heads.map((head, colIndex) => (
                        head === "Options" ? null : (
                            <td key={colIndex} className="left-align">
                                {project[head]}
                            </td>
                        )
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProjectsTable;

import "../styles/myprojects.css"
import {useState} from "react";
import CustomSwitch from "./CustomSwitch.jsx";
import axios from "axios";
import {Store} from "react-notifications-component";
import MyPDFComponent from "./MyPDFComponent.jsx";
import ReactPDF, {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import ReactDOM from "react-dom/client";
import {useNavigate} from "react-router-dom";


const MyProject = ({project,setProjects,projects}) => {
    const [isToggled, setToggled] = useState(project.activeProject);
    const [isPDFPreviewVisible, setPDFPreviewVisible] = useState(false);
    const history=useNavigate();

    const [checked,setChecked] =useState(false)
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function deleteProject(){
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/projects/delete-project?projectId='+project._id,
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                Store.addNotification({
                    title: "Project Deleted",
                    message: "The project has been deleted successfully",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__flipInY"],
                    animationOut: ["animate__animated", "animate__flipOutX"],
                    dismiss: {
                        duration: 5000,
                    },
                });
                const projectIdToDelete = project._id;
                const updatedProjects = projects.filter((project) => project._id !== projectIdToDelete);
                setProjects(updatedProjects);
            })
            .catch((error) => {
                console.log(error);
            });
    }
  return(<div
      style={{
          width: 280,
          height: 192,
          padding: 16,
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)',
          borderRadius: 16,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: 16,
          display: 'inline-flex'
      }}>
      <div  className={"my-project-container-with-background"} style={{ backgroundImage: `
    linear-gradient(1deg, rgba(0, 0, 0, 0.60) 15.72%, rgba(0, 0, 0, 0.00) 91.54%), 
    url(${project.imageSrcMain})
  `,
          backgroundSize: '100% 127.409%, 100% 100%, cover',
          backgroundPosition: '0 0, 0 0, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
          opacity: project.activeProject ? 1 : 0.4,
          alignSelf: 'stretch',widt:248, height: 160, padding: 8, borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex'}}>
            <div className="my-projects-price-container">
                AED {formatNumberWithCommas(project.priceFrom)}
            </div>
          <div className="my-projects-additional">
              <div className="my-projects-project-info" style={{cursor:"pointer"}} onClick={()=>window.open(`object-info/${project._id}`,"_blank")}>
                  <span>{project.projectName}</span>
                  <span>{project.selectedLocation || project.ownLocation}</span>
              </div>
              <div style={{opacity:1}} className="my-projects-additional-services" onClick={()=>setChecked(true)} onMouseLeave={()=>setChecked(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="8" viewBox="0 0 27 8" fill="none">
                      <circle cx="23.4985" cy="3.5" r="2.75" transform="rotate(-90 23.4985 3.5)" stroke="#FFF" stroke-width="1.5"/>
                      <circle cx="13.499" cy="3.61792" r="2.75" transform="rotate(-90 13.499 3.61792)" stroke="#FFF" stroke-width="1.5"/>
                      <circle cx="3.5" cy="3.73584" r="2.75" transform="rotate(-90 3.5 3.73584)" stroke="#FFF" stroke-width="1.5"/>
                  </svg>
                  {checked&&(
                  <div className="additional-menu"
                  >
                      <span>Change project</span>
                      <span onClick={()=>deleteProject()}>Delete project</span>
                      <span>Deactivate / activate
                        <CustomSwitch isToggled={isToggled} setToggled={setToggled} projects={projects} setProject={setProjects} projectId={project._id}/>
                      </span>
                      <span onClick={() => window.open(`/pdf?projectid=${project._id}`, '_blank')}>Export to PDF</span>
                  </div>)}






              </div>
          </div>
      </div>

  </div>)
}

export default MyProject

import React, {useEffect, useState} from 'react';
import {
    Page,
    Text,
    Document,
    StyleSheet,
    PDFViewer,
    View,
    PDFDownloadLink,
    Image,
    Font,
    Svg,
    Path,

} from '@react-pdf/renderer';
import {useLocation} from "react-router-dom";
import axios, {AxiosHeaders as Buffer} from "axios";
import Montserrat from "../fonts/Montserrat.ttf"
import MontserratBold from "../fonts/Montserrat-Bold.ttf"
import MontserratRegular from "../fonts/Montserrat-Regular.ttf"





Font.register({ family: 'Montserrat', src: Montserrat });
Font.register({ family: 'MontserratBold', src: MontserratBold });
Font.register({ family: 'MontserratRegular', src: MontserratRegular });
const Location1 = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.50014 0C3.02188 0 0.239258 2.43478 0.239258 5.91306C0.239258 9.73915 5.10884 16 6.50014 16C7.89144 16 12.761 9.0435 12.761 5.91306C12.761 2.43478 9.97841 0 6.50014 0ZM6.50014 8.34784C7.65274 8.34784 8.5871 7.41348 8.5871 6.26088C8.5871 5.10829 7.65274 4.17392 6.50014 4.17392C5.34754 4.17392 4.41318 5.10829 4.41318 6.26088C4.41318 7.41348 5.34754 8.34784 6.50014 8.34784Z" fill="#407BFF"/>
    </Svg>
)
const MyPDFComponent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectid');
    const [project, setProject] = useState(null)
    const [imageBuffer, setImageBuffer] = useState(null);
    const styles = StyleSheet.create({

        view: {
            width: "100%",
            height: "100%",
            padding: 25,

            gap:20
        },
        projectTitle:{

            fontSize:52,
            fontFamily:"MontserratBold",
            fontWeight:"bold",

        }


    });
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/projects/' + projectId,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setProject(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [projectId]);
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if(project ===null){
        return null;
    }
    function paymentPlanRow(title, percent, sum) {
        return (
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, width: "100%" }}>
                    <View style={{ flex: 2, width: "60%" }}>
                        <Text style={{ fontFamily: "MontserratRegular", color: "white",fontSize:15 }}>{title}</Text>
                    </View>
                    <View style={{ flex: 1, width: "20%" }}>
                        <Text style={{ fontFamily: "MontserratRegular", color: "white",fontSize:15 }}>{percent} %</Text>
                    </View>
                    <View style={{ flex: 1, width: "20%" }}>
                        <Text style={{ fontFamily: "MontserratRegular", color: "white",fontSize:15 }}>{formatNumberWithCommas(sum)} AED</Text>
                    </View>
                </View>
            </View>
        );
    }
    function formatNumberToK(number) {
        if (number >= 1000) {
            const suffixes = ["", "K", "M", "B", "T"];
            const suffixNum = Math.floor(("" + number).length / 3);
            let shortNumber = parseFloat(
                (suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(2)
            );
            if (shortNumber % 1 !== 0) {
                shortNumber = shortNumber.toFixed(1);
            }
            return shortNumber + suffixes[suffixNum];
        } else {
            return number.toString();
        }
    }
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <Document>
                    <Page object-fit="fill" style={styles.page} size="A4" orientation="landscape">
                        <View style={{width:"100%",height:"100%",padding:60,gap:30}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{width:"70%",gap:10}}>
                                    <Text style={styles.projectTitle}>{project.projectName}</Text>
                                    <View style={{flexDirection:"row",gap:10}}>
                                        <Location1/>
                                        <Text style={{fontFamily:"MontserratRegular"}}>{project.selectedLocation || project.ownLocation}</Text>
                                    </View>

                                </View>
                                <View style={{width:"20%",height:"100%",backgroundColor:"black",borderRadius:10}}>
                                    <Text  style={{color:"white",padding:10,borderColor:"#AEAEB2",borderBottomWidth:1,textAlign:"center"}}>{formatNumberToK(Number(project.priceFrom))} AED</Text>
                                    <Text  style={{color:"white",padding:10,borderColor:"#AEAEB2",borderBottomWidth:1,textAlign:"center"}}>{project.selectedBedrooms === "1"
                                        ? '1'
                                        : project.selectedBedrooms === 'Studio'
                                            ? 'Studio'
                                            : project.selectedBedrooms === "2"
                                                ? '1-2'
                                                : project.selectedBedrooms === "3"
                                                    ? '1-3'
                                                    : project.selectedBedrooms === '4+'
                                                        ? '4+'
                                                        : ''} BR</Text>
                                    <Text  style={{color:"white",padding:10,textAlign:"center"}}>{project.selectedMonth}Q 20{project.selectedYear}</Text>
                                </View>

                            </View>
                            <Image src={project.imageSrcMain}
                            style={{height:"70%",borderRadius:10}}/>
                        </View>
                    </Page>

                    <Page object-fit="fill" style={{justifyContent:"center",alignItems:"center",backgroundColor:"black"}} size="A4" orientation="landscape">
                        <View style={{ width: "90%",  height: "60%" ,flexDirection:"row",justifyContent:"space-between",padding:10}}>
                            {project.infrastructures.map((infrastructure, index) => (
                              <View key={index} style={{width:"28%",height:"100%",gap:20}}>
                                  <Image src={infrastructure.imgSrc} style={{borderRadius:10}}/>
                                  <Text style={{color:"white"}}>{infrastructure.name}</Text>
                                  <Text style={{color:"white",fontFamily:"MontserratRegular",fontSize:13}}>{infrastructure.desc}</Text>
                              </View>
                            ))}
                        </View>

                    </Page>
                    <Page object-fit="fill" style={{justifyContent:"center",alignItems:"center"}} size="A4" orientation="landscape">
                        <View style={{width:"90%",height:"90%",gap:20}}>
                            <Text style={{fontFamily:"MontserratBold"}}>Gallery</Text>
                            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                <Text>Architecture</Text>
                            </View>
                            <View style={{flexDirection:"row",height:"100%",width:"100%"}}>
                                <View style={{width:"100%",height:"90%",flexDirection:"column",gap:10}}>
                                    <View style={{flexDirection:"row",justifyContent:"center",gap:5,height:"50%"}}>
                                        <Image src={project.interiorGallery[1]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                        <Image src={project.interiorGallery[2]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:"center",gap:5,height:"50%"}}>
                                        <Image src={project.interiorGallery[3]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                        <Image src={project.interiorGallery[4]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                    </View>


                                </View>
                            </View>
                        </View>
                    </Page>
                    <Page object-fit="fill" style={{justifyContent:"center",alignItems:"center"}} size="A4" orientation="landscape">
                        <View style={{width:"90%",height:"90%",gap:20}}>
                            <Text style={{fontFamily:"MontserratBold"}}>Gallery</Text>
                            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                <Text>Interior</Text>
                            </View>
                            <View style={{flexDirection:"row",height:"100%",width:"100%"}}>
                                <View style={{width:"100%",height:"90%",flexDirection:"column",gap:10}}>
                                    <View style={{flexDirection:"row",justifyContent:"center",gap:5,height:"50%"}}>
                                        <Image src={project.architectureGallery[1]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                        <Image src={project.architectureGallery[2]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:"center",gap:5,height:"50%"}}>
                                        <Image src={project.architectureGallery[3]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                        <Image src={project.architectureGallery[4]} style={{width:"48%",height:"100%",borderRadius:20,flexShrink:0}}/>
                                    </View>


                                </View>
                            </View>
                        </View>
                    </Page>
                    {project.plans["1"].length>=1&&
                    <Page object-fit="fill"  size="A4" orientation="landscape">
                    <View style={{width:"100%", padding:30,gap:20}}>
                        <Text style={{fontFamily:"MontserratBold"}}>Layout</Text>
                        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                            <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                            <Text style={{fontFamily:"MontserratRegular"}}>1</Text>
                        </View>
                        <View style={{ flexDirection: 'row',height:"100%" }}>
                            {project.plans["1"].slice(0,3).map((plan, index) => (
                                <View key={index} style={{ marginRight: 10,justifyContent:"space-between",padding:5, marginBottom: 10,width:"35%",height:"70%",borderRadius:10,borderColor:"#407BFF",borderWidth:1 }}>
                                    <Image src={plan.imgSrc} style={{height:"70%",width:"100%"}}/>
                                    <View style={{height:"20%",width:"100%", justifyContent:"space-between",flexDirection:"row"}}>
                                            <View>
                                                <Text style={{fontFamily:"MontserratRegular",fontSize:14}}>{formatNumberWithCommas(plan.price)} AED</Text>
                                                <Text  style={{fontFamily:"MontserratRegular",color:"#7C7C80",fontSize:12}}>{(Number(plan.price)/Number(plan.size)).toFixed(2)} AED/Sq.ft</Text>
                                            </View>
                                        <View style={{width:"30%",height:"50%",borderRadius:20,backgroundColor:"#AEAEB2",alignItems:"center",justifyContent:"center"}}>
                                                <Text style={{color:"white",fontSize:13}}>{plan.size} Sq.ft</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                    </View>
                    </Page>}
                    {project.plans["Studio"].length>=1&&
                        <Page object-fit="fill"  size="A4" orientation="landscape">
                            <View style={{width:"100%", padding:30,gap:20}}>
                                <Text style={{fontFamily:"MontserratBold"}}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular"}}>Studio</Text>
                                </View>
                                <View style={{ flexDirection: 'row',height:"100%" }}>
                                    {project.plans["Studio"].slice(0,3).map((plan, index) => (
                                        <View key={index} style={{ marginRight: 10,justifyContent:"space-between",padding:5, marginBottom: 10,width:"35%",height:"70%",borderRadius:10,borderColor:"#407BFF",borderWidth:1 }}>
                                            <Image src={plan.imgSrc} style={{height:"70%",width:"100%"}}/>
                                            <View style={{height:"20%",width:"100%", justifyContent:"space-between",flexDirection:"row"}}>
                                                <View>
                                                    <Text style={{fontFamily:"MontserratRegular",fontSize:14}}>{formatNumberWithCommas(plan.price)} AED</Text>
                                                    <Text  style={{fontFamily:"MontserratRegular",color:"#7C7C80",fontSize:12}}>{(Number(plan.price)/Number(plan.size)).toFixed(2)} AED/Sq.ft</Text>
                                                </View>
                                                <View style={{width:"30%",height:"50%",borderRadius:20,backgroundColor:"#AEAEB2",alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={{color:"white",fontSize:13}}>{plan.size} Sq.ft</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        </Page>}
                    {project.plans["2"].length>=1&&
                        <Page object-fit="fill"  size="A4" orientation="landscape">
                            <View style={{width:"100%", padding:30,gap:20}}>
                                <Text style={{fontFamily:"MontserratBold"}}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular"}}>2</Text>
                                </View>
                                <View style={{ flexDirection: 'row',height:"100%" }}>
                                    {project.plans["2"].slice(0,3).map((plan, index) => (
                                        <View key={index} style={{ marginRight: 10,justifyContent:"space-between",padding:5, marginBottom: 10,width:"35%",height:"70%",borderRadius:10,borderColor:"#407BFF",borderWidth:1 }}>
                                            <Image src={plan.imgSrc} style={{height:"70%",width:"100%"}}/>
                                            <View style={{height:"20%",width:"100%", justifyContent:"space-between",flexDirection:"row"}}>
                                                <View>
                                                    <Text style={{fontFamily:"MontserratRegular",fontSize:14}}>{formatNumberWithCommas(plan.price)} AED</Text>
                                                    <Text  style={{fontFamily:"MontserratRegular",color:"#7C7C80",fontSize:12}}>{(Number(plan.price)/Number(plan.size)).toFixed(2)} AED/Sq.ft</Text>
                                                </View>
                                                <View style={{width:"30%",height:"50%",borderRadius:20,backgroundColor:"#AEAEB2",alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={{color:"white",fontSize:13}}>{plan.size} Sq.ft</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        </Page>}
                    {project.plans["3"].length>=1&&
                        <Page object-fit="fill"  size="A4" orientation="landscape">
                            <View style={{width:"100%", padding:30,gap:20}}>
                                <Text style={{fontFamily:"MontserratBold"}}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular"}}>3</Text>
                                </View>
                                <View style={{ flexDirection: 'row',height:"100%" }}>
                                    {project.plans["3"].slice(0,3).map((plan, index) => (
                                        <View key={index} style={{ marginRight: 10,justifyContent:"space-between",padding:5, marginBottom: 10,width:"35%",height:"70%",borderRadius:10,borderColor:"#407BFF",borderWidth:1 }}>
                                            <Image src={plan.imgSrc} style={{height:"70%",width:"100%"}}/>
                                            <View style={{height:"20%",width:"100%", justifyContent:"space-between",flexDirection:"row"}}>
                                                <View>
                                                    <Text style={{fontFamily:"MontserratRegular",fontSize:14}}>{formatNumberWithCommas(plan.price)} AED</Text>
                                                    <Text  style={{fontFamily:"MontserratRegular",color:"#7C7C80",fontSize:12}}>{(Number(plan.price)/Number(plan.size)).toFixed(2)} AED/Sq.ft</Text>
                                                </View>
                                                <View style={{width:"30%",height:"50%",borderRadius:20,backgroundColor:"#AEAEB2",alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={{color:"white",fontSize:13}}>{plan.size} Sq.ft</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        </Page>}
                    {project.plans["4+"].length>=1&&
                        <Page object-fit="fill"  size="A4" orientation="landscape">
                            <View style={{width:"100%", padding:30,gap:20}}>
                                <Text style={{fontFamily:"MontserratBold"}}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular"}}>4+</Text>
                                </View>
                                <View style={{ flexDirection: 'row',height:"100%" }}>
                                    {project.plans["4+"].slice(0,3).map((plan, index) => (
                                        <View key={index} style={{ marginRight: 10,justifyContent:"space-between",padding:5, marginBottom: 10,width:"35%",height:"70%",borderRadius:10,borderColor:"#407BFF",borderWidth:1 }}>
                                            <Image src={plan.imgSrc} style={{height:"70%",width:"100%"}}/>
                                            <View style={{height:"20%",width:"100%", justifyContent:"space-between",flexDirection:"row"}}>
                                                <View>
                                                    <Text style={{fontFamily:"MontserratRegular",fontSize:14}}>{formatNumberWithCommas(plan.price)} AED</Text>
                                                    <Text  style={{fontFamily:"MontserratRegular",color:"#7C7C80",fontSize:12}}>{(Number(plan.price)/Number(plan.size)).toFixed(2)} AED/Sq.ft</Text>
                                                </View>
                                                <View style={{width:"30%",height:"50%",borderRadius:20,backgroundColor:"#AEAEB2",alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={{color:"white",fontSize:13}}>{plan.size} Sq.ft</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        </Page>}

                    {project.paymentPlans["2"]&&
                    <Page object-fit="fill"  style={{alignItems:"center",justifyContent:"center"}} size="A4" orientation="landscape">
                        <View style={{width:"80%",height:"70%",gap:15,padding:30,backgroundColor:"black",borderRadius:15}}>
                            <Text style={{fontFamily:"MontserratBold",color:"white" }}>Layout</Text>
                            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                <Text style={{fontFamily:"MontserratRegular",color:"white" }}>2</Text>
                            </View>

                            {/* Table Headers */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, width: "100%" }}>
                                <View style={{ flex: 2 ,width:"60%"}}>
                                    <Text style={{ fontFamily: "MontserratBold",color:"white" }}>Stage</Text>
                                </View>
                                <View style={{ flex: 1,width:"20%" }}>
                                    <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Percent</Text>
                                </View>
                                <View style={{ flex: 1,width:"20%" }}>
                                    <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Price</Text>
                                </View>
                            </View>
                            <View style={{gap:10}}>
                                {paymentPlanRow("Booking", project.paymentPlans["2"].percent1, project.paymentPlans["2"].sum1)}
                                {paymentPlanRow("During Construction", project.paymentPlans["2"].percent2, project.paymentPlans["2"].sum2)}
                                {paymentPlanRow("On Handover", project.paymentPlans["2"].percent3, project.paymentPlans["2"].sum3)}
                                {paymentPlanRow("After Handover", project.paymentPlans["2"].percent4, project.paymentPlans["2"].sum4)}
                            </View>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",gap:10}}>
                                <Text style={{color:"white"}}>Total</Text>
                                <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                <Text style={{ fontFamily: "MontserratBold", color: "white" }}>
                                    {
                                        (Number(project.paymentPlans["2"].sum1) +
                                        Number(project.paymentPlans["2"].sum2 )+
                                            Number(project.paymentPlans["2"].sum3) +
                                                Number(project.paymentPlans["2"].sum4)
                                    )} AED
                                </Text>                            </View>

                        </View>
                    </Page>
                    }

                    {project.paymentPlans["1"]&&
                        <Page object-fit="fill"  style={{alignItems:"center",justifyContent:"center"}} size="A4" orientation="landscape">
                            <View style={{width:"80%",height:"70%",gap:15,padding:30,backgroundColor:"black",borderRadius:15}}>
                                <Text style={{fontFamily:"MontserratBold",color:"white" }}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular",color:"white" }}>1</Text>
                                </View>

                                {/* Table Headers */}
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, width: "100%" }}>
                                    <View style={{ flex: 2 ,width:"60%"}}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white" }}>Stage</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Percent</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Price</Text>
                                    </View>
                                </View>
                                <View style={{gap:10}}>
                                    {paymentPlanRow("Booking", project.paymentPlans["1"].percent1, project.paymentPlans["1"].sum1)}
                                    {paymentPlanRow("During Construction", project.paymentPlans["1"].percent2, project.paymentPlans["1"].sum2)}
                                    {paymentPlanRow("On Handover", project.paymentPlans["1"].percent3, project.paymentPlans["1"].sum3)}
                                    {paymentPlanRow("After Handover", project.paymentPlans["1"].percent4, project.paymentPlans["1"].sum4)}
                                </View>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",gap:10}}>
                                    <Text style={{color:"white"}}>Total</Text>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{ fontFamily: "MontserratBold", color: "white" }}>
                                        {
                                            (Number(project.paymentPlans["1"].sum1) +
                                                Number(project.paymentPlans["1"].sum2 )+
                                                Number(project.paymentPlans["1"].sum3) +
                                                Number(project.paymentPlans["1"].sum4)
                                            )} AED
                                    </Text>                            </View>

                            </View>
                        </Page>
                    }
                    {project.paymentPlans["3"]&&
                        <Page object-fit="fill"  style={{alignItems:"center",justifyContent:"center"}} size="A4" orientation="landscape">
                            <View style={{width:"80%",height:"70%",gap:15,padding:30,backgroundColor:"black",borderRadius:15}}>
                                <Text style={{fontFamily:"MontserratBold",color:"white" }}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular",color:"white" }}>3</Text>
                                </View>

                                {/* Table Headers */}
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, width: "100%" }}>
                                    <View style={{ flex: 2 ,width:"60%"}}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white" }}>Stage</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Percent</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Price</Text>
                                    </View>
                                </View>
                                <View style={{gap:10}}>
                                    {paymentPlanRow("Booking", project.paymentPlans["3"].percent1, project.paymentPlans["3"].sum1)}
                                    {paymentPlanRow("During Construction", project.paymentPlans["3"].percent2, project.paymentPlans["3"].sum2)}
                                    {paymentPlanRow("On Handover", project.paymentPlans["3"].percent3, project.paymentPlans["3"].sum3)}
                                    {paymentPlanRow("After Handover", project.paymentPlans["3"].percent4, project.paymentPlans["3"].sum4)}
                                </View>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",gap:10}}>
                                    <Text style={{color:"white"}}>Total</Text>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{ fontFamily: "MontserratBold", color: "white" }}>
                                        {
                                            (Number(project.paymentPlans["3"].sum1) +
                                                Number(project.paymentPlans["3"].sum2 )+
                                                Number(project.paymentPlans["3"].sum3) +
                                                Number(project.paymentPlans["3"].sum4)
                                            )} AED
                                    </Text>                            </View>

                            </View>
                        </Page>
                    }
                    {project.paymentPlans["4+"]&&
                        <Page object-fit="fill"  style={{alignItems:"center",justifyContent:"center"}} size="A4" orientation="landscape">
                            <View style={{width:"80%",height:"70%",gap:15,padding:30,backgroundColor:"black",borderRadius:15}}>
                                <Text style={{fontFamily:"MontserratBold",color:"white" }}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular",color:"white" }}>4+</Text>
                                </View>

                                {/* Table Headers */}
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, width: "100%" }}>
                                    <View style={{ flex: 2 ,width:"60%"}}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white" }}>Stage</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Percent</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Price</Text>
                                    </View>
                                </View>
                                <View style={{gap:10}}>
                                    {paymentPlanRow("Booking", project.paymentPlans["4+"].percent1, project.paymentPlans["4+"].sum1)}
                                    {paymentPlanRow("During Construction", project.paymentPlans["4+"].percent2, project.paymentPlans["4+"].sum2)}
                                    {paymentPlanRow("On Handover", project.paymentPlans["4+"].percent3, project.paymentPlans["4+"].sum3)}
                                    {paymentPlanRow("After Handover", project.paymentPlans["4+"].percent4, project.paymentPlans["4+"].sum4)}
                                </View>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",gap:10}}>
                                    <Text style={{color:"white"}}>Total</Text>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{ fontFamily: "MontserratBold", color: "white" }}>
                                        {
                                            (Number(project.paymentPlans["4+"].sum1) +
                                                Number(project.paymentPlans["4+"].sum2 )+
                                                Number(project.paymentPlans["4+"].sum3) +
                                                Number(project.paymentPlans["4+"].sum4)
                                            )} AED
                                    </Text>                            </View>

                            </View>
                        </Page>
                    }

                    {project.paymentPlans["Studio"]&&
                        <Page object-fit="fill"  style={{alignItems:"center",justifyContent:"center"}} size="A4" orientation="landscape">
                            <View style={{width:"80%",height:"70%",gap:15,padding:30,backgroundColor:"black",borderRadius:15}}>
                                <Text style={{fontFamily:"MontserratBold",color:"white" }}>Layout</Text>
                                <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{fontFamily:"MontserratRegular",color:"white" }}>Studio</Text>
                                </View>

                                {/* Table Headers */}
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, width: "100%" }}>
                                    <View style={{ flex: 2 ,width:"60%"}}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white" }}>Stage</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Percent</Text>
                                    </View>
                                    <View style={{ flex: 1,width:"20%" }}>
                                        <Text style={{ fontFamily: "MontserratBold",color:"white"  }}>Price</Text>
                                    </View>
                                </View>
                                <View style={{gap:10}}>
                                    {paymentPlanRow("Booking", project.paymentPlans["Studio"].percent1, project.paymentPlans["Studio"].sum1)}
                                    {paymentPlanRow("During Construction", project.paymentPlans["Studio"].percent2, project.paymentPlans["Studio"].sum2)}
                                    {paymentPlanRow("On Handover", project.paymentPlans["Studio"].percent3, project.paymentPlans["Studio"].sum3)}
                                    {paymentPlanRow("After Handover", project.paymentPlans["Studio"].percent4, project.paymentPlans["Studio"].sum4)}
                                </View>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",gap:10}}>
                                    <Text style={{color:"white"}}>Total</Text>
                                    <View style={{width:40,height:3,backgroundColor:"#407BFF"}}/>
                                    <Text style={{ fontFamily: "MontserratBold", color: "white" }}>
                                        {
                                            (Number(project.paymentPlans["Studio"].sum1) +
                                                Number(project.paymentPlans["Studio"].sum2 )+
                                                Number(project.paymentPlans["Studio"].sum3) +
                                                Number(project.paymentPlans["Studio"].sum4)
                                            )} AED
                                    </Text>                            </View>

                            </View>
                        </Page>
                    }
                </Document>
            </PDFViewer>
        </div>
            )

};

export default MyPDFComponent;

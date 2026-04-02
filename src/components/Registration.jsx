import { useNavigate } from "react-router-dom";
import { useState} from "react";

import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

import emailjs from '@emailjs/browser';

import {motion} from 'framer-motion';

//Componentas puslapiui su forma ir jos funkcijos, su kalbos parametru
function Registration({lang}){

    //EmailJS duomenys P.S NE LIESTI KAS LIES TAM PER GALVA DUOSIU
    const templateID = "template_2y1ibpq";
    const autoReplyID = "template_nkvcdx9";
    const serviceID = "service_xtbaear";

    emailjs.init({
        publicKey: "mlsFH5LSh9e3YU7Om",
    });


    const navigate = useNavigate();
    
    //Componento lietuviskas ir angliskas tekstas
    const text = [
      {
        LT:"Lankytojo registracija",
        EN:"Visitor Registration"
      },
      {
        LT: "Vardas",
        EN: "Name",

      },
      {
        LT: "Pavardė",
        EN: "Last name",
      },
      {
        LT: "Vizito tikslas",
        EN: "The purpose of visit",
      },
      {
        LT: "Vizitas pas",
        EN: "Who did you come to visit",
      },
      {
        LT: "Testi",
        EN: "Continue",
      },
      {
        LT: "Atgal",
        EN: "Back",
      },
      {
        LT:"Dėl mokslų",
        EN: "For studies"
      },
      {
        LT:"Dėl dokumentų",
        EN:"For documents"
      },
      {
        LT:"Konsultacijai",
        EN:"For consultation"
      },
      {
        LT:"Suderintas vizitas",
        EN:"Planned visit"
      },
      {
        LT:"Kita",
        EN:"Other"
      },
      {
        LT:"Įrašyk priežastį",
        EN:"Enter the reason"
      },
      {
        LT: "Jūsų EL. paštas",
        EN: "Your email"
      }
    ];

    //Componento alertu tekstas lietuviskai
    const alertTexts = {
      firstName: "Įvesk vardą",
      lastName: "Įvesk pavardę",
      goal: "Pasirink vizito tikslą",
      addressee: "Pasirink žmogų",
      firstNameNum: "Varde negali būti skaičių",
      lastNameNum: "Pavardėje negali būti skaičių",
      goalOther: "Įrašyk savo priežastį"
    };

    const showErrorAlert= text => toast.error(text, {
      position: 'top-center'
    });

    //Navigacija i praeita puslapi
    const goToWelcome = () => navigate("/");

    //Navigacija i kita puslapi
    const goToDirections = () => navigate("/directions");

    //Mokytoju, administracijos ir t.t duomenys
    const teacherData = [
      {
        name: "",
        email: ""
      },
      {
        name: "Teacher1",
        email: "projekto-teacher1@outlook.com",
      },
      {
        name: "Teacher2",
        email: "projekto-teacher2@outlook.com",
      },
    ];

    const optionData = [{value: "", label: ""}];

    for(const key in teacherData){
      optionData.push({value: teacherData[key].name, label: teacherData[key].name})
    }
    
    const goalOption = [
      {value: "", label:""},
      {value:"Dėl mokslų", label:text[7][lang]},
      {value:"Dėl dokumentų", label:text[8][lang]},
      {value:"Konsultacijai", label:text[9][lang]},
      {value:"Suderintas vizitas", label:text[10][lang]},
      {value:"Kita", label:text[11][lang]},
    ];
    
  

    //State laisko duomenyms
    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      goal: "",
      email: "",
      addressee: ""
    });

    const [autoReplyEmail, setAutoReplyEmail] = useState({});

    // Other box state
    const [show, setShow] = useState("none");


    //Funkcija parodyt textarea jeigu priezastys pasirinkta kita
    const showOtherReason = element => {
        if(element.value == "Kita"){
            setShow("block");
            
        }
        else{
            setShow("none");
        }
    }

    //Funkcija keisti datos duomenys
    const changeEmailData = (data, element) => {
      //Variantas visu išskirus email duomenu kaitimo
      if(data != "email"){
        setData(prev => ({
          ...prev, [data]: element.value
        }));
      }
      //Variantas email duomenu kaitimo
      else{
        setData(prev => ({
          ...prev, [data]: teacherData.find(el => el.name == element.value).email
        }));
      }
    }



    //Funkcija laiskus siusti
    function sendEmail(data) {

      //Mokytojui
      emailjs.send(serviceID, templateID, data).then(
        //Jeigu viskas gerai suveikia sitas kodas
        (response) =>{
          console.log("Email buvo sekmingai išsiustas",response.status,response.text);
         
        },
        //Jeigu klaida sitas
        (error) => {
          console.log("KLAIDA!!!!!", error);
          showErrorAlert("KLAIDA!");
          navigate("/form");
        },
      );

      //Atejusiam zmogui
        emailjs.send(serviceID, autoReplyID, autoReplyEmail).then(
        //Jeigu viskas gerai suveikia sitas kodas
        (response) =>{
          console.log("Email buvo sekmingai išsiustas",response.status,response.text);
         
        },
        //Jeigu klaida sitas
        (error) => {
          console.log("KLAIDA!!!!!", error);
          if(error.status == 422){
            showErrorAlert("Įvesk egzistuojanti pašta");
            navigate("/form");
          }
          
        },
      );

      goToDirections();
    }

    //Inputu, selectu ir taip toliau validacija
    const validation = () => {
      for(let key in data){
        //Validacija kad duomenys ne butu tušti
        if(!data[key] && key!="email"){
          showErrorAlert(alertTexts[key]);
          return;
        }
        //Validacija kad vardas ir pavarde butu be skaiciu
        if((key == "firstName" || key == "lastName") && /\d/.test(data[key])){
          showErrorAlert(alertTexts[key+"Num"]);
          return;
        }
        //Validacija kad jeigu pasirinkta kita priezastys textarea ne butu tuscias
        if(data[key] == "Kita"){
          showErrorAlert(alertTexts[key+"Other"]);
          return;
        }
      }
        
      sendEmail(data);          
    }
    
    

    return(
        <>
          <motion.main initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.7 }}
          >
            <div className="registration">
                <ToastContainer autoClose={2000} />
                <h1>{text[0][lang]}</h1>
                <form id="form" action="#" onSubmit={e => {
                    e.preventDefault();
                    validation();
                }}>
                    <label htmlFor="userName">{text[1][lang]}</label>
                    <input type="text" name="userName" onChange={e => changeEmailData("firstName", e.target)} />  

                    <label htmlFor="userSurname">{text[2][lang]}</label>
                    <input type="text" name="userSurname" onChange={e => changeEmailData("lastName", e.target)} />  

                    <label htmlFor="userEmail">{text[13][lang]}</label>
                    <input type="text" name="userEmail" onChange={e => setAutoReplyEmail({email: e.target.value})} />

                    <label htmlFor="goal">{text[3][lang]}</label>
                    <Select 
                      options={goalOption} 
                      defaultValue={optionData[0]}
                      isSearchable={false}
                      onChange={e => {showOtherReason(e); changeEmailData("goal", e)}}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                          ...theme.colors,
                          primary: "#2CD47D"
                        }
                      })}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderStyle: "solid",
                          borderColor: state.isFocused ? "var(--accent-color)" : "#114853",
                          borderWidth: "2px",
                          boxShadow: state.isFocused
                            ? "0 0 8px var(--accent-color)"
                            : "none",
                          height: "40px",
                          marginTop: "6px",
                          marginBottom: "12px",
                          fontSize: "1.2rem",

                          "&:hover": {
                            borderColor: "var(--accent-color)",
                          },
                          "& > *": {
                            height: "40px",
                          },
                          "& > div > div": {
                            height: "40px"
                          }
                        }),

                        option: (base, state) => ({
                          ...base,
                          backgroundColor:  state.isFocused ? "#83e7b3" : "white",
                          color: state.isFocused ? "#264837" : "black"
                        })
                      }}
                      
                    />
                    <div id="otherBox" className="other-box" style={{display: show}}>
                        <label htmlFor="otherReason">{text[12][lang]}</label>
                        <textarea name="otherReason" onChange={e => changeEmailData(e.target.value ? "goal" : "", e.target)}></textarea>
                    </div>  
                    <label htmlFor="teacherName">{text[4][lang]}</label>
                    <Select 
                      options={optionData} 
                      defaultValue={optionData[0]}
                      isSearchable={false}
                      onChange={e => {changeEmailData("addressee", e); changeEmailData("email", e)}} 
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                          ...theme.colors,
                          primary: "#2CD47D"
                        }
                      })}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderStyle: "solid",
                          boxSizing: "border-box !important",
                          borderColor: state.isFocused ? "var(--accent-color)" : "#114853",
                          borderWidth: "2px",
                          boxShadow: state.isFocused
                            ? "0 0 8px var(--accent-color)"
                            : "none",
                          height: "40px",
                          marginTop: "6px",
                          marginBottom: "12px",
                          fontSize: "1.2rem",

                          "&:hover": {
                            borderColor: "var(--accent-color)",
                          },
                          "& > *": {
                            height: "40px",
                          },
                          "& > div > div": {
                            height: "40px",
                          },
                          "& > :last-child(div)":{
                            height: "auto"
                          }
                        }),

                        option: (base, state) => ({
                          ...base,
                          backgroundColor:  state.isFocused ? "#83e7b3" : "white",
                          color: state.isFocused ? "#264837" : "black"
                        })
                      }}
                      
                    />
                    <div className="form-btn">
                        <button className="form-testi">{text[5][lang]}</button>
                        <button type="reset" className="form-atgal" onClick={goToWelcome}>{text[6][lang]}</button>
                    </div>
                </form>
            </div>
          </motion.main>
        </>
    );
}

export default Registration;
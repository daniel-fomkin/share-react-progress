import { useNavigate } from "react-router-dom";
import { useState} from "react";

import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

import emailjs from '@emailjs/browser';
import PageAnimation from "./PageAnimation";

import translate from "../utlils/translate";

//EmailJS duomenys P.S NE LIESTI KAS LIES TAM PER GALVA DUOSIU
    const templateID = "template_2y1ibpq";
    const autoReplyID = "template_nkvcdx9";
    const serviceID = "service_xtbaear";

    emailjs.init({
        publicKey: "mlsFH5LSh9e3YU7Om",
    });

//Componentas puslapiui su forma ir jos funkcijos, su kalbos parametru
function Registration({lang}){

    const navigate = useNavigate();

    const showErrorAlert= text => toast.error(text, {
      position: 'top-center',
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

    const optionData = teacherData.map(el => {return {value: el.name, label: el.name};});

    const goalOption = [
      {value: "", label:""},
      {value:"Dėl mokslų", label:translate("registration", "schoolGoal", lang)},
      {value:"Dėl dokumentų", label:translate("registration", "documentGoal", lang)},
      {value:"Konsultacijai", label:translate("registration", "consultationGoal", lang)},
      {value:"Suderintas vizitas", label:translate("registration", "plannedGoal", lang)},
      {value:"Kita", label:translate("registration", "otherGoal", lang)},
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
          console.log(autoReplyEmail);
          
          showErrorAlert("KLAIDA!");
          navigate("/form");
          
        },
      );

      goToDirections();
    }

    //Inputu, selectu ir taip toliau validacija
    const validation = () => {
      for(let key in data){
        //Validacija kad duomenys ne butu tušti
        if(!data[key] && key!="email"){          
          showErrorAlert(translate("alerts", key, lang));
          return;
        }
        //Validacija kad vardas ir pavarde butu be skaiciu
        if((key == "firstName" || key == "lastName") && /\d/.test(data[key])){
          showErrorAlert(translate("alerts", key+"Num", lang));
          return;
        }
        //Validacija kad jeigu pasirinkta kita priezastys textarea ne butu tuscias
        if(data[key] == "Kita"){
          showErrorAlert(translate("alerts", key+"Other", lang));
          return;
        }
      }
      if(!autoReplyEmail.email){
        showErrorAlert(translate("alerts", "email", lang));
        return;
      }
      if(autoReplyEmail.email.indexOf("@") == -1 && autoReplyEmail.email.indexOf(".") == -1){
        showErrorAlert(translate("alerts", "emailNotExist", lang));
        return;
      }
      sendEmail(data);          
    }
    
    

    return(
        <PageAnimation>
          <div className="registration">
              <ToastContainer autoClose={2000} />
              <h1>{translate("registration", "header", lang)}</h1>
              <form id="form" action="#" onSubmit={e => {
                  e.preventDefault();
                  validation();
              }}>
                  <label htmlFor="userName">{translate("registration", "nameText", lang)}</label>
                  <input type="text" name="userName" id= "userName" onChange={e => changeEmailData("firstName", e.target)} />  

                  <label htmlFor="userSurname">{translate("registration", "lastNameText", lang)}</label>
                  <input type="text" name="userSurname" id="userSurname" onChange={e => changeEmailData("lastName", e.target)} />  

                  <label htmlFor="userEmail">{translate("registration", "email", lang)}</label>
                  <input type="text" name="userEmail" id = "userEmail" onChange={e => setAutoReplyEmail({email: e.target.value})} />

                  <label htmlFor="goal">{translate("registration", "goalText", lang)}</label>
                  <Select 
                    options={goalOption} 
                    defaultValue={optionData[0]}
                    isSearchable={false}
                    id="goal"
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
                      <label htmlFor="otherReason">{translate("registration", "reason", lang)}</label>
                      <textarea name="otherReason" id="otherReason" onChange={e => changeEmailData(e.target.value ? "goal" : "", e.target)}></textarea>
                  </div>  
                  <label htmlFor="teacherName">{translate("registration", "adreseeText", lang)}</label>
                  <Select 
                    options={optionData} 
                    defaultValue={optionData[0]}
                    isSearchable={false}
                    id="teacherName"
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
                      <button className="form-testi">{translate("registration", "continueButton", lang)}</button>
                      <button type="reset" className="form-atgal" onClick={goToWelcome}>{translate("registration", "backButton", lang)}</button>
                  </div>
              </form>
          </div>
        </PageAnimation>
    );
}

export default Registration;

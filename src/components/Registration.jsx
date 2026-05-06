import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

import autoReset from '../utlils/auto-reset';

import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

import emailjs from '@emailjs/browser';
import PageAnimation from "./PageAnimation";

import translate from "../utlils/translate";
import teacherData from '../utlils/data';

//EmailJS duomenys P.S NE LIESTI KAS LIES TAM PER GALVA DUOSIU
    const templateID = "template_2y1ibpq";
    const autoReplyID = "template_nkvcdx9";
    const serviceID = "service_xtbaear";

    emailjs.init({
        publicKey: "mlsFH5LSh9e3YU7Om",
    });

//Componentas puslapiui su forma ir jos funkcijos, su kalbos parametru
function Registration({lang, getDataFunction }){

    const navigate = useNavigate();

    const showErrorAlert= text => toast.error(text, {
      position: 'top-center',
      className: "error-alert"
    });

    //Navigacija i praeita puslapi
    const goToWelcome = () => navigate("/");
    
    //Navigacija i kita puslapi
    const goToDirections = () => {
      navigate("/directions");
      clearTimeout(timeOutId);
    };
    

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

    const [ resetStatus, setResetStatus ] = useState(false);
    let timeOutId;
    useEffect(() => {
      if(resetStatus){
        goToWelcome()
      }
      else{
        function timeOut(){
          let timeOut = autoReset(setResetStatus);
          return timeOut;
        }
        timeOutId = timeOut();
      }
    }, [resetStatus, goToWelcome]);

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
      data.userEmail = autoReplyEmail.email;
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
      getDataFunction(data);
      if(data.addressee == "Teacher1"){
        sendEmail(data);          
      }
      else{
        goToDirections();
      }
    }
    
    

    return(
        <PageAnimation>
          <div className="registration">
              <ToastContainer autoClose={2000} />
              <h1>{translate("registration", "header", lang)}</h1>
              <form id="form" action="#" onSubmit={e => {
                  e.preventDefault();
                  validation();
              }} onChange={() => {
                clearTimeout(timeOutId);
                setResetStatus(false);
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
                        borderColor: state.isFocused ? "#30b74e" : "#114853",
                        borderWidth: "2px",
                        boxShadow: state.isFocused
                          ? "0 0 8px var(--accent-color)"
                          : "none",
                        marginTop: "6px",
                        marginBottom: "12px",
                        fontSize: "2.2rem",

                        "&:hover": {
                          borderColor: "#30b74e",
                        },
                        "& > *": {
                          height: "3.7rem",
                        },
                        "& > div > div": {
                          height: "3.7rem"
                        }
                      }),

                      option: (base, state) => ({
                        ...base,
                        backgroundColor:  state.isFocused ? "#d0d1d0" : "white",
                        fontSize: "2rem",
                        color: state.isFocused ? "#1f1f1f" : "black"
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
                        borderColor: state.isFocused ? "#30b74e" : "#114853",
                        borderWidth: "2px",
                        boxShadow: state.isFocused
                          ? "0 0 8px #30b74e"
                          : "none",
                        marginTop: "6px",
                        marginBottom: "12px",
                        fontSize: "2.2rem",

                        "&:hover": {
                          borderColor: "#30b74e",
                        },
                        "& > *": {
                          height: "3.7rem",
                        },
                        "& > div > div": {
                          height: "3.7rem",
                        },
                        "& > :last-child(div)":{
                          height: "auto"
                        }
                      }),

                      option: (base, state) => ({
                        ...base,
                        backgroundColor:  state.isFocused ? "#d0d1d0" : "white",
                        color: state.isFocused ? "#1f1f1f" : "black",
                        fontSize: "2rem"
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

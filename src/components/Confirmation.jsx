import { useNavigate } from "react-router-dom";

import checkImg from '../assets/check.svg';
import mailImg from '../assets/mail.svg';

import PageAnimation from "./PageAnimation";

import translate from '../utlils/translate';

import { useState, useEffect } from "react";
import autoReset from "../utlils/auto-reset";


//Componentas paskutiniam puslapiui su kalbos parametru
function Confrimation({lang, data}){

    const navigate = useNavigate();

    const goToWelcome = () => navigate("/");

    const [ resetStatus, setResetStatus ] = useState(false);
    useEffect(() => {
      if(resetStatus){
        goToWelcome()
      }
      else{
        function timeOut(){
          let timeOut = autoReset(setResetStatus);
          return timeOut;
        }
        timeOut();
      }
    }, [resetStatus, goToWelcome]);

    return(
        <PageAnimation>
          <div className="done">
              <img src={checkImg} alt="Confirmation" />
              <h1>{translate("confirmation", "confirm", lang)}</h1>
              <p>Jūs užsiregistravote pas {data.addressee}</p>
              <p>{translate("confirmation", "information", lang)}</p>
              <img src={mailImg} alt="Mail Icon" />
              <button type="button" className="done-btn" onClick={goToWelcome}>{translate("confirmation", "finishButton", lang)}</button>
          </div>
        </PageAnimation>
    );
}

export default Confrimation;
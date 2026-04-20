import { useNavigate } from "react-router-dom";

import checkImg from '../assets/check.svg';
import mailImg from '../assets/mail.svg';

import PageAnimation from "./PageAnimation";

import translate from '../utlils/translate';

//Componentas paskutiniam puslapiui su kalbos parametru
function Confrimation({lang}){

    const navigate = useNavigate();

    const goToWelcome = () => navigate("/");

    return(
        <PageAnimation>
          <div className="done">
              <img src={checkImg} alt="Confirmation" />
              <h1>{translate("confirmation", "confirm", lang)}</h1>
              <p>{translate("confirmation", "information", lang)}</p>
              <img src={mailImg} alt="Mail Icon" />
              <button type="button" className="done-btn" onClick={goToWelcome}>{translate("confirmation", "finishButton", lang)}</button>
          </div>
        </PageAnimation>
    );
}

export default Confrimation;
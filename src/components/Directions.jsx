import { useNavigate } from 'react-router-dom';
import checkImage from '../assets/check.svg';
import upArrowImage from '../assets/up.svg';

import PageAnimation from './PageAnimation';
import { useEffect, useState } from 'react';

import translate from '../utlils/translate';
import autoReset from '../utlils/auto-reset';

//Componentas puslapiui su kryptimi, su kalbos parametru
function Directions({lang}){

    const navigate = useNavigate();

    const goToConfrimation = () => navigate("/confrimation");
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
          <div className="directions">
              <img src={checkImage} alt='check' />
              <h1>{translate("directions", "header", lang)}</h1>
              <div className="directions_content">
                  <img src={upArrowImage} alt="up arrow" />
                  <div className="directions_text">
                      <p>{translate("directions", "directionText", lang)}</p>
                      <p>{translate("directions", "cabinet", lang)}</p>
                  </div>
              </div>
              <button type="button" className='directions-btn' onClick={goToConfrimation}>{translate("directions", "finishButton", lang)}</button>
          </div>
        </PageAnimation>
    );
}

export default Directions;

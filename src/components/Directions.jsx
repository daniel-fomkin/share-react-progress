import { useNavigate } from 'react-router-dom';
import checkImage from '../assets/check.svg';
import upArrowImage from '../assets/up.svg';

import PageAnimation from './PageAnimation';

import translate from '../utlils/translate';

//Componentas puslapiui su kryptimi, su kalbos parametru
function Directions({lang}){

    const navigate = useNavigate();

    const goToConfrimation = () => navigate("/confrimation");

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

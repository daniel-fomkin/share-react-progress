import { useNavigate } from 'react-router-dom';
import checkImage from '../assets/check.svg';
import upArrowImage from '../assets/up.svg';

import PageAnimation from './PageAnimation';

//Componentas puslapiui su kryptimi, su kalbos parametru
function Directions({lang}){

    const navigate = useNavigate();

    const goToConfrimation = () => navigate("/confrimation");

    //Componento lietuviskas ir angliskas tekstas
    const text = [
    {
      LT:"Jūsų kelionė prasideda čia",
      EN:"Your journey begins here."
    },
    {
      LT:"Baigti",
      EN:"Finish"
    },
    {
      LT: "Eikite į antrą aukštą",
      EN: "Go to the second floor."
    },
    {
      LT: "Jūsų laukia 205 kabinete",
      EN: "You are expected in room 205."
    }
  ];

    return(
        <PageAnimation>
          <div className="directions">
              <img src={checkImage} alt='check' />
              <h1>{text[0][lang]}</h1>
              <div className="directions_content">
                  <img src={upArrowImage} alt="up arrow" />
                  <div className="directions_text">
                      <p>{text[2][lang]}</p>
                      <p>{text[3][lang]}</p>
                  </div>
              </div>
              <button type="button" className='directions-btn' onClick={goToConfrimation}>{text[1][lang]}</button>
          </div>
        </PageAnimation>
    );
}

export default Directions;
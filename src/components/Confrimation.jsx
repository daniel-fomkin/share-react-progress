import { useNavigate } from "react-router-dom";

import checkImg from '../assets/check.svg';
import mailImg from '../assets/mail.svg';

//Componentas paskutiniam puslapiui su kalbos parametru
function Confrimation({lang}){

    const navigate = useNavigate();

    const goToWelcome = () => navigate("/");

    //Componento lietuviskas ir angliskas tekstas
    const text = [
      {
        LT:"Baigti",
        EN:"Finish"
      },
      {
        LT:"Registracija sėkminga!",
        EN:"Registration sucessfull!"
      },
      {
        LT:"Darbuotojas informuotas apie Jūsų atvykimą",
        EN:"The worker is noticed about your visit"
      }
    ];

    return(
        <>
          <main>
            <div className="done">
                <img src={checkImg} alt="Confirmation" />
                <h1>{text[1][lang]}</h1>
                <p>{text[2][lang]}</p>
                <img src={mailImg} alt="Mail Icon" />
                <button type="button" onClick={goToWelcome}>{text[0][lang]}</button>
            </div>
          </main>
        </>
    );
}

export default Confrimation;
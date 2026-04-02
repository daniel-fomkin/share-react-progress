import { useNavigate } from "react-router-dom";

import checkImg from '../assets/check.svg';
import mailImg from '../assets/mail.svg';

import {motion} from 'framer-motion';

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
          <motion.main initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.7 }}
          >
            <div className="done">
                <img src={checkImg} alt="Confirmation" />
                <h1>{text[1][lang]}</h1>
                <p>{text[2][lang]}</p>
                <img src={mailImg} alt="Mail Icon" />
                <button type="button" className="done-btn" onClick={goToWelcome}>{text[0][lang]}</button>
            </div>
          </motion.main>
        </>
    );
}

export default Confrimation;
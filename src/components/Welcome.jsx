import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

//Componentas pirmam puslapiui su kalbos parametru
function Welcome({lang}){

    const navigate = useNavigate();

    //Componento lietuviskas ir angliskas tekstas
    const text = [
        {
          LT: "Sveiki atvykę",
          EN: "Welcome",

        },
        {
          LT: "Pradėti registraciją",
          EN: "Start registration",
        
        }
    ];

    //Navigacija i kita puslapi
    const goToForm = () => navigate("/form");

    return(
        <>
            <motion.main initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.7 }}
            >
                <div className="welcome">
                    <h1>{text[0][lang]}</h1>
                    <hr />
                    <button type="button" className="welcome-btn" onClick={goToForm}>{text[1][lang]}</button>
                </div>
            </motion.main>
        </>
    );  
}

export default Welcome;
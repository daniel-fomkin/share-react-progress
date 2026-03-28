import { useNavigate } from "react-router-dom";

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
            <main>
                <div className="welcome">
                    <h1>{text[0][lang]}</h1>
                    <hr />
                    <button type="button" className="welcome-btn" onClick={goToForm}>{text[1][lang]}</button>
                </div>
            </main>
        </>
    );  
}

export default Welcome;
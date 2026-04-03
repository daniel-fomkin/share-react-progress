import { useNavigate } from "react-router-dom";
import PageAnimation from "./PageAnimation";
import translate from "../utlils/translate";

//Componentas pirmam puslapiui su kalbos parametru
function Welcome({lang}){

    const navigate = useNavigate();

    //Navigacija i kita puslapi
    const goToForm = () => navigate("/form");

    return(
        <PageAnimation>
            <div className="welcome">
                <h1>{translate("welcome", "welcomeText", lang)}</h1>
                <hr />
                <button type="button" className="welcome-btn" onClick={goToForm}>{translate("welcome", "welcomeText", lang)}</button>
            </div>
        </PageAnimation>
    );  
}

export default Welcome;
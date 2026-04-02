import { useState } from 'react';
import langImg from '../assets/language.svg';

function LanguageButtons({get}){

    const [lang, setLang] = useState("LT");

    function changeLang(language){
        setLang(language);
        get(language);
    }

    return(
        <div className="languages">
            <img src={langImg} alt="languages" />
            <button className={`lang-btn LT ${lang == "LT" ? "active" : ""}`} onClick={() => changeLang("LT")}>LT</button>
            <hr/>
            <button className={`lang-btn UK ${lang == "EN" ? "active" : ""}`} onClick={() => changeLang("EN")}>EN</button>
        </div>
    );
}

export default LanguageButtons;
import Welcome from "./components/Welcome";
import Registration from "./components/Registration";
import Directions from "./components/Directions";
import Confrimation from "./components/Confrimation";
import LanguageButtons from "./components/LanguageButtons";
import Aside from "./components/Aside";

import {Routes, Route} from "react-router-dom";

import './App.css';
import { useState } from "react";

function App() {

  const [lang, setLang] = useState("LT");
  

  function getLang(data){
        setLang(data);       
  }
  return (
    <>
      <Aside monthLang={lang} />
      <Routes>
        <Route path="/" element={<Welcome lang={lang}/>} />
        <Route path="/form" element={<Registration lang={lang} />} />
        <Route path="/directions" element={<Directions lang={lang} />} />
        <Route path="/confrimation" element={<Confrimation lang={lang}/>} />
      </Routes>
      <LanguageButtons get={getLang}></LanguageButtons>
    </>
  );
}

export default App;

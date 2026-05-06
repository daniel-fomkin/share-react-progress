import Welcome from "./components/Welcome";
import Registration from "./components/Registration";
import Directions from "./components/Directions";
import Confrimation from "./components/Confirmation";
import LanguageButtons from "./components/LanguageButtons";
import Aside from "./components/Aside";

import {Routes, Route} from "react-router-dom";
import { AnimatePresence } from "framer-motion";


import './App.css';
import { useState } from "react";

function App() {

  const [lang, setLang] = useState("LT");
  const [data, setData] = useState("");
  

  function getLang(data){
    setLang(data);       
  }

  function getData(userData){
    setData(userData);
    console.log(data);
    
  }

  return (
    <div className="container">
      <Aside monthLang={lang} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Welcome lang={lang}/>} />
          <Route path="/form" element={<Registration lang={lang} getDataFunction={getData} />} />
          <Route path="/directions" element={<Directions lang={lang} data={data}/>} />
          <Route path="/confrimation" element={<Confrimation lang={lang} data={data}/>} />
        </Routes>
      </AnimatePresence>
      <LanguageButtons get={getLang}></LanguageButtons>
    </div>
  );
}

export default App;

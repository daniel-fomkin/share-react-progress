import logo from '../assets/Techin.webp';
import { useEffect, useState } from 'react';
import translate from '../utlils/translate';

//Componentas laikiu ir logo su kalbos parametru
function Aside({monthLang}){

    //State laikui ir datai
    const [time, setTime] = useState("00:00");
    const [month, setMonth] = useState("Sausis 1");

    //Menesiai lietuviskai ir angliskai


    //Funkcija gauti dabartini laika
    function timeNow() {
      let timeHours = new Date().getHours();
      timeHours = timeHours < 10 ? "0" + timeHours : timeHours;

      let timeMinutes = new Date().getMinutes();
      timeMinutes = timeMinutes < 10 ? "0" + timeMinutes : timeMinutes;
      let timeValue = `${timeHours}:${timeMinutes}`;

      setTime(timeValue);
    }

    

    // Funkcija gauti dabartinia data
    function dateNow() {
      let monthNumber = new Date().getMonth();

      let monthDay = new Date().getDate();
      
      let monthValue = `${translate("aside", "months", monthLang)[monthNumber]} ${monthDay}`;
      
    
      setMonth(monthValue);
    }

    //Funkcija kad kas 50ms žiuretu nauja laika ir data 
    useEffect(() => {
      function tick(){
        timeNow();
        dateNow();
      }
      tick();

      const tickID = setInterval(tick, 1000)
      return () => {
        clearInterval(tickID);
      };
    }, [monthLang]);


    return(
        <aside>
            <div className="time-data">
                <div className="date">{month}</div>
                <div className="time">{time}</div>
            </div>
            <div className="techin-logo">
                <img src={logo} alt='Techin Logo' />
            </div>
        </aside>
    );
}

export default Aside;
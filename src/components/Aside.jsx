import logo from '../assets/Techin.webp';
import { useEffect, useState } from 'react';

//Componentas laikiu ir logo su kalbos parametru
function Aside({monthLang}){

    //State laikui ir datai
    const [time, setTime] = useState("00:00");
    const [month, setMonth] = useState("Sausis 1");

    //Menesiai lietuviskai ir angliskai
    const months = [
      monthLang == "LT" ? "Sausis" : "January",
      monthLang == "LT" ? "Vasaris" : "February",
      monthLang == "LT" ? "Kovas" : "March",
      monthLang == "LT" ? "Balandis" : "April",
      monthLang == "LT" ? "Gegužė" : "May",
      monthLang == "LT" ? "Birželis" : "June",
      monthLang == "LT" ? "Liepa" : "July",
      monthLang == "LT" ? "Rugpjūtis" : "August",
      monthLang == "LT" ? "Rugsėjis" : "September",
      monthLang == "LT" ? "Spalis" : "October",
      monthLang == "LT" ? "Lapkritis" : "November",
      monthLang == "LT" ? "Gruodis" : "December"
    ];

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
      monthDay = monthDay < 10 ? "0" + monthDay : monthDay;
    
      let monthValue = `${months[monthNumber]} ${monthDay}`;
      
    
      setMonth(monthValue);
    }

    //Funkcija kad kas 50ms žiuretu nauja laika ir data 
    useEffect(() => {
      const time = setInterval(timeNow, 50);
      const date = setInterval(dateNow, 50);

      return () => {
        clearInterval(time);
        clearInterval(date);
      };
    });


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
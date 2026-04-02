import logo from '../assets/Techin.webp';
import { useEffect, useState } from 'react';

//Componentas laikiu ir logo su kalbos parametru
function Aside({monthLang}){

    //State laikui ir datai
    const [time, setTime] = useState("00:00");
    const [month, setMonth] = useState("Sausis 1");

    //Menesiai lietuviskai ir angliskai
    const months = [
      monthLang == "LT" ? "Sausio" : "January",
      monthLang == "LT" ? "Vasario" : "February",
      monthLang == "LT" ? "Kovo" : "March",
      monthLang == "LT" ? "Balandžio" : "April",
      monthLang == "LT" ? "Gegužės" : "May",
      monthLang == "LT" ? "Birželio" : "June",
      monthLang == "LT" ? "Liepos" : "July",
      monthLang == "LT" ? "Rugpjūčio" : "August",
      monthLang == "LT" ? "Rugsėjo" : "September",
      monthLang == "LT" ? "Spalio" : "October",
      monthLang == "LT" ? "Lapkričio" : "November",
      monthLang == "LT" ? "Gruodžio" : "December"
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
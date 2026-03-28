import { useNavigate } from 'react-router-dom';

//Componentas puslapiui su kryptimi, su kalbos parametru
function Directions({lang}){

    const navigate = useNavigate();

    const goToConfrimation = () => navigate("/confrimation");

    //Componento lietuviskas ir angliskas tekstas
    const text = [
    {
      LT:"Kelio nurodymai",
      EN:"Directions"
    },
    {
      LT:"Baigti",
      EN:"Finish"
    }
  ];

    return(
        <>
          <main>
            <div className="directions">
                <h1>{text[0][lang]}</h1>
                <button type="button" onClick={goToConfrimation}>{text[1][lang]}</button>
            </div>
          </main>
        </>
    );
}

export default Directions;
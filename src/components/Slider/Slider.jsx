import React, {useState} from "react";
import "./slider.css"

function Slider() {

    const [currentIndex, setCurrentIndex] = useState(0)

    const titulos = ["Log Calendario", "Ir a Inicio", "Dark Mode", "Organizar Eventos", "Home"]
    const reglas = ["Hacer click en el botón de iniciar sesión para ir al calendario.", "Para volver a la pagina de inicio hacer click en el logo de calendario en la esquina superior izquierda.", "Clickee el switch en la esquina superior derecha para activar el Dark Mode","Apreta la casilla en el horario que quieras agregar un evento, y un formulario se abrira para ponerle nombre", "Usa los botones en Home para cambiar de mes y para ver tu semana o dia en particular"]
    
    const leftTransition = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? titulos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const rightTransition = () => {
        const isLastSlide = currentIndex === titulos.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <>
        <div className="slider div">
            <h1 onClick={leftTransition}>&lt;</h1>
            <div className="slider slide-block">
                <h2 className="slider titulo"> {titulos[currentIndex]}</h2>
                <p className="slider description">{reglas[currentIndex]}</p>                
            </div>
            <h1 onClick={rightTransition}>&gt;</h1>
        </div>
        </>
    )
}
export default Slider;
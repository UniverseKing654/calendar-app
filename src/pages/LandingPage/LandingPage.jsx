import Button from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import './LandingPage.css'

function LandingPage(){

    const navigate = useNavigate()

    return (
        <>
        <div id='main-board-container'>
            <div className="vertical-container">
                <h1 className="title-page">Calendar App</h1>
                <p className='board-text'>
                    Calendar App es una aplicacion web que te permite organizar tus eventos de forma intuitiva y sencilla, para que nunca tengas que pensar en que hacer en el dia de hoy.
                </p>
                <p className="board-text">
                    Unete ya para organizar tu tiempo de la mejor manera
                </p>
                <div id="login-button-container">
                    <Button
                        text='Crear cuenta'
                        onClick={()=>navigate('/register')}
                    />
                    <Button
                        text='Iniciar Sesion'
                        route='profile'
                        onClick={()=>navigate('/login')}
                    />
                </div>
                
            </div>

            <img id='calendar-vector' src='https://cdn3d.iconscout.com/3d/premium/thumb/calendar-4029233-3337896.png'/>
        </div>
        </>
    )
}

export default LandingPage
import React, {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArrayDisplay from '../../components/ArrayDisplay/ArrayDisplay';
import Table from '../../components/Table/Table';
import Dropdown from '../../components/Dropdown/Dropdown';
import SearchNoBotton from '../../components/SearchBar/SearchNoBotton';
import DateBar from '../../components/DateBar/DateBar';
import './DataEntry.css';
import axios from 'axios';
function DataEntry(){
    const [Eventos, setEventos] = useState([])
    const [EventosIndividuales, setEventosIndividuales] = useState([])
    const [EventosGrupales, setEventosGrupales] = useState([])

    const [Clases, setClases] = useState([]);
    const [Horario, setHorario] = useState([])
    const [TipoEvento, setTipoEvento] = useState('')
    const [NombreEvento, setNombreEvento] = useState('')
    const [HoraEvento, setHoraEvento] = useState('')
    const [EventoGrupalActual, setEventoGrupalActual] = useState('')
    const [NuevaHoraEvento, setNuevaHoraEvento] = useState('')
    const [NuevaHoraEventoFinal, setNuevaHoraEventoFinal] = useState('')
    const [msg, setMsg] = useState("");
    const handleSearch = (nrc) => {
        // mandar nrc a la api
        if(nrc !== ""){
            setClases([...Clases, nrc]); //modificar nrc por el nombre de la clase
            //setHorario([...Horario, nrc])//modificar nrc para que reciba el nombre de la clase, el dia y hora que se dicta
        }
    };
    const handleClickGet = () => {
        //llamar api, buscar las clases inscritas
        // formato [[nombreclase, [dia, hora]],[nombreclase, [dia, hora]],[nombreclase, [dia, hora]]] el dia se manda con un numero (lunes = 1, martes = 2 ...), la hora es el numero del modulo
        //osea 8:20 = 1, 9:40 = 2, ..., si una clase tiene mas de un dia o hora se tiene que mandar cada dia y hora por separado
        // ejemplo calculo el Lunes y martes a las 8:20 y 9:40 se manda uno con [[calculo,[2,2]],[calculo,[2,3]],[calculo,[3,2]],[calculo,[3,3]]]
        setClases([...Clases, "agregar las clases"]);
        setHorario([...Horario, ["calculo",[1,1]],["calculo",[1,2]],["calculo",[2,1]],["calculo",[2,2]]]);
    }
    useEffect(() => {
        //cargar eventos 
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/ruta eventos individuales`)
            .then((response) => {
                console.log("esta es la data: ", response.data);
                const events={};
                setEventos(events);
                setMsg(null)
            }).catch (error => {
                console.error(error);
                setMsg("error en el back-end \n no se pueden cargar los eventos")
        });
    }, []);
    useEffect(() => {
        //cargar eventos individuales
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/ruta eventos individuales`)
            .then((response) => {
                console.log("esta es la data: ", response.data);
                const events={};
                setEventosIndividuales(events);
                setMsg(null)
            }).catch (error => {
                console.error(error);
                setMsg("error en el back-end \n no se pueden cargar los eventos")
        });
    }, []);
    useEffect(() => {
        //cargar eventos grupales
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/ruta eventos grupales`)
            .then((response) => {
                console.log("esta es la data: ", response.data);
                const events={};
                setEventosGrupales(events);
                setMsg(null)
            }).catch (error => {
                console.error(error);
                setMsg("error en el back-end \n no se pueden cargar los eventos")
        });
    }, []);
    
    const diasSemana = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const generarTablaHorario = () => {
        // Inicializar la tabla con celdas vacías
        const tabla = [
          ['hora/día', ...diasSemana],
          ['8:20', ...Array(diasSemana.length).fill('')],
          ['9:40', ...Array(diasSemana.length).fill('')],
          ['11:00', ...Array(diasSemana.length).fill('')],
          ['12:20', ...Array(diasSemana.length).fill('')],
          ['13:30', ...Array(diasSemana.length).fill('')],
          ['14:50', ...Array(diasSemana.length).fill('')],
          ['16:10', ...Array(diasSemana.length).fill('')],
          ['17:30', ...Array(diasSemana.length).fill('')],
          ['18:50', ...Array(diasSemana.length).fill('')],
          ['20:10', ...Array(diasSemana.length).fill('')],
        ];
    
        // Llenar la tabla con los datos de Horario
        Horario.forEach(([nombreclase, [dia, hora]]) => {
            tabla[hora][dia] = nombreclase;
        });
    
        return tabla;
    };
    const tablaHorario = generarTablaHorario();

    const eventos = ['Grupal', 'Evaluacion', 'Control', 'Laboratorio', 'otro'];

    const handleSelect = (selectedOption) => {
        setTipoEvento(selectedOption);
    };

    const handleNameEvent = (name) => {
        setNombreEvento(name)
    };
    const handleHoraEvento = (hora) => {
        setHoraEvento(hora)
    };
    const handleNuevaHoraEvento = (hora) => {
        setNuevaHoraEvento(hora)
    };
    const handleNuevaHoraEventoFinal = (hora) => {
        setNuevaHoraEventoFinal(hora)
    };
    const horas = ['8:20', '9:40', '11:00', '12:20','13:30', '14:50', '16:10', '17:30', '18:50', '20:10']
    const horas_final = ['9:30', '10:50', '12:10', '13:20','14:50', '16:00', '17:20', '18:40', '20:00','21:20']
    const handleMandarEvento = () => {
        //mandar el evento
    };
    const handleEventoGrupalActual = (evento) => {
        setEventoGrupalActual(evento)
    };
    const BorrarEventoGrupal = () => {
        //Borrar el evento
    };
    const CambiarHoraEventoGrupal = () => {
        //cambiar la hora del evento
    };
    const CambiarNombreEventoGrupal = () => {
        //cambiar el nombre del evento
    };
    const BorrarEvento = () => {
        //Borrar el evento
    };
    const CambiarHoraEvento = () => {
        //cambiar la hora del evento
    };
    const CambiarNombreEvento = () => {
        //cambiar el nombre del evento
    };
    const handleInvitacion = () => {
        //mandar invitacion
    };
    return(
        <>
            <div className="">
                <div className='arriba'>
                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Proximos eventos</h2>
                        </div>
                        <div className='display'>
                            <h3>Eventos proximos:</h3>
                            <ArrayDisplay array={Eventos}/>
                            {msg && <h2 className="errormsj">{msg}</h2>}
                        </div>
                    </div>
                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Administra eventos grupales</h2>
                        </div>
                        <div className='eliminar'>
                            <text>Tus eventos grupales:</text> <Dropdown options={EventosGrupales} onSelect={handleEventoGrupalActual}/>
                            <form onSubmit={BorrarEventoGrupal}>
                                <button type="submit">Eliminar evento</button>
                            </form>
                        </div>
                        <div className='cambiarhora'> 
                            <text>nueva hora:</text>
                            <Dropdown options={horas} onSelect={handleNuevaHoraEvento}/>
                            <text>-</text>
                            <Dropdown options={horas_final} onSelect={handleNuevaHoraEventoFinal}/>
                            <form onSubmit={CambiarHoraEventoGrupal}>
                                <button type="submit">Cambiar </button>
                            </form>
                        </div>
                        <div className='cambiarnombre'>
                            <text>Cambiar nombre:</text>
                            <SearchNoBotton onSearch={handleNameEvent} textbar={'Nuevo nombre del evento'}/>
                            <form onSubmit={CambiarNombreEventoGrupal}>
                                <button type="submit">Cambiar</button> 
                            </form>
                        </div>
                        <div className='invitar'>
                            <text>Invita a alguien:</text>
                            <SearchBar onSearch={handleInvitacion} textbar={'Ingresa el correo @gmail.com'} textbotton={'Mandar invitacion'}/>
                        </div>
                    </div>
                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Administra eventos individuales</h2>
                        </div>
                        <div className='eliminar'>
                            <text>Tus eventos grupales:</text> <Dropdown options={EventosGrupales} onSelect={handleEventoGrupalActual}/>
                            <form onSubmit={BorrarEventoGrupal}>
                                <button type="submit">Eliminar evento</button>
                            </form>
                        </div>
                        <div className='cambiarhora'> 
                            <text>nueva hora:</text>
                            <Dropdown options={horas} onSelect={handleNuevaHoraEvento}/>
                            <text>-</text>
                            <Dropdown options={horas_final} onSelect={handleNuevaHoraEventoFinal}/>
                            <form onSubmit={CambiarHoraEventoGrupal}>
                                <button type="submit">Cambiar </button>
                            </form>
                        </div>
                        <div className='cambiarnombre'>
                            <text>Cambiar nombre:</text>
                            <SearchNoBotton onSearch={handleNameEvent} textbar={'Nuevo nombre del evento'}/>
                            <form onSubmit={CambiarNombreEventoGrupal}>
                                <button type="submit">Cambiar</button> 
                            </form>
                        </div>
                    </div>
                </div>
                <div className='abajo'>
                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Organizar eventos</h2>
                        </div>
                        <div className='buscadores'>
                            <SearchNoBotton onSearch={handleNameEvent} textbar={'Dale un nombre al evento'}/>
                            Tipo de evento: <Dropdown options={eventos} onSelect={handleSelect}/>
                        </div>
                        <div className='fechaevento'>
                            <DateBar/>
                        </div>
                        <div>
                            <text>Hora del evento:</text>
                        </div>
                        <div className='horaevento'> 
                            <Dropdown options={horas} onSelect={handleHoraEvento}/>
                            <text>-</text>
                            <Dropdown options={horas_final} onSelect={handleNuevaHoraEventoFinal}/>
                        </div>
                        <form onSubmit={handleMandarEvento}>
                            <button type="submit">Crear evento</button>
                        </form>
                    </div>
                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Incribir clase</h2>
                        </div>
                        <div className='barrabusqueda'>
                            <SearchBar onSearch={handleSearch} textbar={"nrc del curso"} textbotton={"inscribir"}/>
                        </div>
                        <div className='display'>
                            <h3>Clases inscritas:</h3>
                            <ArrayDisplay array={Clases}/>
                        </div>
                    </div>

                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Horario</h2>
                        </div>
                        <div className='tabla'>
                            <Table table={tablaHorario}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}
export default DataEntry;
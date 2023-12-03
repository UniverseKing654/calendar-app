import React, {useState, useEffect, useContext} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArrayDisplay from '../../components/ArrayDisplay/ArrayDisplay';
import Table from '../../components/Table/Table';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownId from '../../components/Dropdown/DropdownId';
import SearchNoBotton from '../../components/SearchBar/SearchNoBotton';
import DateBar from '../../components/DateBar/DateBar';
import './DataEntry.css';
import axios from 'axios';
import AuthContext from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";

function DataEntry(){
    const {token}  = useContext(AuthContext);
    const userId = jwtDecode(token).sub;
    
    const [Eventos, setEventos] = useState([]);
    const [EventosIndividuales, setEventosIndividuales] = useState([]);
    const [EventosGrupales, setEventosGrupales] = useState([]);
    const [id_evento_individual, set_id_evento_individual]=useState("");
    const [id_evento_grupal, set_id_evento_grupal]=useState("");
    const [new_name_individual, set_new_name_individual]=useState("");
    const [new_name_grupal, set_new_name_grupal]=useState("");
    const [hora_inicio, set_hora_inicio]=useState("8:20");
    const [hora_inicio_individual, set_hora_inicio_individual]=useState("8:20");
    const [hora_inicio_grupal, set_hora_inicio_grupal]=useState("8:20");
    const [hora_final, set_hora_final]=useState("9:30");
    const [hora_final_individual, set_hora_final_individual]=useState("9:30");
    const [hora_final_grupal, set_hora_final_grupal]=useState("9:30");
    const [fecha_evento, set_fecha_evento]=useState(new Date());
    const [fecha_eventof, set_fecha_eventof]=useState(new Date());
    const [tipo_evento, set_tipo_evento] = useState('Grupal')
    const [nombre_evento, set_nombre_evento] = useState("")
    const [EventosNombre, setEventosNombre]=useState([])

    const [Clases, setClases] = useState([]);
    const [Horario, setHorario] = useState([]);
    const [msg, setMsg] = useState("");

    const horas = ['8:20', '9:40', '11:00', '12:20','13:30', '14:50', '16:10', '17:30', '18:50', '20:10']
    const horas_final = ['9:30', '10:50', '12:10', '13:20','14:50', '16:00', '17:20', '18:40', '20:00','21:20']
    const eventos = ['Grupal', 'Evaluacion', 'Control', 'Laboratorio', 'otro'];
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
    const NuevoNombreIndividual = (nombre) =>{
        set_new_name_individual(nombre);
    };
    const NuevoNombreGrupal = (nombre) =>{
        set_new_name_grupal(nombre);
    };
    const NuevaIdEventoGrupal = (id) => {
        set_id_evento_grupal(id);
    };
    const NuevaIdEventoIndividual = (id) => {
        set_id_evento_individual(id);
    };
    const NuevaHorainicio = (hora) => {
        set_hora_inicio(hora);
    };
    const NuevaHorainicioIndividual = (hora) => {
        set_hora_inicio_individual(hora);
    };
    const NuevaHorainicioGrupal = (hora) => {
        set_hora_inicio_grupal(hora);
    };
    const NuevaHorafinal = (hora) => {
        set_hora_final(hora);
    };
    const NuevaHorafinalindividual = (hora) => {
        set_hora_final_individual(hora);
    };
    const NuevaHorafinalgrupal = (hora) => {
        set_hora_final_grupal(hora);
    };
    const CambiarFecha = (fecha) => {
        set_fecha_evento(fecha);
        set_fecha_evento.setSeconds(0);
        set_fecha_evento.setMilliseconds(0);
        set_fecha_eventof(fecha);
        set_fecha_eventof.setSeconds(0);
        set_fecha_eventof.setMilliseconds(0);
    };
    const handleSelect = (selectedOption) => {
        set_tipo_evento(selectedOption);
    };
    const handleNameEvent = (name) => {
        set_nombre_evento(name);
    };

    useEffect(() => {
        //cargar eventos 
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`)
            .then((response) => {
                console.log("esta es la data: ", response.data);
                const nuevosEventosNombre = response.data.map((elemento) => elemento.name);
                setEventosNombre((prevEventosNombre) => [...prevEventosNombre, ...nuevosEventosNombre]);
                setMsg(null);
                console.log("estos son nombres: ", EventosNombre);
            }).catch (error => {
                console.log(error);
                setMsg("error en el back-end \n no se pueden cargar los eventos")
        });
    }, []);

    useEffect(() => {
        console.log("estos son nombres: ", EventosNombre);
      }, [EventosNombre]);

    useEffect(() => {
        //cargar eventos individuales
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`)
            .then((response) => {
                console.log("esta es la data: ", response.data);
                const events=[];
                setEventosIndividuales(events);
                setMsg(null)
            }).catch (error => {
                console.log(error);
                setMsg("error en el back-end \n no se pueden cargar los eventos")
        });
    }, []);

    useEffect(() => {
        //cargar eventos grupales
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`)
            .then((response) => {
                console.log("esta es la data: ", response.data);
                const events=[];
                setEventosGrupales(events);
                setMsg(null)
            }).catch (error => {
                console.log(error);
                setMsg("error en el back-end \n no se pueden cargar los eventos")
        });
    }, []);

    const handleNameChangeindividual = async(event) => {
        //cambiar nombre evento individual
        event.preventDefault();
        const postName = {
            "name": new_name_individual
        }
        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/events/${id_evento_individual}`, postName)
            .then((response) => {
                console.log("respuesta exitosa: ", response.data);
                setMsg(null)
            }).catch (error => {
                console.log(error);
                setMsg("Error, no se puede cambiar el nombre del evento")
        });
    }
    const handleNameChangeGrupal = async(event) => {
        //cambiar nombre evento Grupal
        event.preventDefault();
        const postName = {
            "name": new_name_grupal
        };
        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/events/${id_evento_grupal}`, postName)
            .then((response) => {
                console.log("respuesta exitosa: ", response.data);
                setMsg(null)
            }).catch (error => {
                console.log(error);
                setMsg("Error, no se puede cambiar el nombre del evento")
        });
    }
    const handleNuevoEvento = async(event) => {
        event.preventDefault();
        const [hi, mi]= hora_inicio.split(":");
        const [hf, mf]= hora_final.split(":");
        fecha_evento.setHours(hi);
        fecha_evento.setMinutes(mi);
        fecha_eventof.setHours(hf);
        fecha_eventof.setMinutes(mf);
        console.log(fecha_evento);
        console.log(fecha_eventof);
        let x ="false"
        if (tipo_evento==="Grupal"){
            x = "true";
        }
        const postData = {
            "admin_id": userId,
            "type": tipo_evento,
            "name": nombre_evento,
            "description": "Entrega Final",
            "is_all_day": "false",
            "is_recurring": "false",
            "is_group": x,
            "status": "uncomplete",
            "start_date": fecha_evento,
            "end_date": fecha_eventof,
            "color": "#FF0000"
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, postData)
            .then(response => {
                console.log("respuesta exitosa: ", response.data);
                setMsg(null);
            }).catch (error => {
                console.log(error);
                setMsg("Error, no se puede formar el evento")
        });
    }
    
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

    const handleMandarEvento = () => {
        //mandar el evento
    };
    const BorrarEventoGrupal = () => {
        //Borrar el evento
    };
    const CambiarHoraEventoGrupal = () => {
        //cambiar la hora del evento
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
                            <ArrayDisplay array={EventosNombre}/>
                            {msg && <h2 className="errormsj">{msg}</h2>}
                        </div>
                    </div>
                    <div className='eventos'>
                        <div className='titulo'>
                            <h2>Administra eventos grupales</h2>
                        </div>
                        <div className='eliminar'>
                            <text>Tus eventos grupales:</text> <DropdownId options={EventosGrupales} onSelect={NuevaIdEventoGrupal}/>
                            <form onSubmit={BorrarEventoGrupal}>
                                <button type="submit">Eliminar evento</button>
                            </form>
                        </div>
                        <div className='cambiarhora'> 
                            <text>nueva hora:</text>
                            <Dropdown options={horas} onSelect={NuevaHorainicioGrupal}/>
                            <text>-</text>
                            <Dropdown options={horas_final} onSelect={NuevaHorafinalgrupal}/>
                            <form onSubmit={CambiarHoraEventoGrupal}>
                                <button type="submit">Cambiar </button>
                            </form>
                        </div>
                        <div className='cambiarnombre'>
                            <text>Cambiar nombre:</text>
                            <SearchNoBotton onSearch={NuevoNombreGrupal} textbar={'Nuevo nombre del evento'}/>
                            <form onSubmit={handleNameChangeGrupal}>
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
                            <text>Tus eventos individuales:</text> <Dropdown options={EventosGrupales} onSelect={NuevaIdEventoIndividual}/>
                            <form onSubmit={BorrarEventoGrupal}>
                                <button type="submit">Eliminar evento</button>
                            </form>
                        </div>
                        <div className='cambiarhora'> 
                            <text>nueva hora:</text>
                            <Dropdown options={horas} onSelect={NuevaHorainicioIndividual}/>
                            <text>-</text>
                            <Dropdown options={horas_final} onSelect={NuevaHorafinalindividual}/>
                            <form onSubmit={CambiarHoraEventoGrupal}>
                                <button type="submit">Cambiar </button>
                            </form>
                        </div>
                        <div className='cambiarnombre'>
                            <text>Cambiar nombre:</text>
                            <SearchNoBotton onSearch={NuevoNombreIndividual} textbar={'Nuevo nombre del evento'}/>
                            <form onSubmit={handleNameChangeindividual}>
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
                            <DateBar onSearch={CambiarFecha}/>
                        </div>
                        <div>
                            <text>Hora del evento:</text>
                        </div>
                        <div className='horaevento'> 
                            <Dropdown options={horas} onSelect={NuevaHorainicio}/>
                            <text>-</text>
                            <Dropdown options={horas_final} onSelect={NuevaHorafinal}/>
                        </div>
                        <form onSubmit={handleNuevoEvento}>
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
import {useEffect,useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';
import IconoReset from '../img/reset.png';

const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {

    const [porcentaje,setPorcentaje] = useState(0);
    const [disponible,setDisponible] = useState(0);
    const [deficit,setDeficit]= useState(0);
    const [gastado,setGastado] = useState(0);

    useEffect(() =>{
        const totalGastado= gastos.reduce((total,gasto) => gasto.cantidad + total, 0);
        const totalDisponible = (presupuesto >= totalGastado) ? (presupuesto - totalGastado) : 0;
        const totaldeficit= (totalDisponible === 0) ? (presupuesto - totalGastado) : 0;
        const nuevoPorcentaje= ((( presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setGastado(totalGastado);
        setDisponible(totalDisponible);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
        setDeficit(totaldeficit);
        

        
    },[gastos,presupuesto])
    const formatoCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }


    

    const handleResetApp= () => {
        swal.fire({
            title: '¿Desea restablecer el presupuesto?',
            text: "No puedes revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, claro!',
        }).then((res) => {
            if (res.isConfirmed) {
                setGastos([]);
                setPresupuesto(0);
                location.reload();
            }
        });
    }
  return (
    <>
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                        
                    })}    
                >

                </CircularProgressbar>
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' onClick={handleResetApp} type="button">
                    Reiniciar Presupuesto
                    <img src={IconoReset} alt="Icono de reiniciar"/>
                </button>
                <p>
                    <span>Presupuesto: </span>{formatoCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponible: </span>{formatoCantidad(disponible)} 
                </p>
                <p className={`${deficit < 0 ? 'negativo' : ''}`}>
                    <span>Déficit: </span>{formatoCantidad(deficit)}
                </p>
                <p>
                    <span>Gastado: </span>{formatoCantidad(gastado)} 
                </p>
            </div>
            
        </div>
    </>
)}

export default ControlPresupuesto

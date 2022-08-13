import React from 'react'
import IconoGastos from '../img/gastos.png'


const InicioSesion = ({setLogin}) => {


    const handleIngresar = () =>{
        setLogin(true);
    }
    return (
        <div className='contenedor-login'>
            <img src={IconoGastos} alt="Icono de Presupuesto" />
            <h1>Bienvenidos al sistema de Gestion de Gastos</h1>
            <button type='button' className='boton' onClick={() => handleIngresar()}>Ingresar</button>
            
        </div>
    )
}

export default InicioSesion

import React from 'react'
import IconoGastos from '../img/gastos.png'


const InicioSesion = ({setLogin,setEmail,setUsuario}) => {


    const handleIngresar = (e) =>{
        e.preventDefault();
        const usuario= e.target.usuario.value;
        const email= e.target.email.value;
        if(usuario != "" && email != ""){
            setUsuario(usuario);
            setEmail(email);
            setLogin(true);
        }
        else{
            alert("Todos los campos son obligatorios")
        }
    }
    return (
        <div className='contenedor-login'>
            <img src={IconoGastos} alt="Icono de Presupuesto" />
            <h1>Bienvenidos al sistema de Gestion de Gastos</h1>
            <form onSubmit={(e) => handleIngresar(e)} className='formulario-login'>
                <legend>Iniciar Sesión</legend>
                <div className="campo-login">
                    <label htmlFor="usuario">Nombre de Usuario:</label>
                    <input type="text" name='usuario' id='usuario' placeholder='Ingrese su nombre de usuario'/>
                </div>
                <div className="campo-login">
                    <label htmlFor="email">Correo Electrónico: </label>
                    <input type="email" name='email' id='email' placeholder='Ingrese su correo'/>
                </div>
                <input type="submit" className='boton' value="Ingresar"/>
            </form>
        </div>
    )
}

export default InicioSesion

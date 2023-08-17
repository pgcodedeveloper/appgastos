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
            <div className='contenedor_login_icono'>
                <div className='contenedor_icono'>
                    <i className="fa-solid fa-wallet"></i>
                </div>
            </div>
            <form onSubmit={(e) => handleIngresar(e)} className='formulario-login'>
                <legend>Iniciar Sesión</legend>
                <div className="campo-login">
                    <label htmlFor="usuario">
                        <i className="fa-solid fa-user"></i>
                    </label>
                    <input type="text" name='usuario' id='usuario' placeholder='Ingrese su nombre de usuario'/>
                </div>
                <div className="campo-login">
                    <label htmlFor="email">
                        <i className="fa-solid fa-envelope"></i> 
                    </label>
                    <input type="email" name='email' id='email' placeholder='Ingrese su correo'/>
                </div>
                <input type="submit" className='boton' value="Ingresar"/>
            </form>
        </div>
    )
}

export default InicioSesion

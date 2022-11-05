import { useEffect } from 'react';
import {useState} from 'react'
import { generarID } from '../helpers';
import Mensaje from './Mensaje';
const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto,
    presupuestoNuevo,
    setPresupuestoNuevo,
    presupuestoAhora,
    setPresupuestoAhora,
    setPresupuestos,
    presupuestos,
    presupuestoEditar,
    presupuestoEdit,
    setPresupuestoEdit,
    editarIngreso,
    guardarIngreso
}) => {
    const [mensaje, setMensaje] = useState('');
    const [valor,setValor]= useState(0);

    const handlePresupuesto =  (e) =>{
        e.preventDefault();
        if(!valor || valor < 0){
            setMensaje('No es un presupuesto válido');
            return;
        }

        setMensaje('');
        guardarIngreso({valor});
        setIsValidPresupuesto(true);

    }
    const handlePresupuestoNuevo = (e) =>{
        e.preventDefault();
        if(!valor || valor < 0){
            setMensaje('No es un presupuesto válido');
            return;
        }
        setMensaje('');
        guardarIngreso({valor})
        setIsValidPresupuesto(true);
        setPresupuestoNuevo(false);
    }

    const handlePresupuestoEditar = (e) =>{
        e.preventDefault();
        if(!presupuestoAhora || presupuestoAhora < 0){
            setMensaje('No es un presupuesto válido');
            return;
        }
        setMensaje('');
        editarIngreso({
            id: presupuestoEdit.id,
            valor: presupuestoAhora,
            fecha: presupuestoEdit.fecha
        });
        setIsValidPresupuesto(true);
        setPresupuestoEdit(false);
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        {presupuestoNuevo == true ? (
            <form action="" onSubmit={handlePresupuestoNuevo} className='formulario'>
                <div className='campo'>
                    <label htmlFor="presupuesto">Agregar más Presupuesto</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Presupuesto' 
                    onChange={ (e) =>{
                        setValor(Number(e.target.value));
                    }}/>
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        ): presupuestoEditar == true ?
        (
            <form action="" onSubmit={handlePresupuestoEditar} className='formulario'>
                <div className='campo'>
                    <label htmlFor="presupuesto">Editar Presupuesto</label>
                    <label htmlFor='presupuesto'>Valor anterior: {presupuestoEdit.valor}</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Presupuesto' 
                    onChange={ e => setPresupuestoAhora(Number(e.target.value))}/>
                </div>
                <input type="submit" value="Guardar" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        ) : (
            <form action="" onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Presupuesto' 
                    onChange={ e => setValor(Number(e.target.value))}/>
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        )}
        
    </div>
  )
}

export default NuevoPresupuesto

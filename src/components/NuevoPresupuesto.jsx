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
    const [descripcion,setDescripcion] = useState('');

    const handlePresupuesto =  (e) =>{
        e.preventDefault();
        if(!valor || valor < 0 && descripcion == ''){
            setMensaje('No es un presupuesto válido');
            return;
        }

        setMensaje('');
        guardarIngreso({valor,descripcion});
        setIsValidPresupuesto(true);

    }
    const handlePresupuestoNuevo = (e) =>{
        e.preventDefault();
        if(!valor || valor < 0 && descripcion == ''){
            setMensaje('No es un presupuesto válido');
            return;
        }
        setMensaje('');
        guardarIngreso({valor,descripcion})
        setIsValidPresupuesto(true);
        setPresupuestoNuevo(false);
    }

    const handlePresupuestoEditar = (e) =>{
        e.preventDefault();
        if(!presupuestoAhora || presupuestoAhora < 0 && descripcion == ''){
            setMensaje('No es un presupuesto válido');
            return;
        }
        setMensaje('');
        editarIngreso({
            valor: presupuestoAhora,
            descripcion: descripcion,
            id: presupuestoEdit.id,
            fecha: presupuestoEdit.fecha
        });
        setIsValidPresupuesto(true);
        setPresupuestoEdit(false);
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        {presupuestoNuevo == true ? (
            <form action="" onSubmit={handlePresupuestoNuevo} className='formulario'>
                <p className='texto-ingreso'>Nuevo Ingreso</p>
                <div className='campo'>
                    <label htmlFor="presupuesto">Agregue el monto:</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Ingreso' 
                    onChange={ (e) =>{
                        setValor(Number(e.target.value));
                    }}/>
                    <label htmlFor="presupuesto">Descripción del Ingreso</label>
                    <input type="text" id='descripcion' className='nuevo-presupuesto' placeholder='Escriba aquí'
                    onChange={e => setDescripcion(e.target.value)}/>
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        ): presupuestoEditar == true ?
        (
            <form action="" onSubmit={handlePresupuestoEditar} className='formulario'>
                <p className='texto-ingreso'>Editar Presupuesto</p>
                <div className='campo'>
                    <label htmlFor='presupuesto'>Valor anterior: {presupuestoEdit.valor}</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Nuevo Ingreso' 
                    onChange={ e => setPresupuestoAhora(Number(e.target.value))}/>
                    <label htmlFor="presupuesto">Descripción anterior: {presupuestoEdit.descripcion}</label>
                    <input type="text" id='descripcion' className='nuevo-presupuesto' placeholder='Escriba aquí'
                    onChange={e => setDescripcion(e.target.value)}/>
                </div>
                <input type="submit" value="Guardar" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        ) : (
            <form action="" onSubmit={handlePresupuesto} className='formulario'>
                <p className='texto-ingreso'>Ingreso Inicial</p>
                <div className='campo'>
                    <label htmlFor="presupuesto">Definir valor inicial:</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Ingreso' 
                    onChange={ e => setValor(Number(e.target.value))}/>
                    <label htmlFor="presupuesto">Descripción del Ingreso</label>
                    <input type="text" id='descripcion' className='nuevo-presupuesto' placeholder='Escriba aquí'
                    onChange={e => setDescripcion(e.target.value)}/>
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        )}
        
    </div>
  )
}

export default NuevoPresupuesto

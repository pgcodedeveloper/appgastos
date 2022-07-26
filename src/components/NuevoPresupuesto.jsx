import {useState} from 'react'
import Mensaje from './Mensaje';
const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto,
    presupuestoNuevo,
    presupuestoAhora,
    setPresupuestoAhora
}) => {
    const [mensaje, setMensaje] = useState('');
    const handlePresupuesto =  (e) =>{
        e.preventDefault();
        if(!presupuesto || presupuesto < 0){
            setMensaje('No es un presupuesto válido');
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);

    }
    const handlePresupuestoNuevo = (e) =>{
        e.preventDefault();
        if(!presupuestoAhora || presupuestoAhora < 0){
            setMensaje('No es un presupuesto válido');
            return;
        }
        setMensaje('');
        const presupuestoTot= presupuesto + presupuestoAhora;
        setPresupuesto(presupuestoTot);
        setIsValidPresupuesto(true);
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        {presupuestoNuevo ? (
            <form action="" onSubmit={handlePresupuestoNuevo} className='formulario'>
                <div className='campo'>
                    <label htmlFor="presupuesto">Agregar más Presupuesto</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Presupuesto' 
                    onChange={ e => setPresupuestoAhora(Number(e.target.value))}/>
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        ):
        (
            <form action="" onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu Presupuesto' 
                    onChange={ e => setPresupuesto(Number(e.target.value))}/>
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        )}
        
    </div>
  )
}

export default NuevoPresupuesto

import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'
import { foratearMes} from '../helpers/index'
const Header = ({
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto,
  gastos,setGastos,
  presupuestoNuevo,
  setPresupuestoNuevo,
  setPresupuestos,
  presupuestos,
  presupuestoAhora,
  setPresupuestoAhora,
  setLogin,
  presupuestoEditar,
  presupuestoEdit,
  setPresupuestoEdit,
  editarIngreso,
  guardarIngreso,
  usuario
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      <h2>Mes De: {foratearMes(Date.now())}</h2>
      <p>Bienvenido: {usuario}</p>
      {isValidPresupuesto ? (
            <ControlPresupuesto 
                presupuesto= {presupuesto}
                gastos={gastos}
                setGastos={setGastos}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                setLogin={setLogin}
                setPresupuestos={setPresupuestos}
            />
        ): (
        <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto= {setPresupuesto}
            setIsValidPresupuesto= {setIsValidPresupuesto}
            presupuestoNuevo={presupuestoNuevo}
            setPresupuestos={setPresupuestos}
            presupuestoAhora={presupuestoAhora}
            setPresupuestoAhora={setPresupuestoAhora}
            setPresupuestoNuevo={setPresupuestoNuevo}
            presupuestos={presupuestos}
            presupuestoEditar={presupuestoEditar}
            presupuestoEdit={presupuestoEdit}
            setPresupuestoEdit={setPresupuestoEdit}
            editarIngreso={editarIngreso}
            guardarIngreso={guardarIngreso}
        />
      )}
      
    </header>
  )
}

export default Header


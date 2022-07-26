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
  presupuestoAhora,
  setPresupuestoAhora
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      <h2>Mes De: {foratearMes(Date.now())}</h2>
      {isValidPresupuesto ? (
            <ControlPresupuesto 
                presupuesto= {presupuesto}
                gastos={gastos}
                setGastos={setGastos}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        ): (
        <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto= {setPresupuesto}
            setIsValidPresupuesto= {setIsValidPresupuesto}
            presupuestoNuevo={presupuestoNuevo}
            presupuestoAhora={presupuestoAhora}
            setPresupuestoAhora={setPresupuestoAhora}
            setPresupuestoNuevo={setPresupuestoNuevo}
        />
      )}
      
    </header>
  )
}

export default Header


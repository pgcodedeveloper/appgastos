import React from 'react'
import Gasto from './Gasto';

const ListadoGastos = ({gastos,setGastoEditar,eliminarGasto,gastosFiltro,filtro}) => {
  return (
    <div className='listado-gastos contenedor'>
      {
        filtro ? (
          <>
            <h2 className='texto-centrado'>{gastosFiltro.length ? 'Descripción de los Gastos' : 'Aún no hay gastos en esta categoría, agregue uno'}</h2>
            {
              gastosFiltro.map( gasto =>(
                <Gasto 
                  key={gasto.id}
                  gasto= {gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))
            }
          </>
        ):
        (
          <>
            <h2 className='texto-centrado'>{gastos.length ? 'Descripción de los Gastos' : 'Aún no hay gastos, agregue uno'}</h2>
            {
              gastos.map( gasto =>(
                <Gasto 
                  key={gasto.id}
                  gasto= {gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))
            }
          
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos

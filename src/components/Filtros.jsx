import {useState, useEffect} from 'react'

const Filtros = ({filtro,setFiltro, filtroTipo, setFiltroTipo}) => {
  return (
    <div className='filtros sombra contenedor'>

        <form action="">
            {filtroTipo == "ingresos" || filtroTipo == "" ?(
              <div className='campo'>
                <label htmlFor="tipo">Eliga una:</label>
                <select name="" id="tipo" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
                    <option value="">--- Seleccione ---</option>
                    <option value="ingresos">Ingresos</option>
                    <option value="gastos">Gastos</option>
                </select>
              </div>
            ): filtroTipo == "gastos" &&(
              <>
                <div className='campo'>
                  <label htmlFor="tipo">Eliga una:</label>
                  <select name="" id="tipo" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
                    <option value="">--- Seleccione ---</option>
                    <option value="ingresos">Ingresos</option>
                    <option value="gastos">Gastos</option>
                  </select>
                </div>
                <div className='campo'>
                  <label htmlFor="categoria">Filtrar Gasto por:</label>
                  <select name="" id="categoria" value={filtro} onChange={e => setFiltro(e.target.value)}>
                      <option value="">-- Todas las Categorías --</option>
                      <option value="ahorro">Ahorro</option>
                      <option value="comida">Comida</option>
                      <option value="casa">Casa</option>
                      <option value="gastos">Gastos Varios</option>
                      <option value="ocio">Ocio</option>
                      <option value="salud">Salud</option>
                      <option value="suscripciones">Suscripciones</option>
                  </select>
                </div>
              </>
            )}
            
            
        </form>
    </div>
  )
}

export default Filtros

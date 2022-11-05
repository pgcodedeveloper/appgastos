import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Gasto from './Gasto';

const ListadoGastos = ({gastos,setGastoEditar,eliminarGasto,gastosFiltro,filtro}) => {
  const cantidad_gastos= 2;
  const gastoFiltro= gastos.filter( gasto => gasto.categoria === filtro);
  const [gas,setGas]= useState([...gastos].splice(0,cantidad_gastos));
  const [gasF,setGasF]= useState([...gastoFiltro].splice(0,cantidad_gastos));
  const totalElem= gastos.length ?? 0;
  const totalElem2 = gastosFiltro.length ?? 0;
  const totalPaginas= (gastos.length / cantidad_gastos);
  const totalPaginasF= (gastosFiltro.length / cantidad_gastos);
  const [currentPage,setCurrentPage] = useState(0);
  const [paginaActual,setPaginaAct]= useState(1);
  
  useEffect(() =>{
    setPaginaAct(1);
    setGasF([...gastoFiltro].splice(0,cantidad_gastos));
  },[filtro]);

  useEffect(() => {
    const firstIndex= currentPage * cantidad_gastos;
    setGas([...gastos].splice(firstIndex,cantidad_gastos));
  },[gastos]);
  
  const GastoSig= (filtro) =>{
    const nextPage= currentPage + 1;
    const firstIndex= nextPage * cantidad_gastos;
    
    if(!filtro){
      if(paginaActual === Math.ceil(totalPaginas)){
        return;
      }else{
        setPaginaAct(paginaActual+1);
        setGas([...gastos].splice(firstIndex,cantidad_gastos));
        setCurrentPage(nextPage);
      }
    }
    else{
      if(paginaActual === Math.ceil(totalPaginasF)){
        return;
      }else{
        setPaginaAct(paginaActual+1);
        setGasF([...gastosFiltro].splice(firstIndex,cantidad_gastos));
        setCurrentPage(nextPage);
      }
    }
  }
  const GastoAnt= (filtro) =>{
    const prevPage= currentPage - 1;
    if(!filtro){
      if(prevPage < 0){
        return;
      }
      else{
        setPaginaAct(paginaActual-1);
        const firstIndex= prevPage * cantidad_gastos;
        setGas([...gastos].splice(firstIndex,cantidad_gastos));
        setCurrentPage(prevPage);
      }
    }
    else{
      if(prevPage < 0){
        return;
      }
      else{
        setPaginaAct(paginaActual-1);
        const firstIndex= prevPage * cantidad_gastos;
        setGasF([...gastosFiltro].splice(firstIndex,cantidad_gastos));
        setCurrentPage(prevPage);
      }
    }
    
  }
  return (
    <div className='listado-gastos contenedor'>
      {
        filtro ? (
          <>
            <h2 className='texto-centrado'>{gastosFiltro.length ? 'Descripción de los Gastos (deslizar para modificar)' : 'Aún no hay gastos en esta categoría, agregue uno'}</h2>
            {
              gasF.map( gasto =>(
                <Gasto 
                  key={gasto.id}
                  gasto= {gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))
            }

            <div className="contenedor-paginas">
              <div className='contenedor-botones'>
                <button className='botonAnt botones' onClick={() => GastoAnt(true)}>Prev</button>
                <button className='botonSig botones' onClick={() => GastoSig(true)}>Next</button>
              </div>
              <p>Página {paginaActual} de {Math.ceil(totalPaginasF)}</p>
            </div>
          </>
        ):
        (
          <>
            <h2 className='texto-centrado'>{gastos.length ? 'Descripción de los Gastos (deslizar para modificar)' : 'Aún no hay gastos, agregue uno'}</h2>
            {
              gas.map( gasto =>(
                <Gasto 
                  key={gasto.id}
                  gasto= {gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))
            }
          
            <div className="contenedor-paginas">
              <div className='contenedor-botones'>
                <button className='botonAnt botones' onClick={() => GastoAnt(false)}>Prev</button>
                <button className='botonSig botones' onClick={() => GastoSig(false)}>Next</button>
              </div>
              <p>Página {paginaActual} de {Math.ceil(totalPaginas)}</p>
            </div>
            
          </>
        )
      }
      
    </div>
  )
}

export default ListadoGastos

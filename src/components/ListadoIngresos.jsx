import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Ingreso from './Ingreso'

const ListadoIngresos = ({presupuestos,presupuestoEdit, setPresupuestoEdit, eliminarIngreso}) => {
  const cantidad_presupuesto= 2;
  const [pres,setPres]= useState([...presupuestos].splice(0,cantidad_presupuesto));
  const totalElem= presupuestos.length ?? 0;
  const totalPaginas= (presupuestos.length / cantidad_presupuesto);
  const [currentPage,setCurrentPage] = useState(0);
  const [paginaActual,setPaginaAct]= useState(1);
  
  useEffect(()=> {
    const firstIndex= currentPage * cantidad_presupuesto;
    setPres([...presupuestos].splice(firstIndex,cantidad_presupuesto));
  },[presupuestos]);

  
  const GastoSig= () =>{
    const nextPage= currentPage + 1;
    const firstIndex= nextPage * cantidad_presupuesto;
    if(paginaActual === Math.ceil(totalPaginas)){
      return;
    }else{
      setPaginaAct(paginaActual+1);
      setPres([...presupuestos].splice(firstIndex,cantidad_presupuesto));
      setCurrentPage(nextPage);
    } 
  }
  const GastoAnt= () =>{
    const prevPage= currentPage - 1;
    if(prevPage < 0){
      return;
    }
    else{
      setPaginaAct(paginaActual-1);
      const firstIndex= prevPage * cantidad_presupuesto;
      setPres([...presupuestos].splice(firstIndex,cantidad_presupuesto));
      setCurrentPage(prevPage);
    }
  }
  return (
    <div className='listado-gastos contenedor'>
        <h2 className='texto-centrado'>Descripción de los Ingresos (deslizar para modificar)</h2>
        {
            pres.map(presupuesto =>(
                <Ingreso
                    key={presupuesto.id}
                    presupuesto={presupuesto}
                    setPresupuestoEdit={setPresupuestoEdit}
                    eliminarIngreso={eliminarIngreso}
                />
            ))
        }
        <div className="contenedor-paginas">
          <div className='contenedor-botones'>
            <button className='botonAnt botones' onClick={() => GastoAnt()}>Prev</button>
            <button className='botonSig botones' onClick={() => GastoSig()}>Next</button>
          </div>
          <p>Página {paginaActual} de {Math.ceil(totalPaginas)}</p>
        </div>
    </div>
  )
}

export default ListadoIngresos

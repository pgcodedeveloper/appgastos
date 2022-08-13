import React from 'react';
import { useState,useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { foratearMes, generarID, formatoCantidad, formatearFecha } from './helpers';
import swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';
import IconoGastoNuevo from './img/nuevo-gasto.svg'
import IconoMas from './img/masdinero.png';
import IconoDescarga from './img/pdf.png';
import IconoPG from './img/LogoPG.png'
import InicioSesion from './components/InicioSesion';


function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [presupuestoAhora,setPresupuestoAhora] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuestoNuevo,setPresupuestoNuevo] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const datosLS= JSON.parse(localStorage.getItem('gastos'));
  const [gastos,setGastos]= useState(datosLS ?? []);
  const [gastoEditar,setGastoEditar] = useState({});
  const [filtro,setFiltro] = useState('');
  const [gastosFiltro, setGastoFiltro] = useState([]);
  const datosLogin= localStorage.getItem('login');
  const [login, setLogin] = useState(datosLogin ?? false);

  useEffect( () =>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
    }
  },[gastoEditar]);

  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto]);

  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos]);

  useEffect(() => {
    if(filtro){
      
      const gastosFiltrados= gastos.filter( gasto => gasto.categoria === filtro);
      setGastoFiltro(gastosFiltrados);
    }
  },[filtro,gastos]);

  useEffect(() =>{
    localStorage.setItem('login', login ?? false); 
  },[login])
  useEffect( () => {
    const presupuestoLS= Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  },[]);

  const handleNuevoGasto = () =>{
    setModal(true);
    setGastoEditar({});
    
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados= gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});
      setAnimarModal(false);
      setTimeout(() => {
        setModal(false);
      }, 300);
      swal.fire({
        title: 'Registro actualizado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        timer: 3000
      })
    }
    else{
      gasto.id= generarID();
      gasto.fecha= Date.now();
      setGastos([... gastos, gasto]);
      setAnimarModal(false);
      setTimeout(() => {
        setModal(false);
      }, 300);
      swal.fire({
        title: 'Registro exitoso',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        timer: 3000
      })
    }
    
    
  }

  const eliminarGasto = id =>{
    swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: "No puedes revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((res) => {
      if (res.isConfirmed) {
        const gastoActualizado= gastos.filter( gasto => gasto.id !== id);
        setGastos(gastoActualizado);
      }
    });
  }

  const handleMasDinero = () =>{
    setPresupuestoNuevo(true);
    setIsValidPresupuesto(false);
  }
  const handlePDF= (gastos,presupuesto) =>{
    if(gastos.length > 0){
      swal.fire({
        title: '¿Desea descargar el registro?',
        text: "Elija una opción!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, descargar!',
      }).then((res) => {
        if (res.isConfirmed) {
          const doc = new jsPDF("p", "pt", "a4");
          const totalGastado= gastos.reduce((total,gasto) => gasto.cantidad + total, 0);
          const totalDisponible = (presupuesto >= totalGastado) ? (presupuesto - totalGastado) : 0;
          const totaldeficit= (totalDisponible === 0) ? (presupuesto - totalGastado) : 0;
          doc.setFontSize(9);
          doc.setTextColor(133, 133, 133);
          doc.text(`Fecha de emisíon: ${formatearFecha(Date.now())}`,245,20);
          doc.setFontSize(12);
          doc.setTextColor(86, 144, 171);
          doc.text(`GASTOS DEL MES DE: ${foratearMes(Date.now())}`,40, 45,"left","upercase");
          const arrayPresu= [{
            presupuesto: `${formatoCantidad(presupuesto)}`,
            disponible: `${formatoCantidad(totalDisponible)}`,
            gastado: `${formatoCantidad(totalGastado)}`,
            deficit: `${formatoCantidad(totaldeficit)}`
          }]
          const colums1= ["Presupuesto Total","Saldo a Favor","Total Gastado","Déficit Total"];
          const rows1=[];
          arrayPresu.map(array => rows1.push(Object.values(array)));
          autoTable(doc,{
            columns: colums1,
            body: rows1,
            startY: 75,
            theme: "grid",
            styles: {
              font: "times",
              halign: "center",
              cellPadding: 3.5,
              lineWidth: 0.5,
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0]
            },
            headStyles: {
              textColor: [0, 0, 0],
              fontStyle: "normal",
              lineWidth: 0.5,
              lineColor: [0, 0, 0],
              fillColor: [166, 204, 247]
            },
            alternateRowStyles: {
              fillColor: [212, 212, 212],
              textColor: [0, 0, 0],
              lineWidth: 0.5,
              lineColor: [0, 0, 0]
            },
            rowStyles: {
              lineWidth: 0.5,
              lineColor: [0, 0, 0]
            },
            tableLineColor: [0, 0, 0]
          });
          
          doc.setFontSize(12);
          doc.setTextColor(86, 144, 171);
          doc.text('LISTA DE GASTOS',40, 140,"left","upercase");

          const colums = ["Nombre del Gasto","Precio del Gasto","Categoría del Gasto","Fecha del Gasto"];
          const rows= [];
          let gasto = [];
          gastos.map(gas =>{
            const {categoria,nombre,cantidad,fecha} = gas;
            gasto = [
              nombre,
              formatoCantidad(cantidad),
              categoria.toUpperCase(),
              formatearFecha(fecha)
            ]
            return rows.push(gasto);
          });
          autoTable(doc,{
            columns: colums,
            body: rows,
            startY: 160,
            theme: "grid",
            styles: {
              font: "times",
              halign: "center",
              cellPadding: 3.5,
              lineWidth: 0.5,
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0]
            },
            headStyles: {
              textColor: [0, 0, 0],
              fontStyle: "normal",
              lineWidth: 0.5,
              lineColor: [0, 0, 0],
              fillColor: [166, 204, 247]
            },
            alternateRowStyles: {
              fillColor: [212, 212, 212],
              textColor: [0, 0, 0],
              lineWidth: 0.5,
              lineColor: [0, 0, 0]
            },
            rowStyles: {
              lineWidth: 0.5,
              lineColor: [0, 0, 0]
            },
            tableLineColor: [0, 0, 0]
          });
          doc.save(`control-gastos${formatearFecha(Date.now())}.pdf`);
        }
      });
      
    }
    else{
      swal.fire({
        title: 'Debe agregar gastos para continuar',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        timer: 3000
      });
    }
    
  }
  return (
    <>
      {login === true || login === "true" ? (
        <>
          <div className={modal ? 'fijar' : ''} id="contenido">
            <Header
              gastos={gastos} 
              setGastos={setGastos}
              presupuesto={presupuesto}
              setPresupuesto= {setPresupuesto}
              isValidPresupuesto={isValidPresupuesto}
              setIsValidPresupuesto= {setIsValidPresupuesto}
              presupuestoNuevo={presupuestoNuevo}
              setPresupuestoNuevo={presupuestoNuevo}
              presupuestoAhora={presupuestoAhora}
              setPresupuestoAhora={setPresupuestoAhora}
              setLogin={setLogin}
            />

            {isValidPresupuesto ? (
              <>
                <main>
                  <Filtros 
                    filtro={filtro}
                    setFiltro={setFiltro}
                  ></Filtros>
                  <ListadoGastos 
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltro={gastosFiltro}
                  />
                </main>

                <div className='nuevo-gasto'>
                  <img src={IconoGastoNuevo} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
                </div>

                <div className='mas-dinero'>
                  <img src={IconoMas} alt="Icono mas dinero" title='Agregar fondos' onClick={handleMasDinero} />
                </div>

                <div className='descargar-pdf'>
                  <img src={IconoDescarga} alt="Icono PDF" onClick={()=> handlePDF(gastos,presupuesto)} title="Descargar como PDF"/>
                </div>
              </>
            ) : null}

            {modal && <Modal 
                          setModal= {setModal} 
                          animarModal={animarModal}
                          setAnimarModal={setAnimarModal}
                          guardarGasto={guardarGasto} 
                          gastoEditar={gastoEditar}
                          setGastoEditar={setGastoEditar}
            />}

          </div>
        </>
      ): <InicioSesion setLogin={setLogin}/>}

      <footer className='footer'>
        <p>Todos los derechos reservados &copy; | Diseñado por <span>PG .CODE</span></p>
      </footer>
    </>
  )
}

export default App

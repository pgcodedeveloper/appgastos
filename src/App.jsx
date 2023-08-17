import React from 'react';
import { useState,useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { foratearMes, generarID, formatoCantidad, formatearFecha, formatearAno } from './helpers';
import swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';
import IconoGastoNuevo from './img/nuevo-gasto.svg'
import IconoMas from './img/masdinero.png';
import IconoDescarga from './img/pdf.png';
import IconoPG from './img/LogoPG.png'
import InicioSesion from './components/InicioSesion';
import ListadoIngresos from './components/ListadoIngresos';



function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [presupuestoAhora,setPresupuestoAhora] = useState(0);
  const datosPres= JSON.parse(localStorage.getItem('presupuestos'));
  const [presupuestos, setPresupuestos]= useState(datosPres ?? []);
  const [presupuestoEdit, setPresupuestoEdit]= useState({});
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuestoNuevo,setPresupuestoNuevo] = useState(false);
  const [presupuestoEditar,setPresupuestoEditar] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const datosLS= JSON.parse(localStorage.getItem('gastos'));
  const [gastos,setGastos]= useState(datosLS ?? []);
  const [gastoEditar,setGastoEditar] = useState({});
  const [filtro,setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo]= useState('');
  const [gastosFiltro, setGastoFiltro] = useState([]);
  const datosLogin= localStorage.getItem('login');
  const [login, setLogin] = useState(datosLogin ?? false);
  const datoUsuario= localStorage.getItem('usuario');
  const datoEmail= localStorage.getItem('email');
  const [usuario,setUsuario]= useState(datoUsuario ?? 'Usuario');
  const [email,setEmail]= useState(datoEmail ?? 'Email');
  

  useEffect( () =>{
    const body= document.body;
    if(Object.keys(gastoEditar).length > 0){
      window.scrollTo(0,0);
      body.style.overflow= 'hidden';
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 300);
    }
  },[gastoEditar]);
  

  useEffect(() =>{
    if(Object.keys(presupuestoEdit).length > 0){
      setPresupuestoEditar(true);
      setIsValidPresupuesto(false);
    }
  },[presupuestoEdit])

  useEffect( () => {
    let suma= 0;
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos) ?? []);
    presupuestos.map(presp => {
      suma = suma + presp.valor;
    });
    setPresupuesto(suma);

  },[presupuestos]);

  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto])

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
    localStorage.setItem('usuario', usuario ?? 'Usuario'); 
    localStorage.setItem('email', email ?? 'Email'); 
  },[login])

  useEffect( () => {
    const presupuestoLS= Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  },[]);

  const handleNuevoGasto = () =>{
    const body= document.body;
    window.scrollTo(0,0);
    body.style.overflow= 'hidden';
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }

  const guardarGasto = gasto =>{
    const body = document.body;
    if(gasto.id){
      const gastosActualizados= gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});
      window.scrollTo(0,0);
      setAnimarModal(false);
      setTimeout(() => {
        body.style.overflowY='scroll';
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
      window.scrollTo(0,0);
      setAnimarModal(false);
      setTimeout(() => {
        body.style.overflowY='scroll';
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

  const guardarIngreso = (ingreso) =>{
    ingreso.id= generarID();
    ingreso.fecha= Date.now();
    setPresupuestos([... presupuestos, ingreso]);
  }
  const editarIngreso= ingreso =>{
    const ingresoActualizado= presupuestos.map(presupuestState => presupuestState.id === ingreso.id ? ingreso : presupuestState);
    setPresupuestos(ingresoActualizado);
    
    setPresupuestoEdit({});
    setPresupuestoEditar(false);
    swal.fire({
      title: 'Registro actualizado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      timer: 3000
    })
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
  const eliminarIngreso = id =>{
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
        const ingresoActualizado= presupuestos.filter( presup => presup.id !== id);
        setPresupuestos(ingresoActualizado);
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
          const imagen= new Image();
          imagen.src= IconoPG;
          doc.addImage(imagen,'PNG',40,20,40,40);
          doc.setFontSize(9);
          doc.setTextColor(133, 133, 133);
          doc.text(`Fecha de emisíon: ${formatearFecha(Date.now())}`,380,25);
          doc.setFontSize(12);
          doc.setTextColor(86, 144, 171);
          doc.text(`GASTOS DEL MES DE: ${foratearMes(Date.now())}`,40, 90,"left","upercase");
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
            startY: 110,
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
          
          const colums3 = ["Tipo","Nombre del Ingreso","Valor del Ingreso","Fecha del Ingreso"];
          const rows3= [];
          let ingreso = [];
          presupuestos.map(pres =>{
            const {valor,descripcion,fecha} = pres;
            ingreso = [
              "INGRESO",
              descripcion.toUpperCase(),
              formatoCantidad(valor),
              formatearFecha(fecha)
            ]
            return rows3.push(ingreso);
          });
          autoTable(doc,{
            columns: colums3,
            body: rows3,
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

          const colums = ["Tipo","Nombre del Gasto","Precio del Gasto","Categoría del Gasto","Fecha del Gasto"];
          const rows= [];
          let gasto = [];
          gastos.map(gas =>{
            const {categoria,nombre,cantidad,fecha} = gas;
            gasto = [
              "GASTO",
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

          const colums4 = ["Nombre de la categoría","Total gastado en la categoría"];
          let totalA = 0,totalC =0,totalCo = 0,totalG = 0,totalO = 0,totalS = 0,totalSc = 0;
          gastos.map(gasto =>{
            if(gasto.categoria === "ahorro"){
              totalA = Number(gasto.cantidad) + totalA;
            }
            else if(gasto.categoria === "comida"){
              totalCo = Number(gasto.cantidad) + totalCo;
            }
            else if(gasto.categoria === "casa"){
              totalC = Number(gasto.cantidad) + totalC;
            }
            else if(gasto.categoria === "gastos"){
              totalG = Number(gasto.cantidad) + totalG;
            }
            else if(gasto.categoria === "ocio"){
              totalO = Number(gasto.cantidad) + totalO;
            }
            else if(gasto.categoria === "salud"){
              totalS = Number(gasto.cantidad) + totalS;
            }
            else{
              totalSc = Number(gasto.cantidad) + totalSc;
            }
          });
          let row4 = [
            ["AHORRO",formatoCantidad(totalA)],
            ["COMIDA",formatoCantidad(totalCo)],
            ["CASA",formatoCantidad(totalC)],
            ["GASTOS VARIOS",formatoCantidad(totalG)],
            ["OCIO", formatoCantidad(totalO)],
            ["SALUD",formatoCantidad(totalS)],
            ["SUSCRIPCIONES",formatoCantidad(totalSc)],
          ];

          autoTable(doc,{
            columns: colums4,
            body: row4,
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

          imagen.onload = () =>{
            doc.save(`control-gastos${formatearFecha(Date.now())}.pdf`);
          }
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
              setPresupuestos={setPresupuestos}
              presupuestos={presupuestos}
              setPresupuestoNuevo={presupuestoNuevo}
              presupuestoAhora={presupuestoAhora}
              setPresupuestoAhora={setPresupuestoAhora}
              setLogin={setLogin}
              presupuestoEditar={presupuestoEditar}
              setPresupuestoEdit={setPresupuestoEdit}
              presupuestoEdit={presupuestoEdit}
              editarIngreso={editarIngreso}
              guardarIngreso={guardarIngreso}
              usuario={usuario}
            />

            {isValidPresupuesto ? (
              <>
                <main>
                  <Filtros 
                    filtro={filtro}
                    setFiltro={setFiltro}
                    filtroTipo={filtroTipo}
                    setFiltroTipo={setFiltroTipo}
                  ></Filtros>
                  {filtroTipo == "gastos" ?(
                    <ListadoGastos 
                      gastos={gastos}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                      filtro={filtro}
                      gastosFiltro={gastosFiltro}
                    />
                  ) : filtroTipo == "ingresos" ? (
                    <ListadoIngresos 
                      presupuestos={presupuestos}
                      presupuestoEdit={presupuestoEdit}
                      eliminarIngreso={eliminarIngreso}
                      setPresupuestoEdit={setPresupuestoEdit}
                    />
                  ): (
                    <p className='sin-filtro'>Seleccione un filtro </p>
                  )}
                  
                </main>

                <div className='nuevo-gasto'>
                  <i className="fa-solid fa-circle-plus" onClick={handleNuevoGasto}></i>
                </div>

                <div className='mas-dinero'>
                  <i className="fa-solid fa-sack-dollar" title='Agregar fondos' onClick={handleMasDinero}></i>
                </div>

                <div className='descargar-pdf'>
                  <i className="fa-solid fa-file-pdf" title="Descargar como PDF" onClick={()=> handlePDF(gastos,presupuesto)}></i>
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
      ): <InicioSesion setLogin={setLogin} setEmail={setEmail} setUsuario={setUsuario}/>}

      <footer className='footer'>
        <p>Todos los derechos reservados &copy; {formatearAno(Date.now())} | Diseñado por <a href='https://pgcodedeveloper.netlify.app/' target='_blanck'>PG .CODE</a></p>
      </footer>
    </>
  )
}

export default App

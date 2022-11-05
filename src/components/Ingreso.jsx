import React from 'react'
import dinero from '../img/dinero.png'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from '../helpers';
const Ingreso = ({presupuesto,setPresupuestoEdit,eliminarIngreso}) => {
    const {valor,fecha} = presupuesto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setPresupuestoEdit(presupuesto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarIngreso(presupuesto.id)}
                >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img src={dinero} alt="Icono del gasto" />
                        <div className='descripcion-gasto'>
                            <p className='nombre-gasto'>Ingreso</p>
                            <p className='fecha-gasto'>
                                Agregado el:
                                <span> {formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${valor}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Ingreso

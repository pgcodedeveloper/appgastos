export const generarID = () =>{
    const random= Math.random.toString(36).substring(2);
    const fecha= Date.now();

    return random + fecha;
}

export const formatearFecha = fecha =>{
    const fechaN= new Date(fecha);
    const opciones={
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaN.toLocaleDateString('es-ES',opciones);
}

export const foratearMes= fecha =>{
    const fechaN= new Date(fecha);
    const op= {
        year: 'numeric',
        month: 'long'
    }

    return fechaN.toLocaleDateString('es-ES',op);
}

export const formatoCantidad = (cantidad) =>{
    return cantidad.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}
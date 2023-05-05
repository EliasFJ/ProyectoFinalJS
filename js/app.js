let ingresos = [];
let egresos = [];

const totalIngresos=()=>{
    let totalIngresos = 0;
    for(let i of ingresos){
        totalIngresos += i.valor;
    }
    return totalIngresos;
}

const totalEgresos=()=>{
    let totalEgreso = 0;
    for(let e of egresos){
        totalEgreso += e.valor;
    }
    return totalEgreso;
}

const formatoMoneda=(pesos)=>{
    pesos = pesos.toLocaleString('es-MX', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2});
    return pesos;
}

const formatoPorcentaje=(promedio)=>{
    promedio = promedio.toLocaleString('es-MX', {style: 'percent', minimumFractionDigits: 2});
    return promedio;
}

const cargarCabecero=()=>{
    const presupuesto = totalIngresos() - totalEgresos();
    const porcentajeEgreso = totalEgresos() / totalIngresos();
    const misIngresos = totalIngresos();
    const misEgresos = totalEgresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentajeEgreso').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(misIngresos);
    document.getElementById('egresos').innerHTML = formatoMoneda(misEgresos);
}


function cargarApp(){
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const cargarIngresos=()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML = crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML=(ingreso)=>{
    ingresoHTML = 
    `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso._descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso._valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso._id})">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </div>
    </div>
</div>`
    return ingresoHTML;
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    egresoHTML = 
    `<div class="limpiarEstilos; elemento">
    <div class=elemento_descripcion">${egreso._descripcion}
        <div class="limpiarEstilos; derecha"> 
            <div class="elemento_valor">${formatoMoneda(egreso._valor)}</div>
            <div class="elemento_porcentaje">${porcentajeEgreso}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso._id})">
                <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
</div>`
return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const agregarDato = () => {
    let forma = document.getElementById('forma');
    let tipo = forma.tipo.value;
    let descripcion = forma.descripcion.value;
    let valor = forma.querySelector('.agregar_valor').value;

    if (descripcion !== "" && valor !== "") {
        if (tipo === 'ingreso') {
          ingresos.push(new Ingreso(descripcion, valor));
        }else if (tipo === 'egreso'){
          egresos.push(new Egreso(descripcion, valor));
        }else{
          alert("Ingrese el tipo de gasto Ingreso o Egreso");
          return;
        }
        cargarCabecero();
        cargarIngresos();
        cargarEgresos();      
      }else{
        alert("Agregue descripcion y valor");
      }
    }
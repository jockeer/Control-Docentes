$btnRegistrarAsignacion = document.getElementById('btnRegistrarAsignacion');
let dates = new Date();
let years = dates.getFullYear();

let fotosdeGa = document.getElementsByClassName('holl')

// document.getElementById('prueba').addEventListener('click',()=>{
//     alert(hour.toLocaleTimeString())
// })
function RegistraringresoSalida($codasig){
    debugger
    let d=new Date().getTime();
    let hour = new Date(d)

    var t = new Date;
    let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`

    const url = 'http://localhost:3000/api/RegistrarIngreso';
    const data = {};
    data.fecha=fecha;
    data.horaini=hour.toLocaleTimeString();
    data.horasal='00:00:00';
    data.observaciones='';
    data.codasig=$codasig;
    data.codusuing=localStorage.getItem('idUsuario');
    data.codususal=localStorage.getItem('idUsuario');
    
    let JSO = JSON.stringify(data)
    alert(JSO)
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSO, // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => alert('Asistencia Registrado'));

}
async function RegistrarSalida($codasig){
    debugger
    let d=new Date().getTime();
    let hour = new Date(d)

    var t = new Date;
    let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`


    async function getLista(url) {
        
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $Lista= await getLista(`http://localhost:3000/api/obtenerAsistencia/${$codasig}/${fecha}`);
    console.log($Lista)

    const url = `http://localhost:3000/api/ActualizarSalida/${$Lista.data[0].codasis}`;
      let data = {};
      data.horasal=hour.toLocaleTimeString();
      // debugger
     
      // debugger
      let JSO = JSON.stringify(data)
      alert(JSO);
    
      fetch(url, {
          method: 'PUT', // or 'PUT'
          body: JSO, // data can be `string` or {object}!
          headers:{
              'Content-Type': 'application/json'
          }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => alert("Salida Actualizado")); 

    

}


function Entrada(codasig){
    var confirm = alertify.confirm('Asistencia', 'Quiere Marcar la Asistencia?', null, null).set('', { ok: 'ok', cancel: 'Cancel' });
    //callbak al pulsar botón positivo
    confirm.set('onok', function () {
        let $prog=document.getElementById(`progra${codasig}`)
        let $botoningreso = document.getElementById(`botoningreso${codasig}`)
        let $botonsalida = document.getElementById(`botonsalida${codasig}`)
        RegistraringresoSalida(codasig);
        alertify.success(`Asistencia Marcada asignacion numero ${codasig}`);
        $prog.classList.add('asis');
        $botoningreso.disabled=true;
        $botonsalida.disabled=false;
        
    });
    //callbak al pulsar botón negativo
    confirm.set('oncancel', function () {
        alertify.error('Asistencia no marcada');
        
    })
    
}
function Salida(codasig){
    var confirm = alertify.confirm('Asistencia', 'Quiere Marcar la Salida?', null, null).set('', { ok: 'ok', cancel: 'Cancel' });
    //callbak al pulsar botón positivo
    confirm.set('onok', function () {
                let $prog=document.getElementById(`progra${codasig}`)
                let $botonsalida = document.getElementById(`botonsalida${codasig}`)
                RegistrarSalida(codasig)
                alertify.success(`Salida Marcada asignacion numero ${codasig}`);
                $prog.classList.remove('asis');
                $botonsalida.disabled=true;
                
            });
            //callbak al pulsar botón negativo
            confirm.set('oncancel', function () {
                alertify.error('Asistencia no marcada');
                
            })
            
        }
        

        
async function lista(turno){
    async function getLista(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    for(let i = document.getElementById('containerAulas').children.length - 1 ; i >=0 ; i--){
        document.getElementById('containerAulas').removeChild(fotosdeGa[i])

    }
    const $Lista= await getLista(`http://localhost:3000/api/obtenerLista/${turno}`);
    debugger
    function MateriaItemTemplate(Lista){
        return `<div class="card holl">
        <div class="card-header">${Lista.lab}</div>
                <div id="progra${Lista.codasig}" class="card-body">
                <div class="datos">
                        <h5>Nombre:</h5>
                        <h6>${Lista.nombredoc}</h6>
                        <h5>Materia:</h5>
                        <h6>${Lista.nombremat}</h6>
                        <h5>Cantidad de Estudiantes:</h5>
                        <h6>${Lista.cant_estudiantes}</h6>
                    </div>
                    <figure>
                        <img src="${Lista.foto}" alt="">
                        
                        </figure>
                        
                        </div>
                        <div class="card-footer">
                        <button id="botoningreso${Lista.codasig}" class="btn ingreso" onclick="Entrada(${Lista.codasig});">Ingreso</button>
                        <button id="botonsalida${Lista.codasig}" disabled class="btn Salida" onclick="Salida(${Lista.codasig});">Salida</button>
                        <button class="btn Observaciones" onclick="">Observaciones</button>
                        </div>
                        </div>`;
    }
    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }
    function addEventClick($element,$boton) {
        $element.addEventListener('click', () => {
          // alert('click')
          showModal($visita)
        })
    }
    function conIngresoMarcado(codasig){
        let $botoningreso = document.getElementById(`botoningreso${codasig}`)
        let $botonsalida = document.getElementById(`botonsalida${codasig}`)
        let $prog=document.getElementById(`progra${codasig}`)
        $prog.classList.add('asis')
        $botoningreso.disabled=true;
        $botonsalida.disabled=false;
    }
    function conSalidaMarcada(codasig){
        let $botoningreso = document.getElementById(`botoningreso${codasig}`)
        let $botonsalida = document.getElementById(`botonsalida${codasig}`)
        let $prog=document.getElementById(`progra${codasig}`)
        $prog.classList.remove('asis')
        $botoningreso.disabled=true;
        $botonsalida.disabled=true;
    }
    
    async function renderMateriaList(Lista, $container){
        var t = new Date;
        let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`
        Lista.data.forEach(list => {
            async function prueba(){
                const $asis= await getLista(`http://localhost:3000/api/obtenerAsisMarcada/${list.codasig}/${fecha}`);
                if($asis.data[0].fecha.substr(0,10)==fecha){
                    // alert('las fechas son iguales perro')
                    if($asis.data[0].horasal=='00:00:00'){
                        conIngresoMarcado(list.codasig)
                    }else{
                        conSalidaMarcada(list.codasig)
                        
                    }
                }else{
                    
                }
                debugger
            }
            prueba()
            const HTMLString = MateriaItemTemplate(list);
            const Lista = createTemplate(HTMLString);       
            $container.append(Lista);

        });    
    }
    const $containerAulas = document.getElementById('containerAulas')
    renderMateriaList($Lista, $containerAulas)

    
}

lista(1)

$btnRegistrarAsignacion.addEventListener('click',()=>{
    alert(document.getElementById('fechaInicioSeleccionada').value)

    const url = 'http://localhost:3000/api/InsertarAsignacion';
    const data = {};
    data.ano =years;
    data.semestre = document.getElementById('semestreAsignado').value;
    data.modulo=document.getElementById('moduloAsignado').value;
    data.fecini=document.getElementById('fechaInicioSeleccionada').value;
    data.fecsal=document.getElementById('fechaFinSeleccionada').value;
    data.turno=document.getElementById('turnoAsignado').value;
    data.codlab=document.getElementById('containerLab').value;
    data.codpro=document.getElementById('contarinerProgramacion').value;
    
    let JSO = JSON.stringify(data)
    // alert(JSO)
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSO, // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => alert('Registrado la Asignacion'));
})

const $Turno1=document.getElementById('Turno1')
const $Turno2=document.getElementById('Turno2')
const $Turno3=document.getElementById('Turno3')
const $Turno4=document.getElementById('Turno4')
const $Turno5=document.getElementById('Turno5')

$Turno1.addEventListener('click',()=>{
    lista(1)
})
$Turno2.addEventListener('click',()=>{
    lista(2)
})
$Turno3.addEventListener('click',()=>{
    lista(3)
})
$Turno4.addEventListener('click',()=>{
    lista(4)
})
$Turno5.addEventListener('click',()=>{
    lista(5)
})
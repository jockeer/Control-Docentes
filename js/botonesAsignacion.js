$btnRegistrarAsignacion = document.getElementById('btnRegistrarAsignacion');
let dates = new Date();
let years = dates.getFullYear();

let fotosdeGa = document.getElementsByClassName('holl')

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
    function MateriaItemTemplate(Lista){
        return `<div class="card holl">
                <div class="card-header">${Lista.lab}</div>
                <div class="card-body">
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
                    <button class="btn">Ingreso</button>
                    <button class="btn">Salida</button>
                </div>
            </div>`;
    }
    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }
    
    function renderMateriaList(Lista, $container){
        Lista.data.forEach(list => {
            
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



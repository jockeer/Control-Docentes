$btnAnterior = document.getElementById('btnAnterior');
$btnSiguiente = document.getElementById('btnSiguiente');
$overlayAddAsig = document.getElementById('overlayAddAsig');
$overlaypromat = document.getElementById('overlaypromat');
$overlayasiglab = document.getElementById('overlayasiglab');
$modalAddAsig = document.getElementById('modalAddAsig');
$addProgramacion = document.getElementById('addProgramacion');
$btnRegProgramacionMateria = document.getElementById('btnRegProgramacionMateria');

$btnRefreshAsig = document.getElementById('btnRefreshAsig');

let fotosdeGaleria = document.getElementsByClassName('hola')

let date = new Date();
let year = date.getFullYear();

async function cargarProgramacion(semestreprog,moduloprog,turno_prog){
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    for(let i = document.getElementById('contarinerProgramacion').children.length - 1 ; i >=0 ; i--){
        document.getElementById('contarinerProgramacion').removeChild(fotosdeGaleria[i])

    }
    const $listaProgramacion= await getData(`http://localhost:3000/api/obtenerProgramacionMaterias/${semestreprog}/${moduloprog}/${turno_prog}`);
    function DocenteItemTemplate(docente){
        return `<option class="hola" value="${docente.codpro}">${docente.nombredoc} / ${docente.nombremat}</option>`;
    }
    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }
    function renderDocenteList(listDocente, $container){
        listDocente.data.forEach(docente => {
    
          const HTMLString = DocenteItemTemplate(docente);
          const docenteElement = createTemplate(HTMLString);
          
          $container.append(docenteElement);
        });    
    }
    const $containerDocentes = document.getElementById('contarinerProgramacion')
    debugger
    renderDocenteList($listaProgramacion, $containerDocentes)
}

async function cargarlab(semestre,modulo,turno){
    async function getMateria(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $listaMaterias= await getMateria(`http://localhost:3000/api/obtenerLaboratoriosLibres/${semestre}/${modulo}/${turno}`);
    debugger
    function MateriaItemTemplate(materia){
        return `<option value="${materia.codlab}">${materia.lab}</option>`;
    }
    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }
    
    function renderMateriaList(listMateria, $container){
        listMateria.data.forEach(materia => {
            
          const HTMLString = MateriaItemTemplate(materia);
          const materiaElement = createTemplate(HTMLString);       
          $container.append(materiaElement);
        });    
    }
    const $containerMaterias = document.getElementById('containerLab')
    renderMateriaList($listaMaterias, $containerMaterias)
}

$addProgramacion.addEventListener('click',()=>{
    $modalAddAsig.classList.add('active')
    $overlayAddAsig.classList.add('active')
})
$overlayAddAsig.addEventListener('click',()=>{
    $modalAddAsig.classList.remove('active')
    $overlayAddAsig.classList.remove('active')

})
$btnAnterior.addEventListener('click',()=>{
    $overlayasiglab.classList.remove('active')
    $overlaypromat.classList.remove('active')
    $modalAddAsig.classList.remove('siguiente')
})
$btnSiguiente.addEventListener('click',()=>{
    $overlayasiglab.classList.add('active')
    $overlaypromat.classList.add('active')
    $modalAddAsig.classList.add('siguiente')
})
$btnRegProgramacionMateria.addEventListener('click',()=>{
    $overlayasiglab.classList.add('active')
    $overlaypromat.classList.add('active')
    $modalAddAsig.classList.add('siguiente')
    
    
    const url = 'http://localhost:3000/api/RegistrarProgMateria';
    const data = {};
    data.anoprog =year;
    data.semestreprog = document.getElementById('SemetreProgramado').value;
    data.moduloprog=document.getElementById('ModuloProgramado').value;
    data.grupo=document.getElementById('GrupoProgramado').value;
    data.turno_prog=document.getElementById('TurnoProgramado').value;
    data.cant_estudiantes=document.getElementById('CantidadProgramada').value;
    data.coddoc=document.getElementById('nombresdeDocentes').value;
    data.codmat=document.getElementById('nombresdeMaterias').value;
    
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
    .then(response => cargarProgramacion(document.getElementById('SemetreProgramado').value,document.getElementById('ModuloProgramado').value,document.getElementById('TurnoProgramado').value));

    
})



$btnRefreshAsig.addEventListener('click',()=>{
    // $('#semestreAsignado').prop('disabled',false)
    cargarProgramacion(document.getElementById('semestreAsignado').value,document.getElementById('moduloAsignado').value,document.getElementById('turnoAsignado').value)
    cargarlab(document.getElementById('semestreAsignado').value,document.getElementById('moduloAsignado').value,document.getElementById('turnoAsignado').value)
    // document.getElementById('semestreAsignado').disabled=false
})







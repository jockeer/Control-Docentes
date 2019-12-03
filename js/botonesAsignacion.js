$btnRegistrarAsignacion = document.getElementById('btnRegistrarAsignacion');
let dates = new Date();
let years = dates.getFullYear();



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
$btnRegistrarDocente = document.getElementById('btnRegistrarDocente');
$btnCancelarDocente = document.getElementById('btnCancelarDocente');
$modalAddDocente = document.getElementById('modalAddDocente');
$overlayAddDocente = document.getElementById('overlayAddDocente');
$btnAddDocente = document.getElementById('btnAddDocente');

let fotoDocente
document.getElementById("fileDocente").addEventListener("change", getUrl);
function getUrl() {
  if (this.files && this.files[0]) {
      debugger
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
      document.getElementById("imgDocente").src  = e.target.result;
      fotoDocente = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
}
$btnCancelarDocente.addEventListener('click',()=>{
    $modalAddDocente.classList.remove('active')
    $overlayAddDocente.classList.remove('active')
})
$btnAddDocente.addEventListener('click',()=>{
    $modalAddDocente.classList.add('active')
    $overlayAddDocente.classList.add('active')
    
})
$overlayAddDocente.addEventListener('click',()=>{
    $modalAddDocente.classList.remove('active')
    $overlayAddDocente.classList.remove('active')

})






$btnRegistrarDocente.addEventListener('click',()=>{
    const url = 'http://localhost:3000/api/RegistrarDocente';
    const data = {};
    data.nombredoc =document.getElementById('nuevoNombreDocente').value;
    data.phone = document.getElementById('nuevoTelefonoDocente').value;
    data.email=document.getElementById('nuevoEmailDocente').value;
    data.foto=fotoDocente;
    
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
    .then(response => alert('Docente Registrado'));
})
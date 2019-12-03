$LogIn = document.getElementById('LogIn');
$btnRegistrar = document.getElementById('btnRegistrar');
$NewUser = document.getElementById('NewUser');
$overlayUser = document.getElementById('overlayUser');
$modalNewUser = document.getElementById('modalNewUser');
$btnCancelar = document.getElementById('btnCancelar');

async function logear(nombreUsuario, passUsuario){
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $listaRoles= await getData(`http://localhost:3000/api/obtenerUsuario/${nombreUsuario}/${passUsuario}`);
    // debugger
    if($listaRoles.data.length != 0){
        alert(`Bienvenido ${$listaRoles.data[0].nombre}`)
        localStorage.setItem('usuario',`${$listaRoles.data[0].nombre} ${$listaRoles.data[0].apellido_p}`);
        localStorage.setItem('idUsuario',`${$listaRoles.data[0].codusu}`);
        localStorage.setItem('foto',`${$listaRoles.data[0].foto}`);
        location.href="nodos/home.html";
    }else{
        alert(`Usuario o contraseña Incorrectos`)
    }
    console.log($listaRoles)
}

$LogIn.addEventListener('click',()=>{
    logear(document.getElementById('usu').value, document.getElementById('pass').value); 
})

$NewUser.addEventListener('click',()=>{
    $overlayUser.classList.add('active')
    $modalNewUser.classList.add('active')
})
$overlayUser.addEventListener('click',()=>{
    $overlayUser.classList.remove('active')
    $modalNewUser.classList.remove('active')
    
})
$btnCancelar.addEventListener('click',()=>{
    $overlayUser.classList.remove('active')
    $modalNewUser.classList.remove('active')
    
})

let foto
document.getElementById("files").addEventListener("change", getUrl);
function getUrl() {
  if (this.files && this.files[0]) {
      debugger
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
      document.getElementById("imgDocente").src  = e.target.result;
      foto = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
}



$btnRegistrar.addEventListener('click',()=>{

    const url = 'http://localhost:3000/api/RegistrarUsuario';
    const data = {};
    data.nombre =document.getElementById('nuevoNombre').value;
    data.apellido_p = document.getElementById('nuevoApellido').value;
    data.phone = document.getElementById('nuevoTelefono').value;
    data.email=document.getElementById('nuevoEmail').value;
    data.foto=foto;
    data.usuario=document.getElementById('nuevoUsuario').value;
    data.pass=document.getElementById('nuevoPassword').value;
    data.codrol = document.getElementById('nuevoRol').value;
    
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
    .then(response => alert('Usuario Registrado'));

})
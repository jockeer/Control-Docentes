$LogIn = document.getElementById('LogIn');

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
        localStorage.setItem('usuario',$listaRoles.data[0].nombre);
        location.href="nodos/home.html";
    }else{
        alert(`Usuario o contraseña Incorrectos`)
    }
    console.log($listaRoles)
}

$LogIn.addEventListener('click',()=>{
    logear(document.getElementById('usu').value, document.getElementById('pass').value);
    
    
})
const $condicion = document.getElementsByClassName('condicion');

debugger

const sesionControl = localStorage.getItem('rol');

if((sesionControl === '1') || (sesionControl === '2') ){
    for(let i = 0; i <= $condicion.length-1;i++){
        $condicion[i].innerHTML=""
    }

    // emergencia.style.display = 'none';
}
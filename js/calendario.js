const $fechas = document.getElementsByClassName('item');
const $fechasElegidas = document.getElementById('fechasElegidas');

function pintar(item){
    item.addEventListener('click',()=>{
         item.classList.toggle('active');
        //  alert(item)
         $fechasElegidas.value = $fechasElegidas.value + item.textContent;
         debugger
    })
}

for (let index = 0; index < $fechas.length-1; index++) {
    pintar($fechas[index])
    
}
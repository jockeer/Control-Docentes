(async function cargarComentarios(){
    async function getComentarios(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $listaComentarios= await getComentarios(`http://localhost:3000/api/obtenerComentarios`);
    // debugger
    function ComentariosItemTemplate(comentario){
        return `<div class="mensaje">
                
                    <figure>
                        <img src="${comentario.foto}" alt="">
                    </figure>
                    <div class="aviso">
                        <img class="borrarMensaje" src="../img/cancel.png" alt="">
                        <h4>${comentario.nombre} ${comentario.apellido_p}</h4>
                        <h6>Auxiliar</h6>
                        <h6 class="fechaComentario">${comentario.fecha.substr(0,10)}</h6>
                        <p>${comentario.comentario}</p>
                    </div>
                </div>`;
    }
    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }
    function addEventClick($element,$comentario) {
        $element.addEventListener('click', () => {
            getComentarios(`http://localhost:3000/api/EliminarComentario/${$comentario.idcomentario}`);
            alert(`comentario Eliminado`)
            location.reload();
        //   showModal($visita)
        })
    }
    function renderComentarioList(listComentario, $container){
        listComentario.data.forEach(comentario => {
            
          const HTMLString = ComentariosItemTemplate(comentario);
          const comentarioElement = createTemplate(HTMLString);

          addEventClick(comentarioElement.children[1].children[0],comentario);
          
          $container.append(comentarioElement);
        });    
    }
    const $containerComentarios = document.getElementById('containerAvisos')
    renderComentarioList($listaComentarios, $containerComentarios)
})();

document.getElementById('agregarComentario').addEventListener('click',()=>{

    var t = new Date;
    let fecha = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`

    const url = 'http://localhost:3000/api/InsertarComentario'
        const data = {};
        data.comentario = document.getElementById('comentario').value
        data.fecha = fecha
        data.codusu = localStorage.getItem('idUsuario');

        let JSO = JSON.stringify(data)
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSO, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert('Cometario Insertado'));
        
})
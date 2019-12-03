(async function ca(){
    async function getDocente(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $listaDocentes= await getDocente(`http://localhost:3000/api/obtenerDocentes`);
    debugger
    function DocenteItemTemplate(docente){
        return `<div class="card">
                    <div class="card-header">
                        <h5>${docente.nombredoc}</h5>
                    </div>
                    <div class="card-body cardDocente">
                        <img src="${docente.foto}" alt="">
                        <div class="datosDocentes">
                            <h5>Telefono:</h5>
                            <h6>${docente.phone}</h6>
                            <h5>Email:</h5>
                            <h6>${docente.email}</h6>
                        </div>
                    </div>
                </div>`;
    }
    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString;
        return $html.body.children[0];
    }
    function addEventClick($element,$docente) {
        // debugger
        // $element.addEventListener('click', () => {
        //     getComentarios(`http://localhost:3000/api/EliminarComentario/${$comentario.idcomentario}`);
        //     alert(`comentario Eliminado`)
        //     location.reload();
        // //   showModal($visita)
        // })
    }
    function renderDocenteList(listDocente, $container){
        listDocente.data.forEach(docente => {
            
          const HTMLString = DocenteItemTemplate(docente);
          const docenteElement = createTemplate(HTMLString);

        //   addEventClick(comentarioElement.children[1].children[0],comentario);
          
          $container.append(docenteElement);
        });    
    }
    const $containerDocentes = document.getElementById('containerDocentes')
    renderDocenteList($listaDocentes, $containerDocentes)
})();
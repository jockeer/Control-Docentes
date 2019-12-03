(async function ca(){
    async function getDocente(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $listaDocentes= await getDocente(`http://localhost:3000/api/obtenerDocentes`);
    debugger
    function DocenteItemTemplate(docente){
        return `<option value="${docente.coddoc}">${docente.nombredoc}</option>`;
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
    const $containerDocentes = document.getElementById('nombresdeDocentes')
    renderDocenteList($listaDocentes, $containerDocentes)
})();

(async function ba(){
    async function getMateria(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $listaMaterias= await getMateria(`http://localhost:3000/api/obtenerMaterias`);
    debugger
    function MateriaItemTemplate(materia){
        return `<option value="${materia.codmat}">${materia.nombremat}</option>`;
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
    const $containerMaterias = document.getElementById('nombresdeMaterias')
    renderMateriaList($listaMaterias, $containerMaterias)
})();
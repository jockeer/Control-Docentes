$(document).ready(function() {
    $('.listaOpciones li:has(ul)').click(function(e) {   
        if ($(this).hasClass('precionado')) {
            $(this).removeClass('precionado');
            $(this).children('ul').slideUp();
        } else {
          $('.listaOpciones li ul').slideUp();
            $('.listaOpciones li').removeClass('precionado');
            $(this).addClass('precionado');
            $(this).children('ul').slideDown();
        } 


       e.preventDefault();
    });

});
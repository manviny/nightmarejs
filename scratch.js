const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })


nightmare
  .goto('https://www.combinacionganadora.com/quiniela/2018-2019/jornada-44/')
  // .type('#search_form_input_homepage', 'github nightmare')
  // .click('#search_button_homepage')
  // .wait('#r1-0 a.result__a')
  .evaluate(function(){
      // DECLARAMOS UN ARRAY DONDE ALOJAREMOS LOS OBJETOS QUE NOS INTERESEN
      var encuentros = [];

      // CONSULTA PARA OBTENER OBJETOS DE CIERTO TIPO
      $('table.matchTable tr').each(function(){
          // DECLARAMOS UN OBJETO VACIO
          item = {};
          // AÑADIMOS LOS DATOS QUE NOS INTERESAN AL OBJETO
          // forma 1ª para acceder a los hijos
          item['encuentro'] = $(this).children().eq(0).text();
          // forma 2ª para acceder a los hijos
          item['local'] = $(this).find('td:nth-child(2)').text();
          item['local_gol'] = $(this).find('td:nth-child(4)').text();
          item['visitante_gol'] = $(this).find('td:nth-child(6)').text();
          item['visitante'] = $(this).find('td:nth-child(8)').text();
          item['resultado'] = $(this).find('li.active').text();
          // AÑADIMOS CADA UNO DE LOS HIJOS
          encuentros.push(item);
      })
      // RETORNAMOS EL RESULTADO
      return encuentros;
  })
  .end()
  // HACEMOS USO DEL RESULTADO
  .then(function(result){
      for(encuentro in result){
        console.log(result[encuentro]);
      }
  })
  .catch(error => {
    console.error('BÚSQUEDA FALLIDA:', error)
  })

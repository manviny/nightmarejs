const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

var fs = require('fs');

// nightmare.goto('https://www.bdfutbol.com/es/t/t2018-19.html')
nightmare.goto('https://www.bdfutbol.com/es/t/t2018-19.html')
  .evaluate(function(){

  		var encuentros = [];
  		$('#classific tr').each(function(index, element){

  				item = {}
					item.clasificacion = $(this).find("td:nth-child(2)").text();
          item.equipo = $(this).find("td:nth-child(4)").text();
          item.puntos = $(this).children().eq(4).text();
          item.pg = $(this).children().eq(6).text();
          item.pe = $(this).children().eq(7).text();
          item.pp = $(this).children().eq(8).text();
          item.gf = $(this).children().eq(9).text();
          item.gc = $(this).children().eq(10).text();
					
					encuentros.push(item)
  		})
    encuentros.shift();
    return encuentros;
  })
  .end()
  .then(function(out){

    console.log(out);
    var salida=""; 
        for (i in out) {
        	// salida = salida + `{ input: { ${out[i].local.replace(/ /g,'_') }: 1, ${out[i].visitante.replace(/ /g,'_')}: 0  }, output: { uno: ${uno}, equis: ${equis}, dos: ${dos} } },\n`;
        	salida = salida + ` { "cla": ${out[i].clasificacion}, "eq": "${out[i].equipo}", "puntos": ${out[i].puntos}, "pg": ${out[i].pg}, "pe": ${out[i].pe}, "pp": ${out[i].pp}, "gf": ${out[i].gf}, "gc": ${out[i].gc} },`;
        }   
    var NEW = fs.writeFileSync('jornadas.txt', "[" +salida.substring(0, salida.length-1) +"]" );
  })


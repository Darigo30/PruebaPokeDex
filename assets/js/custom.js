$("document").ready(function () {
    //Insertar en Select los Pokemones
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0",
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        const arreglo = data.results;
        const nombresPokemones = arreglo.map(function (el) {
          let nom = el.name;
          return nom;
        });
        // Se agregan los nombresPokemones en el select
        for (const i of nombresPokemones) {
          $("#selectPoke").append(`
          <option value="${i}">${i.toUpperCase()}</option>
          `);
        }
      }
    });
    //Fin insertar en Select los Pokemones

    //Al hacer click en el botón consultar me imprime las propiedadades
    $('#selectPoke').on('change', function(nombre){
     pokebola = nombre.target.value;
    });
    $("#consultar").click(function () {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokebola}`,
            type: "GET",
            dataType: "JSON",
            success: function (data) {

            //Imágenes

            var pokefront = data.sprites.front_default;
            $('#poke-front').attr("src", pokefront);

            var pokeback = data.sprites.back_default;
            $('#poke-back').attr("src", pokeback);

            //Datos del Pokemon

            var nombrepokemon =  data.name
            $("#poke-name").text(nombrepokemon);

            var pokemonId = data.id;
            $('#numeropoke').text(pokemonId);

            var habilid = data.abilities[0].ability.name;
            $('#habilidades').text(habilid);

            var tip = data.types[0].type.name;
            $('#tipo').text(tip);

            var pokemov = data.moves[0].move.name;
            $('#pokemov').text(pokemov);

            //Estadísticas

            var poke_base = data.stats[0].base_stat;
            $('#pokebase').text(poke_base);

            var poke_stats_hp = data.game_indices[0].game_index;
            $('#pokehp').text(poke_stats_hp);

            var poke_alt = data.height;
            $('#pokealt').text(poke_alt + " " + 'mts');

            var pokepeso = data.weight;
            $('#pokepeso').text(pokepeso + " " + 'kg') ;

            //Gráfico Chart
            var poke_stats_value = [
              poke_base,
              poke_stats_hp,
              poke_alt,
              pokepeso
            ];
            var poke_stats_name = [
            'Base',
            'índice',
            'Altura',
            'Peso'
            ];
            var poke_nombre_chart = data.name.toUpperCase();
            var ctx = document.querySelector('#chartContainer');
            new Chart(ctx, {
              data: {
                labels: poke_stats_name,
                datasets: [{
                  data: poke_stats_value,
                  label: poke_nombre_chart,
                  backgroundColor: '#1663B1',
                }]
              },
              type: 'line',
            });
            }
        });
    });
});
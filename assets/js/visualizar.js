
let end_point = 'http://127.0.0.1:8000/api';


$(document).ready(function () 
{
    let id_visualizacao = sessionStorage.getItem('id-visualizacao');

    if(id_visualizacao.length > 0)
    {
        
        $.ajax({
            type: "GET",
            url: end_point+"/veiculos/"+id_visualizacao,
            dataType: "json",
            crossDomain: true,
            success: function (response) 
            {

                $('.marca').val(response[0].marca);
                $('.veiculo').val(response[0].veiculo);
                $('.descricao').val(response[0].descricao);
                $('.vendido').val(response[0].vendido);
                $('.ano').val(response[0].ano);
                $('.id').val(response[0].id);

            },
            error: function (response)
            {
                location.assign("index.html");        
            }

        });
    }
    else
    {
        location.assign("index.html");
    }


});



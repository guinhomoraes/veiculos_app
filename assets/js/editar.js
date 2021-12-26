
let end_point = 'http://127.0.0.1:8000/api';


$(document).ready(function () 
{
    let id_edicao = sessionStorage.getItem('id-edicao');

    if(id_edicao.length > 0)
    {
        
        $.ajax({
            type: "GET",
            url: end_point+"/veiculos/"+id_edicao,
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


    $(document).on('click','.btn-editar', function(e)
    {
        e.preventDefault();

        $('#loader-wrapper').removeClass('d-none');

        let id_edicao = $('.id').val();

        let data = 
        {
            
            marca : $('.marca').val(),
            veiculo: $('.veiculo').val(),
            descricao: $('.descricao').val(),
            vendido: $('.vendido').val(),
            ano: $('.ano').val(),
        }
    
        $.ajax({
            type: "PUT",
            url: end_point+"/veiculos/"+id_edicao,
            dataType: "json",
            crossDomain: true,
            data: data,
            success: function (response) 
            {
                alert("Veículo Atualizado");
                $('#loader-wrapper').addClass('d-none');
            },
            error: function (response)
            {
                alert("Erro ao atualizar o veículo");
                $('#loader-wrapper').addClass('d-none');
            }

        });

    });


});



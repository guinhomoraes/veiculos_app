
let end_point = 'http://127.0.0.1:8000/api';


$(document).ready(function () 
{

    $(document).on('click','.btn-cadastrar', function(e)
    {
        e.preventDefault();

        $('#loader-wrapper').removeClass('d-none');

        let data = 
        {
            marca : $('.marca').val(),
            veiculo: $('.veiculo').val(),
            descricao: $('.descricao').val(),
            vendido: $('.vendido').val(),
            ano: $('.ano').val(),
        }
    
        $.ajax({
            type: "POST",
            url: end_point+"/veiculos",
            dataType: "json",
            crossDomain: true,
            data: data,
            success: function (response) 
            {
                $('#loader-wrapper').addClass('d-none');
                alert("Veículo Cadastrado");
            },
            error: function (response)
            {
                $('#loader-wrapper').addClass('d-none');
                alert("Erro ao cadastrar o veículo");
            }

        });

    });


});
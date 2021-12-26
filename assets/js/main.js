
let end_point = 'http://127.0.0.1:8000/api';


$(document).ready(function () 
{
    
    $.ajax({
        type: "GET",
        url: end_point+"/veiculos",
        dataType: "json",
        crossDomain: true,
        success: function (response) 
        {

            for(key in response)
            {

                let linha = `<tr>
                                <td>${response[key].marca}</td>
                                <td>${response[key].veiculo}</td>
                                <td>${response[key].descricao}</td>
                                <td>${response[key].ano}</td>
                                <td>${response[key].vendido == 1 ? 'Vendido' : 'Disponível' }</td>
                                <td>
                                    <a class="bt-pesq-editar text-secondary" href="#" data-id="${response[key].id}"><i class="fas fa-edit fa-lg"></i></a>
                                    <a class="bt-pesq-remover text-secondary" href="#" data-id="${response[key].id}"><i class="fas fa-trash-alt fa-lg"></i></a>
                                    <a class="bt-pesq-view text-secondary" href="#" data-id="${response[key].id}"><i class="fas fa-eye fa-lg"></i></a>
                                </td>
                            </tr>`;

                $('.lista-veiculos tbody').append(linha);
            }

            $('#loader-wrapper').addClass('d-none');
        },
        error: function (response)
        {
            $('#loader-wrapper').addClass('d-none');
        }

    });

    $(document).on('click','.bt-pesq-editar', function(e)
    {
        // e.preventDefault();
        let id = $(this).data('id');

        sessionStorage.setItem("id-edicao", id);

        location.assign("editar.html");

    });

    $(document).on('click','.bt-pesq-view', function(e)
    {
        let id = $(this).data('id');

        sessionStorage.setItem("id-visualizacao", id);

        location.assign("visualizar.html");

    });

    $(document).on('click','.bt-pesq-remover', function(e)
    {
        let id = $(this).data('id');


        if(confirm("Deseja realmente remover o registro?"))
        {

            $('#loader-wrapper').removeClass('d-none');

            $.ajax({
                type: "DELETE",
                url: end_point+"/veiculos/"+id,
                dataType: "json",
                crossDomain: true,
                success: function (response) 
                {
                    alert("Veículo Removido");
                    $('#loader-wrapper').addClass('d-none');
                    location.assign("index.html");
                },
                error: function (response)
                {
                    $('#loader-wrapper').addClass('d-none');
                    alert("Erro ao remover o veículo");
                }
    
            });
        }
        else
        {

        }

    });


    $(document).on('click','.btn-pesquisar', function(e)
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
    
        $('.lista-veiculos tbody').empty();
        

        $.ajax({
            type: "GET",
            url: end_point+"/veiculos/find",
            dataType: "json",
            crossDomain: true,
            data: data,
            success: function (response) 
            {
                for(key in response)
                {
    
                    let linha = `<tr>
                                    <td>${response[key].marca}</td>
                                    <td>${response[key].veiculo}</td>
                                    <td>${response[key].descricao}</td>
                                    <td>${response[key].ano}</td>
                                    <td>${response[key].vendido == 1 ? 'Vendido' : 'Disponível' }</td>
                                    <td>
                                        <a class="bt-pesq-editar text-secondary" href="#" data-id="${response[key].id}"><i class="fas fa-edit fa-lg"></i></a>
                                        <a class="bt-pesq-remover text-secondary" href="#" data-id="${response[key].id}"><i class="fas fa-trash-alt fa-lg"></i></a>
                                        <a class="bt-pesq-view text-secondary" href="#" data-id="${response[key].id}"><i class="fas fa-eye fa-lg"></i></a>
                                    </td>
                                </tr>`;
    
                    $('.lista-veiculos tbody').append(linha);
                }
    
                $('#loader-wrapper').addClass('d-none');
            },
            error: function (response)
            {
                $('#loader-wrapper').addClass('d-none');
                alert("Erro ao cadastrar o veículo");
            }

        });

    });


});



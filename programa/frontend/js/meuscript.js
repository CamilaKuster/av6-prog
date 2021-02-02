$(function () {
  
    function mostrarClientes() {
      $.ajax({
        url: 'http://localhost:5000/listar_clientes',
        method: 'GET',
        dataType: 'json',
        success: listarCliente,
        error: function () {
          alert('erro ao ler dados, verifique o backend');
        },
      });
  
      function listarCliente(clientes) {
        $("#tableBody").empty();
        showContent("tabela-cliente");
        var linhas = '';
    
        for (cliente of clientes) {
          novaLinha = `<tr id="linha_${cliente.id}">  
                             <td>${cliente.id}</td> 
                             <td>${cliente.username}</td> 
                             <td>${cliente.password}</td> 
                             <td>${cliente.name}</td> 
                             <td>${cliente.email}</td> 
                             <td>${cliente.cpf}</td> 
                             <td>${cliente.rg}</td> 
                             <td>${cliente.celular}</td> 
                             <td>${cliente.endereco}</td> 
                             <td>
                              <a href="#" id="deletar_${cliente.id}" class="deletar_clientes" title="Excluir Cliente">
                                  <span class="material-icons">
                                    Deletar Cliente 
                                  </span>
                              </a>
                            </td>
                          </tr>`;
          linhas += novaLinha;
          $('#tableBody').html(linhas);
        }
      }
    }
    function showContent(nextPage) {
      $("#inicio").addClass("d-none");
      $("#tabela-cliente").addClass("d-none");
      $("#tabela-fornecedor").addClass("d-none");
      $("#tabela-produto").addClass("d-none");
      $(`#${nextPage}`).removeClass("d-none");
    }
  
    $('#link-listar').click(function() {
      mostrarClientes();
    });
  
    $("#link-inicial").click(function() {
      inicio();
      showContent("inicio");
    });
  
    $('#nav-brand').click(function() {
      showContent("inicio");
    });
  
    $(document).on("click", "#btn-incluir", function() {
      const username = $('#campo-username').val();
      const password = $('#campo-password').val();
      const name = $('#campo-name').val();
      const email = $('#campo-email').val();
      const cpf = $('#campo-cpf').val();
      const rg = $('#campo-rg').val();
      const celular = $('#campo-celular').val();
      const endereco = $('#campo-endereco').val();

  
      const clienteData = JSON.stringify({
        username: username,
        password: password,
        name: name,
        email: email,
        cpf: cpf,
        rg: porte,
        celular: celular,
        endereco: endereco,
      });
  
      $.ajax({
        url: 'http://localhost:5000/inserir_cliente',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: clienteData,
        success: inserirCliente,
        error: inserirClienteErro,
      });
  
      function inserirCliente(resposta) {
        if (resposta.result == 'ok') {
            alert('Cliente adicionado com sucesso')
            $('#campo-username').val('');
            $('#campo-password').val('');
            $('#campo-name').val('');
            $('#campo-email').val('');
            $('#campo-cpf').val('');
            $('#campo-rg').val('');
            $('#campo-celular').val('');
            $('#campo-endereco').val('');

        } else {
            alert('Erro na adição do cliente!')
        }
      }
  
      function inserirClienteErro(resposta){
        alert('Erro na chamada do back-end')
      }
    });
    
    $('#modal-incluir').on('hidden.bs.modal', function(e) {
      if (!$('#tabela-cliente').hasClass('invisible')) {
        mostrarClientes();
      }
    });
    
    
    
    $(document).on("click", ".deletar_clientes", function() {
      var component = $(this).attr("id");
  
      var icon_name = "deletar_";
      var cliente_id = component.substring(icon_name.length);
  
      $.ajax({
        url: 'http://localhost:5000/deletar_clientes/' + cliente_id,
        type: "DELETE",
        dataType: "json",
        success: clienteDeletado,
        error: clienteDeletadoErro
      });
  
      function clienteDeletado(retorno) {
        if (retorno.result == "ok") {
          $('#linha_' + cliente_id).fadeOut(1000, function() {
            alert("Cliente removido com sucesso!");
            mostrarClientes();
          });
        } else {
            alert(`${retorno.result}: ${retorno.details}`);
        }
      }
  
      function clienteDeletadoErro(response) {
        alert("Erro ao excluir dados, verifique o Backend!");
      }
    });
  
    function listar_fornecedores() {
      $.ajax({
          url: 'http://localhost:5000/listar_fornecedores',
          method: 'GET',
          dataType: 'json', 
          success: listar, 
          error: function(problema) {
              alert("erro ao ler dados, verifique o backend: ");
          }
      });
      function listar(fornecedores) {
          $('#corpoTabelaFornecedores').empty();
          showContent("tabela-fornecedores")    
          var linhas = '';
          for (fornecedor of fornecedores) { 
              novaLinha = '<tr id="linha_fornecedor'+fornecedor.id+'">' + 
              '<td>' + fornecedor.username + '</td>' + 
              '<td>' + fornecedor.name + '</td>' + 
              '<td>' + fornecedor.email + '</td>' + 
              '<td>' + fornecedor.cnpj + '</td>' +                
              '</tr>';
              linhas += novaLinha;
              $('#corpoTabelaFornecedores').append(novaLinha);
          }
      }
    }
  
    $(document).on("click", "#linkListarFornecedores", function() {
      listar_fornecedores();
    });
  
  
    function listar_produtos() {
      $.ajax({
          url: 'http://localhost:5000/listar_produtos',
          method: 'GET',
          dataType: 'json',
          success: listar,
          error: function(problema) {
              alert("erro ao ler dados, verifique o backend: ");
          }
      });
      function listar(produtos) {
          $('#corpoTabelaProdutos').empty();
          showContent("tabela-produtos")      
          var linhas = '';
          for (produto of produtos) { 
              novaLinha = '<tr id="linha_produto'+produto.id+'">' + 
              '<td>' + produto.codigo_barras + '</td>' + 
              '<td>' + produto.preco + '</td>' + 
              '</tr>';
              linhas += novaLinha;
              $('#corpoTabelaProdutos').append(novaLinha);
          }
      }
    }
  
    $(document).on("click", "#linkListarProdutos", function() {
      listar_produtos();
    });
    showContent("inicio");
  });
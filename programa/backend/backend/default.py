from config import *
from modelo import Cliente, Fornecedor, Produto


@app.route("/")
def inicio():
    return 'Sistema de cadastro de clientes. '+\
        '<a href="/listar_clientes">Cheque aqui os listados</a>'

@app.route("/listar_clientes")
def listar_clientes():
    clientes = db.session.query(Cliente).all()
    clientes_em_json = [ x.json() for x in clientes ]
    resposta = jsonify(clientes_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route('/inserir_cliente', methods=['post'])
def inserir_cliente():
    response = jsonify({"status": "201", "result": "ok", "details": "Cliente adicionado!"})
    data = request.get_json()
    try:
        novo = Cliente(**data)
        db.session.add(novo)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 

@app.route('/deletar_clientes/<int:id>', methods=['DELETE'] )
def deletar_clientes(id):
    response = jsonify({"status": "200", "result": "ok", "details": "ok"})
    try:
        Cliente.query.filter(Cliente.id == id).delete()
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400" , "result": "error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
@app.route("/listar_fornecedores")
def listar_fornecedores():
    fornecedores = db.session.query(Fornecedor).all()
    lista_jsons = [ x.json() for x in fornecedores ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_produtos")
def listar_produtos():
    produtos = db.session.query(Produtos).all()
    lista_jsons = [ x.json() for x in produtos ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

if __name__ == '__main__':
    app.run(debug=True)
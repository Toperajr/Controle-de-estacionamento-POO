class Produto { 
    constructor() {
        this.id = 1
        this.arrayProdutos = [];
        this.editId = null;
        this.multi = 0;
    }
    
    salvar() {
        let produto = this.lerDados(); 


        if(this.validaCampos(produto)) {
            if(this.editId == null){
                this.adicionar(produto);

            } else {
                this.atualizar(this.editId, produto);
            }
        }
        this.listar();
        this.multiplicador();
        this.calcturno();
        this.cancelar();

    }

    listar() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = '';
        for(let i = 0; i < this.arrayProdutos.length; i++ ) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_turno = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = parseFloat(this.arrayProdutos[i].valor).toFixed(2);
            td_turno.innerText = this.arrayProdutos[i].turno;

            td_id.classList.add('center');
            let imgEdit = document.createElement('img');
            imgEdit.src = "img/editar.png";
            imgEdit.setAttribute("onclick","produto.preditar("+ JSON.stringify(this.arrayProdutos[i])+")")


            let imgDelet = document.createElement('img');
            imgDelet.src = "img/delete.png";
            imgDelet.setAttribute("onclick","produto.deletar("+this.arrayProdutos[i].id+")")

            td_acoes.appendChild(imgDelet)
            td_acoes.appendChild(imgEdit)
            }

    }
    preditar(dados){
        this.editId = dados.id
        document.getElementById('carro').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;
        document.getElementById('turno').value = dados.turno;

        document.getElementById('btn1').innerText = "Atualizar";

    }

    adicionar(produto) {
        produto.valor = (produto.valor)
        this.arrayProdutos.push(produto);
        this.id++;

    }
    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;
                this.arrayProdutos[i].turno = produto.turno;
 
            }
        }
        
    }
    
    lerDados() {
        let produto = {}
        
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('carro').value;
        produto.turno = document.getElementById('turno').value;
        produto.valor = document.getElementById('valor').value;

        return produto;
    }

    validaCampos(produto) {
        let msg = '';
        if(produto.nomeProduto == ''){
            msg += '- informe o carro\n';
        }
        if(produto.valor == ''){
            msg += '- informe o preço\n';
        }
        if(produto.turno == ''){
            msg += '- informe o turno\n'
        }
        if(msg != ''){
            alert(msg);
            return false
        }
        
        return true;
    }
    cancelar() {
        document.getElementById('carro').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('turno').value = document.getElementById('vazio');
        document.getElementById('lucro').value = '150';


        document.getElementById('btn1').innerText = 'Salvar';
        
        this.editId = null;

    }
    deletar(id){
        if(confirm("Deseja deletar o carro cadastrado?")){

            let tbody = document.getElementById('tbody');
            for (let i = 0; i < this.arrayProdutos.length; i++){
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        this.multiplicador();
        this.calcturno();
      }

    }
    multiplicador(){

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            this.multi = parseFloat(parseFloat(this.multi) + parseFloat(this.arrayProdutos[i].valor)).toFixed(2); 
        }
        document.getElementById('lucro').innerText = ('R$ '+this.multi);
        this.multi = 0;
    }
    calcturno(){
        let dia = 0; 
        let tarde = 0; 
        let noite = 0;
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].turno == 'Tarde'){
                tarde++
            }
            if(this.arrayProdutos[i].turno == 'Manhã') {
                dia++
            }
            if(this.arrayProdutos[i].turno == 'Noite'){
                noite++
            }
            document.getElementById('calturno').innerText = (`Estacionamentos a tarde: ${tarde}\n Estacionamentos pela manhã: ${dia}\n Estacionamentos a noite: ${noite}\n`)

        }    
    }
}
var produto = new Produto();

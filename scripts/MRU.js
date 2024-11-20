class MRU {

    constructor(tamanho){
        this.tamanho = tamanho; 
        this.memoria = new Array(tamanho); 
        this.tabelaProcessos = []; 
    }

    getTamanho() {
        return this.tamanho;
    }
    
    setTamanho(valor) {
        this.tamanho = valor;
    }

    iniciaMemoria(){
        for (let i = 0; i < this.tamanho; i++){
            this.memoria[i] = -1;
        }
    }

    encontrarpeloID(id){
        for(let k = 0; k < this.tabelaProcessos.length; k++){
            if(this.tabelaProcessos[k].getId() == id){
                return this.tabelaProcessos[k];
            }
        }
    }

    retiraElemento(id){
        for (var i = 0; i < this.tabelaProcessos.length; i++){
            if (this.tabelaProcessos[i].getId() == id){
                this.tabelaProcessos.splice(i, 1)[0];
                return true;
            }
        }
        return false;
    }

    firstFit(processo){
        
        var casaInicial = 0;
        var tamanhovazio = 0;

        for (let i = 0; i < this.tamanho; i++){

            if(this.memoria[i] == -1){
                casaInicial = i;
                tamanhovazio = 0;

                for (let j = i; j < this.tamanho && this.memoria[j] == -1; j++){
                    tamanhovazio++;
                }


                if(tamanhovazio >= processo.getTamanho()){
                    let tamProc = processo.getTamanho();

                    for(let k = casaInicial; k < this.tamanho && tamProc != 0; k++){
                        this.memoria[k] = processo.getId();
                        tamProc--;
                    }
                    processo.setEnderecoInicio(casaInicial);
                    this.tabelaProcessos.push(processo);
                    return processo;
                } else {
                    i = casaInicial + tamanhovazio - 1;
                }
            }
        }
        return null;
    }

    contaEspacosVazios(inicio){
        let total = 0;
        for (let i = inicio; i < this.tamanho && this.memoria[i] == -1; i++){
            total++;
        }
        return total;
    }

    NUR(processo, menorClasse){
        
        let processosMenorClasse = [];

        for(let i = 0; i < this.tabelaProcessos.length; i++){
            if(this.tabelaProcessos[i].getClasse() == menorClasse){
                processosMenorClasse.push(this.tabelaProcessos[i]);
            }
        }


        while (processosMenorClasse.length != 0){

            let numeroSorteado = Math.floor(Math.random() * processosMenorClasse.length);
            let processoAleatorio = processosMenorClasse[numeroSorteado];

            if((processoAleatorio.getTamanho() + this.contaEspacosVazios(processoAleatorio.getEnderecoInicio() + processoAleatorio.getTamanho())) >= processo.getTamanho()){

                for(let k = processoAleatorio.getEnderecoInicio(); this.memoria[k] == processoAleatorio.getId(); k++){
                    this.memoria[k] = -1;
                }

                this.retiraElemento(processoAleatorio.getId());
                this.firstFit(processo);
                return; 

            } else {
                processosMenorClasse.splice(numeroSorteado, 1);
            }
        }

        if(menorClasse < 3){

            this.NUR(processo, menorClasse + 1);

        } else {

            let numeroSorteado = Math.floor(Math.random() * this.memoria.length);

            while (numeroSorteado > (this.memoria.length - processo.getTamanho())){
                numeroSorteado = Math.floor(Math.random() * this.memoria.length);
            }

            let contador = 0; 
            let processosRemovidos = [];

            for (let i = numeroSorteado; i < this.memoria.length && contador <= processo.getTamanho(); i++){

                if (!processosRemovidos.includes(this.memoria[i])) {
                    processosRemovidos.push(this.memoria[i]);
                }

                this.memoria[i] = -1;
                contador++;

            }

            console.log(processosRemovidos)

            for (let j = 0; processosRemovidos.length != 0; ) {
                let id = processosMenorClasse.splice(j, 1)[0]; 
                this.retiraElemento(id); 
            }
            

            this.firstFit(processo);
            return;

        }
    }

    adicionaProcesso(processo){

        var retorno = this.firstFit(processo);

        if(retorno == null){
            let menorClasse = this.buscaMenorClasse();
            this.NUR(processo, menorClasse);
        } 

    }

    buscaMenorClasse(){
        let menor = 1000;
        for (let i = 0; i < this.tabelaProcessos.length; i++){
            if(this.tabelaProcessos[i].getClasse() < menor){
                menor = this.tabelaProcessos[i].getClasse();
            }
        }
        return menor;
    }

    incrementaR(){
        for(let j = 0; j < this.tabelaProcessos.length; j++){
            if(this.tabelaProcessos[j].getR() == 1){
                console.log("Processo " + this.tabelaProcessos[j].getId() + " foi para R0");
                this.tabelaProcessos[j].setR(0)
            }
            
        }
    }

    incrementaM(){
        for(let j = 0; j < this.tabelaProcessos.length; j++){
            if(this.tabelaProcessos[j].getContador() == 9 && this.tabelaProcessos[j].getM() == 1){
                console.log("Processo " + this.tabelaProcessos[j].getId() + " foi para M0");
                this.tabelaProcessos[j].setM(0);
                this.tabelaProcessos[j].setContador(0);
            } else if (this.tabelaProcessos[j].getM() == 1) {
                this.tabelaProcessos[j].aumentaContador();
            }
        }
    }

    aleatoriza(){

        for(let j = 0; j < this.tabelaProcessos.length; j++){

            let probabilidadeModificado = Math.random() * 100;  
            if (probabilidadeModificado < 20) {
                console.log("O processo de id: " + this.tabelaProcessos[j].getId() + " foi referenciado e modificado");
                this.tabelaProcessos[j].setR(1);
                this.tabelaProcessos[j].setM(1);
                this.tabelaProcessos[j].setContador(0);
            } else {

                let probabilidadeReferenciado = Math.random() * 100;  

                if (probabilidadeReferenciado < 20){
                    console.log("O processo de id: " + this.tabelaProcessos[j].getId() + " foi referenciado");
                    this.tabelaProcessos[j].setR(1);
                }
            }

        }
    }

}

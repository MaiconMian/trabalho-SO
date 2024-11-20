var numeroProcessos = 0; 
var mru = new MRU(50);
mru.iniciaMemoria();
var processosEntrar = [];
var ut = 0;
var ciclo = 0;

function criaProcesso(){
    var tamanhoProcesso = parseInt(document.getElementById('tamanhoProcesso').value, 10);
    var horaentrar = parseInt(document.getElementById('horaEntrar').value, 10);
    let processo = new Processo(numeroProcessos, tamanhoProcesso, 1, 1, horaentrar);
    processosEntrar.push(processo);
    numeroProcessos++;
}


function processar(){

    console.log(ut + " u.t");

    for (let i = 0; i < processosEntrar.length; i++){
        if(processosEntrar[i].getEntrada() == ut){
            console.log("adicionando o processo com id: " + processosEntrar[i].getId());
            mru.adicionaProcesso(processosEntrar[i]);
        }
    }

    if(ciclo == 10){
        mru.incrementaR();
    } else {
        ciclo++;
    }

    mru.incrementaM();

    mru.aleatoriza();

    ut++;

    setTimeout(() => {
        processar();
    }, 1000); 
    
}
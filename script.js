const display = document.querySelector('#display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=op]');
const limparTudo= document.querySelector('#limpar-tudo');
const resultado = document.querySelector('#resultado');
const AC = document.querySelector('#limpar-calc');
const backspace = document.querySelector('#backspace');
const decimal = document.querySelector('#decimal');
let novoNumero = true;
let operador = '';
let numeroAnterior;

const calcular = () => {
  if (operador) {
    const numeroAtual = parseFloat(display.textContent.replace(',','.'));
      novoNumero = true;
        if(operador == '+') atualizarTela(numeroAnterior + numeroAtual);
        if(operador == '-') atualizarTela(numeroAnterior - numeroAtual);
        if(operador == '*') atualizarTela(numeroAnterior * numeroAtual);
        if(operador == '/') atualizarTela(numeroAnterior / numeroAtual);
  }
};


const atualizarTela = (valor) => {
  if (novoNumero) {
    display.textContent = valor.toLocaleString('BR');
    novoNumero = false;
  } else {
    display.textContent += valor; 
  }
};


const adicionarNumero = (event) => {
  atualizarTela(event.target.textContent);
};
numeros.forEach(numero => numero.addEventListener('click', adicionarNumero));


const selecionaOperador = (event) => {
   !novoNumero && 
    calcular()
    novoNumero = true;
    operador = event.target.value;
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));    
  
};
operadores.forEach(operador => operador.addEventListener('click', selecionaOperador));


const calcularResultado = () => {
  calcular();
  operador = null;
};
resultado.addEventListener('click', calcularResultado);

const limparCalculo = () => {
  display.textContent = '';
  novoNumero = true;
  operador = null;
};
AC.addEventListener('click', limparCalculo);


const removerUltimoNum = () => {
  display.textContent = display.textContent.slice(0, -1);
};
backspace.addEventListener('click', removerUltimoNum);


const inserirDecimal = () => {
  if (display.textContent.indexOf(',') !== 1) display.textContent !== '' ? atualizarTela(',') : atualizarTela('0,');    
};
decimal.addEventListener('click', inserirDecimal);

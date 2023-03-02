let convertedInch = { in: 1, mm: 25.4, cm: 2.54, m: 0.0254, km: 2.54e-5, ft: 0.08333, yd: 0.02777 }

let unitFrom = document.getElementById('measure-from');
let input = document.getElementById('input-from');

let unitTo = document.getElementById('measure-to');
let output = document.getElementById('input-to');

let swap = document.getElementById('swap');

window.onload = function () {

    function convertDistance() {
        let converted;
        if (unitFrom.value == unitTo.value) {
            output.value = input.value;
        } else if (unitFrom.value != 'in') {
            converted = +((input.value / convertedInch[unitFrom.value]).toFixed(2));
            output.value = +((converted * convertedInch[unitTo.value]).toFixed(2));
        } else {
            output.value = +((input.value * convertedInch[unitTo.value]).toFixed(2));
        }
    }
    
    input.oninput = function () {
        convertDistance();
    };
    unitFrom.onchange = function () {
        convertDistance();
    };
    unitTo.onchange = function () {
        convertDistance();
    }
}

swap.addEventListener('click', ()=>{
    let unitTmp = unitFrom.value;
    let valueTmp = input.value;

    unitFrom.value = unitTo.value;
    unitTo.value = unitTmp;
    input.value = output.value;
    output.value = valueTmp;
})




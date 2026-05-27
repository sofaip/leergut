function pad(num,size){
    let s = num+"";
    while(s.length < size) s = "0"+s;
    return s;
}

function generateTomraStyle(totalCents){

    let prefix = "10000";

    let bon = pad(
        Math.floor(Math.random()*9999999),
        7
    );

    let amount = pad(totalCents,8);

    let reserve = pad(
        Math.floor(Math.random()*99999999),
        8
    );

    return {
        bon,
        code: prefix + bon + amount + reserve
    };
}

function gen(){

    let g = parseInt(document.getElementById("g").value)||0;
    let b15 = parseInt(document.getElementById("b15").value)||0;
    let b25 = parseInt(document.getElementById("b25").value)||0;
    let k = parseInt(document.getElementById("k").value)||0;

    let total =
        g*0.08 +
        b15*0.15 +
        b25*0.25 +
        k*1.5;

    total = total.toFixed(2);

    let cents = Math.round(total*100);

    // ГЕНЕРАЦІЯ СТРУКТУРИ
    let data = generateTomraStyle(cents);

    document.getElementById("output").innerHTML = `
        <div>Bon: ${data.bon}</div>
        <div>Total: ${total} €</div>
        <div class="small">${data.code}</div>
    `;

    JsBarcode("#barcode", data.code, {
        format:"CODE128",
        width:2,
        height:120,
        displayValue:false
    });

}

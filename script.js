function pad(num,size){
    let s = num + "";

    while(s.length < size){
        s = "0" + s;
    }

    return s;
}

function generateTomraStyle(totalCents){

    let prefix = "10000";

    let bon =
        document.getElementById("bon").value || "0";

    bon = pad(bon,7);

    let amount = pad(totalCents,8);

    let reserve = "00000000";

    return {
        bon,
        amount,
        code: prefix + bon + amount + reserve
    };
}

function gen(){

    let g =
        parseInt(document.getElementById("g").value) || 0;

    let b15 =
        parseInt(document.getElementById("b15").value) || 0;

    let b25 =
        parseInt(document.getElementById("b25").value) || 0;

    let k =
        parseInt(document.getElementById("k").value) || 0;

    let total =
        g * 0.08 +
        b15 * 0.15 +
        b25 * 0.25 +
        k * 1.50;

    total = total.toFixed(2);

    let cents =
        Math.round(parseFloat(total) * 100);

    let data =
        generateTomraStyle(cents);

    document.getElementById("output").innerHTML = `
        <div><b>Bon:</b> ${data.bon}</div>
        <div><b>Total:</b> ${total} €</div>
        <div><b>Amount:</b> ${data.amount}</div>
        <div class="small"><b>Barcode:</b><br>${data.code}</div>
    `;

    JsBarcode("#barcode", data.code, {
        format: "CODE128",
        width: 2,
        height: 120,
        displayValue: false
    });
}

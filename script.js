function pad(num, size) {
    let s = num + "";
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

function generateBarcode(prefix12, cents) {

    // гарантуємо 12 цифр
    prefix12 = pad(prefix12, 12).slice(0, 12);

    // як ти просила: 5 нулів
    let middle = "00000";

    // сума (8 цифр)
    let amount = pad(cents, 8);

    return prefix12 + middle + amount;
}
}

function gen() {

    let prefix =
        document.getElementById("prefix").value || "0";

    let g = parseInt(document.getElementById("g").value) || 0;
    let b15 = parseInt(document.getElementById("b15").value) || 0;
    let b25 = parseInt(document.getElementById("b25").value) || 0;
    let k = parseInt(document.getElementById("k").value) || 0;

    let total =
        g * 0.08 +
        b15 * 0.15 +
        b25 * 0.25 +
        k * 1.50;

    let cents = Math.round(total * 100);
    let totalFixed = total.toFixed(2);

    let code = generateBarcode(prefix, cents);

    document.getElementById("output").innerHTML = `
        <div><b>Prefix:</b> ${prefix}</div>
        <div><b>Total:</b> ${totalFixed} €</div>
        <div><b>Cents:</b> ${cents}</div>
        <div class="small"><b>Barcode:</b><br>${code}</div>
    `;

    JsBarcode("#barcode", code, {
        format: "CODE128",
        width: 2,
        height: 120,
        displayValue: false
    });
}

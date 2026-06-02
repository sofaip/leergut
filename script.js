function pad(num, size){
  let s = num + "";
  while(s.length < size){
    s = "0" + s;
  }
  return s;
}

function generateTomraStyle(totalCents){
  let prefix = document.getElementById("prefix12").value || "000000000000";
  // Обрізаємо до 12 символів якщо більше
  prefix = prefix.slice(0, 12);
  // Доповнюємо нулями зліва якщо менше 12
  while(prefix.length < 12){
    prefix = "0" + prefix;
  }

  let zeros = "00000";
  let amount = pad(totalCents, 8);

  return {
    prefix,
    amount,
    code: prefix + zeros + amount
  };
}

function gen(){
  let g   = parseInt(document.getElementById("g").value)   || 0;
  let b15 = parseInt(document.getElementById("b15").value) || 0;
  let b25 = parseInt(document.getElementById("b25").value) || 0;
  let k   = parseInt(document.getElementById("k").value)   || 0;

  let total = g * 0.08 + b15 * 0.15 + b25 * 0.25 + k * 1.50;
  total = total.toFixed(2);
  let cents = Math.round(parseFloat(total) * 100);

  let data = generateTomraStyle(cents);

  document.getElementById("output").innerHTML = `
    <div><b>Prefix:</b> ${data.prefix}</div>
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

function pad(num, size){
  let s = num + "";
  while(s.length < size){
    s = "0" + s;
  }
  return s;
}

function gen(){
  let g   = parseInt(document.getElementById("g").value)   || 0;
  let b15 = parseInt(document.getElementById("b15").value) || 0;
  let b25 = parseInt(document.getElementById("b25").value) || 0;
  let k   = parseInt(document.getElementById("k").value)   || 0;

  // Рахуємо суму
  let total = g * 0.08 + b15 * 0.15 + b25 * 0.25 + k * 1.50;
  total = total.toFixed(2);
  let cents = Math.round(parseFloat(total) * 100);

  // Перші 12 цифр від користувача
  let prefix = document.getElementById("prefix12").value || "000000000000";
  prefix = prefix.replace(/\D/g, "");
  prefix = prefix.slice(0, 12).padStart(12, "0");

  // Сума в центах (4 цифри)
  let amount = pad(cents, 4);

  // Структура: 12 + amount, добиваємо нулями до 29 символів
  // Результат: 100001015582 + 00000 + 12020 + 0000000
  // тобто після 12 цифр йде amount з padStart(9,"0") — що дає 5 нулів перед сумою
  let amountPadded = amount.padStart(9, "0"); // 5 нулів + 4 цифри суми = 9
  let core = prefix + amountPadded;           // 12 + 9 = 21
  let code = core.padEnd(29, "0");            // добиваємо до 29

  document.getElementById("output").innerHTML = `
    <div><b>Prefix:</b> ${prefix}</div>
    <div><b>Total:</b> ${total} €</div>
    <div><b>Amount (cents):</b> ${amount}</div>
    <div class="small"><b>Barcode:</b><br>${code}</div>
  `;

  JsBarcode("#barcode", code, {
    format: "CODE128",
    width: 2,
    height: 120,
    displayValue: false
  });
}

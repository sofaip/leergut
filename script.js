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
  prefix = prefix.replace(/\D/g, ""); // тільки цифри
  prefix = prefix.slice(0, 12).padStart(12, "0");
 
  // 5 нулів
  let zeros = "00000";
 
  // Сума — 4 цифри (центи)
  let amount = pad(cents, 4);
 
  // Збираємо код: 12 + 5 + 4 = 21 символ, добиваємо нулями до 25
  let core = prefix + zeros + amount;
  let code = core.padEnd(25, "0");
 
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

function generateTomraStyle(totalCents){

    function pad(n, size){
        return String(n).padStart(size,'0');
    }

    let prefix = "10000";

    // 7 цифр номер чека
    let bon = pad(
        Math.floor(Math.random()*9999999),
        7
    );

    // 8 цифр сума
    let amount = pad(totalCents,8);

    // 8 цифр резерв
    let reserve = pad(
        Math.floor(Math.random()*99),
        8
    );

    return prefix + bon + amount + reserve;
}

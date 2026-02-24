// Conversão - Conversion

export function stringMoneyToIntCents(amount){
    const string = String(amount).trim();

    // 19.90 / 19,90 / 19
    const normalized = string.replace(/\./g, "").replace(",", ".");

    const value = Number(normalized);

    if(!Number.isFinite(value) || value <= 0){
        return null;
    }

    return Math.round(value*100)
}
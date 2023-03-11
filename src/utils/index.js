export function getBit (value, bit = 4) {
    let str = value.toString();
    let strIndex = str.indexOf('.');
    if (strIndex === -1) return str;
    str = str.substring(0, strIndex + bit + 1);
    return str;
}
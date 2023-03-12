export function getBit (value, bit = 4) {
    let str = value.toString();
    let strIndex = str.indexOf('.');
    if (strIndex === -1) return str;
    str = str.substring(0, strIndex + bit + 1);
    return str;
}

// export function getMapPoint(city, sity) {
//     var map = new BMapGL();
    
//     map.centerAndZoom(city, 12)
//     const local = new BMapGL.LocalSearch(map, {
//         renderOptions: { map }
//     });     
//     sity && local.search(sity);
// }
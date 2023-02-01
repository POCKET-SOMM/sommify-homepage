export function rgb(hex, a) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  return (
    `rgb${a ? 'a' : ''}(` + r + ',' + g + ',' + b + `${a ? ', ' + a : ''})`
  );
}
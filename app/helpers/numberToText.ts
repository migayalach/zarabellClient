export const numberToSpanishWords = (num: number) => {
  const unidades = [
    "",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
  ];

  const decenas = [
    "",
    "",
    "veinte",
    "treinta",
    "cuarenta",
    "cincuenta",
    "sesenta",
    "setenta",
    "ochenta",
    "noventa",
  ];

  const centenas = [
    "",
    "ciento",
    "doscientos",
    "trescientos",
    "cuatrocientos",
    "quinientos",
    "seiscientos",
    "setecientos",
    "ochocientos",
    "novecientos",
  ];

  const convert = (n: number): string => {
    if (n < 20) return unidades[n];

    if (n < 100) {
      const d = Math.floor(n / 10);
      const u = n % 10;
      return u === 0 ? decenas[d] : `${decenas[d]} y ${unidades[u]}`;
    }

    if (n < 1000) {
      const c = Math.floor(n / 100);
      const r = n % 100;
      return r === 0 ? centenas[c] : `${centenas[c]} ${convert(r)}`;
    }

    if (n < 1000000) {
      const m = Math.floor(n / 1000);
      const r = n % 1000;
      const miles = m === 1 ? "mil" : `${convert(m)} mil`;
      return r === 0 ? miles : `${miles} ${convert(r)}`;
    }

    return "";
  };

  const entero = Math.floor(num);
  const dec = Math.round((num - entero) * 100);

  const result = `${convert(entero)} ${dec.toString().padStart(2, "0")}/100`;

  return result.charAt(0).toUpperCase() + result.slice(1);
};

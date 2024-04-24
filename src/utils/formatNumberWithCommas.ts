function formatNumberWithCommas(x: number | string = 0) {
  const nf = new Intl.NumberFormat('es-ES');
  return nf.format(x as number);
}

export default formatNumberWithCommas;

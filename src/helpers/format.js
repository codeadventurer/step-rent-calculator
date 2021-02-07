const formatStringToNumber = (str) => {
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
};

const formatNumberToString = (num) => {
  return parseFloat(num).toFixed(2).toString().replace(/\./, ',');
};

export { formatStringToNumber, formatNumberToString };

module.exports = (rows, type) => {
  const places = [];
  const columnsArray = type.columns.split(',');
  const firstSymbol = 'A'.charCodeAt(0);
  for (const col of columnsArray) {
    for (let i = 0; i < rows; ++i) {
      places.push({
        number: `${String.fromCharCode(firstSymbol + i)}${col}`,
      });
    }
  }
  return places;
};

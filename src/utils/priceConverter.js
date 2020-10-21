const priceConverter = (currency, price, list) => {
  if (Number(price) / list[currency] < 0.1) {
    return (Number(price) / list[currency]).toFixed(2);
  }
  return (Number(price) / list[currency]).toFixed(1);
};

export default priceConverter;

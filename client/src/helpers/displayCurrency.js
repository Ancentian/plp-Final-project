const displayKESCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  });

  return formatter.format(num).replace('KES', 'Sh');
};

export default displayKESCurrency;

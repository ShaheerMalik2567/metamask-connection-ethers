const getEthValue = async () => {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR",
    {
      method: "GET",
      body: JSON.stringify(),
    }
  );

  const data = await response.json();
  return data.USD;
};
export default getEthValue;

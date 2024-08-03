export const getAllProducts = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const getStockPriceBySku = (sku) => {
  return fetch(`${process.env.REACT_APP_API_URL}/products/${sku}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

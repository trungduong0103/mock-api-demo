export function dataMapper(data) {
  return {
    id: data.id,
    cardTitle: data.productName,
    cardImage: data.productImage,
    cardDescription: data.productDescription
  };
}

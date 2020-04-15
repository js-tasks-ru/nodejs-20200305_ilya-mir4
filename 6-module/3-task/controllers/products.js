const Product = require('../models/Product');

function mapProduct(product) {
  return {
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  };
};

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;
  if (!query) return next();

  const products = await Product
      .find({$text: {$search: query}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .limit(20);
  ctx.body = {products: products.map(mapProduct)};
};

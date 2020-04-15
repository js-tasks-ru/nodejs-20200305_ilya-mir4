const Product = require('../models/Product');
const mongoose = require('mongoose');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  return next();
};

module.exports.productList = async function productList(ctx, next) {
  const productList = await Product.find({}).select('-__v');

  if (productList.length === 0) {
    ctx.body = {
      products: new Array(0),
    };
    return next();
  }

  ctx.body = {
    products: productList.map((productItem) => ({
      'category': productItem.category,
      'description': productItem.description,
      'id': productItem._id,
      'images': productItem.images,
      'price': productItem.price,
      'subcategory': productItem.subcategory,
      'title': productItem.title,
    })),
  };
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) ctx.throw(400);

  const productAns = await Product.findById(ctx.params.id);

  if (!productAns) {
    ctx.throw(404, `no product with ${ctx.params.id} id`);
  }

  ctx.body = {
    product: {
      'category': productAns.category,
      'description': productAns.description,
      'id': productAns._id,
      'images': productAns.images,
      'price': productAns.price,
      'subcategory': productAns.subcategory,
      'title': productAns.title,
    },
  };
};


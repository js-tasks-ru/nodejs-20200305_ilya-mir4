const Categories = require('../models/Category');


function mapCategory(category) {
  return {
    id: category.id,
    title: category.title,
    subcategories: category.subcategories.map((subcategory) => ({
      id: subcategory.id,
      title: subcategory.title,
    })),
  };
};

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Categories.find({}).select('-__v');


  if (!categories) {
    ctx.body = [];
    return next();
  }

  ctx.body = {categories: categories.map((cat) => mapCategory(cat))};
};

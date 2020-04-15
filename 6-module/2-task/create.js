const Cet = require('./models/Product');

const categ = [{
  title: 'Product 2',

  description: 'AHAHHAHAH blyaa ahahahahahah!)))',

  price: 234324234,

  category: '5e95f32be81e45825015afbc',

  subcategory: '5e95f32be81e45825015afc0',

  images: ['/asdasd', '/mda.jpg'],
}];

async function main() {
  for (const cat of categ) {
    await Cet.create(cat);
  }
}

main();

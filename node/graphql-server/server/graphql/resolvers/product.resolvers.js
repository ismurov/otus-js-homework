const Category = require('../../models/category');
const Product = require('../../models/product');

module.exports = {
  Query: {
    getProduct: async (parent, { _id }, context, info) => {
      return await Product.findById(_id);
    },
    allProducts: async (parent, args, context, info) => {
      return await Product.find();
    }
  },
  Mutation: {
    createProduct: async (parent, { product }, context, info) => {
      return await Product.create(product);
    },
    updateProduct: async (parent, { _id, product }, context, info) => {
      return await Product.findOneAndUpdate({ _id }, product, { new: true });
    },
    deleteProduct: async (parent, { _id }, context, info) => {
      return await Product.findOneAndRemove({ _id });
    }
  },
  Product: {
    category: async product => await Category.findById(product.category)
  }
};

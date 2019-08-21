const Category = require('../../models/category');
const Product = require('../../models/product');

module.exports = {
  Query: {
    getCategory: async (parent, { _id }, context, info) => {
      return await Category.findById(_id);
    },
    allCategories: async (parent, args, context, info) => {
      return await Category.find();
    }
  },
  Mutation: {
    createCategory: async (parent, { category }, context, info) => {
      return await Category.create(category);
    },
    updateCategory: async (parent, { _id, category }, context, info) => {
      return await Category.findOneAndUpdate({ _id }, category, { new: true });
    },
    deleteCategory: async (parent, { _id }, context, info) => {
      return await Category.findOneAndRemove({ _id });
    }
  },
  Category: {
    products: async category => await Product.find({category: category._id})
  }
};

const User = require('../../models/user');

module.exports = {
  Query: {
    getUser: async (parent, { _id }, context, info) => {
      return await User.findById(_id);
    },
    allUsers: async (parent, args, context, info) => {
      return await User.find();
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      return await User.create(user);
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      return await User.findOneAndUpdate({ _id }, user, { new: true });
    },
    deleteUser: async (parent, { _id }, context, info) => {
      return await User.findOneAndRemove({ _id });
    }
  },
  User: {
    fullName: user => `${user.firstName} ${user.lastName}`
  }
};

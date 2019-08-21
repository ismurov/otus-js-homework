const Product = require('../../models/product');
const Order = require('../../models/order');
const OrderItem = require('../../models/orderItem');
const User = require('../../models/user');

module.exports = {
  Query: {
    getOrder: async (parent, { _id }, context, info) => {
      return await Order.findById(_id);
    },
    allOrders: async (parent, args, context, info) => {
      return await Order.find();
    }
  },
  Mutation: {
    // Order
    createOrder: async (parent, { order }, context, info) => {
      order.orderData = new Date();
      order.status = 'Processing';
      return await Order.create(order);
    },
    updateOrder: async (parent, { _id, order }, context, info) => {
      return await Order.findOneAndUpdate({ _id }, order, { new: true });
    },
    deleteOrder: async (parent, { _id }, context, info) => {
      return await Order.findOneAndRemove({ _id });
    },
    changeOrderStatus: async (parent, { _id, status }, context, info) => {
      return await Order.findOneAndUpdate({ _id }, { status }, { new: true });
    },

    // Order Item
    createOrderItem: async (parent, { item }, context, info) => {
      return await OrderItem.create(item);
    },
    updateOrderItem: async (parent, { _id, item }, context, info) => {
      return await OrderItem.findOneAndUpdate({ _id }, item, { new: true });
    },
    deleteOrderItem: async (parent, { _id }, context, info) => {
      return await OrderItem.findOneAndRemove({ _id });
    },
  },
  Order: {
    user: async order => await User.findById(order.user),
    items: async order => await OrderItem.find({order: order._id}),
    totalPrice: async order => {
      const items = await OrderItem.find({order: order._id});
      let total = 0

      for (let i=0; i < items.length; i++) {
        let product = await Product.findById(items[i].product);
        total += product.price * items[i].quantity;
      }
      return total
    }
  },
  OrderItem: {
    order: async item => await Order.findById(item.order),
    product: async item => await Product.findById(item.product)
  }
};

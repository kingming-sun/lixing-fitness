const mongoose = require('mongoose');

// 防止重复编译模型
const models = {};

// 产品模型
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameEn: String,
  description: {
    type: String,
    required: true
  },
  descriptionEn: String,
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number,
  image: String,
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'nutrition', 'recovery'],
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  features: [String],
  featuresEn: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  }
}, {
  timestamps: true
});

// 用户模型
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// 订单模型
const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: String,
  paymentId: String,
  customerInfo: {
    name: String,
    email: String,
    address: {
      line1: String,
      city: String,
      state: String,
      postal_code: String,
      country: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// 生成订单号
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'LX' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// 获取或创建模型
function getModel(name, schema) {
  if (models[name]) {
    return models[name];
  }
  
  if (mongoose.models[name]) {
    models[name] = mongoose.models[name];
  } else {
    models[name] = mongoose.model(name, schema);
  }
  
  return models[name];
}

module.exports = {
  Product: () => getModel('Product', ProductSchema),
  User: () => getModel('User', UserSchema),
  Order: () => getModel('Order', OrderSchema)
}; 
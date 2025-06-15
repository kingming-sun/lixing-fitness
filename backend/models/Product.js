const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品名称是必需的'],
    trim: true,
    maxlength: [100, '商品名称不能超过100个字符']
  },
  nameEn: {
    type: String,
    required: [true, '英文名称是必需的'],
    trim: true,
    maxlength: [100, '英文名称不能超过100个字符']
  },
  description: {
    type: String,
    required: [true, '商品描述是必需的'],
    maxlength: [2000, '描述不能超过2000个字符']
  },
  descriptionEn: {
    type: String,
    required: [true, '英文描述是必需的'],
    maxlength: [2000, '英文描述不能超过2000个字符']
  },
  price: {
    type: Number,
    required: [true, '价格是必需的'],
    min: [0, '价格不能为负数']
  },
  originalPrice: {
    type: Number,
    min: [0, '原价不能为负数']
  },
  category: {
    type: String,
    required: [true, '分类是必需的'],
    enum: ['strength', 'cardio', 'flexibility', 'nutrition', 'recovery']
  },
  level: {
    type: String,
    required: [true, '难度等级是必需的'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: String,
    required: [true, '课程时长是必需的']
  },
  frequency: {
    type: String,
    required: [true, '训练频率是必需的']
  },
  image: {
    type: String,
    required: [true, '商品图片是必需的']
  },
  images: [{
    type: String
  }],
  features: [{
    type: String,
    required: true
  }],
  featuresEn: [{
    type: String,
    required: true
  }],
  specifications: {
    equipment: [String],
    targetMuscles: [String],
    workoutType: String
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, '评分不能小于0'],
    max: [5, '评分不能大于5']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// 创建索引
productSchema.index({ name: 'text', nameEn: 'text', description: 'text', descriptionEn: 'text' });
productSchema.index({ category: 1, level: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema); 
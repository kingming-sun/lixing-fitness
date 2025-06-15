const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// @desc    获取所有商品
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 构建查询条件
    let query = { isActive: true };

    // 分类筛选
    if (req.query.category) {
      query.category = req.query.category;
    }

    // 难度筛选
    if (req.query.level) {
      query.level = req.query.level;
    }

    // 价格范围筛选
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // 搜索
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // 排序
    let sortBy = {};
    if (req.query.sort) {
      const sortField = req.query.sort;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      sortBy[sortField] = sortOrder;
    } else {
      sortBy = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .populate('createdBy', 'name email')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取商品列表失败',
      error: error.message
    });
  }
};

// @desc    获取单个商品
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取商品详情失败',
      error: error.message
    });
  }
};

// @desc    创建商品
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    // 添加创建者信息
    req.body.createdBy = req.user.id;

    // 处理上传的图片
    if (req.files) {
      if (req.files.image) {
        req.body.image = `/uploads/${req.files.image[0].filename}`;
      }
      if (req.files.images) {
        req.body.images = req.files.images.map(file => `/uploads/${file.filename}`);
      }
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: '商品创建成功',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '创建商品失败',
      error: error.message
    });
  }
};

// @desc    更新商品
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    // 处理新上传的图片
    if (req.files) {
      if (req.files.image) {
        // 删除旧图片
        if (product.image) {
          const oldImagePath = path.join(__dirname, '..', product.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        req.body.image = `/uploads/${req.files.image[0].filename}`;
      }
      if (req.files.images) {
        // 删除旧图片
        if (product.images && product.images.length > 0) {
          product.images.forEach(imagePath => {
            const oldImagePath = path.join(__dirname, '..', imagePath);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          });
        }
        req.body.images = req.files.images.map(file => `/uploads/${file.filename}`);
      }
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: '商品更新成功',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '更新商品失败',
      error: error.message
    });
  }
};

// @desc    删除商品
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    // 删除相关图片文件
    if (product.image) {
      const imagePath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach(imagePath => {
        const fullPath = path.join(__dirname, '..', imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: '商品删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '删除商品失败',
      error: error.message
    });
  }
};

// @desc    获取商品统计信息
// @route   GET /api/products/stats
// @access  Private/Admin
exports.getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalInactive = await Product.countDocuments({ isActive: false });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });

    const categoryStats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const levelStats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$level', count: { $sum: 1 } } }
    ]);

    const priceStats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalInactive,
        featuredProducts,
        categoryStats,
        levelStats,
        priceStats: priceStats[0] || { avgPrice: 0, minPrice: 0, maxPrice: 0 }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取统计信息失败',
      error: error.message
    });
  }
}; 
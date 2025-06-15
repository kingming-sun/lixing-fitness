const dbConnect = require('../_lib/dbConnect');
const { Product } = require('../_lib/models');

export default async function handler(req, res) {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await dbConnect();
    const ProductModel = Product();

    if (req.method === 'GET') {
      // 获取查询参数
      const {
        page = 1,
        limit = 10,
        category,
        level,
        minPrice,
        maxPrice,
        search,
        sort = '-createdAt'
      } = req.query;

      // 构建查询条件
      let query = { status: 'active' };

      if (category) {
        query.category = category;
      }

      if (level) {
        query.level = level;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { nameEn: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { descriptionEn: { $regex: search, $options: 'i' } }
        ];
      }

      // 计算分页
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // 执行查询
      const products = await ProductModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await ProductModel.countDocuments(query);

      res.status(200).json({
        success: true,
        data: products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } else {
      res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Products API error:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
} 
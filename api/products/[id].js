const dbConnect = require('../_lib/dbConnect');
const { Product } = require('../_lib/models');

export default async function handler(req, res) {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    await dbConnect();
    const ProductModel = Product();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Product detail API error:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
} 
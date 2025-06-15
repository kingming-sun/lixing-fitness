const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} = require('../controllers/productController');

const { protect, authorize } = require('../middleware/auth');
const { upload, handleMulterError } = require('../middleware/upload');

const router = express.Router();

// 公开路由
router.route('/')
  .get(getProducts)
  .post(
    protect,
    authorize('admin'),
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'images', maxCount: 5 }
    ]),
    handleMulterError,
    createProduct
  );

router.route('/stats')
  .get(protect, authorize('admin'), getProductStats);

router.route('/:id')
  .get(getProduct)
  .put(
    protect,
    authorize('admin'),
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'images', maxCount: 5 }
    ]),
    handleMulterError,
    updateProduct
  )
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router; 
const express = require('express');
const router = express.Router();

const {getAllProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/products')

router.route('/').get(getAllProducts);
router.route('/todos/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;

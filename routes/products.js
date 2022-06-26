const express = require('express');
const router = express.Router();

const {getAllProducts, getProduct, deleteProduct } = require('../controllers/products')

router.route('/').get(getAllProducts);
router.route('/todos/:id').get(getProduct).delete(deleteProduct);

module.exports = router;

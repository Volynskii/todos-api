const Product = require('../models/product');

const getAllProducts = async (req, res) => {

    const queryObject = {};
    const {priority,tags, sort } = req.query;

    if (priority) {
        queryObject.priority = priority.toLowerCase().split('-');
    }
    if (tags) {
        queryObject.tags = tags.toLowerCase().split('-');
    }

    let result = Product.find(queryObject);

    const allItems = await result;
    const totalPages = Math.ceil( allItems.length / req.query.limit);
    const totalLength = allItems.length;

    if (sort === 'new') {
        result = result.sort({'_id': -1})
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit).select('-description');

    const products = await result;
    res.status(200).json({ products, nbHits: totalLength, totalPages: totalPages })
};

const getProduct = async (req,res) => {

    try {
        const {id:productID} = req.params;
        const task = await Product.findOne({_id: productID})
        if(!task) {
            return res.status(404).json({msq: `No todo with id: ${productID}`})
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msq: error})
    }
};

const deleteProduct = async (req,res) => {
    try {
        const {id: productID} = req.params;
        const task = await Product.findOneAndDelete({_id: productID});

        if(!task) {
            return res.status(404).json({msq: `No todo with id: ${taskID}`})
        }
        res.status(200).json({task: null, status: 'success'})
    } catch (error) {
        res.status(500).json({msq: error})
    }
};

const updateProduct = async (req, res) => {
    try {
        const {id: productID} = req.params;

        const task = await Product.findByIdAndUpdate({_id: productID}, req.body, {
            new: true, runValidators: true
        });

        if (!task) {
            return res.status(404).json({msq: `No todo with id: ${productID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msq: error})
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct
};

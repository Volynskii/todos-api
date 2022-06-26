const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'product name must be provided'],
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum : ['low','normal','high'],
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Product',productSchema);

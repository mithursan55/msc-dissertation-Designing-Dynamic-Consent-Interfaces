import mongoose from 'mongoose';

const dataCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    risks: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    recipients: {
        type: String,
        required: true
    },
    templates: {
        level0: {
            type: String,
            required: true
        },
        level1: {
            type: String,
            required: true
        },
        level2: {
            type: String,
            required: true
        },
        level3: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

const DataCategory = mongoose.model('DataCategory', dataCategorySchema);

export default DataCategory;

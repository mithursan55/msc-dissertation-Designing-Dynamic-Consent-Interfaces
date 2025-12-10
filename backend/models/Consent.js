import mongoose from 'mongoose';

const consentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dataCategory: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 3,
        validate: {
            validator: function (v) {
                return [0, 1, 2, 3].includes(v);
            },
            message: 'Level must be 0, 1, 2, or 3'
        }
    }
}, {
    timestamps: true
});

// Compound index to ensure one consent per user per category
consentSchema.index({ userId: 1, dataCategory: 1 }, { unique: true });

const Consent = mongoose.model('Consent', consentSchema);

export default Consent;

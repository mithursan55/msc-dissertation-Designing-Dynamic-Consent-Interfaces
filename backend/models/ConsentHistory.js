import mongoose from 'mongoose';

const consentHistorySchema = new mongoose.Schema({
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
    previousLevel: {
        type: Number,
        default: null
    },
    newLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: false
});

consentHistorySchema.pre('remove', function (next) {
    next(new Error('Consent history records cannot be deleted'));
});

consentHistorySchema.pre('deleteOne', function (next) {
    next(new Error('Consent history records cannot be deleted'));
});

consentHistorySchema.pre('deleteMany', function (next) {
    next(new Error('Consent history records cannot be deleted'));
});

consentHistorySchema.index({ userId: 1, timestamp: -1 });

const ConsentHistory = mongoose.model('ConsentHistory', consentHistorySchema);

export default ConsentHistory;

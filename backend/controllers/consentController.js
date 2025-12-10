import Consent from '../models/Consent.js';
import ConsentHistory from '../models/ConsentHistory.js';
import DataCategory from '../models/DataCategory.js';
import { validationResult } from 'express-validator';

// @desc    Get user's consents
// @route   GET /api/consents/:userId
// @access  Private
export const getUserConsents = async (req, res) => {
    try {

        if (req.params.userId !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized access to consents' });
        }

        const categories = await DataCategory.find({});

        const userConsents = await Consent.find({ userId: req.user._id });
        const result = categories.map(cat => {
            const existing = userConsents.find(c => c.dataCategory === cat.name);
            return {
                dataCategory: cat.name,
                level: existing ? existing.level : 0,
                updatedAt: existing ? existing.updatedAt : null
            };
        });

        res.json(result);
    } catch (error) {
        console.error('Error fetching user consents:', error);
        res.status(500).json({ error: 'Server error fetching consents' });
    }
};

export const postUserConsent = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        if (req.params.userId !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized update of consents' });
        }

        const { dataCategory, newLevel } = req.body;

        // Validate category exists
        const categoryExists = await DataCategory.findOne({ name: dataCategory });
        if (!categoryExists) {
            console.log('Category not found:', dataCategory);
            return res.status(400).json({ error: `Data category '${dataCategory}' does not exist` });
        }

        let consent = await Consent.findOne({
            userId: req.user._id,
            dataCategory
        });

        const previousLevel = consent ? consent.level : 0;

        if (consent && consent.level === newLevel) {
            return res.json({
                dataCategory,
                previousLevel,
                newLevel,
                updatedAt: consent.updatedAt
            });
        }

        if (consent) {
            console.log('Updating existing consent');
            consent.level = newLevel;
            await consent.save();
        } else {
            console.log('Creating new consent');
            consent = await Consent.create({
                userId: req.user._id,
                dataCategory,
                level: newLevel
            });
        }
        console.log('Consent saved/updated successfully');

        await ConsentHistory.create({
            userId: req.user._id,
            dataCategory,
            previousLevel,
            newLevel,
            timestamp: new Date()
        });

        res.json({
            dataCategory,
            previousLevel,
            newLevel,
            updatedAt: consent.updatedAt
        });

    } catch (error) {
        console.error('Error updating consent:', error);
        res.status(500).json({ error: 'Server error updating consent', details: error.message });
    }
};

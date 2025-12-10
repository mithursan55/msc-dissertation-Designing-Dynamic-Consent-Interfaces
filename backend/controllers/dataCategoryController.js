import DataCategory from '../models/DataCategory.js';

export const getDataCategories = async (req, res) => {
    try {
        const categories = await DataCategory.find({}).select('-__v -createdAt -updatedAt');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching data categories:', error);
        res.status(500).json({ error: 'Server error fetching categories' });
    }
};

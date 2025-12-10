import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DataCategory from '../models/DataCategory.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const categories = [
    {
        name: 'Location',
        description: 'Data related to your physical location and movements.',
        purpose: 'To provide location-based services, navigation, and local recommendations.',
        risks: 'Continuous tracking could reveal your daily habits and home address.',
        benefits: 'Accurate navigation, local weather updates, and finding nearby friends.',
        recipients: 'Internal location service, Maps API partners.',
        templates: {
            level0: 'No location data is collected. Location-based features will be disabled.',
            level1: 'Approximate location is collected for broad content personalization.',
            level2: 'Precise location is collected while using the app for navigation and local search.',
            level3: 'Precise background location is collected to provide proactive alerts and timeline features.'
        }
    },
    {
        name: 'Contacts',
        description: 'Access to your phone contacts list.',
        purpose: 'To help you find friends and connect with people you know.',
        risks: 'Sharing contact details of others without their explicit consent.',
        benefits: 'Easily find friends, seamless sharing, and contact syncing.',
        recipients: 'Internal social graph service.',
        templates: {
            level0: 'No access to contacts. You must manually enter email addresses to find friends.',
            level1: 'Access to hashed contact identifiers to find mutual connections without storing details.',
            level2: 'Read-only access to contact names and numbers to suggest friends within the app.',
            level3: 'Full sync of contacts to keep your friend list up to date across devices.'
        }
    },
    {
        name: 'Analytics',
        description: 'Data about how you use the application.',
        purpose: 'To improve app performance, fix bugs, and understand user behavior.',
        risks: 'Detailed usage patterns could be used for profiling.',
        benefits: 'A more stable app, better features, and a personalized user experience.',
        recipients: 'Internal product team, Analytics platform.',
        templates: {
            level0: 'No usage data is collected. Crash reports are disabled.',
            level1: 'Basic crash reporting and performance metrics are collected anonymously.',
            level2: 'Anonymous usage statistics are collected to improve features.',
            level3: 'Full usage activity is logged to provide personalized content and feature recommendations.'
        }
    },
    {
        name: 'Photos',
        description: 'Access to your photo library.',
        purpose: 'To allow you to share photos and create albums.',
        risks: 'Private photos could be accessed if not properly secured.',
        benefits: 'Seamless photo sharing, cloud backup, and smart organization.',
        recipients: 'Internal media storage, Image processing service.',
        templates: {
            level0: 'No access to photos. You cannot upload or share images.',
            level1: 'Access to selected photos only when you explicitly choose to upload them.',
            level2: 'Read access to photo metadata to organize your memories.',
            level3: 'Full access to photo library for automatic backup and smart album creation.'
        }
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await DataCategory.deleteMany({});
        console.log('Cleared existing categories');

        await DataCategory.insertMany(categories);
        console.log('Seeded data categories successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();

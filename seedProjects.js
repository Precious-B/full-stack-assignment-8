
const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');

// Portfolio project information
const projects = [
    {
        title: 'Personal Website Concept',
        image: '/images/personal_website.png',
        description: 'A responsive personal website concept demonstrating clean layout, intuitive navigation, and modern web design.'
    },

    {
        title: 'Restaurant Website Concept',
        image: '/images/restaurant_website.png',
        description: 'A responsive restaurant website concept focused on attractive visual presentation, clear navigation, and an engaging user experience.'
    },

    {
        title: 'E-Commerce Website Concept',
        image: '/images/e_commerce_website.png',
        description: 'An e-commerce website concept demonstrating product presentation, intuitive navigation, and a simple user-friendly shopping experience.'
    },

    {
        title: 'Business Website Concept',
        image: '/images/business_website.png',
        description: 'A professional business website concept designed to demonstrate structured content, responsive design, and clear presentation of services.'
    }
];

// Save projects to MongoDB
async function seedProjects() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB connected successfully!');

        for (const project of projects) {
            await Project.findOneAndUpdate(
                { title: project.title },
                { $set: project },
                {
                    upsert: true,
                    returnDocument: 'after',
                    runValidators: true
                }
            );
        }

        console.log('Portfolio projects saved successfully!');

    } catch (error) {
        console.error('Error saving projects:', error);

    } finally {
        await mongoose.disconnect();
    }
}

seedProjects();

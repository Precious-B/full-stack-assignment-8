
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Contact = require('./models/Contact');
const Project = require('./models/Project');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Make the public folder accessible
app.use(express.static(path.join(__dirname, 'public')));

// Read form data
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');

        app.listen(process.env.PORT || 3001, () => {
            console.log(`Server running at http://localhost:${process.env.PORT || 3001}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Homepage
app.get('/', (req, res) => {
    res.render('index');
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact', {
        success: req.query.success
    });
});

// Receive and save contact form submissions
app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        });

        await newContact.save();

        res.redirect('/contact?success=1');

    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).send('Unable to send your message. Please try again.');
    }
});

// Portfolio page - retrieve projects from MongoDB
app.get('/portfolio', async (req, res) => {
    try {
        const projects = await Project.find();

        res.render('portfolio', {
            projects: projects
        });

    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).send('Unable to load portfolio projects.');
    }
});

// Services page
app.get('/services', (req, res) => {
    res.render('services');
});

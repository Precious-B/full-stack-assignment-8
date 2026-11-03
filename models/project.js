
const mongoose = require('mongoose');

// Define the project structure
const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

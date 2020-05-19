const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('taskSchema', new Schema({
    taskHeading: {
        type: String,
        required: true
    },
    taskDetail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['personal', 'work', 'shopping', 'others'],
        default: 'personal'
    },
    taskStatus: {
        type: String,
        enum: ['new', 'ongoing', 'completed'],
        default: 'new'
    },
    author: {
        type: Schema.ObjectId,
        require: true
    },
    dueDate: {
        type: Date
    }
}), 'tasks')
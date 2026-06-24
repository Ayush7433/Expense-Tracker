const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true,
        min: 0,
    },
    category : {
        type : String,
        required : true,
        enum : ['food','travel','entertainment','shopping', 'bills', 'other']
    },
    description : {
        type : String,
        maxlength : [200, 'Description can not exceed 200 characters'],
    },
    expenseDate : {
        type : Date,
        default : Date.now,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {
    timestamps : true
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
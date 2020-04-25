const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promoSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Currency,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

const Promos=mongoose.model('Promo',promoSchema);

module.exports = Promos;

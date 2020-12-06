import mongoose from 'mongoose';

const nkuba = new mongoose.Schema({
    foodName:{
        type: String,

    },
    foodType:{type: String},
    foodPrice:{type: String}
});

const nkubaData = mongoose.model('nkubaData',nkuba);
export default nkubaData;
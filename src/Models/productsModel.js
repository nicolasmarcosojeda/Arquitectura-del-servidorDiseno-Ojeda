import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' ,
  },
});

const productsModel = mongoose.model('Product', productSchema);

export default productsModel;

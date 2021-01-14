const mongoose = require('mongoose');
const slugify = require('slugify');


const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS'
        ]
      },
      phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      country: {
        type: String,
        required: [true, 'Please add a country']
      },
      typeofProducts: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          'Electronics',
          'Home and Garden',
          'Fashion',
          'Sports',
          'Toys',
          'Other'
        ]
      },
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
},{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

// Create store slug from name

StoreSchema.pre('save', function() {
  this.slug = slugify(this.name, {lower: true});
})

// Cascade delete Products when a Store is deleted
StoreSchema.pre('remove', async function (next) {
  await this.model('Product').deleteMany({ store: this._id});
  next();
})

// Reverse populate with virtuals
StoreSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'store',
  justOne: false
});


module.exports = mongoose.model('Store', StoreSchema);
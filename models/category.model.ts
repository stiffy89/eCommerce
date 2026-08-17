import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String
});

categorySchema.virtual('id').get(function(this: { _id: { toHexString(): string } }) {
    return this._id.toHexString()
})

categorySchema.set('toJSON', {
    virtuals: true
})

export const Category = mongoose.model('Category', categorySchema);
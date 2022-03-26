import mongoose from "mongoose";

const { Schema } = mongoose;

export const AccommodationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  host: { type: Schema.Types.ObjectId,  ref: 'User' }
});

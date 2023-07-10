import { Schema, model, models } from "mongoose";

const openingHoursSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  open: {
    type: String,
    default: '',
  },
  close: {
    type: String,
    default: '',
  },
});

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  amphure: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  types: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  opening_hours: {
    type: [openingHoursSchema],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

const Place = models.place || model('place', placeSchema);

export default Place;


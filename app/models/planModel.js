import { Schema, model, models } from "mongoose";

const placeListSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: 'place',
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  minUnit: {
    type: Number,
    required: true,
  }
})

const planSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  starts: {
    type: [String],
    required: true
  },
  lists: { 
    type: [[placeListSchema]],
    required: true,
  },
});

const Plan = models.plan || model('plan', planSchema);

export default Plan;


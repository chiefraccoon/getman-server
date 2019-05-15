import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number], // Longtitude goes first!
    required: true,
  },
});

const RideScheme = new mongoose.Schema({
  car: ObjectId,
  startPoint: {
    type: PointSchema,
    required: true,
  },
  endPoint: {
    type: PointSchema,
    required: false,
  },
  startedAt: Date,
  endedAt: Date,
});

export default mongoose.model('Ride', RideScheme);

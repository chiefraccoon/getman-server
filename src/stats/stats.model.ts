import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const StatsScheme = new mongoose.Schema({
  car: {
    type: ObjectId,
    unique: true,
  },
  count: Number,
  duration: Number,
  load: Number,
  load2: Number,
});

export default mongoose.model('Stats', StatsScheme);

import * as mongoose from 'mongoose';

const CarScheme = new mongoose.Schema({
  RegNumber: {
    type: String,
    alias: 'regNumber',
  },
  Brand: {
    type: String,
    alias: 'regNumber',
  },
  Model: {
    type: String,
    alias: 'model',
  },
  Color: {
    type: String,
    alias: 'color',
  },
  TransmissionType: {
    type: Number,
    alias: 'transmissionType',
  },
});

CarScheme.set('toObject', { getters: true });

export default mongoose.model('Car', CarScheme);
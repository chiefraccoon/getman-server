import * as mongoose from 'mongoose';

import './cars/car.model';

const DB_URI = 'mongodb+srv://getmancar:eSgSAMEYwfKDF27j@cluster0-ew61e.mongodb.net/getman-stats?retryWrites=true';
mongoose.connect(DB_URI, { useNewUrlParser: true } );

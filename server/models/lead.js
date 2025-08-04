import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  campaign: String,
  }, { collection: 'Leads' });


const Lead = mongoose.model('Lead', leadSchema);

export default Lead;

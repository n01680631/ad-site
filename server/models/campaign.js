import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  leadsGenerated: Number,
},  { collection: 'Campaigns'
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;

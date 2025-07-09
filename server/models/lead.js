import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    campaign: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

const Lead = mongoose.model('Lead', LeadSchema);
export default Lead;

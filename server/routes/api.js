import express from 'express';
import * as dataController from '../controllers/dataControllers.js';

const router = express.Router();

// Get Leads
router.get('/leads', dataController.getLeads);

// Get Campaigns
router.get('/campaigns', dataController.getCampaigns);

router.get('/generate-report', dataController.generateReport);

router.post('/send-alert', dataController.sendAlert);

export default router;

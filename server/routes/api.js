import express from 'express';
import * as dataController from '../controllers/dataControllers.js';

const router = express.Router();

// Get Leads
router.get('/leads', dataController.getLeads);

// Get Campaigns
router.get('/campaigns', dataController.getCampaigns);

// Add Dummy Data (For testing purposes)
router.post('/dummy-data', dataController.addDummyData);

// Data transformation (ETL)
router.get('/metrics', dataController.transformData);

router.get('/generate-report', dataController.generateReport);

router.post('/send-alert', dataController.sendAlert);

export default router;

// dataControllers.js

import Lead from '../models/lead.js';
import Campaign from '../models/campaign.js';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

// Controller to fetch all leads from the database
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error });
  }
};
// Controller to fetch all campaigns from the database
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};
// Generates CSV or PDF report of all leads
export const generateReport = async (req, res) => {
  try {
    const { format, from, to } = req.query;

    const leads = await Lead.find();
// If format is CSV, use json2csv to convert and download
    if (format === 'csv') {
      const fields = ['name', 'email', 'campaign'];
      const parser = new Parser({ fields });
      const csv = parser.parse(leads);
      // Set response headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
      return res.send(csv);

    } else if (format === 'pdf') {
      const doc = new PDFDocument();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

      doc.pipe(res);
      
      // Add report title
      doc.fontSize(18).text('Leads Report', { underline: true });
      doc.moveDown();

      leads.forEach((lead, index) => {
        doc.fontSize(12).text(
          `${index + 1}. Name: ${lead.name}, Email: ${lead.email}, Campaign: ${lead.campaign}`
        );
      });

      doc.end();

    } else {
      return res.status(400).json({ message: 'Invalid format' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendAlert = async (req, res) => {
  try {
    // Placeholder for alert sending logic
    res.json({ message: 'Alert sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

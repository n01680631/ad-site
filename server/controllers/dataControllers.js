import Lead from '../models/lead.js';
import Campaign from '../models/campaign.js';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

// Fetch dummy leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Fetch dummy campaigns
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Simulate adding multiple leads and campaigns (For testing)
export const addDummyData = async (req, res) => {
  try {
    const leads = [
      { name: 'John', email: 'john@example.com', campaign: 'Campaign A' },
      { name: 'Jane', email: 'jane@example.com', campaign: 'Campaign B' },
      { name: 'Mike', email: 'mike@example.com', campaign: 'Campaign A' },
    ];

    const campaigns = [
      { name: 'Campaign A', budget: 1000, leadsGenerated: 10 },
      { name: 'Campaign B', budget: 2000, leadsGenerated: 20 },
      { name: 'Campaign C', budget: 1500, leadsGenerated: 15 },
    ];

    await Lead.insertMany(leads);
    await Campaign.insertMany(campaigns);

    res.json({ message: 'Multiple leads and campaigns added' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const transformData = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    const totalBudget = campaigns.reduce((acc, campaign) => acc + campaign.budget, 0);
    const totalLeads = campaigns.reduce((acc, campaign) => acc + campaign.leadsGenerated, 0);

    const metrics = {
      totalBudget,
      totalLeads,
      averageLeadsPerCampaign: totalLeads / campaigns.length
    };

    res.json(metrics);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Generate report in CSV or PDF format
export const generateReport = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    const format = req.query.format || 'csv';

    if (format === 'csv') {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(campaigns);

      res.header('Content-Type', 'text/csv');
      res.attachment('campaign-report.csv');
      return res.send(csv);

    } else if (format === 'pdf') {
      const doc = new PDFDocument();

      res.header('Content-Type', 'application/pdf');
      res.attachment('campaign-report.pdf');

      doc.pipe(res);

      doc.fontSize(20).text('Campaign Report', { align: 'center' });

      campaigns.forEach(campaign => {
        doc.fontSize(12).text(`Name: ${campaign.name}`);
        doc.text(`Budget: ${campaign.budget}`);
        doc.text(`Leads Generated: ${campaign.leadsGenerated}`);
        doc.moveDown();
      });

      doc.end();
    } else {
      res.status(400).json({ error: 'Unsupported report format' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error while generating report' });
  }
};

export const sendAlert = async (req, res) => {
  const threshold = req.body.threshold || 100;
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const totalLeads = await Lead.countDocuments();

  if (totalLeads < threshold) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Lead Alert Email',
      text: `The total number of leads is below the threshold: ${totalLeads}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.json({ message: 'Alert sent' });
    });
  } else {
    res.json({ message: 'No alert necessary' });
  }
};

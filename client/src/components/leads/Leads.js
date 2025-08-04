import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './leads.css';

Modal.setAppElement('#root'); // For accessibility

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, campaignsRes] = await Promise.all([ // Fetch leads and campaigns concurrently
          axios.get('/api/leads'),
          axios.get('/api/campaigns'),
        ]);
        // Update states with fetched data
        setLeads(leadsRes.data);
        setCampaigns(campaignsRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
// Opens modal and sets selected lead data when a table row is clicked
  const openModal = (lead) => setSelectedLead(lead);
  const closeModal = () => setSelectedLead(null); // Closes modal by clearing selected lead
//function to find campaign details by campaign name
  const getCampaignDetails = (campaignName) => {
    const campaign = campaigns.find(c => c.name === campaignName);
    return campaign ? campaign : { name: 'N/A', budget: 'N/A', leadsGenerated: 'N/A' };
  };
// Show loading message while fetching data
  if (loading) return <p>Loading leads and campaigns...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="leads">
      <h1>LEADS AND CAMPAIGNS</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Campaign</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id} onClick={() => openModal(lead)}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.campaign}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={!!selectedLead} onRequestClose={closeModal}>
        {selectedLead && (
          <div>
            <h2>{selectedLead.name}</h2>
            <p>Email: {selectedLead.email}</p>
            <p>Campaign: {getCampaignDetails(selectedLead.campaign).name}</p>
            <p>Budget: {getCampaignDetails(selectedLead.campaign).budget}</p>
            <p>Leads Generated: {getCampaignDetails(selectedLead.campaign).leadsGenerated}</p>
          </div>
        )}
        <button onClick={closeModal} className="leadBtn">Close</button>
      </Modal>
    </div>
  );
};

export default Leads;

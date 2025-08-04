import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reports.css';

const Reports = () => {
  // State for date filters
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Loading state during report generation/download
  const [loading, setLoading] = useState(false);
  
  // Summary data showing total leads and campaigns (dummy data currently)
  const [summary, setSummary] = useState(null);
  
  // Keeps track of report download history to show past downloads
  const [downloadHistory, setDownloadHistory] = useState([]);

  // Effect to simulate fetching summary data when date filters change
  useEffect(() => {
    setSummary(null); // Clear previous summary
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Dummy summary data - replace with real API call if available
      setSummary({
        totalLeads: 1200,
        totalCampaigns: 1100,
      });
    }, 500);

    // Cleanup timer on unmount or date change
    return () => clearTimeout(timer);
  }, [fromDate, toDate]);

  // Function to download report (CSV or PDF) based on selected date range
  const downloadReport = async (type) => {
    setLoading(true); // Start loading

    try {
      // Build request URL with optional date filters
      let url = `/api/generate-report?format=${type}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;

      // Request report as binary blob
      const res = await axios.get(url, { responseType: 'blob' });

      // Create blob URL for the file
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));

      // Create a temporary anchor element for download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `report.${type}`);
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link); // Clean up

      // Save download info to history state
      setDownloadHistory(prev => [
        { id: Date.now(), format: type, date: new Date().toLocaleString() },
        ...prev,
      ]);
    } catch (err) {
      console.error('Error downloading report:', err);
      alert('Failed to download report. Try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="reports">
      <h1>Reports</h1>

      {/* Date filter inputs */}
      <div className="filters">
        <label>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
        </label>

        <label>
          To:
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </label>
      </div>

      {/* Buttons to trigger CSV or PDF download */}
      <div className="reportsBtn">
        <button onClick={() => downloadReport('csv')} disabled={loading}>
          {loading ? 'Downloading...' : 'Download CSV'}
        </button>
        <button onClick={() => downloadReport('pdf')} disabled={loading}>
          {loading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      {/* Display summary data if available */}
      {summary && (
        <div className="summary">
          <p><strong>Total Leads:</strong> {summary.totalLeads}</p>
          <p><strong>Total Campaigns:</strong> {summary.totalCampaigns}</p>
        </div>
      )}

      {/* List past downloaded reports */}
      <div className="downloadHistory">
        <h3>Download History</h3>
        {downloadHistory.length === 0 && <p>No reports downloaded yet.</p>}
        <ul>
          {downloadHistory.map(item => (
            <li key={item.id}>
              {item.format.toUpperCase()} report downloaded on {item.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;

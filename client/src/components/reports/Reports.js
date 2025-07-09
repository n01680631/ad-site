import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reports.css';

const Reports = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [downloadHistory, setDownloadHistory] = useState([]);

  // Fetch dummy summary preview (simulate API)
  useEffect(() => {
    // Here you would fetch real summary data from your backend based on dates
    // For now, just simulate with static data and delay
    setSummary(null);
    const timer = setTimeout(() => {
      setSummary({
        totalLeads: 1200,
        totalCampaigns: 15,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [fromDate, toDate]);

  const downloadReport = async (type) => {
    setLoading(true);
    try {
      let url = `/api/generate-report?format=${type}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;

      const res = await axios.get(url, { responseType: 'blob' });
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `report.${type}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Add to download history
      setDownloadHistory(prev => [
        { id: Date.now(), format: type, date: new Date().toLocaleString() },
        ...prev,
      ]);
    } catch (err) {
      console.error('Error downloading report:', err);
      alert('Failed to download report. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reports">
      <h1>Reports</h1>

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

      <div className="reportsBtn">
        <button onClick={() => downloadReport('csv')} disabled={loading}>
          {loading ? 'Downloading...' : 'Download CSV'}
        </button>
        <button onClick={() => downloadReport('pdf')} disabled={loading}>
          {loading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      {summary && (
        <div className="summary">
          <p><strong>Total Leads:</strong> {summary.totalLeads}</p>
          <p><strong>Total Campaigns:</strong> {summary.totalCampaigns}</p>
        </div>
      )}

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

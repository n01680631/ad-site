import React, { useState, useRef } from 'react';
import './createAdd.css'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Add = () => {
  // State variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(22);
  const [fontStyle, setFontStyle] = useState('Arial');
  const [align, setAlign] = useState('center');

  // Ref for the preview to export as PDF
  const previewRef = useRef();

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Download preview as PDF
  const handleDownload = async () => {
    const element = previewRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('advertisement.pdf');
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ad created! (this is a demo)');
  };

  return (
    <div className="add-ad">
      <h1>Create Advertisement</h1>

      {/* Ad Form */}
      <form className="add-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your ad title"
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter your ad description"
            required
          />
        </label>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <label>
          Background Color:
          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        </label>

        <label>
          Font Size:
          <input
            type="range"
            min="14"
            max="40"
            value={fontSize}
            onChange={e => setFontSize(e.target.value)}
          />
        </label>

        <label>
          Font Style:
          <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </label>

        <label>
          Text Alignment:
          <select value={align} onChange={(e) => setAlign(e.target.value)}>
            <option value="center">Center</option>
            <option value="left">Left</option>
          </select>
        </label>

        <button type="submit">Create Ad</button>
      </form>

      {/* Live Preview */}
      <div className="ad-preview" ref={previewRef}>
        <h2>Live Preview</h2>
        <div
          className="preview-card"
          style={{
            backgroundColor: bgColor,
            fontFamily: fontStyle,
            textAlign: align,
          }}
        >
          {preview && <img src={preview} alt="Ad preview" />}
          <h3 style={{ fontSize: `${fontSize}px` }}>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="download-btn-container" >
      <button onClick={handleDownload} className="download-btn">
        Download Ad as PDF
      </button>
    </div>
    </div>
  );
};

export default Add;

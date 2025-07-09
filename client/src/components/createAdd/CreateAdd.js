import React, { useState } from 'react';
import './createAdd.css'; // Import custom styles

const Add = () => {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(22);
  const [fontStyle, setFontStyle] = useState('Arial');
  const [align, setAlign] = useState('center');

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Form submission handler (currently demo only)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ad created! (this is a demo)');
  };

  return (
    <div className="add-ad">
      <h1>Create Advertisement</h1>

      {/* Ad Form */}
      <form className="add-form" onSubmit={handleSubmit}>
        {/* Title Input */}
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

        {/* Description Textarea */}
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter your ad description"
            required
          />
        </label>

        {/* Image Upload */}
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {/* Background Color Picker */}
        <label>
          Background Color:
          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        </label>

        {/* Font Size Range Slider */}
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

        {/* Font Style Dropdown */}
        <label>
          Font Style:
          <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </label>

        {/* Text Alignment Dropdown */}
        <label>
          Text Alignment:
          <select value={align} onChange={(e) => setAlign(e.target.value)}>
            <option value="center">Center</option>
            <option value="left">Left</option>
          </select>
        </label>

        {/* Submit Button */}
        <button type="submit">Create Ad</button>
      </form>

      {/* Live Preview of the Ad */}
      <div className="ad-preview">
        <h2>Live Preview</h2>
        <div
          className="preview-card"
          style={{
            backgroundColor: bgColor,
            fontFamily: fontStyle,
            textAlign: align,
          }}
        >
          {/* Image Preview */}
          {preview && <img src={preview} alt="Ad preview" />}
          {/* Title with dynamic font size */}
          <h3 style={{ fontSize: `${fontSize}px` }}>{title}</h3>
          {/* Description */}
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Add;

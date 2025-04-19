import React from 'react';

const Textarea = ({ label, ...props }) => (
  <div className="input-group">
    {label && <label>{label}</label>}
    <textarea {...props}></textarea>
  </div>
);

export default Textarea;

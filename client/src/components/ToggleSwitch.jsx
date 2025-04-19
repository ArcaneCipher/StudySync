const ToggleSwitch = ({ isPublic, onChange }) => {
  return (
    <div className="visibility-toggle" onClick={() => onChange(!isPublic)}>
      <span className="label">Private</span>
      <div className={`toggle ${isPublic ? "public" : "private"}`}>
        <div className="handle" />
      </div>
      <span className="label">Public</span>
    </div>
  );
};

export default ToggleSwitch;

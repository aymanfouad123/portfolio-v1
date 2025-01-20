function RequestBar({ method, onSend }) {
  return (
    <div>
      <span>{method}</span>
      <span>http://api.aymanfouad.com/portfolio</span>
      <button onClick={onSend}>Send</button>
    </div>
  );
}

export default RequestBar;

function RequestBar({ method, onSend }) {
  return (
    <div className="flex items-center gap-2 bg-[#151212] p-2 rounded-md font-sans">
      <span className="text-gray-300">{method}</span>
      <span className="flex-1 text-gray-400 font-mono text-sm">
        http://api.portfolio.dev/data
      </span>
      <button
        onClick={onSend}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-md 
                     text-sm font-medium transition-colors"
      >
        Send
      </button>
    </div>
  );
}

export default RequestBar;

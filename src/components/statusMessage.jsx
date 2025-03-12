function StatusMessage({ viewMode, isLoading, showStatus }) {
  // Generate the appropriate message based on current state
  const getMessage = () => {
    if (isLoading) {
      return viewMode === "POST" ? "Posting data..." : "Fetching data...";
    }
    return viewMode === "POST"
      ? "POST Status: 200 Created"
      : "GET Status: 200 OK";
  };

  return (
    <div className="font-mono text-sm whitespace-nowrap">
      <div
        className={`transition-colors duration-200 ${
          isLoading ? "text-gray-400" : "text-emerald-400"
        }`}
      >
        {getMessage()}
      </div>
    </div>
  );
}

export default StatusMessage;

function StatusMessage({ viewMode, isLoading, showStatus }) {
  // Always show some form of status, don't return null

  return (
    <div className="space-y-1 font-mono text-sm text-right">
      {/* Loading state has priority */}
      {isLoading && (
        <div className="text-gray-400">
          {viewMode === "POST" ? "Posting data..." : "Fetching data..."}
        </div>
      )}

      {/* Show success status when not loading */}
      {!isLoading && (
        <div className="text-emerald-400">
          {viewMode === "POST"
            ? "POST Status: 200 Created"
            : "GET Status: 200 OK"}
        </div>
      )}
    </div>
  );
}

export default StatusMessage;

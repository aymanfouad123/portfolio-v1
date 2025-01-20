function StatusMessage({ viewMode, isLoading, showStatus }) {
  if (!isLoading && !showStatus) return null;

  return (
    <div className="space-y-1 font-mono text-sm">
      {!isLoading && showStatus && (
        <div className="text-emerald-400">Status: 200 OK</div>
      )}

      {isLoading && (
        <div className="text-gray-400">
          {viewMode === "POST" ? "Raw JSON fetched..." : "Parsing data..."}
        </div>
      )}
    </div>
  );
}

export default StatusMessage;

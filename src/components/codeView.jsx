function CodeView({ data }) {
  const formatValue = (key, value) => {
    if (typeof value === "object" && value !== null) {
      return <span className="text-white">{JSON.stringify(value)}</span>;
    }
    return <span className="text-code-string">"{value}"</span>;
  };

  const renderJSON = (obj, indent = 0) => {
    return (
      <div style={{ marginLeft: `${indent * 20}px` }}>
        <span className="text-code-yellow">{"{"}</span>
        <div>
          {Object.entries(obj).map(([key, value], index) => (
            <div key={key}>
              <span className="text-code-blue">"{key}"</span>
              <span className="text-white">: </span>
              {typeof value === "object" && value !== null
                ? renderJSON(value, indent + 1)
                : formatValue(key, value)}
              {index < Object.entries(obj).length - 1 && <span>,</span>}
            </div>
          ))}
        </div>
        <span className="text-code-yellow">{"}"}</span>
      </div>
    );
  };

  return (
    <div className="bg-[#2D2D2D] rounded-md p-6 font-mono text-sm">
      <pre className="whitespace-pre-wrap break-words">{renderJSON(data)}</pre>
    </div>
  );
}

export default CodeView;

function CardView({ portfolioData }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[#232323] p-4 rounded-lg">
        <h2
          className="text-code-blue text-xl mb-2 font-mono"
          style={{ fontSize: "20px" }}
        >
          about
        </h2>
        <p className="text-gray-300 font-sans" style={{ fontSize: "16px" }}>
          {portfolioData.aboutme}
        </p>
      </div>

      <div className="bg-[#232323] p-4 rounded-lg">
        <h2
          className="text-code-blue text-xl mb-2 font-mono"
          style={{ fontSize: "20px" }}
        >
          work
        </h2>
        <p className="text-gray-300 font-sans" style={{ fontSize: "16px" }}>
          {portfolioData.work}
        </p>
      </div>

      <div className="bg-[#232323] p-4 rounded-lg">
        <h2
          className="text-code-blue text-xl mb-2 font-mono"
          style={{ fontSize: "20px" }}
        >
          contact
        </h2>
        <p className="text-gray-300 font-sans" style={{ fontSize: "16px" }}>
          {portfolioData.contact}
        </p>
      </div>

      <div className="bg-[#232323] p-4 rounded-lg">
        <h2
          className="text-code-blue text-xl mb-2 font-mono"
          style={{ fontSize: "20px" }}
        >
          socials
        </h2>
        <div className="space-y-2">
          {Object.entries(portfolioData.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              className="block text-blue-400 hover:text-blue-300 transition-colors font-sans"
              style={{ fontSize: "16px" }}
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardView;

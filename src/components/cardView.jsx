function CardView({ portfolioData }) {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="bg-[#232323] p-4 rounded-lg flex flex-col">
        <h2
          className="text-code-blue mb-3 font-mono"
          style={{ fontSize: "18px" }}
        >
          about
        </h2>
        <p
          className="text-gray-300 font-sans flex-1"
          style={{ fontSize: "15px" }}
        >
          {portfolioData.aboutme}
        </p>
      </div>

      <div className="bg-[#232323] p-4 rounded-lg flex flex-col">
        <h2
          className="text-code-blue mb-3 font-mono"
          style={{ fontSize: "18px" }}
        >
          work
        </h2>
        <p
          className="text-gray-300 font-sans flex-1"
          style={{ fontSize: "15px" }}
        >
          {portfolioData.work}
        </p>
      </div>

      <div className="bg-[#232323] p-4 rounded-lg flex flex-col">
        <h2
          className="text-code-blue mb-3 font-mono"
          style={{ fontSize: "18px" }}
        >
          contact
        </h2>
        <p
          className="text-gray-300 font-sans flex-1"
          style={{ fontSize: "15px" }}
        >
          {portfolioData.contact}
        </p>
      </div>

      <div className="bg-[#232323] p-4 rounded-lg flex flex-col">
        <h2
          className="text-code-blue mb-3 font-mono"
          style={{ fontSize: "18px" }}
        >
          socials
        </h2>
        <div className="space-y-2 flex-1">
          {Object.entries(portfolioData.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              className="block text-blue-400 hover:text-blue-300 transition-colors font-sans"
              style={{ fontSize: "15px" }}
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

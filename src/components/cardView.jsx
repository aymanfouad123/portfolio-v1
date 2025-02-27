function CardView({ portfolioData }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#2D2D2D] p-6 rounded-lg">
        <h2 className="text-code-blue text-xl mb-3 font-mono">about</h2>
        <p className="text-gray-300 font-sans">{portfolioData.aboutme}</p>
      </div>

      <div className="bg-[#2D2D2D] p-6 rounded-lg">
        <h2 className="text-code-blue text-xl mb-3 font-mono">work</h2>
        <p className="text-gray-300 font-sans">{portfolioData.work}</p>
      </div>

      <div className="bg-[#2D2D2D] p-6 rounded-lg">
        <h2 className="text-code-blue text-xl mb-3 font-mono">contact</h2>
        <p className="text-gray-300 font-sans">{portfolioData.contact}</p>
      </div>

      <div className="bg-[#2D2D2D] p-6 rounded-lg">
        <h2 className="text-code-blue text-xl mb-3 font-mono">socials</h2>
        <div className="space-y-2">
          {Object.entries(portfolioData.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              className="block text-blue-400 hover:text-blue-300 transition-colors font-sans"
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

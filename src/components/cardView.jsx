function CardView({ portfolioData }) {
    return (
        <div>
            <div>
                <div>
                    <h2>about me</h2>
                    <p>{portfolioData.aboutme}</p>
                </div>
                <div>
                    <h2>education</h2>
                    <p>{portfolioData.education}</p>
                </div>
                <div>
                    <h2>work</h2>
                    <p>{portfolioData.work}</p>
                </div>
                <div>
                    <h2>socials</h2>
                    {Object.entries(portfolioData.socials).map(([platform, url]) => (
                        <a key={platform} href={url}>{platform}</a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardView
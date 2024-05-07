export const MobileNotSupported: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen z-10 bg-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Only Desktop Supported Currently</h2>
                <p className="text-lg">Mobile devices coming soon...</p>
            </div>
            <div className="mt-8">
                <a href="https://git.new/ai-devices" target="_blank" rel="noreferrer">
                    <img
                        src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
                        alt="GitHub"
                    />
                </a>
            </div>
        </div>
    );
};

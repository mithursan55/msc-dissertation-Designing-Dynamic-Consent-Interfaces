const ConsequencePreview = ({ template, level }) => {
    const getLevelColor = (l) => {
        switch (l) {
            case 0: return 'text-gray-400';
            case 1: return 'text-red-400';
            case 2: return 'text-yellow-400';
            case 3: return 'text-green-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
                What happens if you change this?
            </h4>
            <p className={`text-sm transition-colors duration-300 ${getLevelColor(level)}`}>
                {template || 'Select a level to see consequences.'}
            </p>
        </div>
    );
};

export default ConsequencePreview;

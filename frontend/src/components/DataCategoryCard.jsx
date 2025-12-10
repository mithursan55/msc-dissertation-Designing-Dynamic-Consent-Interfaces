import { useState } from 'react';
import GranularSlider from './GranularSlider';
import ConsequencePreview from './ConsequencePreview';

const DataCategoryCard = ({ category, level, onChangeLevel, onShowInfo }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Get template for current level
    const getTemplate = (lvl) => {
        return category.templates[`level${lvl}`];
    };

    const getStatusColor = (lvl) => {
        switch (lvl) {
            case 0: return 'bg-gray-600';
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-green-500';
            default: return 'bg-gray-600';
        }
    };

    const getStatusText = (lvl) => {
        switch (lvl) {
            case 0: return 'Denied';
            case 1: return 'Basic';
            case 2: return 'Standard';
            case 3: return 'Full Access';
            default: return 'Unknown';
        }
    };

    return (
        <div
            className="card transition-all duration-300 hover:border-gray-600"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(level)}`} />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                            {/* info */}
                            <button
                                onClick={() => onShowInfo(category)}
                                className="text-gray-500 hover:text-blue-400 transition-colors"
                                title="More info"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${level === 0 ? 'text-gray-500 bg-gray-100 border-gray-200' : 'text-gray-700 bg-white border-gray-300'
                    }`}>
                    {getStatusText(level)}
                </span>
            </div>

            <GranularSlider
                value={level}
                onChange={onChangeLevel}
            />

            <ConsequencePreview
                template={getTemplate(level)}
            />

        </div>
    );
};

export default DataCategoryCard;

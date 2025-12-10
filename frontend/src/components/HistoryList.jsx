const HistoryList = ({ historyItems }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getLevelLabel = (lvl) => {
        switch (lvl) {
            case 0: return 'None';
            case 1: return 'Basic';
            case 2: return 'Standard';
            case 3: return 'Full';
            default: return '-';
        }
    };

    const getLevelColor = (lvl) => {
        switch (lvl) {
            case 0: return 'text-gray-500';
            case 1: return 'text-red-600';
            case 2: return 'text-yellow-600';
            case 3: return 'text-green-600';
            default: return 'text-gray-500';
        }
    };

    if (!historyItems || historyItems.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-500">No history records found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {historyItems.map((item) => (
                <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-medium">{item.dataCategory}</h4>
                                <p className="text-gray-500 text-sm">{formatDate(item.timestamp)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <span className={`font-medium ${getLevelColor(item.previousLevel)}`}>
                                {getLevelLabel(item.previousLevel)}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <span className={`font-medium ${getLevelColor(item.newLevel)}`}>
                                {getLevelLabel(item.newLevel)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryList;

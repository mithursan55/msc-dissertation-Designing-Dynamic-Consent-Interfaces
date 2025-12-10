const InfoModal = ({ category, onClose }) => {
    if (!category) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white border border-gray-200 rounded-xl max-w-lg w-full p-6 shadow-2xl animate-fade-in">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{category.name}</h2>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Purpose</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{category.purpose}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">Benefits</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{category.benefits}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">Risks</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{category.risks}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2">Recipients</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{category.recipients}</p>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="btn-secondary"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;

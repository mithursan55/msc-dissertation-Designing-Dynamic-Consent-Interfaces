import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserHistory, exportUserHistory } from '../services/api';
import HistoryList from '../components/HistoryList';

const History = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchHistory();
        }
    }, [user]);

    const fetchHistory = async () => {
        try {
            const response = await getUserHistory(user.id);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async (format) => {
        try {
            const response = await exportUserHistory(user.id, { format });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `consent_history.${format === 'csv' ? 'csv' : 'json'}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting history:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Consent History</h1>
                        <p className="text-gray-600">View your complete data sharing timeline</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleExport('json')}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export JSON
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn-primary"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>

                <HistoryList historyItems={history} />
            </div>
        </div>
    );
};

export default History;

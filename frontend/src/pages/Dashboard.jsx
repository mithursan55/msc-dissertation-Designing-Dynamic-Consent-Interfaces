import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDataCategories, getUserConsents, postUserConsent } from '../services/api';
import Header from '../components/Header';
import DataCategoryCard from '../components/DataCategoryCard';
import InfoModal from '../components/InfoModal';

const Dashboard = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [consents, setConsents] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [undoState, setUndoState] = useState(null);

    const debounceTimers = useRef({});
    const pendingUpdates = useRef({});

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const [catsResponse, consentsResponse] = await Promise.all([
                getDataCategories(),
                getUserConsents(user.id)
            ]);

            setCategories(catsResponse.data);

            const consentMap = {};
            catsResponse.data.forEach(cat => {
                const existing = consentsResponse.data.find(c => c.dataCategory === cat.name);
                consentMap[cat.name] = existing ? existing.level : 0;
            });
            setConsents(consentMap);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLevelChange = (categoryName, newLevel) => {

        const previousLevel = consents[categoryName];


        setConsents(prev => ({
            ...prev,
            [categoryName]: newLevel
        }));


        if (debounceTimers.current[categoryName]) {
            clearTimeout(debounceTimers.current[categoryName]);
        }


        debounceTimers.current[categoryName] = setTimeout(async () => {
            try {
                await postUserConsent(user.id, categoryName, newLevel);

                // Show Undo Toast
                setUndoState({
                    categoryName,
                    previousLevel,
                    newLevel,
                    timestamp: Date.now()
                });

                setTimeout(() => {
                    setUndoState(prev => (prev && prev.timestamp === undoState?.timestamp ? null : prev));
                }, 5000);

            } catch (error) {
                console.error('Error saving consent:', error);

                setConsents(prev => ({
                    ...prev,
                    [categoryName]: previousLevel
                }));
            }
        }, 700);
    };

    const handleUndo = async () => {
        if (!undoState) return;

        const { categoryName, previousLevel } = undoState;

        setConsents(prev => ({
            ...prev,
            [categoryName]: previousLevel
        }));

        setUndoState(null);

        try {
            await postUserConsent(user.id, categoryName, previousLevel);
        } catch (error) {
            console.error('Error undoing consent:', error);
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
        <div className="min-h-screen p-6 pb-24">
            <div className="max-w-4xl mx-auto">
                <Header />

                <div className="grid gap-6">
                    {categories.map(category => (
                        <DataCategoryCard
                            key={category._id}
                            category={category}
                            level={consents[category.name] ?? 0}
                            onChangeLevel={(newLevel) => handleLevelChange(category.name, newLevel)}
                            onShowInfo={setSelectedCategory}
                        />
                    ))}
                </div>

                {
                    selectedCategory && (
                        <InfoModal
                            category={selectedCategory}
                            onClose={() => setSelectedCategory(null)}
                        />
                    )
                }

                {/* Undo Toast */}
                {undoState && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-slide-up z-40">
                        <span>
                            Changed <strong>{undoState.categoryName}</strong> to Level {undoState.newLevel}
                        </span>
                        <button
                            onClick={handleUndo}
                            className="text-blue-600 hover:text-blue-700 font-bold px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                            UNDO
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Consent Dashboard</h1>
                <p className="text-gray-600">
                    Signed in as <span className="text-blue-600">{user?.email}</span>
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => navigate('/history')}
                    className="btn-secondary"
                >
                    View History
                </button>
                <button
                    onClick={handleLogout}
                    className="btn-secondary"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;

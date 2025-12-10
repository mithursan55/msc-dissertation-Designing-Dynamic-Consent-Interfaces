import ConsentHistory from '../models/ConsentHistory.js';

export const getUserHistory = async (req, res) => {
    try {
        if (req.params.userId !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized access to history' });
        }

        const limit = parseInt(req.query.limit) || 50;

        const history = await ConsentHistory.find({ userId: req.user._id })
            .sort({ timestamp: -1 })
            .limit(limit);

        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Server error fetching history' });
    }
};

export const exportUserHistory = async (req, res) => {
    try {
        if (req.params.userId !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized access to export' });
        }

        const history = await ConsentHistory.find({ userId: req.user._id })
            .sort({ timestamp: -1 });

        const format = req.query.format || 'json';

        if (format === 'csv') {
            const fields = ['timestamp', 'dataCategory', 'previousLevel', 'newLevel'];
            const csv = [
                fields.join(','),
                ...history.map(h => {
                    return [
                        h.timestamp.toISOString(),
                        h.dataCategory,
                        h.previousLevel,
                        h.newLevel
                    ].join(',');
                })
            ].join('\n');

            res.header('Content-Type', 'text/csv');
            res.attachment(`consent_history_${req.user._id}.csv`);
            return res.send(csv);
        }

        res.header('Content-Type', 'application/json');
        res.attachment(`consent_history_${req.user._id}.json`);
        res.send(JSON.stringify(history, null, 2));

    } catch (error) {
        console.error('Error exporting history:', error);
        res.status(500).json({ error: 'Server error exporting history' });
    }
};

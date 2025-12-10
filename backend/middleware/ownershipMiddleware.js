const ownershipMiddleware = (req, res, next) => {
    try {
        const requestedUserId = req.params.userId || req.body.userId;

        if (requestedUserId && requestedUserId !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'Access denied. You can only access your own consent data.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error during ownership verification' });
    }
};

export default ownershipMiddleware;

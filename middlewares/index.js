const validateSessionResult = (req, res, next) => {
    if (!req.session.result) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    validateSessionResult
};
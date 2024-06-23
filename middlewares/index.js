const validateSessionResult = (req, res, next) => {
    if (!req.session.result) {
        return res.redirect('/');
    }
    next();
}

const validateCalculateVLSM = (req, res, next) => {
    let { main_network, lans, prefix } = req.body;

    if (!main_network || !lans || !prefix) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
        });
    }

    next();
};

module.exports = {
    validateSessionResult,
    validateCalculateVLSM
};
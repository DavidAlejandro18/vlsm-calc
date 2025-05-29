const validateCalculateVLSM = (req, res, next) => {
    let { data_subnets } = req.body;
    data_subnets = JSON.parse(data_subnets);

    if (!data_subnets.main_network || !data_subnets.lans || !data_subnets.prefix) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
        });
    }

    next();
};

module.exports = {
    validateCalculateVLSM
};
const VLSM = require('../models/vlsm');

const calculate = (req, res) => {
    try {
        let { main_network, lans, prefix } = req.body;
        let vlsm = new VLSM(main_network, lans, prefix);
        let result = vlsm.init();

        req.session.result = result;

        return res.json({
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            error
        });
    }
}

module.exports = {
    calculate
};
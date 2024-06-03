const VLSM = require('../models/vlsm');

const calculate = (req, res) => {
    try {
        let { main_network, lans, prefix } = req.body;
        let vlsm = new VLSM(main_network, lans, prefix);
        let vlsm_result = vlsm.init();
        prefix = vlsm.prefix;
        let subnetMask = vlsm.prefixToSubnetMask(prefix);

        req.session.result = {
            vlsm_result,
            main_network,
            prefix,
            subnetMask
        };

        return res.json({
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
}

module.exports = {
    calculate
};
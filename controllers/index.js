const VLSM = require('../models/vlsm');

const indexPage = (req, res) => {
    res.render('index', {
        title: 'Calculadora VLSM',
        page: 'index'
    });
};

const calculate = (req, res) => {
    try {
        let { data_subnets } = req.body;
        data_subnets = JSON.parse(data_subnets);

        let { main_network, prefix, lans } = data_subnets;
        let vlsm = new VLSM(main_network, lans, prefix);
        let vlsm_result = vlsm.init();
        prefix = vlsm.prefix;
        let subnetMask = vlsm.prefixToSubnetMask(prefix);

        return res.render('results', {
            title: 'Calculadora VLSM | Resultados',
            page: 'results',
            data: {
                vlsm_result,
                main_network,
                prefix,
                subnetMask
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
}

module.exports = {
    indexPage,
    calculate
};
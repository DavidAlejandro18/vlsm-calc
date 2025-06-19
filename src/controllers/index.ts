import { Request, Response } from 'express';
import VLSM from "../models/vlsm";

export const indexPage = (req:Request, res:Response):void => {
    res.render('index', {
        title: 'Calculadora VLSM',
        page: 'index'
    });
}

export const calculate = (req:Request, res:Response):void => {
    try {
        
        let { data_subnets } = req.body;
        data_subnets = JSON.parse(data_subnets);

        let { main_network, prefix, lans } = data_subnets;
        let vlsm:VLSM = new VLSM(main_network, lans, prefix);
        let vlsm_result = vlsm.init();
        prefix = vlsm.prefix;
        let subnetMask = vlsm.prefixToSubnetMask(prefix);

        res.render('results', {
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
        res.status(500).json({
            success: false,
            error
        });
    }
}
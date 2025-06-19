import { Request, Response, NextFunction } from 'express';

export const validateCalculateVLSM = (req:Request, res:Response, next:NextFunction):void => {
    let { data_subnets } = req.body;
    data_subnets = JSON.parse(data_subnets);

    if (!data_subnets.main_network || !data_subnets.lans || !data_subnets.prefix) {
        res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
        });
    }

    next();
}
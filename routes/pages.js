const { Router } = require('express');
const router = Router();
const { calculate } = require('../controllers/index');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Calculadora VLSM',
        page: 'index'
    });
});

router.post('/calculate', calculate);

router.get('/results', (req, res) => {
    let data = req.session.result;
    
    res.render('results', {
        title: 'Calculadora VLSM | Resultados',
        page: 'results',
        data
    });
});

module.exports = router;
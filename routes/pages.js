const { Router } = require('express');
const router = Router();
const { calculate } = require('../controllers/index');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Calculadora VLSM'
    });
});

router.post('/calculate', calculate);

router.get('/results', (req, res) => {
    let data = req.session.result;
    
    res.render('results', {
        title: 'Calculadora VLSM | Resultados',
        data
    });
});

module.exports = router;
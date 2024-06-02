const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Calculadora VLSM'
    });
});

module.exports = router;
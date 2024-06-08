const { Router } = require('express');
const router = Router();
const { indexPage, resultsPage, calculate } = require('../controllers/index');
const { validateSessionResult } = require('../middlewares/index');

router.get('/', indexPage);

router.post('/calculate', calculate);

router.get('/results', validateSessionResult, resultsPage);

module.exports = router;
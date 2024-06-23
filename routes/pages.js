const { Router } = require('express');
const router = Router();
const { indexPage, resultsPage, calculate } = require('../controllers/index');
const { validateSessionResult, validateCalculateVLSM } = require('../middlewares/index');

router.get('/', indexPage);

router.post('/calculate', validateCalculateVLSM, calculate);

router.get('/results', validateSessionResult, resultsPage);

module.exports = router;
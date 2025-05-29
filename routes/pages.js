const { Router } = require('express');
const router = Router();
const { indexPage, calculate } = require('../controllers/index');
const { validateCalculateVLSM } = require('../middlewares/index');

router.get('/', indexPage);

router.post('/results', validateCalculateVLSM, calculate);

module.exports = router;
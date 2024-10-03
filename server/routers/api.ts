const router = require('express').Router();

import {
  getKillLogController,
  getDeathCountController,
  getLastDeathController,
  saveLastDeathController,
} from '../controllers/api';

router.get('/', getKillLogController);
router.get('/count', getDeathCountController);
router.get('/last', getLastDeathController);
router.post('/', saveLastDeathController);

module.exports = router;

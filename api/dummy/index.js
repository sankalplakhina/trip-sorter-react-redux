import express from 'express';

// controllers
import deals from './controllers/deals';

const router = express.Router();

router.get('/deals', deals);

module.exports = router;
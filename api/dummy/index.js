import express from 'express';

// controllers
import response from './controllers/response';

const router = express.Router();

router.get('/response', response);

module.exports = router;
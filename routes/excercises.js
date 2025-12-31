const express = require('express');
const router = express.Router();
const excercises = require('../controllers/excercises');

router.get('/', excercises.viewExcercises);
router.get('/:id', excercises.showExcercise);
router.post('/', excercises.createExcercise);

router.put('/:id', excercises.updateExcercise);
router.delete('/:id', excercises.deleteExcercise);

module.exports = router;
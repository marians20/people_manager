/**
 * @swagger
 * tags:
 *   name: People
 *   description: API to manage people.
 */
var express = require('express');
var router = express.Router();
const peopleController = require('../controllers/people_controller');

router.use(function timeLog(req, res, next) {

    // TODO: Add middleware here

    next()
});

router.get('/', peopleController.getAll);
router.get('/:id', peopleController.getById);
router.post('/', peopleController.create);
router.put('/:id', peopleController.update);
router.delete('/:id', peopleController.delete);

module.exports = router

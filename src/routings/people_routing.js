/**
 * @swagger
 * tags:
 *   name: People
 *   description: API to manage people.
 */
var express = require('express');
var router = express.Router();

var container = require('../ioc');

const peopleController = container.resolve('peopleController');

router.use(function timeLog(req, res, next) {

  // TODO: Add middleware here

  next()
});

router.get('/all', peopleController.getAll);
router.get('/', peopleController.get);
router.get('/:id', peopleController.getById);
router.post('/', peopleController.create);
router.put('/:id', peopleController.update);
router.delete('/:id', peopleController.delete);

module.exports = router

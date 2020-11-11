/**
 * @swagger
 * tags:
 *   name: People
 *   description: API to manage people.
 */
var express = require('express');
var router = express.Router();

const verify = require('../auth/middleware');
var container = require('../ioc');

const peopleController = container.resolve('peopleController');

router.use(function timeLog(req, res, next) {

  // TODO: Add middleware here

  next()
});

router.get('/all', verify, peopleController.getAll);
router.get('/count', verify, peopleController.getCount);
router.get('/', verify, peopleController.get);
router.get('/:id', verify, peopleController.getById);
router.post('/', verify, peopleController.create);
router.put('/:id', verify, peopleController.update);
router.delete('/:id', verify, peopleController.delete);

module.exports = router

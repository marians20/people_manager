const peopleController = require('./controllers/people_controller');

exports.config = (app) => {
    app.get('/people', peopleController.getAll);

    app.get('/people/:id', peopleController.getById);

    app.post('/people', peopleController.create);

    app.put('/people/:id', peopleController.update);

    app.delete('/people/:id', peopleController.delete);
};
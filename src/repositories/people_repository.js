const errors = require('../resources/errors.json');
const responses = require('../resources/responses.json');

var entities = [
    {
        id: 1,
        firstName: 'Tertilian',
        lastName: 'Farafastoaca',
        cnp: '1234567890'
    },
    {
        id: 2,
        firstName: 'Romica',
        lastName: 'Puceanu',
        cnp: '223456123'
    }
];

exports.create = (entity) => new Promise((accept, reject) => {
    entities.push(entity);
    accept(responses.Created);
});

exports.getAll = () => new Promise((accept, reject) => accept(entities));

exports.getById = (id) => new Promise((accept, reject) => accept(entities.find(entity => entity.id === id)));

exports.update = (id, newEntity) => new Promise((accept, reject) => {
    newEntity.id = id;
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].id === id) {
            entities[i] = newEntity;
            accept(responses.NoContent);
            return;
        }
    }
    reject(errors.NotFound);
});

exports.delete = (id) => new Promise((accept, reject) => {
    if (!entities.find(entity => entity.id === id)) {
        reject(errors.NotFound);
        return;
    }

    entities = entities.filter(entity => entity.id !== id);
    accept(responses.NoContent);
});

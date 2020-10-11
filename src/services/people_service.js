const peopleRepository = require('../repositories/people_repository');

exports.create = (entity) => peopleRepository.create(entity);

exports.getAll = () => peopleRepository.getAll();

exports.getById = (id) => peopleRepository.getById(id);

exports.update = (id, newEntity) => peopleRepository.update(id, newEntity);

exports.delete = (id) => peopleRepository.delete(id);

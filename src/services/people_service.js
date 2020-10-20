module.exports =
function PeopleService(opts) {
    const peopleRepository = opts.peopleRepository;

    this.create = (entity) => peopleRepository.create(entity);

    this.getAll = () => peopleRepository.getAll();

    this.getById = (id) => peopleRepository.getById(id);

    this.update = (id, newEntity) => peopleRepository.update(id, newEntity);

    this.delete =(id) => peopleRepository.delete(id);
}

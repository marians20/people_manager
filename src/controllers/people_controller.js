module.exports = function PeopleController(opts) {
    const { queryToResponse, commandToResponse } = require('./response_mappers');

    const peopleService = opts.peopleService;
    
    this.create = async (req, res) => await commandToResponse(res, () => peopleService.create(req.body));

    this.getById = async (req, res) => await queryToResponse(res, () => peopleService.getById(+req.params.id));
    
    this.getAll = async (req, res) => await queryToResponse(res, () => peopleService.getAll());
    
    this.update = async (req, res) => await commandToResponse(res, () => peopleService.update(+req.params.id, req.body));
    
    this.delete = async (req, res) => await commandToResponse(res, () => peopleService.delete(+req.params.id));
}
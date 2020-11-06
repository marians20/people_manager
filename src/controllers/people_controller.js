module.exports = function PeopleController(opts) {
    const { queryToResponse, commandToResponse } = require('./response_mappers');

    const peopleService = opts.peopleService;
    
    this.create = async (req, res) => await commandToResponse(res, () => peopleService.create(req.body));

    this.getById = async (req, res) => await queryToResponse(res, () => peopleService.getById(+req.params.id));
    
    this.getAll = async (req, res) => await queryToResponse(res, () => peopleService.getAll());

    this.getCount = async (req, res) => await queryToResponse(res, () => peopleService.getCount());

    this.get = async (req, res) => await queryToResponse(res, () => peopleService.get({
        pageSize: req.query.pageSize,
        pageNumber: req.query.pageNumber,
        sortField: req.query.sortField,
        sortDirection: req.query.sortDirection
    }));
    
    this.update = async (req, res) => await commandToResponse(res, () => peopleService.update(+req.params.id, req.body));
    
    this.delete = async (req, res) => await commandToResponse(res, () => peopleService.delete(+req.params.id));
}
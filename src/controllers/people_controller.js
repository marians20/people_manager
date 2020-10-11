const { queryToResponse, commandToResponse } = require('./response_mappers');
const peopleService = require('../services/people_service');

exports.create = async (req, res) => await commandToResponse(res, () => peopleService.create(req.body));

exports.getById = async (req, res) => await queryToResponse(res, () => peopleService.getById(+req.params.id));

exports.getAll = async (req, res) => await queryToResponse(res, () => peopleService.getAll());

exports.update = async (req, res) => await commandToResponse(res, () => peopleService.update(+req.params.id, req.body));

exports.delete = async (req, res) => await commandToResponse(res, () => peopleService.delete(+req.params.id));
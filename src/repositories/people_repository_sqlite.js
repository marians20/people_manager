const responses = require('../resources/responses.json');
const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('config');
const sequelize = new Sequelize(config.dbConfig);
const queryInterface = sequelize.getQueryInterface();
const Person = require('../models/person.js')(sequelize, DataTypes);

module.exports = function PeopleRepositorySqlite() {

    queryInterface.createTable('People', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cnp: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });

    this.create = async (person) => {
        try {
            var response = await Person.create(person);
            await response.save();
            return responses.Ok;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    this.getAll = async () => {
        try {
            return await Person.findAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    this.getCount = async () => {
        try {
            return await Person.count();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    this.get = async (queryDto) => {
        try {
            console.log(queryDto);
            return queryDto.sortField && queryDto.sortDirection
                ? await Person.findAll({
                    limit: +queryDto.pageSize,
                    offset: (+queryDto.pageNumber - 1) * (+queryDto.pageSize),
                    order: [[
                        Sequelize.fn('lower', Sequelize.col(queryDto.sortField)),
                        queryDto.sortDirection,
                    ]]
                })
                : await Person.findAll({
                    limit: +queryDto.pageSize,
                    offset: (+queryDto.pageNumber - 1) * (+queryDto.pageSize),                    
                });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    this.getById = async (id) => {
        try {
            return await Person.findByPk(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    this.update = async (id, person) => {
        var entity = await this.getById(id);
        if (!entity) {
            throw errors.NotFound;
        }

        try {
            await Person.update(
                {
                    firstName: person.firstName,
                    lastName: person.lastName,
                    cnp: person.cnp
                },
                { where: { id: id } });
            return responses.NoContent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    this.delete = async (id) => {
        console.log('DELETE', id);
        var entity = await this.getById(id);
        if (!entity) {
            throw errors.NotFound;
        }

        try {
            const result = await Person.destroy({ where: { id: id } });
            console.log(result);
            return responses.Ok;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
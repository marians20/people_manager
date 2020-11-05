const responses = require('../resources/responses.json');
const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('config');
const sequelize = new Sequelize(config.dbConfig);
const queryInterface = sequelize.getQueryInterface();
const Person = require ('../models/person.js')(sequelize, DataTypes);

module.exports = function PeopleRepositorySqlite() {

    queryInterface.createTable('People', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        cnp: {
          type: Sequelize.STRING
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
        } catch(error) {
            console.error(error);
            throw error;
        }
    };

    this.getAll = async () => {
        try {
        return await Person.findAll();
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    this.get = async (queryDto) => {
        try {
            return queryDto.sortField && queryDto.sortDirection
                ? await Person.findAll({
                     order: [[
                            Sequelize.fn('lower', Sequelize.col(queryDto.sortField)),
                            queryDto.sortDirection,
                         ]]
                    })
                : await Person.findAll();
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    this.getById = async (id) => {
        try {
        return await Person.findByPk(id);
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    this.update = async (id, person) => {
        var entity = await this.getById(id);
        if(!entity) {
            throw errors.NotFound;
        }

        try {
            await Person.update(
                {
                    firstName: person.firstName,
                    lastName:person.lastName,
                    cnp: person.cnp
                },
                {where: {id: id}});
            return responses.NoContent;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    this.delete = async(id) => {
        var entity = await this.getById(id);
        if(!entity) {
            throw errors.NotFound;
        }

        try {
            await Person.destroy({where: {id: id}});
            return responses.NoContent;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}
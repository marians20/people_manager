const { createContainer, asClass, InjectionMode } = require('awilix');

const PeopleRepository = require('./repositories/people_repository');
const PeopleRepositorySqlite = require('./repositories/people_repository_sqlite');
const PeopleService = require('./services/people_service');
const PeopleController = require('./controllers/people_controller');


var container;

if (!container) {
  (async () => {
    container = createContainer({
      injectionMode: InjectionMode.PROXY
    });

    container.register({
      peopleRepository: asClass(PeopleRepositorySqlite),
      peopleService: asClass(PeopleService),
      peopleController: asClass(PeopleController)
    });
  })();
}

module.exports = container;
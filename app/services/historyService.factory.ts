module CharacterHistory {
    export function HistoryServiceFactory($parse) {
        return new HistoryService($parse);
    }

    angular.module('characterBuilderApp')
        .factory('HistoryService', HistoryServiceFactory);
}
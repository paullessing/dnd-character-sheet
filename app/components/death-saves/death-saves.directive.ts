/// <reference path="./death-saves.ctrl.ts" />

module CharacterBuilder.DeathSaves {
    export function DeathSavesDirective() {
        return {
            scope: {
                label: '@',
                deathSaves: '=value'
            },
            replace: true,
            restrict: 'E',
            bindToController: true,
            controller: DeathSavesDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'components/death-saves/death-saves.tpl.html',
        };
    }

    angular.module('characterBuilderApp')
        .directive('deathSaves', DeathSavesDirective);
}


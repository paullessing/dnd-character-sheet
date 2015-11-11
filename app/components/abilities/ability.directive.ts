/// <reference path="./ability.ctrl.ts" />

module CharacterBuilder.Abilities {
    export function AbilityDirective(): angular.IDirective {
        return {
            scope: {
                ability: '='
            },
            replace: true,
            restrict: 'E',
            bindToController: true,
            controller: AbilityDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'components/abilities/ability.tpl.html',
            transclude: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('ability', AbilityDirective);
}


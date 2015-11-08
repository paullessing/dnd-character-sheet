/// <reference path="./character-builder.ctrl.ts" />

module CharacterBuilder {
    export function CharacterBuilderDirective(): angular.IDirective {
        return {
            scope: {},
            restrict: 'E',
            bindToController: true,
            controller: CharacterBuilderController,
            controllerAs: 'vm',
            templateUrl: 'components/character-builder/character-builder.tpl.html'
        };
    }

    angular.module('characterBuilderApp')
        .directive('characterBuilder', CharacterBuilderDirective);
}

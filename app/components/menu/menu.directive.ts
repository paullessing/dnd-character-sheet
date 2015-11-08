/// <reference path="./menu.ctrl.ts" />

module CharacterBuilder.Menu {
    export function MenuDirective(): angular.IDirective {
        return {
            scope: {
                character: '=',
                isValid: '&'
            },
            restrict: 'E',
            bindToController: true,
            controller: MenuDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'components/menu/menu.tpl.html'
        };
    }

    angular.module('characterBuilderApp')
        .directive('menu', MenuDirective);
}

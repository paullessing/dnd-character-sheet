/// <reference path="./weapons-list.ctrl.ts" />

module CharacterBuilder.WeaponsList {
    import Inventory = Entities.Inventory;
    import IDirective = angular.IDirective;

    export function WeaponsListDirective(): IDirective {
        return {
            scope: {
                character: '='
            },
            replace: true,
            restrict: 'E',
            bindToController: true,
            controller: WeaponsListDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'components/weapons-list/weapons-list.tpl.html'
        };
    }

    angular.module('characterBuilderApp')
        .directive('weaponsList', WeaponsListDirective);
}


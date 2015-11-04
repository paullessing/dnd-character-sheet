/// <reference path="./weapons-list.ctrl.ts" />

module CharacterBuilder.WeaponsList {
    import Inventory = Entities.Inventory;
    export function WeaponsListDirective() {
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


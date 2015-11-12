///<reference path="./inventory.ctrl.ts"/>

module CharacterBuilder.Inventory {
    export function InventoryDirective(): angular.IDirective {
        return {
            scope: {
                character: "="
            },
            restrict: 'E',
            templateUrl: "components/inventory/inventory.tpl.html",
            controller: InventoryDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('inventory', InventoryDirective);
}
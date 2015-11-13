///<reference path="./modal-window.service.ts"/>

module CharacterBuilder.Inventory {
    export function ModalWindowDirective(): angular.IDirective {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: "components/modal-window/modal-window.tpl.html",
            replace: true,
            transclude: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('modalWindow', ModalWindowDirective);
}

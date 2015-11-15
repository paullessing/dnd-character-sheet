/// <reference path="modifier-form.ctrl.ts" />

module CharacterBuilder.AbilityForm {
    export function ModifierFormDirective(): angular.IDirective {
        return {
            scope: {
                onComplete: '&'
            },
            restrict: 'E',
            templateUrl: "components/modifier-form/modifier-form.tpl.html",
            controller: ModifierFormDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('modifierForm', ModifierFormDirective);
}
module CharacterBuilder.Abilities {
    export function AbilitiesDirective(): angular.IDirective {
        return {
            scope: {
                character: "="
            },
            replace: true,
            restrict: 'E',
            templateUrl: "components/abilities/abilities.tpl.html"
        };
    }

    angular.module('characterBuilderApp')
        .directive('abilities', AbilitiesDirective);
}
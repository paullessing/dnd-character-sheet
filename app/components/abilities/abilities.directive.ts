module CharacterBuilder.Abilities {
    function AbilitiesDirective() {
        return {
            scope: {
                character: "="
            },
            restrict: 'E',
            templateUrl: "components/abilities/abilities.tpl.html"
        };
    }

    angular.module('characterBuilderApp')
        .directive('abilities', AbilitiesDirective);
}
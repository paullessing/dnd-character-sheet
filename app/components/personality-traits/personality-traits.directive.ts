module CharacterBuilder.PersonalityTraits {
    function PersonalityTraitsDirective() {
        return {
            scope: {
                character: "="
            },
            restrict: 'E',
            templateUrl: "components/personality-traits/personality-traits.tpl.html",
            replace: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('combatStats', PersonalityTraitsDirective);
}
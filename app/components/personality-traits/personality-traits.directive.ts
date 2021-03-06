module CharacterBuilder.PersonalityTraits {
    export function PersonalityTraitsDirective(): angular.IDirective {
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
        .directive('personalityTraits', PersonalityTraitsDirective);
}
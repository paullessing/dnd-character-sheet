module CharacterBuilder.PersonalDetails {
    export function PersonalDetailsDirective(): angular.IDirective {
        return {
            scope: {
                character: "="
            },
            restrict: 'E',
            templateUrl: "components/personal-details/personal-details.tpl.html",
            link: function(scope: PersonalDetailsDirectiveScope) {
                scope.alignments = Entities.AlignmentNames;
            }
        };
    }

    interface PersonalDetailsDirectiveScope extends angular.IScope {
        alignments: Entities.Alignment[];
    }

    angular.module('characterBuilderApp')
        .directive('personalDetails', PersonalDetailsDirective);
}
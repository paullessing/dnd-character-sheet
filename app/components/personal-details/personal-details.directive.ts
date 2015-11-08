module CharacterBuilder.PersonalDetails {
    function PersonalDetailsDirective() {
        return {
            scope: {
                character: "="
            },
            restrict: 'E',
            templateUrl: "components/personal-details/personal-details.tpl.html"
        };
    }

    angular.module('characterBuilderApp')
        .directive('personalDetails', PersonalDetailsDirective);
}
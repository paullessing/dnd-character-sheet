module CharacterBuilder.PersonalDetails {
    function PersonalDetailDirective() {
        return {
            scope: {
                label: "@",
                value: "=",
                type: "@",
                options: "="
            },
            // Controller just for the sake of having a dot in the model
            controllerAs: 'vm',
            controller: () => {},
            bindToController: true,
            restrict: 'E',
            templateUrl: "components/personal-details/personal-detail.tpl.html"
        };
    }

    angular.module('characterBuilderApp')
        .directive('personalDetail', PersonalDetailDirective);
}
module CharacterBuilder.CharacterDetail {
    function CharacterDetailDirective() {
        return {
            scope: {
                label: "@",
                value: "=",
                type: "@"
            },
            restrict: 'E',
            bindToController: true,
            controller: function() {},
            controllerAs: "vm",
            templateUrl: "components/character-builder/character-detail/character-detail.tpl.html"
        };
    }

    angular.module('characterBuilderApp')
        .directive('characterDetail', CharacterDetailDirective);
}
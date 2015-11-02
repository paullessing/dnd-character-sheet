module Utilities {
    import IScope = angular.IScope;
    import IAttributes = angular.IAttributes;
    export function LabelledBoxDirective() {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            replace: true,
            restrict: 'E',
            templateUrl: 'components/labelled-box/labelled-box.tpl.html'
        }
    }

    angular.module('characterBuilderApp')
        .directive('labelledBox', LabelledBoxDirective);
}
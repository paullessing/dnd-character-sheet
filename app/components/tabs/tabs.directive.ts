/// <reference path="./tabs.ctrl.ts" />

module CharacterBuilder.Tabs {
    export function TabsDirective(): angular.IDirective {
        return {
            scope: {},
            replace: true,
            restrict: 'E',
            bindToController: true,
            transclude: true,
            controller: TabsDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'components/tabs/tabs.tpl.html'
        };
    }

    angular.module('characterBuilderApp')
        .directive('tabs', TabsDirective);
}


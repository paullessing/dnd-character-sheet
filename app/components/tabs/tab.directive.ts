/// <reference path="./tabs.ctrl.ts" />

module CharacterBuilder.Tabs {
    export function TabDirective(): angular.IDirective {
        return {
            require: '^tabs',
            restrict: 'A',
            link: function(scope, element, attributes, tabsCtrl: TabsDirectiveController) {
                var title = attributes['tab'];

                tabsCtrl.addTab(title);

                scope.$watch($scope => {
                    return tabsCtrl.isActive(title);
                }, (newValue: boolean) => {
                    element.toggleClass('c-tabs__item--hidden', !newValue);
                });
            }
        };
    }

    angular.module('characterBuilderApp')
        .directive('tab', TabDirective);
}


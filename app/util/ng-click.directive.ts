module Utilities {
    /**
     * Enhances any a[ng-click] which does not already have a "href" attribute by adding href="javascript:void".
     */
    export function NgClickDirective(): angular.IDirective {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                console.log("Linking ng-click", element.prop('tagName').toLowerCase(), attributes['href']);
                if (element.prop('tagName').toLowerCase() === 'a' && !attributes['href']) {
                    element.attr('href', 'javascript:void(0)');
                }
            }
        }
    }

    angular.module('characterBuilderApp')
        .directive('ngClick', NgClickDirective);
}
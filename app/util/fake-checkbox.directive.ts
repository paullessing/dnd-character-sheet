module Utilities {
    import IScope = angular.IScope;
    import IAttributes = angular.IAttributes;
    export function FakeCheckboxDirective() {
        return {
            restrict: 'A',
            link: function(scope: IScope, element: JQuery, attributes: IAttributes) {
                if (element.prop('tagName').toLowerCase() !== 'input' || attributes['type'] !== 'checkbox') {
                    throw new Error("Must use fake-checkbox on input[type=checkbox] only!")
                }
                var wrapper = angular.element('<label class="c-fake-checkbox"></label>');
                element.wrap(wrapper).after('<span class="c-fake-checkbox__element"></span>');
            }
        }
    }

    angular.module('characterBuilderApp')
        .directive('fakeCheckbox', FakeCheckboxDirective);
}
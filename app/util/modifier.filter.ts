module Utilities {
    export function modifierFilter(value: string) {
        var parsedValue = parseInt(value);
        if (isNaN(parsedValue)) {
            return '';
        }
        return (parsedValue <= 0 ? '' : '+') + parsedValue;
    }

    angular.module('characterBuilderApp')
    .filter('modifier', () => modifierFilter);
}
/// <reference path="./ability.ctrl.ts" />

module CharacterBuilder.SkillGroup {
    export function SkillGroupDirective() {
        return {
            scope: {
                ability: '='
            },
            restrict: 'E',
            bindToController: true,
            controller: SkillGroupDirectiveController,
            controllerAs: 'vm',
            templateUrl: 'components/abilities/ability.tpl.html',
            transclude: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('ability', SkillGroupDirective);
}


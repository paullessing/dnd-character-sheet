module CharacterBuilder.CombatStats {
    export function CombatStatsDirective(): angular.IDirective {
        return {
            scope: {
                character: "="
            },
            restrict: 'E',
            templateUrl: "components/combat-stats/combat-stats.tpl.html",
            replace: true
        };
    }

    angular.module('characterBuilderApp')
        .directive('combatStats', CombatStatsDirective);
}
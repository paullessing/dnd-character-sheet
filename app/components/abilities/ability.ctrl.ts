/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/ability.ts" />

module CharacterBuilder.Abilities {
    import IScope = angular.IScope;
    import Character = Entities.Character;
    import Skill = Entities.Skill;
    import Ability2 = Entities.Ability;

    export class AbilityDirectiveController {
        constructor(private $scope: IScope) {
        }

        public character: Character;
        public points: string;
        public ability: Ability2;
        public proficiencyBonus: number;

        public getModifier(skill: Skill): number {
            if (typeof this.ability.modifier === 'undefined' || this.ability.modifier === null) {
                return null;
            } else {
                return this.ability.modifier + (skill.isProficient ? this.proficiencyBonus : 0);
            }
        }
    }
}
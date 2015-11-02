/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/ability.ts" />

module CharacterBuilder.SkillGroup {
    import IScope = angular.IScope;
    import Ability = Entities.Ability;
    import Character = Entities.Character;
    import Skill = Entities.Skill;

    export class AbilityDirectiveController {
        constructor(private $scope: IScope) {
        }

        public character: Character;
        public points: string;
        public ability: Ability;
        public proficiencyBonus: number;

        public getModifier(skill: Skill): number {
            return this.ability.modifier + (skill.isProficient ? this.proficiencyBonus : 0);
        }
    }
}
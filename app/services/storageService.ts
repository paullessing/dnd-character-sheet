/// <reference path="../entities/character.ts" />
/// <reference path="../entities/ability.ts" />
/// <reference path="../entities/alignment.ts" />

module Services {
    import Character = Entities.Character;
    import Ability = Entities.Ability;
    import Skill = Entities.Skill;
    import Character = Entities.Character;

    export class StorageService {
        static $inject = ['$localStorage'];

        constructor(private $localStorage: any) {
        }

        public hasStored(): boolean {
            return false;
        }
        public save(character: Character): void {
            var data = {
                name: character.name,
                xp: character.xp,
                details: character.details,
                deathSaves: character.deathSaves,
                armorClass: character.armorClass,
                speed: character.speed,
                maxHitpoints: character.maxHitpoints,
                hitpoints: character.hitpoints,
                temporaryHitpoints: character.temporaryHitpoints,
                hitDice: character.hitDice,
                hitDiceUsed: character.hitDiceUsed,
                abilities: character.abilities.map(abilityToStored)
            }

            this.$localStorage.character = data;
        }

        public load(): Character {
            var data = this.$localStorage.character;
            var character = new Character();
            if (!data) {
                return character;
            }
            character.details = data.details;
            character.name = data.name;
            character.xp = data.xp;
            character.deathSaves = data.deathSaves;
            character.armorClass = data.armorClass;
            character.speed = data.speed;
            character.maxHitpoints = data.maxHitpoints;
            character.hitpoints = data.hitpoints;
            character.temporaryHitpoints = data.temporaryHitpoints;
            character.hitDice = data.hitDice;
            character.hitDiceUsed = data.hitDiceUsed;
            character.abilities = data.abilities.map(storedToAbility);

            return character;
        }
    }

    function abilityToStored(ability: Ability): any {
        var data = {
            name: ability.name,
            points: ability.points,
            skills: []
        };
        ability.skills.forEach(skill => {
            data.skills.push({
                name: skill.name,
                isProficient: skill.isProficient
            });
        });
        return data;
    }

    function storedToAbility(data: any): Ability {
        var skills = data.skills;
        var skillNames = skills.map(skill => skill.name);
        var ability = new Ability(data.name, ...skillNames);
        skills.forEach(skill => {
            if (skill.isProficient) {
                ability.getSkill(skill.name).isProficient = true;
            }
        });
        ability.points = data.points;
        return ability;
    }

    angular.module('characterBuilderApp')
    .service('StorageService', StorageService);
}
/// <reference path="./ability.ts" />
/// <reference path="./inventory.ts" />

module Entities {
    export class Character {
        public name: string;
        public details: CharacterDetails = {};
        public personality: Personality = {};
        public abilities: Ability[] = [
            new Ability('Strength', 'Athletics'),
            new Ability('Dexterity', 'Acrobatics', 'Sleight of Hand', 'Stealth'),
            new Ability('Constitution'),
            new Ability('Intelligence', 'Arcana', 'History', 'Investigation', 'Nature', 'Religion'),
            new Ability('Wisdom', 'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'),
            new Ability('Charisma', 'Deception', 'Intimidation', 'Performance', 'Persuasion')
        ];
        public armorClass: number;
        public speed: number;
        public xp: number = 0;
        public maxHitpoints: number;
        public hitpoints: string;
        public hitDice: string;
        public hitDiceUsed: number;
        public temporaryHitpoints: string;
        public features: string;

        public inventory: Inventory = new Inventory();

        public get proficiencyBonus(): number {
            return Math.floor((this.level - 1) / 4) + 2;
        }

        public get level(): number {
            return getLevel(this.xp);
        }

        public get xpUntilNextLevel(): number {
            return getXpRequiredForLevelUp(this.xp);
        }

        private getAbility(name): Ability {
            for (var i = 0; i < this.abilities.length; i++) {
                if (this.abilities[i].name === name) {
                    return this.abilities[i];
                }
            }
            return null;
        }

        public get passiveWisdom(): number {
            var wisdom = this.getAbility('Wisdom');
            var perception = wisdom.getSkill('Perception');
            return 10 + wisdom.modifier + (perception.isProficient ? this.proficiencyBonus : 0); // TODO encapsulate this logic in a single component
        }

        public get initiative(): number {
            return this.getAbility('Dexterity').modifier;
        }
        public deathSaves: DeathSaves = {
            success: 0,
            failure: 0
        }
    }

    var xpToLevel = [
        0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
    ];

    export function getLevel(xp: number) {
        for (var level = xpToLevel.length - 1; level >= 0; level--) {
            if (xp >= xpToLevel[level]) {
                return level + 1;
            }
        }
        return 1; // Cannot be less than level 1
    }

    export function getXpRequiredForLevelUp(xp) {
        return xpToLevel[getLevel(xp)] - xp;
    }

    export interface DeathSaves {
        success: number;
        failure: number;
    }

    export interface CharacterDetails {
        class?: string;
        background?: string;
        playerName?: string;
        race?: string;
        alignment?: string;
    }

    export interface Personality {
        traits?: string;
        ideals?: string;
        bonds?: string;
        flaws?: string;
    }
}
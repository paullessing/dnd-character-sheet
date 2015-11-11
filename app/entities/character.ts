/// <reference path="./ability.ts" />
/// <reference path="./inventory.ts" />

module Entities {
    export class Character {
        private _details: CharacterDetails;
        private _personality: Personality;
        private _abilities: Abilities;
        private _proficiencyBonus: number;

        constructor(private dto?: CharacterDto) {
            if (!dto) {
                this.dto = {
                    xp: 0,
                    details: {},
                    personality: {},
                    abilities: {}
                };
            }
            this._details = new CharacterDetails(this.dto.details);
            this._personality = new Personality(this.dto.personality);
            this._abilities = new Abilities(this.dto.abilities, () => this.proficiencyBonus);
            this.xp = this.dto.xp; // Ensure complex setter is called
        }

        public getDto() {
            return this.dto;
        }

        public get name(): string {
            return this.dto.name;
        }
        public set name(name: string) {
            this.dto.name = name;
        }

        public get xp(): number {
            return this.dto.xp || 0;
        }
        public set xp(xp: number) {
            this.dto.xp = xp || 0;
            this._proficiencyBonus = Math.floor((this.level - 1) / 4) + 2;
        }

        public get details(): CharacterDetails {
            return this._details;
        }
        public get personality(): Personality {
            return this._personality;
        }
        public get abilities(): Abilities {
            return this._abilities;
        }

        public get armorClass(): number {
            return this.dto.armorClass;
        }
        public set armorClass(armorClass: number) {
            this.dto.armorClass = armorClass;
        }

        public get speed(): number {
            return this.dto.speed;
        }
        public set speed(speed: number) {
            this.dto.speed = speed;
        }

        public get maxHitpoints(): number {
            return this.dto.maxHitpoints;
        }
        public set maxHitpoints(maxHitpoints: number) {
            this.dto.maxHitpoints = maxHitpoints;
        }

        public get hitpoints(): string {
            return this.dto.hitpoints;
        }
        public set hitpoints(hitpoints: string) {
            this.dto.hitpoints = hitpoints;
        }

        public get hitDice(): string {
            return this.dto.hitDice;
        }
        public set hitDice(hitDice: string) {
            this.dto.hitDice = hitDice;
        }

        public get hitDiceUsed(): number {
            return this.dto.hitDiceUsed;
        }
        public set hitDiceUsed(hitDiceUsed: number) {
            this.dto.hitDiceUsed = hitDiceUsed;
        }

        public get temporaryHitpoints(): string {
            return this.dto.temporaryHitpoints;
        }
        public set temporaryHitpoints(temporaryHitpoints: string) {
            this.dto.temporaryHitpoints = temporaryHitpoints;
        }

        public get features(): string {
            return this.dto.features;
        }
        public set features(features: string) {
            this.dto.features = features;
        }


        public inventory: Inventory = new Inventory();

        public get proficiencyBonus(): number {
            return this._proficiencyBonus;
        }

        public get level(): number {
            return getLevel(this.xp);
        }

        public get xpUntilNextLevel(): number {
            return getXpRequiredForLevelUp(this.xp);
        }

        public get passiveWisdom(): number {
            var perception = this._abilities.wisdom.getSkill('Perception').modifier;
            if (isNaN(perception)) {
                return null;
            }
            return 10 + perception;
        }

        public get initiative(): number {
            return this._abilities.dexterity.modifier;
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

    export class CharacterDetails {
        constructor(public dto: CharacterDetailsDto) {}

        public get class(): string {
            return this.dto.class;
        }
        public set class(clazz: string) {
            this.dto.class = clazz;
        }
        public get background(): string {
            return this.dto.background;
        }
        public set background(background: string) {
            this.dto.background = background;
        }
        public get playerName(): string {
            return this.dto.playerName;
        }
        public set playerName(playerName: string) {
            this.dto.playerName = playerName;
        }
        public get race(): string {
            return this.dto.race;
        }
        public set race(race: string) {
            this.dto.race = race;
        }
        public get alignment(): Alignment {
            return this.dto.alignment;
        }
        public set alignment(alignment: Alignment) {
            this.dto.alignment = alignment;
        }
    }

    export interface PersonalityDto {
        traits?: string;
        ideals?: string;
        bonds?: string;
        flaws?: string;
    }

    export class Personality {
        constructor(private dto: PersonalityDto) {}

        public get traits(): string {
            return this.dto.traits;
        }
        public set traits(traits: string) {
            this.dto.traits = traits;
        }

        public get ideals(): string {
            return this.dto.ideals;
        }
        public set ideals(ideals: string) {
            this.dto.ideals = ideals;
        }

        public get bonds(): string {
            return this.dto.bonds;
        }
        public set bonds(bonds: string) {
            this.dto.bonds = bonds;
        }

        public get flaws(): string {
            return this.dto.flaws;
        }
        public set flaws(flaws: string) {
            this.dto.flaws = flaws;
        }
    }

    export interface CharacterDto {
        name?: string;
        xp: number;
        details: CharacterDetailsDto;
        personality: PersonalityDto;
        abilities: AbilitiesDto;
        armorClass?: number;
        speed?: number;
        maxHitpoints?: number;
        hitpoints?: string;
        hitDice?: string;
        hitDiceUsed?: number;
        temporaryHitpoints?: string;
        features?: string;
    }

    export interface CharacterDetailsDto {
        class?: string;
        background?: string;
        playerName?: string;
        race?: string;
        alignment?: Alignment;
    }
}
module Entities {
    export interface AbilityDefinition {
        name: string;
        skills: string[];
    }

    export const AbilityDefinitions: AbilityDefinition[] = [
        {
            name: 'Strength',
            skills: ['Saving Throws', 'Athletics']
        },
        {
            name: 'Dexterity',
            skills: ['Saving Throws', 'Acrobatics', 'Sleight of Hand', 'Stealth']
        },
        {
            name: 'Constitution',
            skills: ['Saving Throws']
        },
        {
            name: 'Intelligence',
            skills: ['Saving Throws', 'Arcana', 'History', 'Investigation', 'Nature', 'Religion']
        },
        {
            name: 'Wisdom',
            skills: ['Saving Throws', 'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival']
        },
        {
            name: 'Charisma',
            skills: ['Saving Throws', 'Deception', 'Intimidation', 'Performance', 'Persuasion']
        }
    ];

    type AbilityMap = { [name: string]: Ability };

    export class Abilities {
        private _strength: Ability;
        private _dexterity: Ability;
        private _constitution: Ability;
        private _intelligence: Ability;
        private _wisdom: Ability;
        private _charisma: Ability;
        private abilitiesByName: AbilityMap;

        constructor(private dto: AbilitiesDto, private getProficiencyBonus: NumericGetter) {
            this.abilitiesByName = this.createAbilities();

            this._strength     = this.abilitiesByName['Strength'];
            this._dexterity    = this.abilitiesByName['Dexterity'];
            this._constitution = this.abilitiesByName['Constitution'];
            this._intelligence = this.abilitiesByName['Intelligence'];
            this._wisdom       = this.abilitiesByName['Wisdom'];
            this._charisma     = this.abilitiesByName['Charisma'];
        }

        private createAbilities(): AbilityMap {
            var abilities: AbilityMap = {};
            AbilityDefinitions.forEach(abilityDef => {
                var name = abilityDef.name;
                var dto = (this.dto[name] = this.dto[name] || {});
                var ability = new Ability(abilityDef, dto, this.getProficiencyBonus);
                abilities[name] = ability;
            });
            return abilities;
        }

        public setModifiers(modifiers: AbilityModifier[]) {
            angular.forEach(this.abilitiesByName, ability => ability.clearModifiers());
            modifiers.forEach(modifier => {
                var ability = this.abilitiesByName[modifier.ability];
                if (ability) {
                    ability.addModifier(modifier);
                }
            });
        }

        public get strength(): Ability {
            return this._strength;
        }
        public get dexterity(): Ability {
            return this._dexterity;
        }
        public get constitution(): Ability {
            return this._constitution;
        }
        public get intelligence(): Ability {
            return this._intelligence;
        }
        public get wisdom(): Ability {
            return this._wisdom;
        }
        public get charisma(): Ability {
            return this._charisma;
        }

        private getAbility(name: string){
            return this.abilitiesByName[name];
        }

        public get list(): Ability[] {
            return AbilityDefinitions.map(def => this.abilitiesByName[def.name]);
        }
    }

    export class ModificationInProgress {
        public currentValue: number;
        public timesProficiencyBonusApplied: number;

        constructor(public startValue: number, public isProficient: boolean, public proficiencyBonus: number) {
            this.currentValue = startValue;
            this.timesProficiencyBonusApplied = 0;
        }

        public applyProficiency(ignoreMultiple?: boolean) {
            if (ignoreMultiple || this.timesProficiencyBonusApplied < 1) {
                this.currentValue += this.proficiencyBonus;
            }
        }
    }

    export interface AbilityModifier {
        ability: string;
        skill?: string;
        apply(modification: ModificationInProgress): void;
    }

    export type AbilitiesDto = { [name: string]: AbilityDto };

    function ensureRange(score: number) {
        return score < 0 ? 0 : score > 20 ? 20 : score;
    }

    export class Ability {
        private _skills: Skill[];
        private _modifier: number;
        private skillModifiers: { [name: string]: AbilityModifier[] } = {};
        private abilityModifiers: AbilityModifier[] = [];

        constructor(
            private abilityDef: AbilityDefinition,
            private dto: AbilityDto,
            private getProficiencyBonus: NumericGetter) {
            dto.skills = dto.skills || {};
            this._skills = abilityDef.skills
                .map(name => ({ name: name, isProficient: false } as SkillDto))
                .map(skillDto => {
                    let skillName = skillDto.name;
                    dto.skills[skillName] = angular.extend(skillDto, dto.skills[skillName]);
                    // skillDto now contains the new information
                    return new Skill(skillDto, () =>
                        this.getModifier(skillName, skillDto.isProficient)
                    );
                });
            this.score = dto.score; // ensure complex setter is called
        }

        public addModifier(modifier: AbilityModifier) {
            if (modifier.ability === this.abilityDef.name) {
                if (!modifier.skill) {
                    this.abilityModifiers.push(modifier);
                } else if (this.skillModifiers[modifier.skill]) {
                    this.skillModifiers[modifier.skill].push(modifier);
                } else {
                    this.skillModifiers[modifier.skill] = [modifier];
                }
            }
        }

        public clearModifiers() {
            this.skillModifiers = {};
            this.abilityModifiers = [];
        }

        private getModifier(skillName: string, isProficient: boolean): number {
            var modification = new ModificationInProgress(this.modifier, isProficient, this.getProficiencyBonus());

            if (isProficient) {
                modification.applyProficiency();
            }

            var modifiers: AbilityModifier[] = this.skillModifiers[skillName] || [];

            modifiers.forEach(modifier => modifier.apply(modification));

            return modification.currentValue;
        }

        public get skills(): Skill[] {
            return this._skills.slice(); // Safe copy
        }

        public get score(): number | string {
            return ensureRange(this.dto.score);
        }

        // TODO ensure that when a user enters a too-high score, it reflects the change to the limit in the derived values
        public set score(score: number | string) {
            var scoreAsNumber: number;
            if (typeof score === 'string') {
                scoreAsNumber = parseInt(score);
                if (isNaN(scoreAsNumber)) {
                    scoreAsNumber = null;
                }
            } else {
                scoreAsNumber = ensureRange(score);
            }
            this.dto.score = scoreAsNumber;
            this._modifier = this.getAbilityModifier(scoreAsNumber);
        }

        private getAbilityModifier(score: number): number {
            return -5 + Math.floor(score / 2);
        }

        public get modifier(): number {
            var modification = new ModificationInProgress(this._modifier, false, 0); // No proficiency bonuses for abilities

            this.abilityModifiers.forEach(modifier => modifier.apply(modification));

            return modification.currentValue;
        }

        public get name(): string {
            return this.abilityDef.name;
        }

        public getSkill(skillName: string): Skill {
            for (var i = 0; i < this._skills.length; i++) {
                if (this._skills[i].name === skillName) {
                    return this._skills[i];
                }
            }
            return null;
        }
    }

    export class Skill {
        constructor(private dto: SkillDto, private getModifier: NumericGetter) {}

        public get name(): string {
            return this.dto.name;
        }

        public get isProficient(): boolean {
            return this.dto.isProficient;
        }
        public set isProficient(isProficient: boolean) {
            this.dto.isProficient = isProficient;
        }

        public get modifier(): number {
            return this.getModifier();
        }
    }

    export interface AbilityDto {
        score?: number;
        skills?: SkillDtoMap;
    }

    export type SkillDtoMap = { [name: string]: SkillDto; };

    export interface SkillDto {
        name: string;
        isProficient: boolean;
    }

    type NumericGetter = () => number;
}
module Entities {
    export class Abilities {
        private _strength: Ability;
        private _dexterity: Ability;
        private _constitution: Ability;
        private _intelligence: Ability;
        private _wisdom: Ability;
        private _charisma: Ability;
        private abilitiesByName: { [name: string]: Ability };

        constructor(private dto: AbilitiesDto, private getProficiencyBonus: NumericGetter) {
            this.abilitiesByName = {};

            this._strength     = this.getOrCreateAbility('Strength',     'Athletics');
            this._dexterity    = this.getOrCreateAbility('Dexterity',    'Acrobatics', 'Sleight of Hand', 'Stealth');
            this._constitution = this.getOrCreateAbility('Constitution', 'Acrobatics', 'Sleight of Hand', 'Stealth');
            this._intelligence = this.getOrCreateAbility('Intelligence', 'Arcana', 'History', 'Investigation', 'Nature', 'Religion');
            this._wisdom       = this.getOrCreateAbility('Wisdom',       'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival');
            this._charisma     = this.getOrCreateAbility('Charisma',     'Deception', 'Intimidation', 'Performance', 'Persuasion');
        }

        private getOrCreateAbility(name: string, ...skillNames: string[]) {
            var dto = (this.dto[name] = this.dto[name] || {});
            var ability = new Ability(name, this.getProficiencyBonus, dto, ...skillNames);
            this.abilitiesByName[name] = ability;
            return ability;
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
            return [
                this.strength, this.dexterity, this.constitution, this.intelligence, this.wisdom, this.charisma
            ];
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

    export interface SkillModifier {
        ability: string;
        skill: string
        apply(modification: ModificationInProgress): void;
    }

    export type AbilitiesDto = { [name: string]: AbilityDto };

    function ensureRange(score: number) {
        return score < 0 ? 0 : score > 20 ? 20 : score;
    }

    export class Ability {
        private _skills: Skill[];
        private _modifier: number;
        private skillModifiers: { [name: string]: SkillModifier[] } = {};

        constructor(
            private _name: string,
            private getProficiencyBonus: NumericGetter,
            private dto: AbilityDto,
            ...skillNames: String[]) {
            dto.skills = dto.skills || {};
            this._skills = ['Saving Throws'].concat(skillNames as string[])
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

        public addSkillModifier(modifier: SkillModifier) {
            if (modifier.ability === this._name) {
                if (this.skillModifiers[modifier.skill]) {
                } else {
                    this.skillModifiers[modifier.skill] = [modifier];
                }
            }
        }

        private getModifier(skillName: string, isProficient: boolean): number {
            var modification = new ModificationInProgress(this.modifier, isProficient, this.getProficiencyBonus());

            if (isProficient) {
                modification.applyProficiency();
            }

            var modifiers: SkillModifier[] = this.skillModifiers[skillName] || [];

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
            return this._modifier;
        }

        public get name(): string {
            return this._name;
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
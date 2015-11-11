module Entities {
    export class Abilities {
        private _strength: Ability;
        private _dexterity: Ability;
        private _constitution: Ability;
        private _intelligence: Ability;
        private _wisdom: Ability;
        private _charisma: Ability;

        constructor(private dto: AbilitiesDto, private getProficiencyBonus: NumericGetter) {
            this._strength = strength(getProficiencyBonus, this.getDto('strength')),
            this._dexterity = dexterity(getProficiencyBonus, this.getDto('dexterity')),
            this._constitution = constitution(getProficiencyBonus, this.getDto('constitution')),
            this._intelligence = intelligence(getProficiencyBonus, this.getDto('intelligence')),
            this._wisdom = wisdom(getProficiencyBonus, this.getDto('wisdom')),
            this._charisma = charisma(getProficiencyBonus, this.getDto('charisma'))
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

        private getDto(name): AbilityDto {
            if (!this.dto[name]) {
                this.dto[name] = {};
            }
            return this.dto[name];
        }

        public get list(): Ability[] {
            return [
                this.strength, this.dexterity, this.constitution, this.intelligence, this.wisdom, this.charisma
            ];
        }
    }

    export type AbilitiesDto = { [name: string]: AbilityDto };

    function strength(getProficiencyBonus: NumericGetter, dto: AbilityDto): Ability {
        return new Ability('Strength', getProficiencyBonus, dto, 'Athletics');
    }

    function dexterity(getProficiencyBonus: NumericGetter, dto: AbilityDto) {
        return new Ability('Dexterity', getProficiencyBonus, dto, 'Acrobatics', 'Sleight of Hand', 'Stealth');
    }

    function constitution(getProficiencyBonus: NumericGetter, dto: AbilityDto) {
        return new Ability('Constitution', getProficiencyBonus, dto, 'Acrobatics', 'Sleight of Hand', 'Stealth');
    }

    function intelligence(getProficiencyBonus: NumericGetter, dto: AbilityDto) {
        return new Ability('Intelligence', getProficiencyBonus, dto, 'Arcana', 'History', 'Investigation', 'Nature', 'Religion');
    }

    function wisdom(getProficiencyBonus: NumericGetter, dto: AbilityDto) {
        return new Ability('Wisdom', getProficiencyBonus, dto, 'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival');
    }

    function charisma(getProficiencyBonus: NumericGetter, dto: AbilityDto) {
        return new Ability('Charisma', getProficiencyBonus, dto, 'Deception', 'Intimidation', 'Performance', 'Persuasion');
    }

    export class Ability {
        private _skills: Skill[];
        private _modifier: number;

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

        private getModifier(skillName: string, isProficient: boolean): number {
            // TODO perform a lookup on the skill name
            return this._modifier + (isProficient ? this.getProficiencyBonus() : 0);
        }

        public get skills(): Skill[] {
            return this._skills.slice(); // Safe copy
        }

        public get score(): number | string {
            return this.dto.score;
        }

        public set score(score: number | string) {
            var scoreAsNumber: number;
            if (typeof score === 'string') {
                scoreAsNumber = parseInt(score);
                if (isNaN(scoreAsNumber)) {
                    scoreAsNumber = null;
                }
            } else {
                scoreAsNumber = score;
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
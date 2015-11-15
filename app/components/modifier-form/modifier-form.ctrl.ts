/// <reference path="../inventory/inventory.ctrl.ts" />
/// <reference path="../../entities/ability.ts" />

module CharacterBuilder.AbilityForm {
    import ModifierDto = CharacterBuilder.Inventory.ModifierDto;
    import AbilityDefinitions = Entities.AbilityDefinitions;

    interface ModifierChoice {
        label: string;
        ability: string;
        skill?: string;
    }

    export class ModifierFormDirectiveController {
        public onComplete: (data: { modifier: ModifierDto }) => void ;

        public selectedModifier: ModifierChoice;
        public options: {
            isProficiencyModifier?: boolean;
            canStackProficiency?: boolean;
            amount?: number;
        };

        public modifierChoices: ModifierChoice[];

        constructor() {
            this.modifierChoices = [];
            AbilityDefinitions.forEach(abilityDef => {
                this.modifierChoices.push({
                    label: abilityDef.name,
                    ability: abilityDef.name
                });
                abilityDef.skills.forEach(skillName => {
                    this.modifierChoices.push({
                        label: `- ${skillName}`,
                        ability: abilityDef.name,
                        skill: skillName
                    });
                })
            });
        }

        public onSubmit() {
            if (!this.selectedModifier) {
                return;
            }
            var isSkill = !!this.selectedModifier.skill;
            var modifierDto: ModifierDto = {
                ability: this.selectedModifier.ability,
                skill: this.selectedModifier.skill,
                amount: isSkill && this.options.isProficiencyModifier ? 0 : this.options.amount,
                isProficiencyModifier: isSkill && !!this.options.isProficiencyModifier,
                canStackProficiency: isSkill && !!this.options.isProficiencyModifier && !!this.options.canStackProficiency
            }
            this.onComplete({modifier: modifierDto});

            this.selectedModifier = null;
            this.options = {};
        }
    }

    angular.module('characterBuilderApp')
        .controller('ModifierFormDirectiveController', ModifierFormDirectiveController);
}
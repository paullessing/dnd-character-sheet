module CharacterBuilder.Inventory {
    import SkillModifier = Entities.SkillModifier;
    import ModificationInProgress = Entities.ModificationInProgress;

    export function fromSkillModifierDto(dto: SkillModifierDto): SkillModifier {
        var apply: (m: ModificationInProgress) => void;
        if (dto.isProficiencyModifier) {
            var stackProficiency = dto.canStackProficiency;
            apply = m => {
                m.applyProficiency(stackProficiency);
            }
        } else {
            var amount = dto.amount;
            apply = m => {
                m.currentValue += amount;
            }
        }

        return {
            ability: dto.ability,
            skill: dto.skill,
            apply: apply
        }
    }

    export interface SkillModifierDto {
        isProficiencyModifier?: boolean;
        canStackProficiency?: boolean;
        ability: string;
        skill: string;
        amount?: number;
    }

    export interface AbilityModifierDto {
        ability: string;
        amount: number;
    }
}
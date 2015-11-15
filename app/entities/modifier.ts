module CharacterBuilder.Inventory {
    import AbilityModifier = Entities.AbilityModifier;
    import ModificationInProgress = Entities.ModificationInProgress;

    export function fromModifierDto(dto: ModifierDto): AbilityModifier {
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

    export interface ModifierDto {
        isProficiencyModifier?: boolean;
        canStackProficiency?: boolean;
        ability: string;
        skill?: string;
        amount?: number;
    }
}
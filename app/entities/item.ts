module Entities {

    export class Item {
        private _modifiers: AbilityModifier[] = [];

        constructor(public dto: ItemDto) {
            if (dto.modifiers) {
                this._modifiers = dto.modifiers.map(fromModifierDto);
            }
        }

        public get name(): string {
            return this.dto.name;
        }

        public get weight(): number {
            return this.dto.weight;
        }

        public get modifiers(): AbilityModifier[] {
            return this._modifiers.slice(); // Defensive copy
        }
    }

    export interface ItemDto {
        name: string;
        weight: number;
        modifiers?: ModifierDto[];
    }
}
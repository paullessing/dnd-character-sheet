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

    type OwnedItemListener = (item: OwnedItem) => void;

    export interface ItemDto {
        name: string;
        weight: number;
        modifiers?: ModifierDto[];
    }

    export class OwnedItem extends Item {
        private countUpdateListeners: OwnedItemListener[] = [];

        constructor(public _dto: OwnedItemDto) {
            super(_dto.itemDto);
        }

        public get count(): number {
            return this._dto.count;
        }

        public set count(count: number) {
            this._dto.count = Math.max(count, 0);
            this.countUpdateListeners.forEach(listener => listener(this));
        }

        public addCountUpdateListener(listener: OwnedItemListener) {
            this.countUpdateListeners.push(listener);
        }
    }

    export interface OwnedItemDto {
        itemDto: ItemDto;
        count: number;
    }
}
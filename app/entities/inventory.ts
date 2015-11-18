/// <reference path="modifier.ts" />
/// <reference path="item.ts"/>

module Entities {
    import OwnedWeapon = Entities.Weapons.OwnedWeapon;
    import Amount = Finance.Amount;
    import ModifierDto = Entities.ModifierDto;
    import fromModifierDto = Entities.fromModifierDto;

    export class Inventory {
        private _items: OwnedItem[];

        constructor(private dto: InventoryDto, private onModifiersChanged: () => void) {
            this._items = (dto.items = dto.items || []).map(itemDto => {
                var item = new OwnedItem(itemDto);
                item.addCountUpdateListener(item => this.onCountUpdate(item));
                return item;
            });
            if (!dto.wallet) {
                dto.wallet = {};
            }
        }

        private onCountUpdate(item: OwnedItem) {
            if (item.count > 0) {
                return;
            }
            var index = this._items.indexOf(item);
            if (index >= 0) {
                this._items.splice(index, 1);
                this.dto.items.splice(index, 1);
                if (item.modifiers && item.modifiers.length) {
                    this.onModifiersChanged();
                }
            }
        }

        public get wallet(): Amount {
            if (!this.dto.wallet) {
                this.dto.wallet = {};
            }
            return this.dto.wallet;
        }
        public set wallet(wallet: Amount) {
            this.dto.wallet = wallet;
        }

        public weapons: OwnedWeapon[] = [];

        public get items(): Item[] {
            return this._items.slice(); // Defensive copy
        }

        public addItem(item: OwnedItem) {
            this.dto.items.push(item._dto);
            this._items.push(item);
            item.addCountUpdateListener(item => this.onCountUpdate(item));
            if (item.modifiers && item.modifiers.length) {
                this.onModifiersChanged(); // TODO investigate the flux pattern
            }
        }

        public get skillModifiers(): AbilityModifier[] {
            var modifiers: AbilityModifier[] = [];
            return [].concat.apply([], this._items.map(item => item.modifiers)); // flatMap
        }
    }

    export interface InventoryDto {
        items?: OwnedItemDto[];
        wallet?: Amount;
    }
}
/// <reference path="modifier.ts" />
/// <reference path="item.ts"/>

module Entities {
    import OwnedWeapon = Entities.Weapons.OwnedWeapon;
    import Amount = Finance.Amount;
    import ModifierDto = Entities.ModifierDto;
    import fromModifierDto = Entities.fromModifierDto;

    export class Inventory {
        private _items: InventoryItem[];

        constructor(private dto: InventoryDto, private onModifiersChanged: () => void) {
            this._items = (dto.items = dto.items || []).map(itemDto => new InventoryItem(itemDto));
            if (!dto.wallet) {
                dto.wallet = {};
            }
        }

        public updateCount(inventoryItem: InventoryItem, count: number) {
            var index = this._items.indexOf(inventoryItem);
            if (index >= 0) {
                if (count <= 0) {
                    this._items.splice(index, 1);
                    this.dto.items.splice(index, 1);
                    if (inventoryItem.item.modifiers && inventoryItem.item.modifiers.length) {
                        this.onModifiersChanged();
                    }
                } else {
                    this.dto.items[index].count = count;
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

        public get items(): InventoryItem[] {
            return this._items.slice(); // Defensive copy
        }

        public addItem(item: Item, count: number) {
            var dto: InventoryItemDto = {
                itemDto: item.dto,
                count: count
            };
            var inventoryItem = new InventoryItem(dto)
            this.dto.items.push(dto);
            this._items.push(inventoryItem);
            if (item.modifiers && item.modifiers.length) {
                this.onModifiersChanged(); // TODO investigate the flux pattern
            }
        }

        public get skillModifiers(): AbilityModifier[] {
            var modifiers: AbilityModifier[] = [];
            return [].concat.apply([], this._items.map(inventoryItem => inventoryItem.item.modifiers)); // flatMap
        }
    }

    export interface InventoryDto {
        items?: InventoryItemDto[];
        wallet?: Amount;
    }

    export class InventoryItem {
        private _item: Item;

        constructor(public dto: InventoryItemDto) {
            this._item = new Item(dto.itemDto);
        }

        public get count(): number {
            return this.dto.count;
        }

        public get item(): Item {
            return this._item;
        }
    }

    export interface InventoryItemDto {
        itemDto: ItemDto;
        count: number;
    }
}
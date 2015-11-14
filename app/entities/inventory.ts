module Entities {
    import OwnedWeapon = Entities.Weapons.OwnedWeapon;
    import Amount = Finance.Amount;

    export class Inventory {
        private _items: Item[];

        constructor(private dto: InventoryDto) {
            this._items = (dto.items = dto.items || []).map(itemDto => {
                var item = new Item(itemDto);
                item.addCountUpdateListener(item => this.onCountUpdate(item));
                return item;
            });
            if (!dto.wallet) {
                dto.wallet = {};
            }
        }

        private onCountUpdate(item: Item) {
            if (item.count > 0) {
                return;
            }
            var index = this._items.indexOf(item);
            if (index >= 0) {
                this._items.splice(index, 1);
                this.dto.items.splice(index, 1);
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
        };

        public addItem(item: Item) {
            this.dto.items.push(item.dto);
            this._items.push(item);
            item.addCountUpdateListener(item => this.onCountUpdate(item));
        }
    }


    export class Item {
        private countUpdateListeners: ItemListener[] = [];

        constructor(public dto: ItemDto) {
        }

        public get name(): string {
            return this.dto.name;
        }

        public get weight(): number {
            return this.dto.weight;
        }

        public get count(): number {
            return this.dto.count;
        }

        public set count(count: number) {
            this.dto.count = Math.max(count, 0);
            this.countUpdateListeners.forEach(listener => listener(this));
        }

        public addCountUpdateListener(listener: ItemListener) {
            this.countUpdateListeners.push(listener);
        }
    }

    type ItemListener = (item: Item) => void;

    export interface ItemDto {
        name: string;
        weight: number;
        count: number;
    }

    export interface InventoryDto {
        items?: ItemDto[];
        wallet?: Amount;
    }
}
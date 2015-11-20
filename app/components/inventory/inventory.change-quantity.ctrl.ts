/// <reference path="../../entities/item.ts" />
/// <reference path="../../entities/inventory.ts" />

module CharacterBuilder.Modal {
    import ItemDto = Entities.ItemDto;
    import InventoryItem = Entities.InventoryItem;
    import Item = Entities.Item;
    export class ChangeQuantityModalController {

        public item: Item;
        public count: number;

        static $inject = ['modalWindow', 'modalWindowValues'];
        constructor(private modalWindow: ModalWindow<number>, modalWindowValues: any) {
            var inventoryItem = modalWindowValues.item;
            this.item = inventoryItem.item;
            this.count = inventoryItem.count;
        }

        public submit() {
            this.modalWindow.complete(this.count);
        }

        public close() {
            this.modalWindow.abort();
        }

        public change(amount: number, andSubmit?: boolean) {
            this.count = Math.max(0, this.count + amount);
            if (andSubmit) {
                this.submit();
            }
        }
    }

    angular.module('characterBuilderApp')
        .controller('ChangeQuantityModalController', ChangeQuantityModalController);
}
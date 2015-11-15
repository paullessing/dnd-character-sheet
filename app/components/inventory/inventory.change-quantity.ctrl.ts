/// <reference path="../../entities/inventory.ts" />

module CharacterBuilder.Modal {
    import ItemDto = Entities.ItemDto;
    import Item = Entities.Item;
    export class ChangeQuantityModalController {

        public item: Item;
        public count: number;

        static $inject = ['modalWindow', 'modalWindowValues'];
        constructor(private modalWindow: ModalWindow<number>, modalWindowValues: any) {
            this.item = modalWindowValues.item;
            this.count = this.item.count;
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
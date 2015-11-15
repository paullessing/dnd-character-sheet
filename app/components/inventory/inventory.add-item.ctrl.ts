/// <reference path="../../entities/inventory.ts" />

module CharacterBuilder.Modal {
    import ItemDto = Entities.ItemDto;
    import Item = Entities.Item;
    export class AddItemModalController {

        public item: ItemDto = {
            name: null,
            weight: null,
            count: 1
        };

        static $inject = ['modalWindow'];
        constructor(private modalWindow: ModalWindow<Item>) {
        }

        public submit() {
            this.modalWindow.complete(new Item(this.item));
        }

        public close() {
            this.modalWindow.abort();
        }
    }

    angular.module('characterBuilderApp')
        .controller('AddItemModalController', AddItemModalController);
}
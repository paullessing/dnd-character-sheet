/// <reference path="../../entities/inventory.ts" />

module CharacterBuilder.Modal {
    import ItemDto = Entities.ItemDto;
    import Item = Entities.Item;
    import ModifierDto = CharacterBuilder.Inventory.ModifierDto;
    export class AddItemModalController {

        public modifiers: ModifierDto[] = [];

        public item: ItemDto = {
            name: null,
            weight: null,
            count: 1,
            modifiers: []
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

        public addModifier(modifier: ModifierDto) {
            this.item.modifiers.push(modifier);
        }
    }

    angular.module('characterBuilderApp')
        .controller('AddItemModalController', AddItemModalController);
}
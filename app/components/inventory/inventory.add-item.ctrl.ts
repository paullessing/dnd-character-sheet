/// <reference path="../../entities/item.ts"/>
/// <reference path="inventory-entities.ts"/>

module CharacterBuilder.Modal {
    import ModifierDto = Entities.ModifierDto;
    import Item = Entities.Item;
    import ItemAndCount = CharacterBuilder.Inventory.ItemAndCount;

    export class AddItemModalController {

        public modifiers: ModifierDto[] = [];

        public item = {
            name: null,
            weight: 0,
            count: 1,
            modifiers: []
        }

        static $inject = ['modalWindow'];
        constructor(private modalWindow: ModalWindow<ItemAndCount>) {
        }

        public submit() {
            this.modalWindow.complete({
                item: new Item({
                    name: this.item.name,
                    weight: this.item.weight,
                    modifiers: this.item.modifiers
                }),
                count: this.item.count
            });
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
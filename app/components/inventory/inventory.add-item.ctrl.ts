/// <reference path="../../entities/item.ts"/>

module CharacterBuilder.Modal {
    import OwnedItem = Entities.OwnedItem;
    import OwnedItemDto = Entities.OwnedItemDto;
    import ModifierDto = Entities.ModifierDto;

    export class AddItemModalController {

        public modifiers: ModifierDto[] = [];

        public item = {
            name: null,
            weight: 0,
            count: 1,
            modifiers: []
        }

        static $inject = ['modalWindow'];
        constructor(private modalWindow: ModalWindow<OwnedItem>) {
        }

        public submit() {
            this.modalWindow.complete(new OwnedItem({
                itemDto: {
                    name: this.item.name,
                    weight: this.item.weight,
                    modifiers: this.item.modifiers
                },
                count: this.item.count
            }));
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
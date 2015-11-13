///<reference path="inventory.ctrl.ts"/>

module CharacterBuilder.Modal {
    export class AddItemModalController {
        static $inject = ['modalWindow'];
        constructor(private modalWindow: ModalWindow<void>) {
        }

        public submit() {
            this.modalWindow.complete();
        }

        public close() {
            this.modalWindow.abort();
        }
    }

    angular.module('characterBuilderApp')
        .controller('AddItemModalController', AddItemModalController);
}
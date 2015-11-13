/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/inventory.ts" />
/// <reference path="../../entities/weapon.ts" />
/// <reference path="../modal-window/modal-window.service.ts" />

module CharacterBuilder.Inventory {
    import Character = Entities.Character;
    import Inventory = Entities.Inventory;
    import ModalWindow = CharacterBuilder.Modal.ModalWindow;
    import ModalWindowService = CharacterBuilder.Modal.ModalWindowService;
    import AddItemModalController = CharacterBuilder.Modal.AddItemModalController;

    export class InventoryDirectiveController {
        //constructor(private inventoryAddItemModal: angularModal.AngularModal) {}
        constructor(private modalWindowService: ModalWindowService) {}

        public openAddItem() {
            this.modalWindowService.createModal({
                controller: 'AddItemModalController',
                controllerAs: 'vm',
                templateUrl: 'components/inventory/inventory.add-item.tpl.html'
            }).show().then(() => {
                console.log("Done");
            }, () => {
                console.log("Failed");
            });
        }
    }

    interface NewItem {
        name?: string;
        count?: number;
    }
}
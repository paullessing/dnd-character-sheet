/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/inventory.ts" />
/// <reference path="../../entities/weapon.ts" />
/// <reference path="../modal-window/modal-window.service.ts" />
/// <reference path="inventory.change-quantity.ctrl.ts" />
/// <reference path="inventory.add-item.ctrl.ts" />

module CharacterBuilder.Inventory {
    import Item = Entities.Item;
    import Character = Entities.Character;
    import Inventory = Entities.Inventory;
    import ModalWindow = CharacterBuilder.Modal.ModalWindow;
    import ModalWindowService = CharacterBuilder.Modal.ModalWindowService;
    import AddItemModalController = CharacterBuilder.Modal.AddItemModalController;
    import ChangeQuantityModalController = CharacterBuilder.Modal.ChangeQuantityModalController;

    export class InventoryDirectiveController {
        public character: Character;

        constructor(private modalWindowService: ModalWindowService) {}

        public openAddItem() {
            this.modalWindowService.createModal<Item>({
                controller: AddItemModalController,
                controllerAs: 'vm',
                templateUrl: 'components/inventory/inventory.add-item.tpl.html'
            }).show().then((item: Item) => {
                this.character.inventory.addItem(item);
                console.log("Done");
            }, () => {
                console.log("Failed");
            });
        }

        public editCount(item: Item) {
            this.modalWindowService.createModal<number>({
                controller: ChangeQuantityModalController,
                controllerAs: 'vm',
                templateUrl: 'components/inventory/inventory.change-quantity.tpl.html',
                values: { item: item }
            }).show().then(newCount => {
                item.count = newCount;
            });
        }
    }

    interface NewItem {
        name?: string;
        count?: number;
    }
}
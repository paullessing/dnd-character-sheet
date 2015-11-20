/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/inventory.ts" />
/// <reference path="../../entities/item.ts" />
/// <reference path="../../entities/weapon.ts" />
/// <reference path="../modal-window/modal-window.service.ts" />
/// <reference path="inventory.change-quantity.ctrl.ts" />
/// <reference path="inventory.add-item.ctrl.ts" />
/// <reference path="inventory-entities.ts"/>

module CharacterBuilder.Inventory {
    import Item = Entities.Item;
    import Character = Entities.Character;
    import Inventory = Entities.Inventory;
    import ModalWindow = CharacterBuilder.Modal.ModalWindow;
    import ModalWindowService = CharacterBuilder.Modal.ModalWindowService;
    import AddItemModalController = CharacterBuilder.Modal.AddItemModalController;
    import ChangeQuantityModalController = CharacterBuilder.Modal.ChangeQuantityModalController;
    import InventoryItem = Entities.InventoryItem;

    export class InventoryDirectiveController {
        public character: Character;

        constructor(private modalWindowService: ModalWindowService) {}

        public openAddItem() {
            this.modalWindowService.createModal<ItemAndCount>({
                controller: AddItemModalController,
                controllerAs: 'vm',
                templateUrl: 'components/inventory/inventory.add-item.tpl.html'
            }).show().then((itemAndCount: ItemAndCount) => {
                this.character.inventory.addItem(itemAndCount.item, itemAndCount.count);
                console.log("Done");
            }, () => {
                console.log("Failed");
            });
        }

        public editCount(item: InventoryItem) {
            this.modalWindowService.createModal<number>({
                controller: ChangeQuantityModalController,
                controllerAs: 'vm',
                templateUrl: 'components/inventory/inventory.change-quantity.tpl.html',
                values: { item: item }
            }).show().then(newCount => {
                this.character.inventory.updateCount(item, newCount);
            });
        }
    }

    interface NewItem {
        name?: string;
        count?: number;
    }
}
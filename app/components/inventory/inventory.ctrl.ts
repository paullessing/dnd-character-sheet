/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/inventory.ts" />
/// <reference path="../../entities/weapon.ts" />

module CharacterBuilder.Inventory {
    import Character = Entities.Character;
    import Inventory = Entities.Inventory;

    export class InventoryDirectiveController {
        constructor(private inventoryAddItemModal: angularModal.AngularModal) {}

        public openAddItem() {
            this.inventoryAddItemModal.activate();
        }
    }

    interface NewItem {
        name?: string;
        count?: number;
    }
}
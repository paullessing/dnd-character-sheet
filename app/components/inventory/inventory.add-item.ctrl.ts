module CharacterBuilder.Inventory {
    export class AddItemModalController {
        constructor(private inventoryAddItemModal: angularModal.AngularModal) {}

        public close() {
            this.inventoryAddItemModal.deactivate();
        }
    }
}
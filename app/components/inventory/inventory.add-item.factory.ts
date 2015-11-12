module CharacterBuilder.Inventory {
    export function AddItemModalFactory(btfModal: angularModal.AngularModalFactory) {
        return btfModal({
            controller: AddItemModalController,
            controllerAs: 'vm',
            templateUrl: 'components/inventory/inventory.add-item.tpl.html'
        });
    }

    angular.module('characterBuilderApp')
        .factory('inventoryAddItemModal', ['btfModal', AddItemModalFactory]);
}
///<reference path="inventory.ctrl.ts"/>

module CharacterBuilder.Inventory {
    import Item = Entities.Item;

    export interface ItemAndCount {
        item: Item;
        count: number;
    }
}
module Entities {
    import Amount = Finance.Amount;
    import OwnedWeapon = Entities.Weapons.OwnedWeapon;

    export class Inventory {
        public money: Amount = {};
        public weapons: OwnedWeapon[] = [];
    }
}
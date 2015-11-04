/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/inventory.ts" />
/// <reference path="../../entities/weapon.ts" />

module CharacterBuilder.WeaponsList {
    import IScope = angular.IScope;
    import Character = Entities.Character;
    import Inventory = Entities.Inventory;
    import Weapons = Entities.Weapons;
    import Weapon = Weapons.Weapon;
    import OwnedWeapon = Entities.Weapons.OwnedWeapon;

    export class WeaponsListDirectiveController {
        constructor() { console.log(Weapons.StandardWeapons)};

        public character: Character;

        public weaponChoices = Weapons.StandardWeapons;

        public newWeapon: Weapon;

        public get inventory(): Inventory {
            return this.character.inventory;
        }

        public addWeapon() {
            this.inventory.weapons.push(new OwnedWeapon(this.newWeapon));
            this.newWeapon = null;
        }
    }
}
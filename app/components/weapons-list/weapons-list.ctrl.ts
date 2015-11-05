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

        public newWeapon: NewWeapon;

        public get inventory(): Inventory {
            return this.character.inventory;
        }


        public onWeaponKeypress(event: JQueryEventObject) {
            if (event.keyCode === 13) {
                if (this.newWeapon.weapon && this.newWeapon.damage && this.newWeapon.attackBonus) {
                    this.addWeapon();
                    event.preventDefault();
                }
            }
        }

        public addWeapon() {
            var weapon = new OwnedWeapon(this.newWeapon.weapon);
            weapon.attackBonus = this.newWeapon.attackBonus;
            weapon.damage = this.newWeapon.damage;
            this.inventory.weapons.push(weapon);
            this.newWeapon = {};
        }
    }

    interface NewWeapon {
        weapon?: Weapon;
        attackBonus?: number;
        damage?: string;
    }
}
/// <reference path="./finance.ts" />

module Entities.Weapons {
    import Amount = Finance.Amount;

    export class Weapon {
        constructor(public name: string, public weight: number, ..._properties: Property[]) {
            this.properties = _properties;
        }
        public properties: Property[];
    }

    export class OwnedWeapon {
        constructor(public weapon: Weapon) {}

        public attackBonus: number;
        public damage: string;
    }

    export enum Property {
        Ammunition,
        Finesse,
        Heavy,
        Light,
        Loading,
        Range,
        Reach,
        Special,
        Thrown,
        TwoHanded,
        Versatile
    }

    export const StandardWeapons = {
        Club:          new Weapon("Club",            2,  Property.Light),
        Dagger:        new Weapon("Dagger",          1,  Property.Finesse, Property.Light, Property.Thrown),
        Greatclub:     new Weapon("Greatclub",       10, Property.TwoHanded),
        Handaxe:       new Weapon("Handaxe",         2,  Property.Light, Property.Thrown),
        Javelin:       new Weapon("Javelin",         2,  Property.Thrown),
        LightHammer:   new Weapon("Light Hammer",    2,  Property.Light, Property.Thrown),
        Mace:          new Weapon("Mace",            4),
        Quarterstaff:  new Weapon("Quarterstaff",    4,  Property.Versatile),
        Sickle:        new Weapon("Sickle",          2,  Property.Light),
        Spear:         new Weapon("Spear",           3,  Property.Thrown, Property.Versatile),
        LightCrossbow: new Weapon("Crossbow, light", 5,  Property.Ammunition, Property.Loading, Property.TwoHanded),
        Dart:          new Weapon("Dart",            0.25, Property.Finesse, Property.Thrown),
        Shortbow:      new Weapon("Shortbow",        2,  Property.Ammunition, Property.TwoHanded),
        Sling:         new Weapon("Sling",           0,  Property.Ammunition)
    };
}
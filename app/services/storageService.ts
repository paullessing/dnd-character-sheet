/// <reference path="../entities/character.ts" />
/// <reference path="../entities/ability.ts" />
/// <reference path="../entities/alignment.ts" />

module Services {
    import Character = Entities.Character;
    import Skill = Entities.Skill;
    import Inventory = Entities.Inventory;

    export class StorageService {
        static $inject = ['$localStorage'];

        constructor(private $localStorage: any) {}

        public hasStored(): boolean {
            return false;
        }
        public save(character: Character): void {
            this.$localStorage.character = character.getDto();
            console.log("Stored:", character.getDto());
        }

        public load(): Character {
            try {
                var dto = this.$localStorage.character || {};
                return new Character(dto);
            } catch (e) {
                console.warn(e);
                return new Character();
            }
        }
    }

    angular.module('characterBuilderApp')
    .service('StorageService', StorageService);
}
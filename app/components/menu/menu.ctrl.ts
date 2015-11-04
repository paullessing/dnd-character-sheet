/// <reference path="../../entities/character.ts" />

module CharacterBuilder.Menu {
    import Character = Entities.Character;
    import StorageService = Services.StorageService;

    export class MenuDirectiveController {
        static $inject = ['StorageService'];

        constructor(
            private StorageService: StorageService
        ) {}

        public character: Character;
        public isValid: () => boolean;

        public save() {
            if (this.isValid()) {
                this.StorageService.save(this.character);
            } else {
                console.log("Not valid");
            }
        }
    }
}
/// <reference path="../../entities/character.ts" />

module CharacterBuilder.Menu {
    import Character = Entities.Character;

    export class MenuDirectiveController {
        public character: Character;
        public isValid: () => boolean;

        public save() {
            if (this.isValid()) {
                // TODO delegate to a service to serialise, and deserialise
                console.log(JSON.stringify(this.character));
            } else {
                console.log("Not valid");
            }
        }
    }
}
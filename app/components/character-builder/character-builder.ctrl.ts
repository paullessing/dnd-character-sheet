/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/alignment.ts" />

module CharacterBuilder {
    import Character = Entities.Character;
    export class CharacterBuilderController {
        public character = new Character();

        public alignments = Entities.AlignmentNames;
    }
}
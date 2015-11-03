/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/alignment.ts" />

module CharacterBuilder {
    import Character = Entities.Character;
    import IScope = angular.IScope;
    import IFormController = angular.IFormController;

    export class CharacterBuilderController {
        constructor(private $scope: CharacterBuilderScope) {}

        public character = new Character();

        public alignments = Entities.AlignmentNames;

        public isFormValid() {
            return this.$scope.characterBuilder.$valid;
        }
    }

    interface CharacterBuilderScope extends IScope {
        characterBuilder: IFormController;
    }
}
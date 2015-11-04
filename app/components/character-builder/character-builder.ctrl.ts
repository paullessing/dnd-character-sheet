/// <reference path="../../entities/character.ts" />
/// <reference path="../../entities/alignment.ts" />

module CharacterBuilder {
    import Character = Entities.Character;
    import IScope = angular.IScope;
    import IFormController = angular.IFormController;
    import StorageService = Services.StorageService;

    export class CharacterBuilderController {
        static $inject = ['$scope', 'StorageService'];
        public character;

        constructor(private $scope: CharacterBuilderScope, private StorageService: StorageService) {
            this.character = this.StorageService.load();
        }

        public alignments = Entities.AlignmentNames;

        public isFormValid() {
            return this.$scope.characterBuilder.$valid;
        }
    }

    interface CharacterBuilderScope extends IScope {
        characterBuilder: IFormController;
    }
}
module CharacterBuilder.SkillGroup {
    import IScope = angular.IScope;
    import Ability = Entities.Ability;

    export class SkillGroupDirectiveController {
        constructor(private $scope: IScope) {
        }

        public label: string;
        public points: string;
        public skill: Ability;
    }
}
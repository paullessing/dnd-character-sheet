/// <reference path="../../entities/character.ts" />

module CharacterBuilder.DeathSaves {
    import IScope = angular.IScope;
    import DeathSaves = Entities.DeathSaves;

    export class DeathSavesDirectiveController {
        public deathSaves: DeathSaves;

        public properties = [
            new DeathSavesProperty(this.deathSaves, true, 'Successes'),
            new DeathSavesProperty(this.deathSaves, false, 'Failures'),
        ]
    }

    class DeathSavesProperty {
        constructor(private deathSaves: DeathSaves, public isSuccess: boolean, public label: string) {}

        public values: boolean[] = [false, false, false];
        public repeater: number[] = this.values.map((x, i) => i); // Use indexes

        public onChange(index) {
            for (var i = 0; i < this.values.length; i++) {
                if (i !== index) {
                    this.values[i] = i < index;
                }
            }
            var modelValue = index + (this.values[index] ? 1 : 0);
            if (this.isSuccess) {
                this.deathSaves.success = modelValue;
            } else {
                this.deathSaves.failure = modelValue;
            }
        }
    }
}
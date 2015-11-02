module Entities {
    export class Ability {
        constructor(public name: string, ...skills: string[]) {
            this._skills = [new Skill("Saving Throws")].concat(skills.map(name => new Skill(name)));
        }

        private _pointsString: string;
        private _points: number;
        private _modifier: number;
        private _skills: Skill[];

        public set points(points: string) {
            if (points === this._pointsString) {
                return; // Nothing to do here
            }
            this._pointsString = points;
            this._points = Ability.parsePoints(this._pointsString);
            this._modifier = this.getModifier();
        }

        public get points(): string {
            return this._pointsString;
        }

        private static parsePoints(pointsString: string): number {
            var regex = /^([0-9]+)(?:(\+|-)([0-9]+))?$/g;
            var match = regex.exec(pointsString);
            if (!match) {
                return null;
            } else if (!match[2]) {
                // No + or -
                return this.ensureRange(parseInt(match[1]));
            } else {
                var modifier = (match[2] === '+') ? 1 : -1;
                return this.ensureRange(parseInt(match[1]) + modifier * parseInt(match[3]));
            }
        }

        public get pointsTotal(): number {
            return this._points;
        }

        private static ensureRange(points: number): number {
            return Math.min(20, Math.max(0, points)); // Assuming player, monsters can go to 30
        }

        private getModifier() {
            var points = this.pointsTotal;
            if (points === null) {
                return null;
            }
            return -5 + Math.floor(points / 2);
        }

        public get modifier(): number {
            return this._modifier;
        }

        public get skills(): Skill[] {
            return this._skills;
        }

        public getSkill(name: string): Skill {
            for (var i = 0; i < this._skills.length; i++) {
                if (this._skills[i].name === name) {
                    return this._skills[i];
                }
            }
            return null;
        }
    }

    export class Skill {
        constructor(public name: string) {}

        public isProficient: boolean = false;
    }
}
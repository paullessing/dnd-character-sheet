module Entities {
    export class Character {
        public name: string;
        public details: {
            class?: string;
            level?: number;
            background?: string;
            playerName?: string;
            race?: string;
            alignment?: string;
            xp: number;
        } = {
            xp: 0
        };
        public abilities = {
            strength: new Ability(this, 'Strength'),
            dexterity: new Ability(this, 'Dexterity'),
            constitution: new Ability(this, 'Constitution'),
            intelligence: new Ability(this, 'Intelligence'),
            wisdom: new Ability(this, 'Wisdom'),
            charisma: new Ability(this, 'Charisma')
        }

        public get level(): number {
            return getLevel(this.details.xp);
        }
    }

    var xpToLevel = [
        0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
    ];

    export function getLevel(xp: number) {
        for (var level = xpToLevel.length - 1; level >= 0; level--) {
            if (xp >= xpToLevel[level]) {
                return level + 1;
            }
        }
        return 1; // Cannot be less than level 1
    }

    export function getXpRequiredForLevelUp(xp) {
        return xpToLevel[getLevel(xp)] - xp;
    }

    export class Ability {
        constructor(private character: Character, public name: string) {}

        private _pointsString: string;
        private _points: number;
        private _modifier: number

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
    }
}
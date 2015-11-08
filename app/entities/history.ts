module CharacterHistory {
    import Character = Entities.Character;
    import IParseService = angular.IParseService;

    export interface HistoryEntry {
        expression: string;
        oldValue: any;
        newValue: any;
    }

    export class HistoryService {
        constructor(private $parse: IParseService) {}

        public change(character: Character, expression: string, newValue: any): HistoryEntry {
            var accessor = this.$parse(expression);
            var oldValue = accessor(character);
            accessor.assign(character, newValue);

            return {
                expression: expression,
                oldValue: oldValue,
                newValue: newValue
            };
        }

        public undo(character: Character, historyEntry: HistoryEntry) {
            this.$parse(historyEntry.expression).assign(character, historyEntry.oldValue);
        }
    }
}
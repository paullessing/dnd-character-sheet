module Services {
    import Item = Entities.Item;

    export class ItemService {
        static $inject = ['$q'];
        constructor(private $q: angular.IQService) {}

        private defaultItems: Item[];

        public getDefaultItems(): angular.IPromise<Item[]> {
            return this.$q.resolve([]);
        }
    }

    angular.module('characterBuilderApp')
        .service('ItemService', ItemService);
}
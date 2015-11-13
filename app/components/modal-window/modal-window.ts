module CharacterBuilder.Modal {
    import JQueryElement = angular.IAugmentedJQuery;
    import Promise = angular.IPromise;

    export function ModalWindowFactoryFactory($q: angular.IQService, $timeout: angular.ITimeoutService): ModalWindowFactory {
        return function(loader: <T> (modalWindow: ModalWindow<T>) => Promise<JQueryElement>) {
            return new ModalWindow(loader, $q, $timeout);
        }
    }
    ModalWindowFactoryFactory.$inject = ['$q', '$timeout'];

    export interface ModalWindowFactory {
        <T> (loader: (modalWindow: ModalWindow<T>) => Promise<JQueryElement>): ModalWindow<T>
    }

    export class ModalWindow<T> {
        private element: JQueryElement;
        private scope: angular.IScope;
        private deferred: angular.IDeferred<T>;

        constructor(private loader: (modalWindow: ModalWindow<T>) => Promise<JQueryElement>,
                    private $q: angular.IQService,
                    private $timeout: angular.ITimeoutService) {
        }

        public show(): Promise<T> {
            this.deferred = this.$q.defer<T>();
            this.loader(this).then((element: JQueryElement) => {
                this.element = element;

                console.log(element);

                element.appendTo(angular.element(document.body));
            });
            return this.deferred.promise;
        }

        public setScope(scope: angular.IScope) {
            this.scope = scope;
        }

        private hide(): Promise<void> {
            this.scope.$destroy();
            this.element.remove();

            return this.$q.resolve();
        }

        public complete(result?: T): Promise<void> {
            return this.hide().then(() => {
                this.deferred.resolve(result);
            });
        }

        public abort(): Promise<void> {
            return this.hide().then(() => {
                this.deferred.reject();
            });
        }
    }

    angular.module('characterBuilderApp')
        .factory('modalWindowFactory', ModalWindowFactoryFactory);
}
///<reference path="modal-window.ts"/>

module CharacterBuilder.Modal {
    import Promise = angular.IPromise;
    import ITemplateLinkingFunction = angular.ITemplateLinkingFunction;
    import JQueryElement = angular.IAugmentedJQuery;

    export interface ModalWindowConfig {
        controller: string | { new (...args: any[]): any } | Function;
        controllerAs: string;
        values?: any;
        template?: string;
        templateUrl?: string;
    }

    export class ModalWindowService {
        static $inject = ['$q', '$http', '$templateCache', '$controller', '$rootScope', '$compile', '$animate', 'modalWindowFactory'];
        constructor(private $q: angular.IQService,
                    private $http: angular.IHttpService,
                    private $templateCache: angular.ITemplateCacheService,
                    private $controller: angular.IControllerService,
                    private $rootScope: angular.IRootScopeService,
                    private $compile: angular.ICompileService,
                    private $animate: angular.IAnimateProvider,
                    private modalWindowFactory: ModalWindowFactory) {}

        public createModal<T>(config: ModalWindowConfig): ModalWindow<T> {
            if (!config.template && !config.templateUrl) {
                throw new Error("At least one of template, templateUrl must be provided!");
            }
            var construct = (modalWindow: ModalWindow<T>) => this.$q.resolve().then(() => {
                if (config.template) {
                    return this.$q.resolve(config.template);
                } else {
                    return this.$http.get(config.templateUrl, { cache: this.$templateCache })
                        .then(response => response.data);
                }
            }).then(html => {
                return angular.element(`<modal-window>${html}</modal-window>`);
            }).then(element => {
                var scope = this.$rootScope.$new(true); // Create an isolate scope
                var locals: any = {
                    $scope: scope,
                    modalWindow: modalWindow
                };
                modalWindow.setScope(scope);
                if (config.values) {
                    locals.modalWindowValues = config.values;
                }
                var controller = this.$controller(config.controller as any, locals);
                scope[config.controllerAs] = controller; // Manually do controllerAs logic

                this.$compile(element)(scope);

                return element;
            });

            return this.modalWindowFactory(construct);
        }
    }

    angular.module('characterBuilderApp')
        .service('modalWindowService', ModalWindowService);
}
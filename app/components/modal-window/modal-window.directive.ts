///<reference path="modal-window.service.ts"/>

module CharacterBuilder.Inventory {
    import ModalWindowScope = CharacterBuilder.Modal.ModalWindowScope;

    export function ModalWindowDirective(): angular.IDirective {
        return {
            scope: {
                modalWindow: '=element'
            },
            restrict: 'E',
            templateUrl: "components/modal-window/modal-window.tpl.html",
            replace: true,
            transclude: true,
            link: function(scope: ModalWindowScope<any>, element: JQuery) {
                var $wrapper = element;
                var $content = $wrapper.find('.js-modalWindow-content');
                element.on('click', event => {
                    if ($(event.target).closest($content).length === 0) {
                        scope.modalWindow.abort();
                        event.preventDefault();
                    }
                });
            }
        };
    }

    angular.module('characterBuilderApp')
        .directive('modalWindow', ModalWindowDirective);
}

(function(ko) {
    'use strict';

    ko.bindingHandlers.select2 = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey,
                textField = allBindings.textField;

            $(element).select2(obj);

            if (lookupKey) {
                var value = ko.utils.unwrapObservable(allBindings.value);
                $(element).select2('data', ko.utils.arrayFirst(obj.data.results, function(item) {
                    return item[lookupKey] === value;
                }));
            }

            if (textField) {
                $(element).on('change', function(ev) {
                    var data = $(element).select2('data');
                    if (data) {
                        textField(data.text);
                    }
                });
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).select2('destroy');
            });
        },
        update: function(element) {
            $(element).trigger('change');
        }
    };

})(window.ko);

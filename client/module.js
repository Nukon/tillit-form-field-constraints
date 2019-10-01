'use strict';

var domify = require('min-dom/lib/domify');

var CamundaPropertiesProvider = require('bpmn-js-properties-panel/lib/provider/camunda/CamundaPropertiesProvider');

function FormFieldsPluginProvider(eventBus, elementRegistry, bpmnFactory, elementTemplates, translate) {
    var camunda = new CamundaPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate);
    this.getTabs = function (element) {
        // debugger;
        var array = camunda.getTabs(element);
        // return array;
        setTimeout(this.replaceFormFieldProperties, 100);
        setTimeout(this.replaceConstraintList, 100);
        return array;
    };
}
FormFieldsPluginProvider.prototype.replaceFormFieldProperties = function () {
    var inputs = document.querySelectorAll('[data-entry="form-field-properties"] input');

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name === 'id' && input.style.display !== 'none') {
            var selectSource = `<select style="width:calc(50% - 12px);height: 22px;float:left"
                                class="bpp-table-row-columns-2 bpp-table-row-removable"
                                id="camunda-table-row-cell-input-value" type="text" name="id">
                                <option value="" ></option>
                                <option value="url" ${input.value === 'url' ? 'selected' : ''}>URL</option>
                                <option value="objectLabel" ${input.value === 'objectLabel' ? 'selected' : ''}>Object Label</option>
                                <option value="order" ${input.value === 'order' ? 'selected' : ''}>Display Order</option>
                              </select>`;
            var selectElement = domify(selectSource);
            selectElement.onchange = function (event) {
                var index = event.target.parentElement.dataset.index;
                var inputs = event.target.parentElement.children;
                for (var i = 0 ; i < inputs.length ; i++) {
                    if (inputs[i].name === 'id'){
                        inputs[i].value = event.target.value;
                    }
                }
            };
            input.style.display = 'none';
            input.parentNode.insertBefore(selectElement, input);
        }
    }
};
FormFieldsPluginProvider.prototype.replaceConstraintList = function () {
    var inputs = document.querySelectorAll('[data-entry="constraints-list"] input');

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name === 'name' && input.style.display !== 'none') {
            var selectSource = `<select style="width:calc(50% - 12px);height: 22px;float:left"
                                class="bpp-table-row-columns-2 bpp-table-row-removable"
                                id="camunda-table-row-cell-input-value" type="text" name="name">
                                <option value="" ></option>
                                <option value="required" ${input.value === 'required' ? 'selected' : ''}>Required</option>
                                <option value="min" ${input.value === 'min' ? 'selected' : ''}>Min value</option>
                                <option value="max" ${input.value === 'max' ? 'selected' : ''}>Max value</option>
                                <option value="minLength" ${input.value === 'minLength' ? 'selected' : ''}>Min lenght</option>
                                <option value="maxLength" ${input.value === 'maxLength' ? 'selected' : ''}>Max length</option>
                                <option value="pattern" ${input.value === 'pattern' ? 'selected' : ''}>Patter</option>
                              </select>`;
            var selectElement = domify(selectSource);
            selectElement.onchange = function (event) {
                var index = event.target.parentElement.dataset.index;
                var inputs = event.target.parentElement.children;
                for (var i = 0 ; i < inputs.length ; i++) {
                    if (inputs[i].name === 'name'){
                        inputs[i].value = event.target.value;
                    }
                }
            };
            input.style.display = 'none';
            input.parentNode.insertBefore(selectElement, input);
        }
    }
};


FormFieldsPlugin.$inject = ['eventBus', 'elementRegistry', 'bpmnFactory', 'elementTemplates'];

function FormFieldsPlugin() {

}
export default {
    __init__: ['formFieldsPluginProvider'],
    propertiesProvider: ['type', FormFieldsPluginProvider],
    formFieldsPlugin: ['type', FormFieldsPlugin]
};

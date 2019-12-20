function module(){
    class FormComponent {

        constructor(element) {
            this.anchor = element;
        }

        onInit() {
        }
        onPropsChanges() {
        }

        set props(properties) {
            this.properties = properties;
            this.onPropsChanges(this.properties);
            this.doStuff(this.properties);
        }
        get props() {
            return this.properties;
        }
        doStuff(object) {
            if (this.anchor) {
                this.anchor.appendChild(document.createElement('form'));
                for (let prop in object) {
                    let input = document.createElement('input');
                    if (object.hasOwnProperty(prop)) {
                        input.name = prop.toString();
                        if (object[prop].hasOwnProperty('value')) {
                            input.value = object[prop].value;
                        }
                        if (object[prop].hasOwnProperty('onChanges')) {
                            input.addEventListener('change', object[prop].onChanges);
                        }

                        this.anchor.querySelector('form').appendChild(input);
                    }
                }
            }
        }
    } // end of class
    return {
        FormComponent
    }
}

let firstInputRes = '';
let secondInputRes = '';
const el = document.createElement('div');
const mod = module();
const component = new mod.FormComponent(el);
component.props = {
    firstInput: {
        value: 'Bob',
        onChanges: (value) => firstInputRes = value
    },
    secondInput: {
        value: 'Martin',
        onChanges: (value) => secondInputRes = value
    }
};

el.querySelectorAll('input')[0].dispatchEvent(new Event('change'));
el.querySelectorAll('input')[1].dispatchEvent(new Event('change'));


console.log('?Bob', firstInputRes);
console.log('?Martin', secondInputRes);


el.querySelectorAll('input')[0].value = 'Bib';
el.querySelectorAll('input')[0].dispatchEvent(new Event('change'));

console.log('Bib', firstInputRes);
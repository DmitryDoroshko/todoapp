function module() {
    class SearchListComponent {
        constructor(element) {
            this.anchor = element;
            if (this.anchor) {
                this.anchor.appendChild(document.createElement('input'));
            }
        }
        onInit() {}
        onPropsChanges() {   }
        set props(properties) {
            this.properties = properties;
            this.onPropsChanges(this.properties);
            this.doStuff(this.properties);
        }
        get props() {
            return this.properties;
        }

        doStuff(properties) {
            if (this.anchor) {
                // append list items from props.listData to anchor
                let ul = document.createElement('ul');
                for (let prop in properties) {
                    if (properties.hasOwnProperty(prop)) {
                        properties[prop].forEach(liText => {
                            let li = document.createElement('li');
                            li.innerText = liText;
                            ul.appendChild(li);
                        }); // foreach
                    } // if
                } // end of for loop
                this.anchor.querySelector('input').appendChild(ul);
                // filter elements in according to input changes
                let input = this.anchor.querySelector('input');
                input.addEventListener('change',
                    this.filterElementsInAccordingToInputChanges.bind(this),
                    false);
            }
        } // doStuff
        filterElementsInAccordingToInputChanges(event) {
            if (this.anchor) {
                // magic
                if (event.target.querySelectorAll('li').length > 0) {
                    event.target.querySelectorAll('ul').forEach(ul => event.target.removeChild(ul));
                }
                // append list items from props.listData to anchor
                let ul = document.createElement('ul');
                for (let prop in this.properties) {
                    if (this.properties.hasOwnProperty(prop)) {
                        this.properties[prop].forEach(liText => {
                            let li = document.createElement('li');
                            li.innerText = liText;
                            ul.appendChild(li);
                        }); // foreach
                    } // if
                } // end of for loop
                event.target.appendChild(ul);
                // magic
                let input = event.target;
                let value = input.value;
                if ( !value ) {
                    this.deleteAllNodesFromUl(input);
                    return;
                }

                let targetLiNode;
                let found = false;
                input.querySelector('ul').childNodes.forEach(liNode => {
                    if (liNode.innerText.indexOf(value) !== -1) {
                        targetLiNode = liNode;
                        found = true;
                    }
                });
                if (!found) {
                    this.deleteAllNodesFromUl(input);
                    return;
                }

                if (targetLiNode) {
                    input.querySelector('ul')
                        .insertBefore(targetLiNode, input.querySelector('ul').childNodes[0]);
                }



            }
        }

        deleteAllNodesFromUl(input) {
            let  child = input.querySelector('ul').lastElementChild;
            while (child) {
                input.querySelector('ul').removeChild(child);
                child = input.querySelector('ul').lastElementChild;
            }
        }
    } // end of class

    return {
        SearchListComponent
    }

}

const elem = document.createElement('div');
const mod = module();
const component = new mod.SearchListComponent(elem);
component.props = {
    listData: [
        'Sam Jakson',
        'Coreay Taylor',
    ]
};

const input = elem.querySelector('input');
input.value = 'Coreay';
input.dispatchEvent(new Event('change'));

console.log(elem.querySelectorAll('li'));
console.log(elem.querySelectorAll('li')[0].innerText);
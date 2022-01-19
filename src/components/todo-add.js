import { LitElement, html, css} from 'lit-element';
import 'dile-input/dile-input';

export class TodoAdd extends LitElement {

    static get styles() {
        return css`
            
            :host {
                font-family: sans-serif;
                text-align: left;
            }
        `;
    }

    static get properties() {
        return {
            value: { type: String }
        };
    }

    constructor() {
        super();
        this.value = '';
    }

    render() {
        return html`
            <dile-input
                label="new task"
                value="${this.value}"
                placeholder="write task and click enter"
                @enter-pressed="${this.createTask}"
                @input="${(e) => this.value = e.target.value}"
            ></dile-input>
        `;
    }

    createTask(e) {
        this.dispatchEvent(new CustomEvent('task-added', {
            detail: e.target.value
        }));
        this.value = '';
    }
}
customElements.define('todo-add', TodoAdd);
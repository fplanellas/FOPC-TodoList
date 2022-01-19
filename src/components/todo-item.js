import { LitElement, html, css } from 'lit-element';

export class TodoItem extends LitElement {

    static get styles() {
        return css`
            li {
                display:flex;
                align-items: center;
                list-style-type: none;
                margin: 5px 0;
                padding: 6px 4px;
                border-radius: 14px;
            }
            .completed {
                text-decoration: line-through;
                color: #bbb;
                background: rgba(0, 0, 0, 0.05) ;
            }
            span.check  {
                display: flex;
                width: 20px;
                height: 20px;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                margin-right: 15px;
            }
            span.remove {    
                width:8%;   
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            span.task-name {
                text-align: left;
                width:83%;
            }
            
           

        `;
    }

    static get properties() {
        return {
            task: { type: Object },
            checked: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.checked = false;
    }

    render() {
        return html`
            <li id="myLi" class="${this.task.completed ? 'completed' : ''}">
                <span class="check" id= "checkin" @click="${this.checkedChanged}" @task-changed="${this.taskChangeddd}" ?checked="${this.task.completed}">
                    ${this.task.completed ? this.checkedIcon: this.unCheckedIcon}
                </span>           
                <span class="task-name">
                    ${ this.task.name }
                </span>
                <span class="remove" @click="${this.removeItem}">                  
                    ${ this.getIcon() }
                </span>
            </li>
        `;
    }

    checkedChanged() {
        let check = this.shadowRoot.getElementById('checkin').attributes.checked;
        check ? this.checked =  false: this.checked = true;
        this.dispatchEvent(new CustomEvent('task-changed', {
            bubbles: true,
            composed: true,
            detail: {
                state: this.checked,
                task: this.task
            }
        }));
    }

    removeItem() {
        this.dispatchEvent(new CustomEvent('element-removed', {
            bubbles: true,
            composed: true,
            detail: this.task.id
        }));
    }

    getIcon(){
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        `;
    }

    get checkedIcon() {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
        `;
    }

    get unCheckedIcon() {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
        `;
    }
}
customElements.define('todo-item', TodoItem);
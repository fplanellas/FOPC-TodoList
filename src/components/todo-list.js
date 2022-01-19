import { LitElement, html, css } from 'lit-element';

export class TodoList extends LitElement {

    static get properties() {
        return {
            tasks: { type: Array },
            query: { type: String },
            order: { type: String}
        };
    }
    
    constructor() {
        super();
        this.items = [];
        this.order = 'asc';
        this.query = '';
    }

    static get styles() {
        return css`
            
            :host {
                display: block;
                margin: 15px 0;
                padding: 15px;
                border:1px solid #ddd;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                border-radius: 10px;
                font-family: sans-serif;
            }

            section {
                margin-left: 10px;
            }

            article {
                flex-grow: 1;
            }

            button {
                margin-right: 15px;
            }

            div {
                border-radius: 10px;
                height: 38px;
                background: #eee;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                padding: 0 15px;
            }
            span {
                margin-right: 10px;
            }
             ul {
                 margin: 0;
                 padding: 0;
             }
        `;
    }

    render() {
        return html`
        <div>
            <article>
                <button @click=${this.setFilterAsc}>Asc</button>
                <button @click=${this.setFilterDesc}>Desc</button>
                <button @click=${this.setFilterCompleted}>Completed</button>
            </article>
            <span>Filter</span>
            <input type="test" @input="${this.changeFilter}">
            </div>
            ${
                this.drawDB()
            }
            <ul>
                ${
                    this.getItems(this.tasks, this.query, this.order).map( item => html`<todo-item .task=${item}></todo-item>`)
                }
            </ul>
        
        `;
    }

    drawDB() {
        this.tasks = JSON.parse(localStorage.getItem('todo-list'));
        this.tasks = this.tasks === null ? [] : this.tasks;       
    }

    getItems(tasks, query, order) {
        return this.doOrder(this.doFilter(tasks, query), order);
    }

    doFilter(tasks, query) {
        return tasks.filter(item => {
            if(!query) {
                return true;
            }
            if (item.name.indexOf(query) != -1) {
                return true;
            }
            return false;
        });
    }

    setFilterAsc() {
        this.order = 'asc';
    }

    setFilterDesc() {
        this.order = 'desc';
    }

    setFilterCompleted(){
        this.order = 'completed';
    }

    changeFilter(e) {
        this.query = e.target.value;
    }

    doOrder(tasks, order) {
        return tasks.sort((a, b) => {
            let nameA, nameB;
            let completedA, completedB;
            completedA = a.completed;
            completedB = b.completed;
            if (order == 'completed') {
                if(completedA > completedB) {
                    return 1;                
                }
                if(completedA < completedB) {
                    return -1;
                }
                return 0;
            }
            if(order == 'asc') {
                nameA = a.name.toLowerCase();
                nameB = b.name.toLowerCase();
            } else {
                nameB = a.name.toLowerCase();
                nameA = b.name.toLowerCase();
            }
            
            if(nameA > nameB) {
                return 1;
            }
            if(nameA < nameB) {
                return -1;
            }          
            return 0;
        })
    }

}
customElements.define('todo-list', TodoList);
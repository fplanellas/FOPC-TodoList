import { LitElement, html, css } from 'lit-element';
import './components/todo-item';
import './components/todo-list';
import './components/todo-add';

export class FopcTodolist extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
                width: 500px;
                text-align: center;
                margin: auto;
                font-family: sans-serif;
            }
        `;
    }

    static get properties() {
        return {
           storedTodoList: { type: Array }
        };
    }

    constructor() {
        super();
        this.storedTodoList = JSON.parse(localStorage.getItem("todo-list"));
        this.storedTodoList = this.storedTodoList === null ? [] : this.storedTodoList;
    }

    render() {
        return html`
            <h1>To do list</h1>          
            <todo-add @task-added="${this.createTask}"></todo-add>
            <todo-list 
                id="idlist" 
                .tasks="${this.storedTodoList}"
                @task-changed="${this.taskChanged}"
                @element-removed="${this.removeElement}"
                >          
            </todo-list>         
        `;
    }

    createTask(e) {       
        this.storedTodoList = [
            ...this.storedTodoList,{
                name: e.detail,
                completed: false,
                id: e.detail + this.storedTodoList.length
            }
        ]   
        this.saveDB(e)
    }

    taskChanged(e) {     
        let indexArray = this.storedTodoList.findIndex((item)=>item.id === e.detail.task.id);       
        this.storedTodoList[indexArray].completed = e.detail.state;
        this.setBD();
        this.rUpdate();   
    }

    saveDB(e) {
        if (this.storedTodoList.length > 0) {
            localStorage.setItem("todo-list", JSON.stringify(this.storedTodoList));   
        } 
    }   
     
    rUpdate() {
        this.shadowRoot.getElementById('idlist').requestUpdate();
    }

    removeElement(e) {
        let indexArray = this.storedTodoList.findIndex((item)=>item.id === e.detail); 
        this.storedTodoList.splice(indexArray,1); 
        this.setBD();
        this.rUpdate();
    }

    setBD() {
        localStorage.setItem("todo-list", JSON.stringify(this.storedTodoList)); 
    }
}
customElements.define('fopc-todolist', FopcTodolist);
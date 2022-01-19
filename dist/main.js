(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{2:function(t,e,s){"use strict";s.r(e);var i=s(0);customElements.define("todo-item",class extends i.a{static get styles(){return i.b`
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
            
           

        `}static get properties(){return{task:{type:Object},checked:{type:Boolean}}}constructor(){super(),this.checked=!1}render(){return i.c`
            <li id="myLi" class="${this.task.completed?"completed":""}">
                <span class="check" id= "checkin" @click="${this.checkedChanged}" @task-changed="${this.taskChangeddd}" ?checked="${this.task.completed}">
                    ${this.task.completed?this.checkedIcon:this.unCheckedIcon}
                </span>           
                <span class="task-name">
                    ${this.task.name}
                </span>
                <span class="remove" @click="${this.removeItem}">                  
                    ${this.getIcon()}
                </span>
            </li>
        `}checkedChanged(){let t=this.shadowRoot.getElementById("checkin").attributes.checked;this.checked=!t,this.dispatchEvent(new CustomEvent("task-changed",{bubbles:!0,composed:!0,detail:{state:this.checked,task:this.task}}))}removeItem(){this.dispatchEvent(new CustomEvent("element-removed",{bubbles:!0,composed:!0,detail:this.task.id}))}getIcon(){return i.c`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        `}get checkedIcon(){return i.c`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
        `}get unCheckedIcon(){return i.c`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
        `}});customElements.define("todo-list",class extends i.a{static get properties(){return{tasks:{type:Array},query:{type:String},order:{type:String}}}constructor(){super(),this.items=[],this.order="asc",this.query=""}static get styles(){return i.b`
            
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
        `}render(){return i.c`
        <div>
            <article>
                <button @click=${this.setFilterAsc}>Asc</button>
                <button @click=${this.setFilterDesc}>Desc</button>
                <button @click=${this.setFilterCompleted}>Completed</button>
            </article>
            <span>Filter</span>
            <input type="test" @input="${this.changeFilter}">
            </div>
            ${this.drawDB()}
            <ul>
                ${this.getItems(this.tasks,this.query,this.order).map(t=>i.c`<todo-item .task=${t}></todo-item>`)}
            </ul>
        
        `}drawDB(){this.tasks=JSON.parse(localStorage.getItem("todo-list")),this.tasks=null===this.tasks?[]:this.tasks}getItems(t,e,s){return this.doOrder(this.doFilter(t,e),s)}doFilter(t,e){return t.filter(t=>!e||-1!=t.name.indexOf(e))}setFilterAsc(){this.order="asc"}setFilterDesc(){this.order="desc"}setFilterCompleted(){this.order="completed"}changeFilter(t){this.query=t.target.value}doOrder(t,e){return t.sort((t,s)=>{let i,o,r,d;return r=t.completed,d=s.completed,"completed"==e?r>d?1:r<d?-1:0:("asc"==e?(i=t.name.toLowerCase(),o=s.name.toLowerCase()):(o=t.name.toLowerCase(),i=s.name.toLowerCase()),i>o?1:i<o?-1:0)})}});s(1);customElements.define("todo-add",class extends i.a{static get styles(){return i.b`
            
            :host {
                font-family: sans-serif;
                text-align: left;
            }
        `}static get properties(){return{value:{type:String}}}constructor(){super(),this.value=""}render(){return i.c`
            <dile-input
                label="new task"
                value="${this.value}"
                placeholder="write task and click enter"
                @enter-pressed="${this.createTask}"
                @input="${t=>this.value=t.target.value}"
            ></dile-input>
        `}createTask(t){this.dispatchEvent(new CustomEvent("task-added",{detail:t.target.value})),this.value=""}});customElements.define("fopc-todolist",class extends i.a{static get styles(){return i.b`
            :host {
                display: block;
                width: 500px;
                text-align: center;
                margin: auto;
                font-family: sans-serif;
            }
        `}static get properties(){return{storedTodoList:{type:Array}}}constructor(){super(),this.storedTodoList=JSON.parse(localStorage.getItem("todo-list")),this.storedTodoList=null===this.storedTodoList?[]:this.storedTodoList}render(){return i.c`
            <h1>To do list</h1>          
            <todo-add @task-added="${this.createTask}"></todo-add>
            <todo-list 
                id="idlist" 
                .tasks="${this.storedTodoList}"
                @task-changed="${this.taskChanged}"
                @element-removed="${this.removeElement}"
                >          
            </todo-list>         
        `}createTask(t){this.storedTodoList=[...this.storedTodoList,{name:t.detail,completed:!1,id:t.detail+this.storedTodoList.length}],this.saveDB(t)}taskChanged(t){let e=this.storedTodoList.findIndex(e=>e.id===t.detail.task.id);this.storedTodoList[e].completed=t.detail.state,this.setBD(),this.rUpdate()}saveDB(t){this.storedTodoList.length>0&&localStorage.setItem("todo-list",JSON.stringify(this.storedTodoList))}rUpdate(){this.shadowRoot.getElementById("idlist").requestUpdate()}removeElement(t){let e=this.storedTodoList.findIndex(e=>e.id===t.detail);this.storedTodoList.splice(e,1),this.setBD(),this.rUpdate()}setBD(){localStorage.setItem("todo-list",JSON.stringify(this.storedTodoList))}})}},[[2,1,2]]]);
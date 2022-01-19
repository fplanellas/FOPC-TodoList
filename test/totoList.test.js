import { FopcTodolist } from '../src/fopc-todolist';
import {fixture, html, expect} from '@open-wc/testing';

describe('FopcTodolist', () => {


    it('array has 1 element more and naming after addElement', async () => {//addElement
        const el = await fixture(html`<fopc-todolist></fopc-todolist>`);
        let storedTodoList = el.storedTodoList.length;  
        el.name = 'name'; 
        el.completed = false;
        el.id = el.name
        el.createTask(el.name, el.completed, el.id);
        let elementAdded = el.storedTodoList.length;
        let nameAdded = 'name';
        expect(storedTodoList +1).to.be.equal(elementAdded);
        expect(nameAdded).to.be.equal(el.name);
    });

    it('item is deleted when clicking delete icon and check findIndex', async () => {//removeElement
        const el = await fixture(html`<fopc-todolist></fopc-todolist>`);
        el.storedTodoList = [ { name: 'item 1', completed: false, id: '0' }, { name: 'item 2', completed: false, id: '1' },{name: 'item 3', completed: false, id: '2' }];

        el.saveDB(); 

        let removeTask = new CustomEvent('element-removed', {          
            detail: {
                detail: '1'
            }
       })

       el.removeElement(removeTask);

       expect(el.storedTodoList.length).to.be.equal(2);
    });

   it('expect the completed field from the task with id 1 change to true', async () => {//taskChanged
        const el = await fixture(html`<fopc-todolist></fopc-todolist>`);
        el.storedTodoList = [ { name: 'item 1', completed: false, id: '0' }, { name: 'item 2', completed: false, id: '1' },{name: 'item 3', completed: false, id: '2' }];

        el.saveDB(); 

        let changinTask = new CustomEvent('task-changed', {           
            detail: {
                state: true,
                task: { name: 'item 2', completed: false, id: '1' }
            }
       })

       el.taskChanged(changinTask);

        expect(el.storedTodoList[1].completed).to.be.equal(true);
    });
});
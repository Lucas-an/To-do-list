import { Component, DoCheck } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck{

  public taskList:  Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor () {}
  ngDoCheck(): void {
    this.setLocalStorage();

  }


  public setEmitTaskList(event: string) {
    this.taskList.push({task: event, checked: false}) //Ele vai passar uma assinatura com o objeto
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event,1);//deleta a posição do meu nó
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você deseja realmente Deletar tudo?");
    if(confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
      if(!event.length){
        const confirm = window.confirm("Task está vazia, deseja Deletar?");
        if(confirm) {
          this.deleteItemTaskList(index);
        }
      }
  }

  public setLocalStorage() {
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));//Sempre depois do sort vai adicionar em nosso console no browaser

    }
  }
}

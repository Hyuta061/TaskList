function main(){
  function addTask(text){
    const taskTitle = document.querySelector('#task-title')

 // titulo da tarefa ( input)
    if(text){
      const template = document.querySelector(".templete-para-clone");

      const newTaks = template.cloneNode(true); // clona toda a tag li 


      newTaks.querySelector('.task-title-span').innerText =text;
      
      newTaks.classList.remove('template-para-clone') // remover as class inúteis agr
      newTaks.classList.remove('esconder')
      
      const list = document.querySelector('#task-list'); // pegar a ul

      list.appendChild(newTaks); // add li em ul

      const removeBtn = newTaks.querySelector('.close-btn'); //adicionar o evento de click para apagar ( a função que vai ser chamada ta fora desse escopo)
      removeBtn.addEventListener('click', function(){
        removeTask(this);
      })

      const doneBtn = newTaks.querySelector('.done-btn'); // completar tarefa
      doneBtn.addEventListener('click',function(){
        doneTask(this);
      })

      taskTitle.value = ''; // zera o valor o meu input 

      salvarTasks();
    }
  }

  function removeTask(task){
    task.parentElement.remove(); // remove o elemento pai de this -> ( no caso this é o ion-icon e o pai é o li) 
    // pode ser parentElement ou parentNode
    salvarTasks();
  }

  function doneTask(task){
    task.parentElement.classList.toggle('done');
  }

  
  const addTaskBtn = document.querySelector('#add-btn')

  const taskTitle = document.querySelector('#task-title')

  addTaskBtn.addEventListener('click', function(event){
    event.preventDefault();
    addTask(taskTitle.value);
  })
  
  
  function salvarTasks(){
    const listNodeTask = document.querySelectorAll('#task-list li span')
    const ArrTask = [];
    for( let i of listNodeTask){
      let taskText = i.innerText;
      if(taskText)
      ArrTask.push(taskText);
    }
    const TaskListInJSON = JSON.stringify(ArrTask)

    localStorage.setItem('TaskList', TaskListInJSON)

  }
  function escreverText(text){
    const list = document.querySelector('#task-list');
    const template = document.querySelector(".templete-para-clone");
    const newTaks = template.cloneNode(true); 
    newTaks.classList.remove('template-para-clone') // remover as class inúteis agr
    newTaks.classList.remove('esconder')
    newTaks.querySelector('.task-title-span').innerText =text;
    list.appendChild(newTaks)
  }
  function addTaskSaved(){
    const TaskList = localStorage.getItem('TaskList');
    const ArrTask = JSON.parse(TaskList)
    for(let i of ArrTask){
    addTask(i);
    }
} 
addTaskSaved()
}
main();
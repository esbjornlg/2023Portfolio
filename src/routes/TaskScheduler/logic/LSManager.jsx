const LSManager = {
  GetVariable: function GetVariable(VarName) {
    let Variable;
    if (VarName in localStorage) {
        Variable = localStorage.getItem(VarName);
    }
    return Variable;
  },

  EditVariable: function EditVariable(VarName, Value) {
    localStorage.setItem(VarName, Value);
    return;
  },

  GetList: function GetList(ListName) {
    let List = [];
    if (ListName in localStorage)
        List = JSON.parse(localStorage.getItem(ListName));
    return List;
  },

  UpdateList: function UpdateList(ListName) {
    let List = this.GetList(ListName);
    localStorage.setItem(ListName, JSON.stringify(List));
  },

  AddItemToList: function AddItemToList(ListName, Item) {
    let List = this.GetList(ListName);
    if (List.includes(Item))
      alert("Category '" + Item + "' already exists!");
    else if (Item === '') {
      alert("Category name has to be at least one character long!");
    }
    else {
      List.push(Item);
      localStorage.setItem(ListName, JSON.stringify(List));
    }
  },
  
  RmvItemFromList: function RmvItemFromList(ListName, Item) {
    let List = this.GetList(ListName);
    let FoundItemIndex = List.indexOf(Item);
    List.splice(FoundItemIndex, 1);
    if (FoundItemIndex > -1)
      localStorage.setItem(ListName, JSON.stringify(List));
  },

  GetTaskById: function GetTask(TaskId) {
    let Tasks = [];
    if ("Tasks" in localStorage) {
        Tasks = JSON.parse(localStorage.getItem("Tasks"));
    }
    const TaskIndex = Tasks.findIndex(Task => Task.Id == TaskId);
    if (TaskIndex > -1) {
      return {Task: Tasks[TaskIndex], TaskIndex: TaskIndex};
    }
  },

  AddTask: function AddTask(Task) {
    let TaskToAdd = {
      Id: Date.now(),
      Completion: Task.Completion,
      Name: Task.Name,
      Description: Task.Description,
      Category: Task.Category,
      StartingTime: Task.StartingTime,
      Deadline: Task.Deadline,
      EstDuration: parseFloat(Task.EstDuration),
      RealDuration: 0
    };
    let Tasks = this.GetList("Tasks");
    Tasks.push(TaskToAdd);
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  },

  EditTask: function EditTask(Task) {
    let TaskToEdit = this.GetTaskById(Task.Id);

    TaskToEdit.Task = {
      Id: Task.Id,
      Completion: Task.Completion,
      Name: Task.Name,
      Description: Task.Description,
      Category: Task.Category,
      StartingTime: Task.StartingTime,
      Deadline: Task.Deadline,
      EstDuration: parseFloat(Task.EstDuration),
      RealDuration: 0
    };
    let Tasks = this.GetList("Tasks");
    Tasks[TaskToEdit.TaskIndex] = (TaskToEdit.Task);
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  },

  EditTaskVariable: function EditTaskVariable(Task, Key, Value) {
    let TaskToEdit = this.GetTaskById(Task.Id);
    if (TaskToEdit) {
      TaskToEdit.Task = {
        Id: Task.Id,
        Completion: Task.Completion,
        Name: Task.Name,
        Description: Task.Description,
        Category: Task.Category,
        StartingTime: Task.StartingTime,
        Deadline: Task.Deadline,
        EstDuration: parseFloat(Task.EstDuration),
        RealDuration: 0
      };
      TaskToEdit.Task = {...TaskToEdit.Task, [Key]: Value};
      let Tasks = this.GetList("Tasks");
      Tasks[TaskToEdit.TaskIndex] = (TaskToEdit.Task);
      localStorage.setItem("Tasks", JSON.stringify(Tasks));
    }
  },

  RmvTask: function RmvTask(TaskToRmv) {
    let Tasks = this.GetList("Tasks");
    let FoundTaskIndex = Tasks.findIndex(Task => Task.Id == TaskToRmv.Id);
    if (FoundTaskIndex > -1) {
      Tasks.splice(FoundTaskIndex, 1);
      localStorage.setItem("Tasks", JSON.stringify(Tasks));
    }
  },

  GetTaskStates: function GetTaskStates() {
    let TaskStates = [{Text: "Not started", color: "var(--Notstarted)", "fontWeight": "bold"},
      {Text: "In progress", color: "var(--Inprogress)", "fontWeight": "bold"},
      {Text: "Completed", color: "var(--Completed)", "fontWeight": "bold"}];
    return {TaskStates: TaskStates};
  },
}

export default LSManager
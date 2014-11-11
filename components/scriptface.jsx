var data ={
  "projectName": "Scriptface example",
  "taskLists": [
    {"taskListName": "Project tasks",
      "tasks": [
        {
          "name": "Ping google",
          "description": "some random script",
          "cli_command": "ping google.com"
        },
        {
          "name": "npm install",
          "description": "Install nodeJs dependencies",
          "cli_command": "npm install"
        },
        {
          "name": "npm ls",
          "description": "list nodejs packages",
          "cli_command": "npm ls"
        }
      ]
    }
  ]
};


const scriptfaceFilename = "scriptface.json";

var ScriptFaceApp = React.createClass({

    handleDrop:function(path){

    },
    launchTask:function(index){
        var newState = this.state;
        newState.tasks[index].done = !newState.tasks[index].done;
        this.setState(newState);
    },
    getInitialState: function() {
    return {
  "projectName": "Scriptface example",
  "taskLists": [
    {"taskListName": "Project tasks",
      "tasks": [
        {
          "name": "Ping google",
          "description": "some random script",
          "cli_command": "ping google.com"
        },
        {
          "name": "npm install",
          "description": "Install nodeJs dependencies",
          "cli_command": "npm install"
        },
        {
          "name": "npm ls",
          "description": "list nodejs packages",
          "cli_command": "npm ls"
        }
      ]
    }
  ]
};
  },
  render: function renderApp(){
    return (
      <div className="scriptface-app">
        <h2>{this.state.projectName?this.state.projectName:"no project loaded"}</h2>
        <DropZone/>
        <DashBoard/>
        <ScannedTasks/>
      </div>
    );
  }
});

var DropZone = React.createClass({
  handleOver:function(e){
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
  },
  handleDrop:function(e){
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    var files = e.dataTransfer.files;
    console.log(files[0]);
    //this.props.onDrop(files[0]);
  },
  render : function renderDropZone(){
    return(
        <div className="dropzone" onDrop={this.handleDrop} onDragOver={this.handleOver}>drag a project folder from your file explorer</div>
      );
  }
});

var DashBoard = React.createClass({
  render : function renderDashBoard(){
    return(
        <section className="dashboard">
          <ul>
            <Task/>
          </ul>
        </section>
      );
  }
});

var ScannedTasks = React.createClass({
  render : function renderScanned(){
    return(
      <div>
        <section className="grunt">
          <ul>
            <Task/>
          </ul>
        </section>
      </div>
      );
  }
});

var Task = React.createClass({
  render : function renderTask(){
    return(
        <li>
          <div className="task-bar">
              <button type="button" className="run-controls">Launch</button>
              <h4>Task name</h4>
              <button type="button" className="show-details">Show details</button>
          </div>
          <div className="task-details">
              <p className="task-command">Command</p>
              <div className="task-output">

              </div>
          </div>
        </li>
      );
  }
});

React.render(
  <ScriptFaceApp model={data}/>,
  document.getElementById('app')
);

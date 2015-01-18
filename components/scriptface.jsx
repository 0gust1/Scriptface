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

var utils = {};
var path = require('path');
var Promise = require('bluebird');
var disco = require(path.resolve(process.env.PWD,'services/scriptface-discoverer'));
const scriptfaceFilename = "scriptface.json";

//Promise.promisifyAll(disco);

console.log(process.env.PWD);

var ScriptFaceApp = React.createClass({

    handleDrop:function(path){
        var that = this;
        disco.discover(path,scriptfaceFilename).then(function(val){
        //console.log(val);
        that.setState(val);
        });
    },
    launchTask:function(index){
        var newState = this.state;
        newState.tasks[index].done = !newState.tasks[index].done;
        this.setState(newState);
    },
    getInitialState: function() {
    return {
    initialized:false
};
  },
  render: function renderApp(){
    var taskLists = this.state.taskLists;
    var dashboardTaskList = taskLists.shift();
    var discoveredTasksLists = taskLists;
    var cx = React.addons.classSet;
     var classes = cx({
        'app-initialized':this.state.initialized,
        'scriptface-app':true
      });
    return (
      <div className={classes}>
        <h2>{this.state.projectName?this.state.projectName:"no project loaded"}</h2>
        {this.state.rootDir}
        <DropZone onDrop={this.handleDrop}/>
        <DashBoard onLaunch={this.launchTask} taskList={dashboardTaskList}/>
        <ScannedTasks onLaunch={this.launchTask} taskLists={discoveredTasksLists}/>
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
    this.props.onDrop(files[0].path);
  },
  render : function renderDropZone(){
    return(
        <div className="dropzone" onDrop={this.handleDrop} onDragOver={this.handleOver}>drag a project folder from your file explorer</div>
      );
  }
});

var DashBoard = React.createClass({
  render : function renderDashBoard(){
     var tasks = this.props.taskList.tasks.map(function(task, index){
      return(
          <Task task={task} index={index}/>
        );
    });
    return(
        <section className="dashboard">
          <h2>{this.props.taskList.taskListName}</h2>
          <ul>
            {tasks}
          </ul>
        </section>
      );
  }
});

var ScannedTasks = React.createClass({
  render : function renderScanned(){
    var taskLists = this.props.taskLists.map(function(tasklist, index){
      return(
          <DashBoard taskList={tasklist}/>
        );
    });
    return(
      <div>
        {taskLists}
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
              <h4>{this.props.task.name}</h4>
              <p>{this.props.task.description}</p>
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

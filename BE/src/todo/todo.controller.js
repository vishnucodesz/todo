
const {show , add, deltask, edit, showTasks} = require("./todo.service");

const showAll = async (req,res) => {
    const showall = await showTasks();
    console.log('hai');
    res.json(showall);
}

const getTasks = async (req, res) => {
    const taskId = Number(req.params.taskId);
    const gotTask = await show(taskId);
    res.send(gotTask);
};


const addTasks = async (req, res) => {
    const text = req.body.text;
    const addtask = await add( text);
    res.json("inserted")
};

const deleteTask = async (req,res) => {
    const id = Number(req.params.taskId) ;
    const deletetask = await deltask(id);
    res.send("Deleted")

}

const editTask = async (req, res) => {
    const id = Number(req.params.taskId);
    const editText = req.body.text;
    const edittask = await edit(id, editText);
    res.send("Edited");
}

module.exports = {getTasks, addTasks, deleteTask, editTask, showAll}; 
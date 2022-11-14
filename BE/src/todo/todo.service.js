const knexInstance = require('../database/connection');
const db = "todolist"

const showTasks = async () => {
    const allTasks = await knexInstance(db).select('*').orderBy('id', 'asc');
    return allTasks;
}

const show = async (taskId) => {
    const result = await knexInstance(db).select('*').where("id", taskId);
    console.log(result);
    return result;
}

const add = async ( text) => {
    const addTask = await knexInstance(db).insert({  text: text })
    return addTask;
}

const deltask = async (id) => {
    const remove = await knexInstance(db).where("id" , id).del();
    return remove;
}

const edit = async (id, editText) => {
    const edittask = await knexInstance(db).where("id" , id).update({text: editText});
    return edittask;
}



module.exports = { show, add, deltask, edit, showTasks};
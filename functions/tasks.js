import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
// these functions will interact with task management related functions
exports.closeModal = async (thisObj) => {
    return thisObj.setState((prevState) => {
        const newState = {
            showModal: false,
            taskHeading: '',
            taskDetail: '',
            category: null,
            taskStatus: null,
            dueDate: null,
            isHeaderSet: true,
            isDesSet: true,
            isTypeSet: true,
            isStatusSet: true,
            isDateSet: true
        }
        return newState;
    });
}

exports.getCurrentTask = async() =>
{
     const userId = await AsyncStorage.getItem('id');
     const taskResponse = await axios({
         method: 'post',
         url: `https://stackhack.herokuapp.com/task/${userId}/tasks`,
     });

     console.log(" taskResponse is ",taskResponse.data.data.taskItems);
     return taskResponse.data.data.taskItems;
}

exports.addTask = async (thisObj) => {
    const task = {};
    task["taskHeading"] = thisObj.state.taskHeading;
    task["taskDetail"] = thisObj.state.taskDetail;
    task["dueDate"] = thisObj.state.dueDate;
    task["taskStatus"] = thisObj.state.taskStatus;
    task["category"] = thisObj.state.category;

    const userId = await AsyncStorage.getItem('id');
    const taskResponse = await axios({
        method: 'post',
        url: `https://stackhack.herokuapp.com/task/${userId}/addtask`,
        data: { task }
    })
    if (taskResponse.data.response) {
        task["_id"] = taskResponse.data.data.taskItems._id;
        return thisObj.setState((prevState) => {
            //console.log(task)
            let users = prevState.users;
            users[users.length] = task;
            //console.log(users)
            const newState = {
                showModal: false,
                taskHeading: '',
                taskDetail: '',
                category: null,
                taskStatus: null,
                dueDate: null,
                isHeaderSet: true,
                isDesSet: true,
                isTypeSet: true,
                isStatusSet: true,
                isDateSet: true
            }
            return newState;
        });
    }
    else {
        if (taskResponse.data.msg)
            alert(taskResponse.data.msg);
        if (taskResponse.data.message)
            alert(taskResponse.data.message);
        return thisObj.setState((prevState) => {
            const newState = {
                showModal: false,
                taskHeading: '',
                taskDetail: '',
                category: null,
                taskStatus: null,
                dueDate: null,
                isHeaderSet: true,
                isDesSet: true,
                isTypeSet: true,
                isStatusSet: true,
                isDateSet: true
            }
            return newState;
        });
    }
}

exports.deleteTask = async(task) =>{
    console.log("in delete task ", task);
    Alert.alert("Delete Task", "Are you sure you want to delete task \'" + task.taskHeading +"\' ?", 
    [
        {
            text : "Yes",
            onPress : async()=>{
                    const userId = await AsyncStorage.getItem('id');
                    const taskResponse = await axios({
                    method: 'post',
                    url: `https://stackhack.herokuapp.com/task/${userId}/delete/${task._id}`,
            });
            }
        },
        {
            text: "No"
        }
        
        
    ]);

}

exports.updateTask = async(task) =>
{
     const userId = await AsyncStorage.getItem('id');
     const taskResponse = await axios({
         method: 'post',
         url: `https://stackhack.herokuapp.com/task/${userId}/update/${task.id}`,
         data:{
            "update" : task
         }
     })
    console.log("task we got is ", taskResponse.data);
}

exports.getCompletedTask = async() =>
{
    const userId = await AsyncStorage.getItem('id');
     const taskResponse = await axios({
         method: 'post',
         url: `https://stackhack.herokuapp.com/task/${userId}/completed`,
     })
    return taskResponse.data.data.taskItems;
}



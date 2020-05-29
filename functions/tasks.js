import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, ToastAndroid } from 'react-native';
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

exports.getCurrentTask = async () => {
    const userId = await AsyncStorage.getItem('id');
    const taskResponse = await axios({
        method: 'post',
        url: `https://stackhack.herokuapp.com/task/${userId}/tasks`,
    });

    console.log(" taskResponse is ", taskResponse.data.data.taskItems);
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
            let tasks = prevState.tasks;
            tasks[tasks.length] = task;
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
            Alert.alert(taskResponse.data.msg);
        if (taskResponse.data.message)
            Alert.alert(taskResponse.data.message);
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

exports.deleteTask = async (task) => {
    console.log("in delete task ", task);
    const userId = await AsyncStorage.getItem('id');
    const taskResponse = await axios({
        method: 'post',
        url: `https://stackhack.herokuapp.com/task/${userId}/delete/${task._id}`,
    });
    if (taskResponse.data.response === false) {
        if (taskResponse.data.msg)
            Alert.alert("Task Delete Status",taskResponse.data.msg);
        if (taskResponse.data.message)
            Alert.alert("Task Delete Status",taskResponse.data.message);
        return false;
    }
    else
        Alert.alert("Task Delete Status",taskResponse.data.message)
    return taskResponse.data.response
}

exports.updateTask = async (task) => {
    const userId = await AsyncStorage.getItem('id');
    const taskResponse = await axios({
        method: 'post',
        url: `https://stackhack.herokuapp.com/task/${userId}/update/${task.id}`,
        data: {
            "update": task
        }
    })
    console.log("task we got is ", taskResponse.data);
    if (taskResponse.data.response === false) {
        if (taskResponse.data.msg)
            ToastAndroid.show("Fail to update task", ToastAndroid.LONG);
        if (taskResponse.data.message)
            ToastAndroid.show("Fail to update task", ToastAndroid.LONG);
        return false;
    }
    else {
        ToastAndroid.show("Task updated Successfully ", ToastAndroid.LONG);
        return true;
    }
}

exports.getCompletedTask = async () => {
    const userId = await AsyncStorage.getItem('id');
    const taskResponse = await axios({
        method: 'post',
        url: `https://stackhack.herokuapp.com/task/${userId}/completed`,
    })
    console.log(taskResponse.data);
    return taskResponse.data.data.taskItems;
}

exports.searchTask = async(SearchObj) => {
    const userId = await AsyncStorage.getItem('id');
    console.log("got length of taskstatus ", SearchObj.taskStatus.length);
    
    const taskResponse1 = await axios({
        method: 'post',
        url: `https://stackhack.herokuapp.com/task/${userId}/search`,
        data: {
            "search": {
                taskHeading: SearchObj.taskHeading,
                taskStatus: SearchObj.taskStatus[0],
                category: SearchObj.category
            }
        }
    })

    var arr=taskResponse1.data.data;
    if(SearchObj.taskStatus.length==2)
    {
        const taskResponse2 = await axios({
            method: 'post',
            url: `https://stackhack.herokuapp.com/task/${userId}/search`,
            data: {
                "search": {
                    taskHeading: SearchObj.taskHeading,
                    taskStatus: SearchObj.taskStatus[1],
                    category: SearchObj.category
                }
            }
        })
        const arr=[...taskResponse1.data.data, ...taskResponse2.data.data];
        if(arr.length==0)
        {
            ToastAndroid.show("No match found", ToastAndroid.LONG);
        }
        else{
            return arr;
        }
    }
    else
    {
        const arr=taskResponse1.data.data;
        if(arr.length==0)
        {
            ToastAndroid.show("No match found", ToastAndroid.LONG);
        }
        else{
            return arr;
        }
    }
    
    
    console.log("taskResponse.data", arr);
    

}


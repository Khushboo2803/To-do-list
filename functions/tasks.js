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
    try {
        const userId = await AsyncStorage.getItem('id');
        const taskResponse = await axios({
            method: 'post',
            url: `https://stackhack.herokuapp.com/task/${userId}/tasks`,
        });

        console.log(" taskResponse is ", taskResponse.data.data.taskItems);
        return taskResponse.data.data.taskItems;
    } catch (error) {
        console.log('error in get current task', error);
        ToastAndroid.show("Error in getting tasks", ToastAndroid.LONG)
    }

}

exports.addTask = async (thisObj) => {
    try {
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
                ToastAndroid.show(taskResponse.data.msg, ToastAndroid.LONG)
            if (taskResponse.data.message)
                ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG)
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
    } catch (error) {
        console.log('error in add task', error);
        ToastAndroid.show('error while adding task', ToastAndroid.LONG)
    }

}

exports.deleteTask = async (task) => {
    try {
        console.log("in delete task ", task);
        const userId = await AsyncStorage.getItem('id');
        const taskResponse = await axios({
            method: 'post',
            url: `https://stackhack.herokuapp.com/task/${userId}/delete/${task._id}`,
        });
        if (taskResponse.data.response === false) {
            if (taskResponse.data.msg)
                ToastAndroid.show(taskResponse.data.msg, ToastAndroid.LONG)
            if (taskResponse.data.message)
                ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG)
            return false;
        }
        else
            ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG)
        return taskResponse.data.response
    } catch (error) {
        console.log('error in delete', error);
        ToastAndroid.show('error in delete', ToastAndroid.LONG);
    }

}

exports.updateTask = async (task) => {
    try {
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
                ToastAndroid.show(taskResponse.data.msg, ToastAndroid.LONG);
            if (taskResponse.data.message)
                ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG);
            return false;
        }
        else {
            ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG);
            return true;
        }
    } catch (error) {
        console.log('error in update task');
        ToastAndroid.show('error in update', ToastAndroid.LONG)
    }

}

exports.getCompletedTask = async () => {
    try {
        const userId = await AsyncStorage.getItem('id');
        const taskResponse = await axios({
            method: 'post',
            url: `https://stackhack.herokuapp.com/task/${userId}/completed`,
        })
        if (taskResponse.data.response == false) {
            if (taskResponse.data.msg)
                ToastAndroid.show(taskResponse.data.msg, ToastAndroid.LONG);
            if (taskResponse.data.message)
                ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG);
            return null;
        }
        else {
            console.log(taskResponse.data);
            ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG);
            return taskResponse.data.data.taskItems;
        }
    } catch (error) {
        console.log('error in getComplete task');
        ToastAndroid.show('error getting completed task', ToastAndroid.LONG)
    }

}

exports.searchTask = async (SearchObj) => {
    try {
        const userId = await AsyncStorage.getItem('id');
        console.log("got length of taskstatus ", SearchObj);

        const taskResponse = await axios({
            method: 'post',
            url: `https://stackhack.herokuapp.com/task/${userId}/search`,
            data: {
                "search": SearchObj
            }
        });
        if (taskResponse.data.response == false) {
            if (taskResponse.data.msg)
                ToastAndroid.show(taskResponse.data.msg, ToastAndroid.LONG);
            if (taskResponse.data.message)
                ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG);
            return undefined;
        }
        else {
            console.log(taskResponse.data);
            ToastAndroid.show(taskResponse.data.message, ToastAndroid.LONG);
            return taskResponse.data.data;
        }
    } catch (error) {
        console.log('error in search');
        ToastAndroid.show('error in task search', ToastAndroid.LONG)
    }
}

exports.getDateString=(date)=>{
    console.log("got date as ", date);
    const dateDue=date.split("-");
    var month='';
    switch(dateDue[1]){
        case '01': month='Jan'; break;
        case '02': month='Feb'; break;
        case '03': month='Mar'; break;
        case '04': month='Apr'; break;
        case '05': month="May"; break;
        case '06': month='June'; break;
        case '07': month='July'; break;
        case '08': month='Aug'; break;
        case '09': month='Sept'; break;
        case '10': month='Oct'; break;
        case '11': month='Nov'; break;
        case '12': month='Dec'; break;
    }
    const dateR=dateDue[2]+' '+month+' '+dateDue[0];
    return dateR;
}
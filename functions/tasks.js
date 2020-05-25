import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
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


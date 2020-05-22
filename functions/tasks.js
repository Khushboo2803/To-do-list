// these functions will interact with task management related functions
exports.closeModal = (thisObj) => {
    thisObj.setState((prevState) => {
        // this is prev state
        console.log(prevState)
        const newState = {
            showModal: false,
            taskHeading: '',
            taskDetail: '',
            category: null,
            taskStatus: null,
            dueDate: null,
            isHeaderSet: false,
            isDesSet: false,
            isTypeSet: false,
            isStatusSet: false,
            isDateSet: false
        }
        return newState;
    });
}


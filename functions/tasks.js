// these functions will interact with task management related functions
exports.closeModal = (thisObj) => {
    thisObj.setState((prevState) => {
        console.log(prevState)
        const newState = {
            showModal: false
        }
        return newState;
    });
}


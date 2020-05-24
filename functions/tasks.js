import React, { useState } from 'react';
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
            isHeaderSet: true,
            isDesSet: true,
            isTypeSet: true,
            isStatusSet: true,
            isDateSet: true
        }
        return newState;
    });
}

exports.addTask = (thisObj) => {
    console.log("in add");
}

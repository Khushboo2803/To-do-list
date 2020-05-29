import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Modal, TextInput, BackHandler, Alert} from 'react-native';
import { Card, Icon, PricingCard } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-community/picker'
import Sort from './sortby';
import styles from './styles';
import taskApi from '../functions/tasks';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import MenuBar from './components/menubar';
import SearchBar from './components/searchBar';
import PTRView from 'react-native-pull-to-refresh';

function Error() {
    {/** This function is called when any field left empty in add task modal */ }
    return (
        <View style={{ flexDirection: 'row' }}>
            <Icon
                name='warning'
                type='font-awesome'
                color='red'
                style={{
                    height: 24, width: 25
                }}
            />
            <Text style={{
                color: 'red',
                fontSize: 18
            }}>
                This is a required field ...
                </Text>
        </View>
    );
}

function BlankTask() {
    {/** Called when there is no task to do */}
    return (
        <View style={{
            height: 250,
            width: 260,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: '52%',
            borderWidth: 3,
            borderColor: 'brown',
        }}
        >
            <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: '10%'
            }}>
                <Icon
                    name='emoticon-excited-outline'
                    type='material-community'
                    color='darkorange'
                    size={50}
                />
                <Icon
                    name='emoticon-wink-outline'
                    type='material-community'
                    color='goldenrod'
                    size={50}
                />
                <Icon
                    name='emoticon-tongue-outline'
                    type='material-community'
                    color='lightcoral'
                    size={50}
                />
                <Icon
                    name='emoticon-cool-outline'
                    type='material-community'
                    color='black'
                    size={50}
                />
            </View>
            <View style={{
                marginTop: '2%',
                alignSelf: 'center',
                borderWidth: 2,
                borderColor: 'green',
                borderRadius: 4,
                height: 140,
                width: 220
            }}>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    color: 'green',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    marginTop: '10%'
                }}>
                    Wohooo !!!!
                </Text>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    color: 'green',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    marginTop: '5%'
                }}>
                    NO TASK TO DO...
                </Text>
            </View>
        </View>
    );
}

// main class
export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
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
            isDateSet: true,
            buttonDisable: true,
            id: '',
            buttonText: '',
            taskID: '',
            refreshing: false
        };
        this.showFilter = this.showFilter.bind(this);
        this.showSearch = this.showSearch.bind(this);
    }

    _refresh=async()=>
    {
        await this.setUser();
    }

    buttonStatus() {
        {/** Add button (of add task) status check  If every field is filled enable add button*/ }
        if (this.state.isHeaderSet && this.state.isDesSet && this.state.isStatusSet && this.state.isTypeSet && this.state.isDateSet) {
            if (this.state.taskHeading == '' || this.state.taskDetail == '' || this.state.category == null || this.state.taskStatus == null || this.state.dueDate == null) {
                return false;
            }
            return true;
        }
        return false;
    };

    async UNSAFE_componentWillMount() {
        {/** If backpress, exit from the app */ }
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
        {/** Get user tasks from the database */ }
        this.setUser();
    }
    setUser = async () => {
        const userTasks = await taskApi.getCurrentTask();
        this.setState({ tasks: userTasks });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
    }

    confirmDelete(task) {
        Alert.alert("Delete Task", `Are you sure you want to delete task ' ${task.taskHeading} '?`, [
            {
                text: 'Yes',
                onPress: async () => {
                    const res = await taskApi.deleteTask(task);
                    console.log(res)
                    if (res == true)
                        this.setUser();
                }
            },
            {
                text: 'No'
            }
        ])
    }

    completeTask(task) {
        {/** mark task as complete */}
        task.id = task._id;
        task.taskStatus = "complete";
        async function a() { return await taskApi.updateTask(task) };
        a().then(data => {
            if (data === true)
                this.setUser();
        }).catch(err => console.log(err));
    }

    showFilter(sortby) {
        {/** Sort task */}
            this.setState({tasks: this.state.tasks.sort((a,b)=>(a[sortby].toUpperCase() > b[sortby].toUpperCase())?1:-1)});
            console.log(this.state.tasks); 
    }

    getFilteredTask = async(searchObj)=>
    {
        {/** Filter tasks  */}
        const new_array=await taskApi.searchTask(searchObj);
        if(new_array!=undefined)
            this.setState({tasks: new_array});
    }
    
    showSearch(search)
    {
        {/** get task heading to search from user */}
        if(search!='')
        {
            const findTask={
                taskHeading:search,
                category:null,
                taskStatus: null
            }
            this.getFilteredTask(findTask);
        }
    }
    render() {
        return (
            
            <ImageBackground source={require('../assets/todonew.png')}
                style={{
                    height: '100%',
                    width: '100%'
                }}>
                {/* Menu starts */}
                <MenuBar props={this.props} />
                {/* Menu end */}
                <SearchBar searchBy={this.showSearch}/>
                {/* cards render here */}
                <PTRView onRefresh={this._refresh}>
                <ScrollView>
                    {
                        this.state.tasks.length > 0 ?
                            <ScrollView>
                                <View>
                                    {
                                        this.state.tasks.map((taskItem, index) => {
                                            return (
                                                <Card
                                                    containerStyle={{
                                                        borderRadius: 9,
                                                        borderWidth: 2,
                                                        borderColor: 'brown',
                                                    }}
                                                    titleStyle={{
                                                        fontSize: 20,
                                                        color: 'brown',
                                                        textDecorationLine: 'underline'
                                                    }}
                                                    title={taskItem.taskHeading.toUpperCase()}
                                                    key={taskItem._id}>
                                                    <View style={styles.deteleTask}>
                                                        <Icon
                                                            name='trash'
                                                            type='font-awesome'
                                                            color='brown'
                                                            size={23}
                                                            onPress={() => this.confirmDelete(taskItem)}
                                                        />
                                                    </View>
                                                    <PricingCard
                                                        infoStyle={{
                                                            color: 'black',
                                                        }}
                                                        containerStyle={{
                                                            borderRadius: 4,
                                                            borderColor: 'green',
                                                        }}
                                                        titleStyle={{ height: 0 }}
                                                        pricingStyle={{ height: 0 }}
                                                        info={[`Task: ${taskItem.taskDetail}`,
                                                        `Due Date : ${taskItem.dueDate}`,
                                                        `Task Status : ${taskItem.taskStatus}`,
                                                        `Category : ${taskItem.category}`]}
                                                        button={{ title: "nn", buttonStyle: { display: "none" } }}
                                                    />

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignSelf: 'center'
                                                    }}>
                                                        <TouchableOpacity onPress={
                                                            () => {
                                                                this.setState(
                                                                    {
                                                                        buttonText: 'Update',
                                                                        taskHeading: taskItem.taskHeading,
                                                                        taskDetail: taskItem.taskDetail,
                                                                        category: taskItem.category,
                                                                        taskStatus: taskItem.taskStatus,
                                                                        dueDate: taskItem.dueDate,
                                                                        showModal: true,
                                                                        taskID: taskItem._id
                                                                    });
                                                            }
                                                        }>
                                                            <View style={styles.updateButton}>
                                                                <Text style={styles.updateText}>Update</Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity onPress={() => this.completeTask(taskItem)}>
                                                            <View style={styles.updateButton}>
                                                                <Text style={styles.updateText}>Complete</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                </Card>
                                            );
                                        })
                                    }
                                </View>
                            </ScrollView> :
                            <ImageBackground source={require('../assets/todolist.jpg')}
                                style={{
                                    height: Dimensions.get('screen').height,
                                    width: Dimensions.get('screen').width
                                }}>
                                <BlankTask />
                            </ImageBackground>
                    }
                </ScrollView>
                </PTRView>
                {/* card render ends here */}

                {/* add task button starts here */}
                <View style={styles.addButton}>
                    <Icon
                        reverse
                        raised
                        name='plus'
                        type='font-awesome'
                        color='forestgreen'
                        onPress={() => {
                            this.setState({ buttonText: 'Add Task' });
                            this.setState({ showModal: true })
                        }}
                    />
                </View>
                {/* add task button ends here */}

                {/* add task modal starts from here */}
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                    hardwareAccelerated={true}
                >
                    {/* modal title written in card title */}
                    <Card title={'ADD NEW TASK'}
                        titleStyle={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'midnightblue',
                            paddingHorizontal: 9,
                            fontFamily: 'monospace'
                        }}
                        containerStyle={{
                            borderColor: 'green',
                            borderRadius: 10,
                            borderWidth: 4,
                            marginTop: '20%',
                        }}
                    >
                        <View>
                            {/* Task heading */}
                            <View style={{
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TextInput
                                    placeholder="  Task Heading            "
                                    underlineColorAndroid="transparent"
                                    onChangeText={text => this.setState({ taskHeading: text })}
                                    defaultValue={this.state.taskHeading}
                                    editable={!(this.state.buttonText == "Update")}
                                    onFocus={() => { this.setState({ isHeaderSet: true }); }}
                                    onBlur={() => { if (this.state.taskHeading.length < 1) this.setState({ isHeaderSet: false }); }}
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: 20,
                                        textAlign: 'center'
                                    }}
                                />
                                <View>
                                    {
                                        this.state.isHeaderSet ? null : <Error />
                                    }
                                </View>
                            </View>

                            {/* Task description */}
                            <View style={{
                                borderWidth: 2,
                                borderColor: 'grey',
                                borderRadius: 7,
                                marginTop: '5%'
                            }}>
                                <TextInput
                                    placeholder="Task description to be entered here ...."
                                    multiline={true}
                                    numberOfLines={4}
                                    defaultValue={this.state.taskDetail}
                                    onChangeText={text => this.setState({ taskDetail: text })}
                                    onFocus={() => { this.setState({ isDesSet: true }); }}
                                    onBlur={() => { if (this.state.taskDetail.length < 1) this.setState({ isDesSet: false }); }}
                                    style={{
                                        fontSize: 16
                                    }}
                                />
                                <View>
                                    {
                                        this.state.isDesSet ? null : <Error />
                                    }
                                </View>
                            </View>

                            {/* Task type */}
                            <View style={{
                                marginTop: '5%',
                                borderWidth: 2,
                                borderColor: 'lightgray',
                                width: 200,
                                borderRadius: 7,
                            }}>
                                <Picker
                                    selectedValue={this.state.category}
                                    style={{ height: 50, width: 200 }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ category: itemValue });
                                        if (itemValue != null)
                                            this.setState({ isTypeSet: true });
                                        else
                                            this.setState({ isTypeSet: false });
                                    }}
                                >
                                    <Picker.Item label="Task Category" value={null} />
                                    <Picker.Item label="Personal" value="personal" />
                                    <Picker.Item label="work" value="work" />
                                    <Picker.Item label="Shopping" value="shopping" />
                                    <Picker.Item label="Other" value="others" />
                                </Picker>
                            </View>
                            <View>
                                {
                                    this.state.isTypeSet ? null : <Error />
                                }
                            </View>

                            {/* Task status */}
                            <View style={{
                                marginTop: '7%',
                                borderWidth: 2,
                                width: 200,
                                borderRadius: 7,
                                borderColor: 'lightgray',
                            }}>
                                <Picker
                                    selectedValue={this.state.taskStatus}
                                    style={{ height: 50, width: 200 }}

                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ taskStatus: itemValue });
                                        if (itemValue != null)
                                            this.setState({ isStatusSet: true });
                                        else
                                            this.setState({ isStatusSet: false })
                                    }}
                                >
                                    <Picker.Item label="Task Status" value={null} />
                                    <Picker.Item label="New" value="new" />
                                    <Picker.Item label="In-Progress" value="ongoing" />
                                    <Picker.Item label="Complete" value="complete" />
                                </Picker>
                            </View>
                            <View>
                                {
                                    this.state.isStatusSet ? null : <Error />
                                }
                            </View>

                            {/* Due date calender */}
                            <View style={{
                                marginTop: '10%',

                            }}>
                                <DatePicker
                                    style={{
                                        width: 150,
                                        borderWidth: 1,
                                        borderRadius: 6,
                                        borderColor: 'lightgray',
                                    }}
                                    date={this.state.dueDate}
                                    mode="date"
                                    placeholder="Due date"
                                    format="YYYY-MM-DD"
                                    minDate={new Date(Date.now())}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => { this.setState({ dueDate: date, isDateSet: true }); }}
                                />
                            </View>
                            <View>
                                {
                                    this.state.isDateSet ? null : <Error />
                                }
                            </View>

                            {/* Submit and cancel button */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignContent: 'center',
                                alignSelf: 'center',
                                marginTop: '10%'
                            }}>
                                <TouchableOpacity disabled={!this.buttonStatus()} style={styles.addCancelButton}
                                    onPress={async () => {
                                        if (this.state.buttonText == "Add Task") {
                                            await taskApi.addTask(this);
                                            this.setState({ showModal: false });
                                            this.setUser()
                                        }
                                        else {
                                            const taskObj = {
                                                id: this.state.taskID,
                                                taskHeading: this.state.taskHeading,
                                                taskDetail: this.state.taskDetail,
                                                taskStatus: this.state.taskStatus,
                                                category: this.state.category,
                                                dueDate: this.state.dueDate
                                            };
                                            await taskApi.updateTask(taskObj);
                                            this.setState({ showModal: false });
                                            this.setUser();
                                        }
                                    }}>
                                    <Text style={styles.addCancelText}>{this.state.buttonText}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.addCancelButton} onPress={() => taskApi.closeModal(this)}>
                                    <Text style={styles.addCancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </Modal>
                {/* add task modal ends here */}

                
                {/* Sort by  */}
                {this.state.tasks.length > 0 ? <Sort filter={this.showFilter} /> : null}

            </ImageBackground>
            
        );
    }
}
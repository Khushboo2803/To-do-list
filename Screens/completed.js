import React from 'react';
import { ImageBackground, Dimensions, View, Text, BackHandler, Alert } from 'react-native';
import { Card, Icon, PricingCard } from 'react-native-elements';
import Sort from './sortby';
import styles from './styles';
import taskApi from '../functions/tasks';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import MenuBar from './components/menubar'
import SearchBar from './components/searchBar';
import PTRView from 'react-native-pull-to-refresh';

function BlankTask() {
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
                    name='emoticon-cry-outline'
                    type='material-community'
                    color='darkorange'
                    size={50}
                />
                <Icon
                    name='emoticon-dead-outline'
                    type='material-community'
                    color='goldenrod'
                    size={50}
                />
                <Icon
                    name='emoticon-neutral-outline'
                    type='material-community'
                    color='lightcoral'
                    size={50}
                />
                <Icon
                    name='emoticon-sad-outline'
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
                    AWWW !!!!
                </Text>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    color: 'green',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    marginTop: '5%',
                    textAlign: 'center'
                }}>
                    YOU HAVEN'T COMPLETED ANY TASK.
                </Text>
            </View>
        </View>
    );
}

export default class CompleteTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            dropmenu: false,
            showModal: false,
            buttonDisable: true,
            dialogBox: false,
            oldpass: '',
            newpass: '',
            newpassConfirm: '',
            id: '',
            buttonText: '',
            taskID: ''
        };
        this.showFilter = this.showFilter.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.showCategories = this.showCategories.bind(this);
    }

    async UNSAFE_componentWillMount() {
        {/** Initially called */}
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
        {/** Get user tasks from the database */ }
        this.setUser();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
    }

    setUser = async () => {
        //get completed tasks
        const taskItems = await taskApi.getCompletedTask();
        this.setState({ tasks: taskItems });
    }

    _refresh=async()=>
    {   //refresh cards
        await this.setUser();
    }

    confirmDelete(task) {
        Alert.alert("Delete Task", `Are you sure you want to delete task '${task.taskHeading}'?`, [
            {
                text: 'Yes',
                onPress: async () => {
                    const res = await taskApi.deleteTask(task);
                    if (res == true)
                        this.setUser();
                }
            },
            {
                text: 'No'
            }
        ])
    }

    showFilter(sortby) {
            //sort by function
            this.setState({tasks: this.state.tasks.sort((a,b)=>(a[sortby].toUpperCase() > b[sortby].toUpperCase())?1:-1)});
            console.log(this.state.tasks); 
    }

    getFilteredTask = async(searchObj)=>
    {
        const new_array=await taskApi.searchTask(searchObj);
        if(new_array!=undefined)
            this.setState({tasks: new_array});
    }

    showSearch(search){
        //search by textInput handler
        const findTask={
            taskHeading:search,
            category:null,
            taskStatus: ["complete"]
        }
        this.getFilteredTask(findTask);
    }

    showCategories(obj)
    { //filter view handler
            const findTask={
                taskHeading:null,
                category:obj.category,
                taskStatus:["complete"]
            }
        this.getFilteredTask(findTask);   
    }

    //start rendering
    render() {
        return (
            <ImageBackground source={require('../assets/todonew.png')}
                style={{
                    height: '100%',
                    width: '100%'
                }}>
                {/* Menu starts */}
                <MenuBar props={this.props} />

                {/* Search bar starts here */}
                <SearchBar searchBy={this.showSearch}/>
               
                {/* cards render here */}
                < PTRView onRefresh={this._refresh}>
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
                                                        marginBottom:'3%'
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

                {/* sort by view */}
                {this.state.tasks.length > 0 ? <Sort filter={this.showFilter} screenName="complete" sortCat={this.showCategories}/> : null}
            </ImageBackground>
        );
    }
}
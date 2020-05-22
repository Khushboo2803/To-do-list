import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker } from 'react-native';
import { Card, Icon, FormLabel } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DatePicker from 'react-native-datepicker';
import styles from './styles';
import task from '../functions/tasks';
export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            dropmenu: false,
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
            buttonDisable: true
        };
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    buttonStatus(){
        if(this.state.isHeaderSet && this.state.isDesSet && this.state.isStatusSet && this.state.isTypeSet && this.state.isDateSet)
        {
            if(this.state.taskHeading=='' || this.state.taskDetail=='' || this.state.category==null || this.state.taskStatus==null|| this.state.dueDate==null)
            {
                return false;
            }
            return true;
        }   
        return false;                                
    };
    UNSAFE_componentWillMount() {
        this.state.users = [
            {
                taskHeading: 'Buy groceries',
                detail: 'you have to buy groceries and some sweets ',
                dueDate: '22/7/12',
                status: 'new'
            },
            {
                taskHeading: 'To do list',
                detail: 'Woow my code  ',
                dueDate: '22/7/12',
                status: 'new'
            },
        ]
    }

    render() {
        return (

            <ImageBackground source={require('../assets/todo.png')}
                style={{
                    height: Dimensions.get('screen').height,
                    width: Dimensions.get('screen').width
                }}>
                <View>
                    <View style={{
                        height: Dimensions.get('screen').height * 0.07,
                        borderWidth: 3,
                        backgroundColor: 'slateblue',
                        flexDirection: 'row'
                    }}>
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: 'bold'
                            }}> TO-DO List</Text>
                        <View>
                            <Menu
                                ref={this.setMenuRef}
                                button={
                                    <TouchableOpacity onPress={this.showMenu}>
                                        <Image source={require('../assets/menu.jpg')}
                                            style={{ height: 43, width: 45, marginLeft: '52%', borderRadius: 98, marginTop: 2 }}
                                        />
                                    </TouchableOpacity>
                                }
                            >
                                <MenuItem onPress={this.hideMenu}>Incomplete Task</MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={this.hideMenu}>Completed task</MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={this.hideMenu}>Account privacy</MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={this.hideMenu}>logout</MenuItem>
                            </Menu>
                        </View>
                    </View>
                    <View>
                        {
                            this.state.users.map((user, index) => {
                                return (
                                    <Card title={user.taskHeading} featuredTitle={'&times;'} key={index}>
                                        <View>
                                            {/* Title  */}
                                            <View
                                                style={{ flexDirection: 'row' }}>
                                                <Text>
                                                    {user.taskHeading}
                                                </Text>
                                                <View style={{ marginLeft: '60%' }}>
                                                    <Text style={{
                                                        fontSize: 26,
                                                        color: 'red',
                                                        fontWeight: 'bold'
                                                    }}> &times;</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Card>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.addButton}>
                    <Icon
                        raised
                        name='plus'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.setState({ showModal: true })}
                    />
                </View>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                    hardwareAccelerated={true}
                >
                    <Card title={'ADD NEW TASK'}
                        titleStyle={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'midnightblue'
                        }}
                        containerStyle={{
                            borderColor: 'midnightblue',
                            borderRadius: 7,
                            borderWidth: 1,
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
                                    underlineColorAndroid="rtransparent"
                                    onChangeText={text => this.setState({ taskHeading: text })}
                                    defaultValue={this.state.taskHeading}
                                    onFocus={() => { this.setState({ isHeaderSet: true }); }}
                                    onBlur={() => { if (this.state.taskHeading.length < 1) this.setState({ isHeaderSet: false }); }}
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: 20
                                    }}
                                />
                                <View>
                                    {
                                        this.state.isHeaderSet ? null :
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
                                                }}>This is a required field ...</Text>
                                            </View>

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
                                    onChangeText={text => this.setState({ taskDetail: text })}
                                    onFocus={() => { this.setState({ isDesSet: true }); }}
                                    onBlur={() => { if (this.state.taskDetail.length < 1) this.setState({ isDesSet: false }); }}
                                    style={{
                                        fontSize: 16
                                    }}
                                />
                            </View>
                            <View>
                                {
                                    this.state.isDesSet ? null :
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
                                            }}>This is a required field ...</Text>
                                        </View>

                                }
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
                                        this.setState({category: itemValue});
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
                                    this.state.isTypeSet ? null :
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
                                            }}>This is a required field ...</Text>
                                        </View>

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
                                    <Picker.Item label="Complete" value="completed" />
                                </Picker>
                            </View>
                            <View>
                                {
                                    this.state.isStatusSet ? null :
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
                                            }}>This is a required field ...</Text>
                                        </View>

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
                                    format="DD-MM-YYYY"
                                    minDate={new Date(Date.now())}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => { this.setState({ dueDate: date, isDateSet: true }); }}
                                />
                            </View>
                            <View>
                                {
                                    this.state.isDateSet ? null :
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
                                            }}>This is a required field ...</Text>
                                        </View>

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
                                
                                <TouchableOpacity disabled={!this.buttonStatus()} style={styles.addCancelButton} onPress={() => task.addTask(this)}>
                                    <Text style={styles.addCancelText}>Add Task</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.addCancelButton} onPress={() => task.closeModal(this)}>
                                    <Text style={styles.addCancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </Modal>
            </ImageBackground>
        );
    }
}
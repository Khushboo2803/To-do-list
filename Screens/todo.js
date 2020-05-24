import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker, BackHandler } from 'react-native';
import { Card, Icon, FormLabel, PricingCard, Button } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DatePicker from 'react-native-datepicker';
import styles from './styles';
import task from '../functions/tasks';
import AsyncStorage from '@react-native-community/async-storage';
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
            buttonDisable: true,
            dialogBox: false,
            oldpass: '',
            newpass: '',
            newpassConfirm: ''
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

    buttonStatus() {
        if (this.state.isHeaderSet && this.state.isDesSet && this.state.isStatusSet && this.state.isTypeSet && this.state.isDateSet) {
            if (this.state.taskHeading == '' || this.state.taskDetail == '' || this.state.category == null || this.state.taskStatus == null || this.state.dueDate == null) {
                return false;
            }
            return true;
        }
        return false;
    };
    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
        this.state.users = [
            {
                _id: '5ec4aefe1fae4a1148774948',
                taskHeading: 'Buy groceries',
                taskDetail: 'you have to buy groceries and some sweets ',
                dueDate: '22/7/12',
                taskStatus: 'ongoing',
                category: "personal"
            },
            {
                _id: '5ec4aefe1fae4a1148774949',
                taskHeading: 'Buy Sweets',
                taskDetail: 'you have to buy groceries and some sweets ',
                dueDate: '22/7/12',
                taskStatus: 'new',
                category: "personal"
            },
        ]
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
    }
    modifyTask(task) {
        console.log(task)
    }
    render() {
        return (

            <ImageBackground source={require('../assets/todo.png')}
                style={{
                    height: Dimensions.get('screen').height,
                    width: Dimensions.get('screen').width
                }}>
                {/* todo main screen */}
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
                        {/* menu in todo screen */}
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
                                <MenuItem onPress={() => {
                                    this.hideMenu
                                    this.setState({ dialogBox: true })
                                }}>Update password</MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={async () => {
                                    await AsyncStorage.removeItem('id');
                                    await AsyncStorage.removeItem('user');
                                    this.props.navigation.navigate('signup');
                                    BackHandler.removeEventListener('hardwareBackPress', () => {
                                        BackHandler.exitApp();
                                    });
                                    this.hideMenu
                                }
                                }>logout</MenuItem>
                            </Menu>
                        </View>
                    </View>
                    {/* cards for rendering task */}
                    <View>
                        {
                            this.state.users.map((user, index) => {
                                return (
                                    <Card
                                        title={user.taskHeading}
                                        key={index}>
                                        <Text style={styles.deteleTask}
                                            onPress={() => this.modifyTask(user)}> &times;</Text>
                                        <PricingCard
                                            color="#4f9deb"
                                            title={null}
                                            titleStyle={{ height: 0 }}
                                            pricingStyle={{ height: 0 }}
                                            info={[`Task: ${user.taskDetail}`, `Due Date : ${user.dueDate}`, `Task Status : ${user.taskStatus}`, `Category : ${user.category}`]}
                                            button={{ title: "nn", buttonStyle: { display: "none" } }}
                                        />
                                        <Button></Button>
                                    </Card>
                                )
                            })
                        }
                    </View>
                </View>
                {/*add task button */}
                <View style={styles.addButton}>
                    <Icon
                        reverse
                        raised
                        name='plus'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.setState({ showModal: true })}
                    />
                </View>
                {/* add task modal */}
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

                {/* Update password request */}
                <Dialog onTouchOutside={() => {
                    this.setState({ dialogBox: true });
                }}
                    width={0.9}
                    visible={this.state.dialogBox}
                    dialogAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        BackHandler.exitApp();
                        clearInterval(this.interval);
                        console.log('onHardwareBackPress');
                        this.setState({ dialogBox: false });
                        return true;
                    }}
                    dialogTitle={
                        <DialogTitle
                            title="Enter OTP"
                            hasTitleBar={false}
                        />
                    }
                    actions={
                        [
                            <DialogButton
                                text="DISMISS"
                                onPress={() => {
                                    this.setState({ dialogBox: false });
                                }}
                                key="button-1"
                            />,
                        ]
                    }>
                    <DialogContent>
                        <View>

                            <TextInput
                                placeholder="Enter current password                 "
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.setState({ oldpass: text })}
                                defaultValue={this.state.oldpass}
                                style={{
                                    color: 'navy',
                                    fontFamily: 'monospace'
                                }}
                            />

                            <Button
                                title="Verify"
                                onPress={async () => {
                                    clearInterval(this.interval);
                                    this.setState({ dialogBox: false });
                                    const id = await user.verifyOTP(this.state.id, this.state.otp);
                                    if (id != false) {
                                        console.log('validated');
                                        await AsyncStorage.setItem('id', id);
                                        await AsyncStorage.setItem('user', this.state.username);
                                        this.props.navigation.navigate('todo');
                                    }

                                }}
                                key="button-1"
                            />
                        </View>
                    </DialogContent>
                </Dialog>
            </ImageBackground>
        );
    }
}
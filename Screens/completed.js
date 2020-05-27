import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker, BackHandler, Alert } from 'react-native';
import { Card, Icon, PricingCard, Button } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DatePicker from 'react-native-datepicker';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
} from 'react-native-popup-dialog';
import styles from './styles';
import user from '../functions/user';
import taskApi from '../functions/tasks';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

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
            user: '',
            buttonText: '',
            taskID: ''
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

    async UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
        {/** Get user tasks from the database */ }
        this.setUser();
        {/** Get user name from the phone storage */ }
        const user = await AsyncStorage.getItem('user');
        this.setState({ user: user });
    }

    confirmDelete(task) {
        console.log('item to dlelete is ', task);

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

    setUser = async () => {
        const taskItems = await taskApi.getCompletedTask();
        this.setState({ tasks: taskItems });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
    }
    render() {
        return (
            <ImageBackground source={require('../assets/todonew.png')}
                style={{
                    height: '100%',
                    width: '100%'
                }}>
                {/* header starts */}
                <View>
                    <View style={{
                        height: Dimensions.get('screen').height * 0.07,
                        borderWidth: 2,
                        backgroundColor: 'darkseagreen',
                        flexDirection: 'row',
                        borderColor: 'green'
                    }}>
                        {/* header text */}
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: '900',
                                textShadowRadius: 20,
                                textShadowColor: 'gainsboro'
                            }}> To-do List</Text>

                        {/* header menu starts here */}
                        <Menu
                            ref={this.setMenuRef}
                            button={
                                <TouchableOpacity onPress={this.showMenu}>
                                    <Image source={require('../assets/menu.jpg')}
                                        style={{ height: 43, width: 45, marginLeft: '56%', borderRadius: 98, marginTop: 2 }}
                                    />
                                </TouchableOpacity>
                            }
                        >
                            {/* menu item 1 */}
                            <MenuItem onPress={
                                this.hideMenu
                            }>
                                <Text style={{
                                    fontSize: 20,
                                    color: 'blue',
                                    textShadowRadius: 20,
                                    textDecorationLine: 'underline'
                                }}>
                                    {this.state.user}
                                </Text>
                            </MenuItem>

                            {/* menu item 2 */}
                            <MenuItem onPress={() => {
                                this.props.navigation.navigate('todo');
                                this.hideMenu();
                            }}>
                                Incomplete tasks
                                </MenuItem>
                            <MenuDivider />

                            {/* menu item 3 */}
                            <MenuItem onPress={() => {
                                this.props.navigation.navigate('complete');
                                this.hideMenu
                            }}>
                                Complete tasks
                                </MenuItem>
                            <MenuDivider />

                            {/* menu item 4 */}
                            <MenuItem onPress={() => {
                                this.setState({ dialogBox: true });
                                this.hideMenu();
                            }}>
                                Update Password
                                </MenuItem>
                            <MenuDivider />

                            {/* menu item 5 */}
                            <MenuItem onPress={async () => {
                                await AsyncStorage.removeItem('id');
                                await AsyncStorage.removeItem('user');
                                this.props.navigation.navigate('signup');
                                BackHandler.removeEventListener('hardwareBackPress', () => {
                                    BackHandler.exitApp();
                                });
                                this.hideMenu
                            }
                            }>
                                Log-out
                                </MenuItem>
                        </Menu>
                    </View>
                </View>
                {/* header ends here */}

                {/* cards render here */}
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
                {/* card render ends here */}

                {/* update password dialog appears here */}
                <Dialog onTouchOutside={() => {
                    this.setState({ dialogBox: false });
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
                            title="Change password"
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

                            <TextInput
                                placeholder="Enter new password                 "
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.setState({ newpass: text })}
                                defaultValue={this.state.newpass}
                                style={{
                                    color: 'navy',
                                    fontFamily: 'monospace'
                                }}
                            />

                            <TextInput
                                placeholder="confirm new password                 "
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.setState({ newpassConfirm: text })}
                                defaultValue={this.state.newpassConfirm}
                                style={{
                                    color: 'navy',
                                    fontFamily: 'monospace'
                                }}
                            />

                            <View>
                                {
                                    this.state.newpass == this.state.newpassConfirm ? null :
                                        <View style={{ marginTop: '4%' }}>
                                            <Text style={{
                                                color: 'red'
                                            }}>*This field doesn't match with your new password</Text>
                                        </View>
                                }
                            </View>

                            <Button
                                title="Verify"
                                onPress={async () => {

                                    if (this.state.oldpass != '' && this.state.newpassConfirm == this.state.newpass && this.state.newpass != '') {
                                        const res = await user.updatePassword(this.state.oldpass, this.state.newpass);
                                        if (res) {
                                            Alert.alert("Password reset successful. Login again with new password");
                                            await AsyncStorage.removeItem('id');
                                            await AsyncStorage.removeItem('user');
                                            this.setState({ oldpass: '', newpass: '', newpassConfirm: '' });
                                            this.props.navigation.navigate('login');
                                            this.setState({ dialogBox: false });
                                        }
                                        else {
                                            Alert.alert("You have entered wrong password. Try again.");
                                            this.setState({ oldpass: '', newpass: '', newpassConfirm: '' });
                                            this.setState({ dialogBox: false });
                                        }
                                    }
                                }
                                }
                                key="button-1"
                            />
                        </View>
                    </DialogContent>
                </Dialog>
                {/* update password dialog ends here */}
            </ImageBackground>
        );
    }
}
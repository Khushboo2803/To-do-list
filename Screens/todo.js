import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker, BackHandler, Alert} from 'react-native';
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
import task from '../functions/tasks';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

function Error()
{
    {/** This function is called when any field left empty in add task modal */}
    return(
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
            newpassConfirm: '',
            id:'',
            user:''
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
        {/** Add button (of add task) status check  If every field is filled enable add button*/}
        if (this.state.isHeaderSet && this.state.isDesSet && this.state.isStatusSet && this.state.isTypeSet && this.state.isDateSet) {
            if (this.state.taskHeading == '' || this.state.taskDetail == '' || this.state.category == null || this.state.taskStatus == null || this.state.dueDate == null) {
                return false;
            }
            return true;
        }
        return false;
    };
    async UNSAFE_componentWillMount() {
        {/** If backpress, exit from the app */}
         BackHandler.addEventListener('hardwareBackPress', () => {
             BackHandler.exitApp();
         });
         {/** Get user tasks from the database */}
         this.setUser();
         {/** Get user name from the phone storage */}
         const user = await AsyncStorage.getItem('user');
         this.setState({user: user});
         
    }

    setUser =async()=>
    {
        const id=await AsyncStorage.getItem('id');
        this.setState({id:id});
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
                            borderColor:'green'
                        }}>
                            {/* header text */}
                            <Text
                                style={{
                                    fontSize: 36,
                                    fontWeight: '900',
                                    textShadowRadius:20,
                                    textShadowColor:'gainsboro'
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
                                    fontSize:20,
                                    color: 'blue',
                                    textShadowRadius:20,
                                    textDecorationLine:'underline'
                                    }}>
                                        {this.state.user}
                                    </Text>
                                </MenuItem>

                                {/* menu item 2 */}
                                <MenuItem onPress={this.hideMenu}>
                                    Incomplete tasks
                                </MenuItem>
                                <MenuDivider />

                                {/* menu item 3 */}
                                <MenuItem onPress={this.hideMenu}>
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
                                <MenuDivider/>

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
                        <View>
                        {
                            this.state.users.map((user, index) => {
                                return (
                                    <Card
                                    containerStyle={{
                                        borderRadius:9,
                                        borderWidth:2,
                                        borderColor:'brown',
                                    }}
                                    titleStyle={{
                                        fontSize:20,
                                        color:'brown',
                                        textDecorationLine:'underline'
                                    }}
                                    title={user.taskHeading.toUpperCase()}
                                        key={index}>
                                            <View style={styles.deteleTask}>
                                                <Icon    
                                                    name='trash'
                                                    type='font-awesome'
                                                    color='brown'
                                                    size={23}  
                                                    onPress={() => this.modifyTask(user)}
                                                />
                                            </View>
                                            <PricingCard
                                        infoStyle={{
                                            color:'black',
                                        }}
                                        containerStyle={{
                                            borderRadius:4,
                                            borderColor:'green',
                                        }}
                                            titleStyle={{ height: 0 }}
                                            pricingStyle={{ height: 0 }}
                                            info={[`Task: ${user.taskDetail}`, `Due Date : ${user.dueDate}`, `Task Status : ${user.taskStatus}`, `Category : ${user.category}`]}
                                            button={{ title: "nn", buttonStyle: { display: "none" } }}
                                        />
                                        
                                        <View style={{flexDirection:'row',
                                    alignSelf:'center'}}>
                                            <TouchableOpacity>
                                                <View style={styles.updateButton}>
                                                    <Text style={styles.updateText}>Update</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity>
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
                    </ScrollView>  
                    {/* card render ends here */}

                    {/* add task button starts here */}
                    <View style={styles.addButton}>
                        <Icon
                            reverse
                            raised
                            name='plus'
                            type='font-awesome'
                            color='forestgreen'
                            onPress={() => this.setState({ showModal: true })}
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
                                            this.state.isHeaderSet ? null :<Error/>
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
                                    <View>
                                        {
                                            this.state.isDesSet ? null : <Error/>
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
                                        this.state.isTypeSet ? null : <Error/>
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
                                        this.state.isStatusSet ? null : <Error/>
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
                                        this.state.isDateSet ? null : <Error/>
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
                    {/* add task modal ends here */}

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
                                            this.state.newpass==this.state.newpassConfirm ? null : 
                                            <View style={{marginTop:'4%'}}>
                                                <Text style={{
                                                    color:'red'
                                                }}>*This field doesn't match with your new password</Text>
                                            </View>
                                        }
                                    </View>

                                    <Button
                                        title="Verify"
                                        onPress={async () => {
                                            
                                                if(this.state.oldpass!='' && this.state.newpassConfirm==this.state.newpass && this.state.newpass!='')
                                                {
                                                    const res=await user.updatePassword(this.state.id, this.state.oldpass, this.state.newpass);
                                                    if(res)
                                                    {
                                                        Alert.alert("Password reset successful. Login again with new password");
                                                        await AsyncStorage.removeItem('id');
                                                        await AsyncStorage.removeItem('user');
                                                        this.setState({oldpass :'', newpass: '', newpassConfirm: ''});
                                                        this.props.navigation.navigate('login');
                                                        this.setState({dialogBox : false});
                                                    }
                                                    else{
                                                        Alert.alert("You have entered wrong password. Try again.");
                                                        this.setState({oldpass :'', newpass: '', newpassConfirm: ''});
                                                        this.setState({dialogBox : false});
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
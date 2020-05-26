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
import task from '../functions/tasks';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

function BlankTask()
{
    return(
        <View style={{
            height:250,
            width:260,
            alignSelf:'center',
            backgroundColor:'white',
            borderRadius:10,
            marginTop:'52%',
            borderWidth:3,
            borderColor:'brown',
        }}
        >
            <View style={{
                flexDirection:'row',
                alignSelf:'center',
                marginTop:'10%'
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
                marginTop:'2%',
                alignSelf:'center',
                borderWidth:2,
                borderColor:'green',
                borderRadius:4,
                height:140,
                width:220
            }}>
                <Text style={{
                    alignSelf:'center',
                    fontSize:20,
                    color:'green',
                    fontFamily:'monospace',
                    fontWeight:'bold',
                    marginTop:'10%'
                }}>
                    AWWW !!!!
                </Text>
                <Text style={{
                    alignSelf:'center',
                    fontSize:20,
                    color:'green',
                    fontFamily:'monospace',
                    fontWeight:'bold',
                    marginTop:'5%',
                    textAlign:'center'
                }}>
                    YOU HAVEN'T COMPLETED ANY TASK. 
                </Text>
            </View>
        </View>
    );
}

export default class CompleteTask extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            dropmenu: false,
            showModal: false,
            buttonDisable: true,
            dialogBox: false,
            oldpass: '',
            newpass: '',
            newpassConfirm: '',
            id: '',
            user: '',
            buttonText:'',
            taskID:''
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

    async UNSAFE_componentWillMount()
    {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
        {/** Get user tasks from the database */ }
        this.setUser();
        {/** Get user name from the phone storage */ }
        const user = await AsyncStorage.getItem('user');
        this.setState({ user: user });
    }

    componentDidUpdate()
     {
         this.setUser();
     }
     
    setUser = async () => {
        const tasks=await task.getCompletedTask();
        this.setState({users : tasks});
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
    }
    render()
    {
        return(
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
                            <MenuItem onPress={()=>{
                                this.props.navigation.navigate('todo');
                                this.hideMenu();
                            }}>
                                Incomplete tasks
                                </MenuItem>
                            <MenuDivider />

                            {/* menu item 3 */}
                            <MenuItem onPress={()=>{
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
                        this.state.users.length>0 ?
                        <ScrollView>
                        <View>
                            {
                                this.state.users.map((user, index) => {
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
                                            title={user.taskHeading.toUpperCase()}
                                            key={user._id}>
                                            <View style={styles.deteleTask}>
                                                <Icon
                                                    name='trash'
                                                    type='font-awesome'
                                                    color='brown'
                                                    size={23}
                                                    onPress={() => task.deleteTask(this.state.users[index])}
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
                                                info={[`Task: ${user.taskDetail}`, `Due Date : ${user.dueDate}`, `Task Status : ${user.taskStatus}`, `Category : ${user.category}`]}
                                                button={{ title: "nn", buttonStyle: { display: "none" } }}
                                            />

                                        </Card>
                                    );
                                })
                            }
                        </View>
                    </ScrollView> : 
                    <ImageBackground source={require('../assets/todo.png')}
                    style={{
                        height:Dimensions.get('screen').height*0.84,
                        width: Dimensions.get('screen').width
                    }}>
                        <BlankTask/>
                    </ImageBackground>
                    }
                </ScrollView>
                {/* card render ends here */}
            </ImageBackground>
        );
    }
}
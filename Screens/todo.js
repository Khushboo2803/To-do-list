import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker } from 'react-native';
import { Card, Icon, FormLabel } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import styles from './styles'
export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            dropmenu: false,
            showModal: false,
            selectedValue: '',
            taskHeading: '',
            selectedStatus: ''
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

    changeTaskheading(text)
    {
        this.setState({taskHeading: text});
    }

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
                                <MenuItem onPress={this.hideMenu}>Complete task</MenuItem>
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
                    <Card title={'NEW TASK'}>
                        <View>
                            {/* Task heading */}
                            <View style={{
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TextInput 
                                    placeholder="  Task heading            "
                                    underlineColorAndroid="red"
                                    onChangeText={text=>{this.changeTaskheading(text)}}
                                    defaultValue={this.state.taskHeading}
                                    style={{
                                        fontFamily:'monospace'
                                    }}
                                />
                            </View>

                            {/* Task description */}
                            <View style={{
                                borderWidth: 2,
                                borderColor:'grey',
                                borderRadius:7,
                                marginTop:'5%'
                            }}>
                            <TextInput
                                    placeholder="Task description to be entered here ...."
                                    multiline={true}
                                    numberOfLines={4}      
                                />
                            </View>
                             {/* Task type */}
                             <View style={{
                                 marginTop:'5%'
                             }}>
                                <Picker
                                    selectedValue={this.state.selectedValue}
                                    style={{ height: 50, width: 200 }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
                                >
                                    <Picker.Item label="Task Type " value="none" />
                                    <Picker.Item label="Personal" value="personal" />
                                    <Picker.Item label="office" value="office" />
                                    <Picker.Item label="Shopping" value="shopping" />
                                    <Picker.Item label="Other" value="other" />
                                </Picker>
                             </View>

                             {/* Task status */}
                             <View style={{
                                 marginTop:'2%'
                             }}>
                                <Picker
                                    selectedValue={this.state.selectedStatus}
                                    style={{height: 50, width: 200}}
                                    onValueChange={(itemValue, itemIndex) => this.setState({selectedStatus: itemValue})}
                                >
                                    <Picker.Item label="Task status" value="none" />
                                    <Picker.Item label="New" value="new" />
                                    <Picker.Item label="In-Progress" value="inprogress" />
                                    <Picker.Item label="Complete" value="complete" />
                                </Picker>
                             </View>

                             {/* Due date calender */}
                             <View>

                             </View>
                             
                             {/* Submit and cancel button */}
                             <View style={{
                                 flexDirection:'row',
                                 alignItems:'center',
                                 alignContent:'center',
                                 alignSelf:'center',
                                 marginTop:'10%'
                             }}>
                                 <TouchableOpacity style={{
                                     borderWidth:2,
                                     borderRadius:5,
                                     borderColor:'black',
                                     height: 30,
                                     width:90,
                                     marginRight:'5%'
                                 }}>
                                    <Text style={{
                                        alignSelf:'center',
                                        fontSize:16,
                                        fontWeight:'bold',
                                        fontFamily:'monospace'
                                    }}>Add Task</Text>
                                 </TouchableOpacity>

                                 <TouchableOpacity style={{
                                     borderWidth:2,
                                     borderRadius:5,
                                     borderColor:'black',
                                     height: 30,
                                     width:90
                                 }}>
                                    <Text style={{
                                        alignSelf:'center',
                                        fontSize:16,
                                        fontWeight:'bold',
                                        fontFamily:'monospace'
                                    }}>Cancel</Text>
                                 </TouchableOpacity>
                             </View>
                            
                        </View>
                    </Card>
                </Modal>
            </ImageBackground>
        );
    }
}
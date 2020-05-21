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
            showModal: true,
            selectedValue: "java"
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
    UNSAFE_componentWillMount() {
        this.state.users = [
            {
                name: 'Buy groceries',
                detail: 'you have to buy groceries and some sweets ',
                dueDate: '22/7/12',
                status: 'new'
            },
            {
                name: 'To do list',
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
                                    <Card title={user.name} featuredTitle={'&times;'} key={index}>
                                        <View>
                                            {/* Title  */}
                                            <View
                                                style={{ flexDirection: 'row' }}>
                                                <Text>
                                                    {user.name}
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
                    <Card title={'Add New Task'} style={{ borderRadius: 100, borderColor: "blue" }}>
                        <View>
                            <TextInput placeholder={'Task Heading'} style={{ borderColor: 'black', borderBottomWidth: 1, margin: 20 }} />
                            <TextInput placeholder={'Task Details'} />
                            <Picker
                                selectedValue={this.state.selectedValue}
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
                            >
                                <Picker.Item label="pyhton" value="python" />
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="javascript" />
                            </Picker>
                            <Text>{this.state.selectedValue}</Text>
                        </View>
                    </Card>
                </Modal>
            </ImageBackground>
        );
    }
}
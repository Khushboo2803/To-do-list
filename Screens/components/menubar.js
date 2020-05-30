import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, Button, TextInput, BackHandler, ToastAndroid } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton, ScaleAnimation } from 'react-native-popup-dialog';

import user from '../../functions/user'

export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            dialogBox: false
        }
    }

    async UNSAFE_componentWillMount() {
        const user = await AsyncStorage.getItem('user');
        this.setState({ user });
    }

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    render() {
        return (
            <View style={{
                height:Dimensions.get('screen').height*0.07,
                width:Dimensions.get('screen').width
            }}>
                {/* menu starts here */}
                <View
                    style={{
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
                                <Image source={require('../../assets/menu.jpg')}
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
                            }}>
                                {this.state.user}
                            </Text>
                        </MenuItem>
                        <MenuDivider />
                        {/* Share message */}
                        <MenuItem onPress={() => {
                            user.shareMessage();
                            this.hideMenu();
                        }}>
                            <Text style={{
                                fontFamily: 'monospace',
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'green',
                                textDecorationLine: 'underline'
                            }}>Share With Friends</Text>
                        </MenuItem>
                        <MenuDivider />
                        {/* menu item 2 */}
                        <MenuItem onPress={
                            () => {
                                this.props.props.navigation.navigate('todo');
                                this.hideMenu();
                            }
                        }>
                            Incomplete tasks
                    </MenuItem>
                        <MenuDivider />

                        {/* menu item 3 */}
                        <MenuItem onPress={() => {
                            this.props.props.navigation.navigate('complete');
                            this.hideMenu();
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
                            this.props.props.navigation.navigate('signup');
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
                {/* menu ends here */}
                {/* update password dialog appears here */}
                <Dialog onTouchOutside={() => {
                    this.setState({ dialogBox: false });
                }}
                    width={0.9}
                    visible={this.state.dialogBox}
                    dialogAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
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
                                            ToastAndroid.show("Password reset successful. Login again with new password", ToastAndroid.LONG);
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
            </View>
        )
    }
}
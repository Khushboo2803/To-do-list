import React from 'react';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker } from 'react-native';
import { Card, Icon, FormLabel } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import styles from './styles'

export default class Form extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            // users: [],
            // dropmenu: false,
            // showModal: false,
            // selectedValue: '',
            // taskHeading: '',
            // selectedStatus: ''
        };
    }
    render()
    {
        return(
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
                                 <TouchableOpacity style={styles.addCancelButton}>
                                    <Text style={styles.addCancelText}>Add Task</Text>
                                 </TouchableOpacity>

                                 <TouchableOpacity style={styles.addCancelButton}>
                                    <Text style={styles.addCancelText}>Cancel</Text>
                                 </TouchableOpacity>
                             </View>
                            
                        </View>
                    </Card>
        );
    }
}
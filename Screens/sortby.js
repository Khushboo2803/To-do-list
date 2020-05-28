import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import Dialog, {
    DialogTitle,
    DialogContent,
    ScaleAnimation
} from 'react-native-popup-dialog';
import { Picker } from '@react-native-community/picker';
import { View, Text, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import styles from './styles';

export default function sort(props) {
    console.log(props)
    const [dialog, setDialog] = useState(false);
    const [Filterdialog, setFilterDialog] = useState(false);
    return (
        <View style={{flexDirection:'row'}}>
        <View style={{
            height: 35,
            width: '100%',
            backgroundColor: 'lightgrey',
            flexDirection: 'row',
            left: 2,
            borderRightWidth:2,
            borderTopWidth:4,
            borderTopColor:'green',
            width:Dimensions.get('screen').width*0.50
        }}>
            <Icon 
                name="sort-amount-desc"
                type="font-awesome"
                color="green"
                style={{
                    marginTop: '4%'
                }}
            />
            <Text style={{
                fontFamily: 'monospace',
                marginLeft: '1%',
                fontSize: 19,
                fontWeight: 'bold'
            }}>Sort by</Text>

            <TouchableOpacity onPress={() => {
                setDialog(true)
            }}>
                <Icon
                    name="caretdown"
                    type="antdesign"
                    style={{
                        marginLeft: '5%'
                    }}
                />
            </TouchableOpacity>
        </View>

        {/* filter view */}
        <View style={styles.filterView}>
            
            <Icon
                name="funnel"
                type="entypo"
                color="green"
                style={{
                    marginTop: '4%',
                    marginLeft:'5%'
                }}
            />
            <Text style={{
                fontFamily: 'monospace',
                marginLeft: '1%',
                fontSize: 19,
                fontWeight: 'bold',
            }}>Filter</Text>

            <TouchableOpacity onPress={() => {
                setFilterDialog(true)
            }}>
                <Icon
                    name="caretdown"
                    type="antdesign"
                    style={{
                        marginLeft: '5%'
                    }}
                />
            </TouchableOpacity>
            
        </View>
            {/* Sort By options */}
            <Dialog onTouchOutside={() => {
                setDialog(false);
            }}
                width={0.9}
                visible={dialog}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={() => {
                    BackHandler.exitApp();
                    clearInterval(this.interval);
                    console.log('onHardwareBackPress');
                    setDialog(false);
                    return true;
                }}
                dialogTitle={
                    <DialogTitle
                        title="Sort By"
                        hasTitleBar={false}
                    />
                }
            >
                <DialogContent>
                    <View>
                        <TouchableOpacity onPress={() => {
                            setDialog(false);
                            props.filter('taskHeading');
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                color: 'green'
                            }}> > Task Heading</Text>
                        </TouchableOpacity>
                        <View style={{
                            height: 10
                        }}></View>
                        <TouchableOpacity onPress={() => {
                            setDialog(false);
                            props.filter('dueDate');
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                color: 'green'
                            }}> > Due Date</Text>
                        </TouchableOpacity>

                        <View style={{
                            height: 10
                        }}></View>
                        <TouchableOpacity onPress={() => {
                            setDialog(false);
                            props.filter('category');

                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                color: 'green'
                            }}> > Category</Text>
                        </TouchableOpacity>
                        <View style={{
                            height: 10
                        }}></View>
                        <TouchableOpacity onPress={() => {
                            setDialog(false);
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                color: 'green'
                            }}> > Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </DialogContent>
            </Dialog>

            {/* Filter dialog starts here */}
            <Dialog onTouchOutside={() => {
                setFilterDialog(false);
            }}
                width={0.9}
                visible={Filterdialog}
                dialogAnimation={new ScaleAnimation()}
                dialogStyle={{
                    borderWidth:2,
                    borderColor:'brown',
                    borderRadius:10
                }}
                onHardwareBackPress={() => {
                    BackHandler.exitApp();
                    clearInterval(this.interval);
                    console.log('onHardwareBackPress');
                    setFilterDialog(false);
                    return true;
                }}
                dialogTitle={
                    <DialogTitle
                        title="Filter By"
                        hasTitleBar={false}
                    />
                }
            >
                <DialogContent>
                    <View>
                                <Text
                                style={{
                                    color:'green',
                                    fontSize:20,
                                    fontWeight:'bold',
                                    textAlign:'center'
                                }}>---Task Category---</Text>

                                <Picker>
                                    <Picker.Item label="Task Category" value={null} />
                                    <Picker.Item label="Personal" value="personal" />
                                    <Picker.Item label="work" value="work" />
                                    <Picker.Item label="Shopping" value="shopping" />
                                    <Picker.Item label="Other" value="others" />
                                </Picker>

                                <Text
                                style={{
                                    color:'green',
                                    fontSize:20,
                                    fontWeight:'bold',
                                    textAlign:'center',
                                    marginTop:'10%'
                                }}>---Task Status---</Text>

                                <Picker>
                                    <Picker.Item label="Task Status" value={null} />
                                    <Picker.Item label="New" value="new" />
                                    <Picker.Item label="In-Progress" value="ongoing" />
                                    <Picker.Item label="Complete" value="complete" />
                                </Picker>

                                <TouchableOpacity style={styles.filterButton} onPress={
                                    ()=>{
                                        setFilterDialog(false);
                                    }
                                }>
                                    <Text style={{
                                        fontWeight:'bold',
                                        fontSize:26,
                                        fontFamily:'monospace',
                                        textAlign:'center',
                                        color:'white'
                                    }}>Done</Text>
                                </TouchableOpacity>
                    </View>
                </DialogContent>
            </Dialog>

            {/* Filter Dialog ends here */}

        </View>
    );
}
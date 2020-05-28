import React, { useState } from 'react';
import {Icon } from 'react-native-elements';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
} from 'react-native-popup-dialog';
import { ImageBackground, Dimensions, View, Text, TouchableOpacity, Image, Modal, TextInput, Picker, BackHandler, Alert, Share } from 'react-native';

const height=Dimensions.get('screen').height;
const width=Dimensions.get('screen').width;

export default function sort()
{
    const [dialog, setDialog]= useState(false);
    return(
        <View style={{
            height:height*0.30,
            width:'100%',
            backgroundColor:'lightgrey',
            flexDirection:'row',
            left:2
        }}>
            <Icon
                name="funnel"
                type="entypo"
                color="green"
                style={{
                    marginTop:'4%'
                }}
            />
            <Text style={{
                fontFamily:'monospace',
                marginLeft:'1%',
                fontSize:19,
                fontWeight:'bold'
            }}>Sort by</Text>

            <TouchableOpacity onPress={()=>{
                setDialog(true)
            }}>
                <Icon 
                    name="caretdown"
                    type="antdesign"
                    style={{
                        marginLeft:'5%'
                    }}
                />
            </TouchableOpacity>

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
                            <TouchableOpacity onPress={()=>{
                                setDialog(false);
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    fontFamily:'monospace',
                                    color:'green'
                                }}> > Task Heading</Text>
                            </TouchableOpacity>
                            <View style={{
                                height:10
                            }}></View>
                            <TouchableOpacity onPress={()=>{
                                setDialog(false);
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    fontFamily:'monospace',
                                    color:'green'
                                }}> > Due Date</Text>
                            </TouchableOpacity>

                            <View style={{
                                height:10
                            }}></View>
                            <TouchableOpacity onPress={()=>{
                                setDialog(false);
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    fontFamily:'monospace',
                                    color:'green'
                                }}> > Category</Text>
                            </TouchableOpacity>
                            <View style={{
                                height:10
                            }}></View>
                            <TouchableOpacity onPress={()=>{
                                setDialog(false);
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    fontFamily:'monospace',
                                    color:'green'
                                }}> > Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </DialogContent>
                </Dialog>
            
        </View>
    );
}
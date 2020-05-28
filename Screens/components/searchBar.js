import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import user from '../../functions/user'

export default class searchBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }
    render()
    {
        return(
            <View style={{
                flexDirection:'row',
                backgroundColor:'white',
                borderWidth:2,
                borderRadius:15,
                borderColor:'green',
                marginTop:2,
                width: Dimensions.get('screen').width
            }}>
                <TextInput
                            placeholder=" Search task here            "
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({ search: text })}
                            defaultValue={this.state.search}
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 16,
                                textAlign: 'center',
                                width:Dimensions.get('screen').width*0.85
                            }}
                />
                <TouchableOpacity>
                    <Icon 
                        name="search"
                        type="font-awesome"
                        size={40}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
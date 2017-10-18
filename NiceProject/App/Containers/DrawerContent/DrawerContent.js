//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, LogoHeader } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var navitems = [
    {
        name: 'Home',
        nav: 'HomePage',
    },
    {
        name: 'Add Patient',
        nav: 'AddPatient',

    },
]

class DrawerContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let icons = ['dashboard', 'person-add'];
        return (
            <View style={{ borderWidth: 0, flex: 1, backgroundColor: '#fff', marginTop: -20, paddingTop: 20 }}>
                <View style={{ width: '100%', height: 150, backgroundColor: '#e44747', }}>
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <Image source={require('../logo.png')} style={{ width: 60, height: 60, marginTop: 45, marginLeft: 30 }} />
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginTop: 60, marginLeft: 20 }}>Patient Tracker</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {
                        navitems.map((l, i) => {
                            return (
                                <TouchableOpacity
                                    key={i} style={{ marginBottom: 0.5 }}
                                    onPress={() => { this.props.navigation.navigate(l.nav); this.style = { backgroundColor: '#000' } }}
                                >

                                    <View style={{ flexDirection: 'row', height: 50, paddingLeft: 15, }}>
                                        <Icon name={icons[i]} style={{ color: '#000', fontSize: 20, marginRight: 30}} />
                                        <Text style={{ fontSize: 16, color: '#000' }}>{l.name}</Text>
                                    </View>
                                </TouchableOpacity>)
                        })
                    }
                </View>
            </View>)
    }
}
export default DrawerContent;


import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Modal, AsyncStorage, DatePickerAndroid } from 'react-native';
import { Container, Right, Button, Header, Form, Item, Input, Fab, Label, Icon, Left, Body, Content, List, ListItem, Thumbnail, } from 'native-base';
import { getAllEntries } from '../../store/middlewares/EntryMiddleware';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';


function mapDispatchToProps(dispatch) {
    return {
        getAllEntries: (doctorId) => dispatch(getAllEntries())
    }
}
function mapStateToProps(state) {
    return {
        patients: state.main.patients
    }
}
// create a component
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { patients: [], search: false, loading: true }
    }

    async componentDidMount() {
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem('currentUser', (err, result) => {
            if (result === null) {
                navigate('AddUser');
            } else {
                this.props.getAllEntries();
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let newProps = nextProps.patients;
        console.log(newProps)
        this.setState({ patients: newProps, loading: false });
    }
    search = (text) => {
        if (text !== '') {
            // let reg = new RegExp(text, 'ig');
            let patientsbyName = this.props.patients.filter((patient) => {
                console.log(patient.patientName == text);
                // return reg.test(patient.patientName)
                return patient.patientName.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1
            });
            this.setState({ search: true, patients: patientsbyName })
        }
        else if (text === '' && this.state.search === true) {
            this.setState({ search: false, patients: this.props.patients })
        }
        console.log(text);
    }

    datePickerOpen = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                let date = new Date('' + (month + 1) + '/' + day + '/' + year).toLocaleDateString();
                let patientsbyDate = this.props.patients.filter((patient) => {
                    return (new Date(patient.patientId)).toLocaleDateString() === date;
                })
                this.setState({ search: true, patients: patientsbyDate })
            }else{
                this.setState({ search: false, patients: this.props.patients })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {

        const { navigate } = this.props.navigation;
        const { patients, search, loading } = this.state;
        console.log(patients);
        return (
            <Container style={styles.container}>
                <ActionButton
                    zIndex={1000}
                    buttonColor="#e44747"
                    offsetX={20}
                    offsetY={20}
                    onPress={() => { this.props.navigation.navigate('AddPatient') }}
                    icon={<Icon name="add" style={{ color: '#fff', fontSize: 20 }} />}

                />
                <Header style={{ backgroundColor: '#e44747' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <View style={{ width: 60, marginLeft: 10 }}>
                                <Icon name="ios-menu" style={{ color: '#fff', }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Patient Tracker</Text>
                    </Body>
                    {/* <Right>
                        <TouchableOpacity onPress={() => {this.setState({display: !(this.state.display)}) }}>
                            <View style={{ width: 40, }}>
                                <Icon name="md-options" style={{ color: '#fff', }} />
                            </View>
                        </TouchableOpacity>
                    </Right> */}
                </Header>


                <Item style={{ marginLeft: 10, marginRight: 10 }}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChangeText={(text) => this.search(text)} />
                    <TouchableOpacity onPress={() => { this.datePickerOpen() }}>
                        <Icon name="ios-calendar" style={{ fontSize: 35 }} />
                    </TouchableOpacity>
                </Item>


                <Content>

                    <List>

                        {
                            !patients || patients.length === 0 ? loading ?
                                <Body style={{ marginTop: 10 }}>
                                    <Text>Loading...</Text>
                                </Body>
                                :
                                search ?
                                    <Body style={{ marginTop: 10 }}>
                                        <Text>Not Found</Text>
                                    </Body>
                                    :
                                    <Body style={{ marginTop: 10 }}>
                                        <Text>No Patients Registered</Text>
                                    </Body>
                                :
                                patients.map((patient, i) => {
                                    let date = (new Date(patient.patientId)).toLocaleString();
                                    return (
                                        <ListItem onPress={() => { navigate('PatientDetails', [i, patient]) }} key={i} style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Thumbnail square size={80} source={require('../person.gif')} />
                                            <Body style={{ marginLeft: 10, }}>
                                                <Text>{patient.patientName}</Text>
                                                <Text note>{date}</Text>
                                            </Body>
                                        </ListItem>
                                    )
                                })
                        }
                    </List>
                </Content>

            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


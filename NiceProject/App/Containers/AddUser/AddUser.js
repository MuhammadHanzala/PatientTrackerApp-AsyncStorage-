//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Right, Left, Body, Content, Icon, Item, Input, Button, Text, } from 'native-base';
import { connect } from 'react-redux';
import { createEntry } from '../../store/middlewares/EntryMiddleware';

function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        create: (details, navigate) => dispatch(createEntry(details, navigate)),
    }
}

// create a component
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorName: '',
            email: '',
            specialization: '',
            error: ''
        }

    }
    add = async () => {
        const { navigate } = this.props.navigation;
        const { doctorName, email, specialization, } = this.state;
        if (doctorName === '' || email === '' || specialization === '') {
            this.setState({ error: 'Please Enter Complete Details' });
        } else {
            const entryDetails = {
                doctorName: doctorName,
                email: email,
                specialization: specialization,
                uid: Date.now()
            }
            try{
                await AsyncStorage.setItem('currentUser', JSON.stringify(entryDetails));
                await AsyncStorage.setItem('entries', JSON.stringify([]));
            }catch(err){
                console.log(err);
            }
            navigate('HomePage');


        }
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#e44747' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>

                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >User Details</Text>
                    </Body>
                </Header>

                <Content style={styles.content} contentContainerStyle={{}}>
                    <Text style={{ color: '#000' }}>
                        {this.state.error}
                    </Text>
                    <Item style={styles.input}>
                        {/* <Icon name="patient" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Doctor Name"
                            style={{ color: '#000' }}
                            onChangeText={(doctorName) => this.setState({ doctorName })} />
                    </Item>
                    <Item style={styles.input}>
                        {/* <Icon name="person" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Email "
                            style={{ color: '#000' }}
                            onChangeText={(email) => this.setState({ email })} />
                    </Item>
                    <Item style={styles.input}>
                        {/* <Icon name="person" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Specialization"
                            style={{ color: '#000' }}
                            onChangeText={(specialization) => this.setState({ specialization })} />
                    </Item>


                    {/* <Icon name="person" style={{ color: '#000' }} /> */}
                    <Body>
                        <Button
                            full
                            bordered
                            rounded
                            danger
                        >
                            <Text style={{ color: '#e44747', fontSize: 18, fontWeight: 'bold', }}
                                onPress={this.add}
                            >
                                Submit
                            </Text>
                        </Button>
                    </Body>
                </Content>
            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        margin: 30,


    },
    input: {
        marginBottom: 40
    }
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

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
class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            disease: '',
            medication: '',
            cost: null,
            error: ''
        }

    }
    add = async () => {
        const { navigate } = this.props.navigation;
        const { name, disease, medication, cost, } = this.state;
        if (name === '' || disease === '' || medication === '' || cost === null) {
            this.setState({ error: 'Please Enter Complete Details' });
        } else {
            const entryDetails = {
                patientName: name,
                diseases: disease,
                medicationProvided: medication,
                cost: cost,
                patientId: Date.now()
            }
            this.props.create(entryDetails, navigate);
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
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomePage') }}>
                            <View style={{ width: 40, }}>
                                <Icon name="ios-arrow-back" style={{ color: '#fff', }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Add New Patient</Text>
                    </Body>
                </Header>

                <Content style={styles.content} contentContainerStyle={{}}>
                    <Text style={{ color: '#000' }}>
                        {this.state.error}
                    </Text>
                    <Item style={styles.input}>
                        {/* <Icon name="patient" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Name"
                            style={{ color: '#000' }}
                            onChangeText={(name) => this.setState({ name })} />
                    </Item>
                    <Item style={styles.input}>
                        {/* <Icon name="person" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Diseases "
                            style={{ color: '#000' }}
                            onChangeText={(disease) => this.setState({ disease })} />
                        <Text note>*(comma separated)</Text>
                    </Item>
                    <Item style={styles.input}>
                        {/* <Icon name="person" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Medication Provided"
                            style={{ color: '#000' }}
                            onChangeText={(medication) => this.setState({ medication })} />
                        <Text note>*(comma separated)</Text>
                    </Item>
                    <Item style={styles.input}>
                        {/* <Icon name="person" style={{ color: '#000' }} /> */}
                        <Input
                            placeholder="Cost"
                            style={{ color: '#000' }}
                            error
                            Number
                            onChangeText={(cost) => this.setState({ cost })}
                        />
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
                                Add
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
export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);

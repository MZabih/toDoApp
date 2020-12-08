import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, TextInput, FlatList, Modal, TouchableHighlight, LogBox } from 'react-native';
import { Container, Header, Title, Content, Icon, button, Card, CardItem, Text, Body, IconNB, Footer } from "native-base";
import moment from 'moment';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      taskName: '',
      modalVisible: false,
      data: [
        'Java', 'Python', 'Javascript'
      ]
    }
    LogBox.ignoreAllLogs();
  }

  // show-Hide-Modal

  setModalVisible = (visible) => {
    const {taskName} = this.state
    this.addTask(taskName)
    this.setState({ modalVisible: visible, taskName : ''});
  }

  // Add Task

  addTask = (text) => {

    let notEmpty = text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { data } = prevState;
          return {
            data: data.concat(text),
            text: ""
          };
        }
      );
    }
  }

  //Remove Task

  remove = (i) => {
    this.setState(
      prevState => {
        let data = prevState.data.slice();

        data.splice(i, 1);

        return { data };
      }
    );
  }

  // onChangeText of Modal

   handleTaskName = (text) => {
      this.setState({ taskName: text })
   }

  // Render Modal View

  showModal = () => {

    const { modalVisible } = this.state;
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Task to do</Text>
              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Task Name"
               autoCapitalize = "none"
               onChangeText = {(text) => {this.handleTaskName(text)}}/>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
    );
  }

  render() {
    return (
      <Container style={{}}>
      {this.showModal()}
        <Header>
          <View style = {{top:20,left:0}}>
            <Title>{moment().format("MMM Do YYYY")}</Title>
          </View>
          <Body>

          </Body>
          <View style = {{top:20,right:0}}>
            <Body>
              <Title>{moment().format('ddd')}</Title>
            </Body>
          </View>
        </Header>
        <Content>
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) =>
              <Card key={index}>
                <CardItem key={index} style={{ height: 50}}>
                  <Body>
                    <Text>
                      {item}
                    </Text>
                  </Body>
                  <View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 5, borderColor: '#32CD32' }}
                      onPress={() => this.remove(index)}>
                      <Text> - </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
            }
            keyExtractor={item => item.toString()}
          />
        </Content>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <TouchableOpacity style={styles.showModal}
            onPress={() =>
              this.setModalVisible(true)
            }>
            <Text style = {{color: '#fff'}}> + </Text>
          </TouchableOpacity>
        </View >
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   input: {
      margin: 15,
      height: 40,
   },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  showModal: {
     backgroundColor: '#32CD32',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 20,
     borderRadius: 200
  }
});

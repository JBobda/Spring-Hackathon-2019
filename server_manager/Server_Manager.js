const firebase = require('firebase');
const SerialPort = require('serialport');

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAgZeN8OWGl8Iv7ph6J7To6oCXl4rJ7LTc',
  authDomain: 'fall-2019-hackathon.firebaseapp.com',
  databaseURL: 'https://fall-2019-hackathon.firebaseio.com',
  projectId: 'fall-2019-hackathon',
  storageBucket: 'fall-2019-hackathon.appspot.com',
  messagingSenderId: '310484093274',
};
firebase.initializeApp(config);

const { Readline } = SerialPort.parsers;

let arduinoResponse = 0;
firebase.database().ref().child('/truck_status').set(arduinoResponse);

const serialPort = new SerialPort('COM4', {
  baudRate: 9600,
});

const parser = new Readline();
serialPort.pipe(parser);
parser.on('data', (data) => {
  arduinoResponse = 1;
  firebase.database().ref().child('/truck_status').set(arduinoResponse);
  console.log(`data received: ${data}`);
});

serialPort.on('open', () => {
  console.log('Communication is on!');
});

/*
while (true) {
  checkArduino();
  if (arduinoResponse === 1) {
    firebase.database().ref().child('/truck_status').set(arduinoResponse);
  }
}
*/

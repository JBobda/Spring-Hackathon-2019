const firebase = require('firebase');
// Require the serialport node module
const serialport = require('serialport');

const { SerialPort } = serialport;

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

// Open the port
const port = new SerialPort('COM17', {
  baudrate: 9600,
  parser: serialport.parsers.readline('\n'),
});

// Read the port data
port.on('open', () => {
  console.log('open');
  port.on('data', (data) => {
    console.log(data);
  });
});

const arduinoResponse = 0;
firebase.database().ref().child('/truck_status').set(arduinoResponse);

/*
while (true) {
  checkArduino();
  if (arduinoResponse === 1) {
    firebase.database().ref().child('/truck_status').set(arduinoResponse);
  }
}
*/

// MPU-6050 Short Example Sketch
// By Arduino User Hackermen
#include<Wire.h>
const int MPU_addr = 0x68; // I2C address of the MPU-6050
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;
int16_t previousAcX, previousAcY;
int counter;
bool crash;
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Wire.begin();
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);
  Serial.begin(9600);
}
void loop() {
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  AcX = 0;
  previousAcX = AcX;
  Wire.requestFrom(MPU_addr, 14, true); // request a total of 14 registers
  AcX = Wire.read() << 8 | Wire.read(); // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  AcY = Wire.read() << 8 | Wire.read(); // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  AcZ = Wire.read() << 8 | Wire.read(); // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  GyX = Wire.read() << 8 | Wire.read();
  GyY = Wire.read() << 8 | Wire.read();
  GyZ = Wire.read() << 8 | Wire.read();
  int forward_change = AcX - previousAcX;
  if (counter <= 0)
  {
    check_collision();
  }
  if (crash)
  {
    counter = 5;
    crash = false;
  }
  else
  {
    counter--;
  }
 
  delay(200);
}

int check_collision() {
  int16_t threshold = 6000;
  int16_t forward_change = AcX - previousAcX;
  int16_t sideward_change = AcY - previousAcY;
  if (abs(forward_change) >= threshold || abs(sideward_change) >= threshold) {
    Serial.print("Collision Detected\n");
    for(int i = 0; i < 100; i++){
    delay(500);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
    crash = true;
    return 1;
  }
}

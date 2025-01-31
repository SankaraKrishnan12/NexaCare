const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const newPatient = require('./routes/signUpRoutes');
const doctorsAdd = require('./routes/doctorAddRoutes');
const doctorsGet = require('./routes/doctorAppointmentRoutes');
const AddPrescription = require('./routes/prescriptionRoutes');
const Processed = require('./routes/processedApp');
const stockManage = require('./routes/stockRoutes');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/patients', patientRoutes);
app.use('/api', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/newPatient',newPatient);
app.use('/api/doctorsAdd',doctorsAdd);
app.use('/api/doctor-appointments',doctorsGet);
app.use('/api/doctor',AddPrescription);
app.use('/api/appointments',Processed);
app.use('/api/stock',stockManage);

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});

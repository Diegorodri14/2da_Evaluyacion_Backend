/* 
    name,
    lastName,
    email,
    password,
    birthDate,
    phone,
    address,
    phoneEmergencyContacts,
    profilePhoto,
    isVerified,
    loginAttemps,
    timeOut
*/

import { Schema , model} from "mongoose"

const patientsSchema = new Schema({
    name:   {type: String},
    lastName:   {type: String},
    email:   {type: String},
    password:   {type: String},
    birthDaet:   {type: Date},
    phone:   {type: String},
    address:   {type: String},
    phoneEmergencyContac:   {
        phone : {type : String},
        nameEmergencyContac : {type : String},
    },
    profilePhoto:   {type: String},
    public_id: {type: String},
    isVerifed:   {type: Boolean},
    loginAttemps:   {type: Number},
    timeOut:   {type: Date}
},{
    timestamps : true,
    strict : false
});

export default model("patients", patientsSchema)
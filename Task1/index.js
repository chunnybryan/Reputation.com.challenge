/**
* Task 1 
Deliverables:
Scrape list of doctors at Kaiser Permanente, Northern California Region within the Redwood City Office.
https://healthy.kaiserpermanente.org/northern-california/doctors-locations#/search-result
Please write a scraper with which you can scrape the following details. Get at least 50 Physician
with following details. 
Physician Name: Stella Sarang Abhyankar, MD
Physician Specialty: Hospital Medicine
Practicing Address:
Redwood City Medical Center
1150 Veterans Blvd
Redwood

*/

/* 
    Import the request module - https://www.npmjs.com/package/request
*/
var Request = require("request");

// Get the number of doctors 
var doctorsToReturn = process.argv[2];

if(doctorsToReturn == null){
    doctorsToReturn = 50;
}

/* 
    &render.list-show=20 
    This parameter controls how many doctors to return

*/
const apiURL = 'https://apims.kaiserpermanente.org/kp/esb-envlbl/prod/care/pnl/watson-pnl-search-apic/v1/search/cgi-bin/query-meta?ts=1573487936890&v:sources=kp-doctor&v:project=kp-doctor-project&query=*&rop=NCA&render.function=json-feed-display-document&render.list-show=<DoctorNumber>&content-type=application%2Fjson&ESB-ENVLBL=PROD&query.num-total=200&num=200&sortby=provider_sort%20last_name&binning-state=city_label%3D%3DRedwood%20City%0A'

/* Replace the value of DoctorNumber with the vaue passed in on the command line */
var doctorsApiUrl = apiURL.replace('<DoctorNumber>', doctorsToReturn);

const getOptions = {
    url: doctorsApiUrl,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'X-apiKey': 'kprwdfdl83184977525379497984',
        'X-appName': 'doctors-location',
        'X-useragentcategory': 'I',
        'X-IBM-Client-Id': 'b8af5a16-0329-4a64-9592-7c3185e850fb'        
    }
};
var doctors = [];
var returnedJson;


Request.get(getOptions, (error, response, body) => {

    /*
        Need to send an API-Key 
        X-apiKey: kprwdfdl83184977525379497984 
        and
        X-IBM-Client-Id: b8af5a16-0329-4a64-9592-7c3185e850fb

    */

    if(error) {
        return console.dir(error);
    }
    // Parse the body of the response into a JSON Object
    returnedJson = JSON.parse(body)
    // Retrieve the doctos into an Array
    doctors = returnedJson.list.document;
        
    // Iterate through the doctors array
    doctors.map( doctor => {
        console.log("Doctor Name: " + doctor.contents.title);
        console.log("Medical Speciality: " + doctor.contents.medspecialty_display);
        console.log("Practising Address: " + doctor.contents.office_address1);        
        console.log("Phone Number: " + doctor.contents.phone_number);
        console.log("\n"); // New line
    })

    console.log("Total Doctors: " + doctors.length);
});
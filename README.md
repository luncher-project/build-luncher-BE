# build-luncher-BE

Proposed tables and end points

===== TABLES =====

1) Users: ID(unique, auto-incremented, synthetic), FIRST_NAME(string), LAST_NAME(string), EMAIL(string with email validation?), PASSWORD(non-plain-text storage must be over 5 chars), ROLE(admin OR donor)

2) Schools: ID(unique, auto-incremented, synthetic), SCHOOL_NAME(string), STATE(string as capitalized postal abreviation), ZIP(numeric), FUNDS_NEEDED(numeric in USD), FUNDS_RECEIVED(numeric in USD), ADMIN_ID(foreign key linked to ID in Users table)

3) Donations: ID(unique, auto-incremented, synthetic), AMOUNT(numeric in USD), TIMESTAMP(standardised format with moment.js), DONOR_ID(foreign key linked to ID in Users table), SCHOOL_ID(foreign key linked to ID in Schools table)

// All names (FIRST_NAME, LAST_NAME, SCHOOL_NAME) will be stored with capitalization on first chars after spaces,  with all other chars lower case.

=== ERROR MESSAGES ===
All error messages will be formatted as such in the response: {
    message: 'reason for error',
}

=== ENDPOINTS WITH NO AUTHENTICATION ===

============================================================ DONE
[GET] /api/test
SUCCESFUL RES: {
        api: 'up'
}

============================================================ DONE
[GET] /api/schools
SUCCESFUL RES:[
    {
        schoolName: 'Abraxas Continuation High',
        state: 'CA',
        zip: 92064,
        fundsNeeded: 365,
        contact: 'schoooladmin@gmail.com'
    },
      {
        schoolName: '3D Academy',
        state: 'TX',
        zip: 78537,
        fundsNeeded: 820,
        contact: 'schoooladmintwo@gmail.com'
    },
]

=== ENDPOINTS FOR ADMINS ===
A token linked to an admin-type user must be attached in the Authorization header of the request

[PUT] /api/admin
Changes can be made to the admins first name, last name, email, and password
SUCCESFUL RES: {
        firstName: 'Gabriel',
        lastName: 'Cabrejas',
        email: 'gabcab@gmail.com'
}

[DELETE] /api/admin
** Deleting an admin will delete the school asssociated with that admin also **
SUCCESFUL RES(is the name of the deleted school): {
        adminDeleted: 'gabcab@gmail.com',
        schoolDeleted: 'Abraxas Continuation High',
}

[GET] /api/admin/school

============================================================ DONE
SUCCESFUL RES IF THE ADMIN IS LINKED TO A SCHOOL: {
        schoolName: 'Abraxas Continuation High',
        state: 'CA',
        zip: 92064,
        fundsNeeded: 365,
        fundsReceived: 220,
        contact: 'schoooladmin@gmail.com',
        donations: [
            {
                donationId: 1,
                date: '2019-04-14 09:53:36',
                amount: 25,
                donorContact: 'generousdonor@gmail.com' 
            },     {
                donationId: 2,
                date: '2019-04-14 09:53:37',
                amount: 25,
                donorContact: 'generousdonor2@gmail.com' 
            }, 
        ]
}

[POST] /api/admin/school
The following body should be passed in the request:
NOTE: fundsNeeded will be set to zero by default but can be overiden in initial POST or subsequent PUT, fundsReceived will always be set to 0
{
        schoolName: 'Abraxas Continuation High',
        state: 'CA',
        zip: 92064,
        fundsNeeded: 365,
}

============================================================ DONE
SUCCESFUL RES: {
        id: 1,
        schoolName: 'Abraxas Continuation High',
        state: 'CA',
        zip: 92064,
        fundsNeeded: 365,
        fundsReceived: 0,
        adminId: 1,
}

[PUT] /api/admin/school
Changes can be made for name and fundsNeeded.

============================================================ DONE
SUCCESFUL RES(is an object with the updated schoolName, state, zip, and/or fundsNeeded for the school): {
        id: 1,
        schoolName: 'Abraxas Continuation High',
        state: 'CA',
        zip: 92064,
        fundsNeeded: 800,
        fundsReceived: 0,
        adminId: 1,
}

[DELETE] /api/admin/school
SUCCESFUL RES(is the name of the deleted school): {
        schoolDeleted: 'Abraxas Continuation High',
}

=== ENDPOINTS FOR DONORS ===
A token linked to an donor-type user must be attached in the Authorization header of the request


[PUT] /api/donor
Changes can be made to the donors first name, last name, email, and password
SUCCESFUL RES: {
        firstName: 'Gabriel',
        lastName: 'Cabrejas',
        email: 'gabcab@gmail.com'
}

[POST] /api/donatations/:id
Valid id of a school passed in params and the following passed in request body:
{   
        donation: 10,
}

SUCCESFUL RES: {
        fundsDonated: 10,
}

=== ENDPOIINTS FOR CREDENTIALS ===
[POST] /api/register
The following body should be passed: 
{
        id: 1,
        firstName: 'gabriel',
        lastName: 'cabrejas',
        email: 'gabcab@gmail.com',
        password: 'secretpassword' (must be over 5 chars),
        role: 'admin' OR 'donor',
}

============================================================ DONE
SUCCESFUL RES: {
        id: 1,
        firstName: 'gabriel',
        lastName: 'cabrejas',
        email: 'gabcab@gmail.com',
        role: 'admin',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
}

[POST] /api/login
The following body should be passed: 
{
        email: 'gabcab@gmail.com',
        password: 'secretpassword'
}

============================================================ DONE
SUCCESFUL RES FOR ADMIN LINKED TO SCHOOL: {
        id: 1,
        firstName: 'gabriel',
        lastName: 'cabrejas',
        email: 'gabcab@gmail.com',
        role: 'admin',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        schoolID: 1,
}

============================================================ DONE
SUCCESFUL RES FOR ADMIN NOT LINKED TO SCHOOL: {
        id: 1,
        firstName: 'gabriel',
        lastName: 'cabrejas',
        email: 'gabcab@gmail.com',
        role: 'admin',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        message: 'This admin is not associated with any schools',
}

============================================================ DONE
SUCCESFUL RES FOR DONOR: {
        id: 1,
        firstName: 'gabriel',
        lastName: 'cabrejas',
        email: 'gabcab@gmail.com',
        role: 'donor',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        donationIDs: [{
                id: 1,
                amount: 50,
                schoolID: 1,
        }],
}

============================================================ DONE
SUCCESFUL RES FOR DONOR YET TO DONATE: {
        id: 1,
        firstName: 'gabriel',
        lastName: 'cabrejas',
        email: 'gabcab@gmail.com',
        role: 'donor',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        message: 'This donor is not associated with any donationss',
}

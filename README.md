# Luncher Backend

## Motivation
Luncher is a desktop web application which was built as part of a team comprising of one frontend and one backend developer. This is the backend portion which was used to practise building out a Node server in Express.

## About The App
This app aims to unite donors with underfunded schools so that less privileged children can be provided with free schoool meals.


## Technologoies
Node | Express | Jest | Supertest

## API
All API requests are made to: https://luncher-backend.herokuapp.com

### Test
a **GET** request to /api will return a success message if the API is working and has been accessed correctly.
##### Response
```
{
    api: 'up',
}
```

### Credentials

#### Register
a **POST** request to /api/register will create a new user(admin or donor) and return an object containing an authentication token.

##### Request
```
{
	"firstName": "donald",
	"lastName": "anderton",
	"email": "dand@gmail.com",
	"password": "password" (must be over 5 chars),
	"role": "admin" (must be either "admin" or "donor")
}
```

##### Response
```
{
    "id": 36,
    "firstName": "Donald",
    "lastName": "Anderton",
    "email": "dand@gmail.com",
    "role": "admin",
    "token": "jwt"
}

```

#### Login
a **POST** request to /api/login will log in a user(admin or donor) and return an object containing an authentication token. For admins, the object will either contain a schoolID for which the admin is associated or a message to say the admin is linked to no schools. For donor, the object will either contain an array of donations that they have made or a message to say the donor has yet to make a donation.

##### Request
```
{
	"email": "dand@gmail.com",
	"password": "password"
}
```

##### Response
```
{
    "id": 1,
    "firstName": "Donald",
    "lastName": "Anderton",
    "email": "dand@gmail.com",
    "role": "admin",
    "message": "no associated schools",
    "token": "jwt"
}
```

### Schools

#### All schools
a **GET** request to /api/schools will return a list of the schools seeking lunch funds.

##### Response
```
[
    {
        "schoolName": "Marion-Sterling Elementary School",
        "state": "OH",
        "zip": 44115,
        "fundsNeeded": 2500,
        "contact": "jj@gmail.com"
    },
    {
        "schoolName": "Nathan Hale Junior High",
        "state": "OK",
        "zip": 74129,
        "fundsNeeded": 3200,
        "contact": "tb@gmail.com"
    },
]
```

#### School by ID
a **GET** request to /api/schools/:id will return the school linked with the id provided in params.

##### Request
```
/api/schools/1
```

##### Response
```
{
    "schoolName": "Marion-Sterling Elementary School",
    "state": "OH",
    "zip": 44115,
    "fundsNeeded": 2500,
    "contact": "jj@gmail.com"
}
```

### Admins
Admin requests that contain a valid token in their Authentication header will be accepteed.

#### Update an admin
a **PUT** request to /api/admin with a valid token in the Authentication header will return an object of a newly updated admin.

##### Request
```
{
	"lastName": "armstrong"
}
```

##### Response
```
{
    "id": 1,
    "firstName": "Donald",
    "lastName": "Armstrong",
    "email": "dand@gmail.com",
    "role": "admin"
}
```

#### Delete an admin
a **DELETE** request to /api/admin with a valid token in the Authentication header will return an object of the deleted admin. Deleting an admin will delete a linked school and will remove any existing links between donations previously made to that school and the school itself.

##### Response
```
{
    "id": 1,
    "firstName": "Donald",
    "lastName": "Armstrong",
    "email": "dand@gmail.com",
    "role": "admin"
}
```

#### School associated with admin
a **GET** request to /api/admin/school with a valid token in the Authentication header will return a school object if the admin has created a school and a message to say there are no linked schools otherwise. The school object will contain an array of associated donations and a message to say no donations are associated with the school otherwise.

##### Response
```
{
    "id": 1,
    "schoolName": "Marion-Sterling Elementary School",
    "state": "OH",
    "zip": 44115,
    "fundsNeeded": 2500,
    "fundsReceived": 0,
    "adminID": 1,
    "message": "This school is not associated with any donations"
}
```

#### Add a school
a **POST** request to /api/admin/school with a valid token in the Authentication header will return an object of a newly added school if the admin is not already tied to a school. Admins may not be associated with multiple schools.

##### Request
```
{
	"schoolName": "Calhan Public School",
	"state": "co",
	"zip": 80808,
	"fundsNeeded": 20 (optional, will default to 0)
}
```

##### Response
```
{
    "id": 2,
    "schoolName": "Calhan Public School",
    "state": "CO",
    "zip": 80808,
    "fundsNeeded": 0,
    "fundsReceived": 0,
    "adminID": 2
}
```

#### Update a school
a **PUT** request to /api/admin/school with a valid token in the Authentication header will return an object of a newly updated school.

##### Request
```
{
	"schoolName": "Calhan Public  Schools"
}
```

##### Response
```
{
    "id": 2,
    "schoolName": "Calhan Public  Schools",
    "state": "CO",
    "zip": 80808,
    "fundsNeeded": 0,
    "fundsReceived": 0,
    "adminID": 2
}
```


#### Delete a school
a **DELETE** request to /api/admin/school with a valid token in the Authentication header will return an object of the deleted school. Deleting a school will remove any existing links between donations previously made to that school and the school itself.

##### Response
```
{
    "id": 2,
    "schoolName": "Calhan Public  Schools",
    "state": "CO",
    "zip": 80808,
    "fundsNeeded": 0,
    "fundsReceived": 0,
    "adminID": 2,
    "message": "This school has been deleted successfully"
}
```

### Donors
Donor requests that contain a valid token in their Authentication header will be accepteed.

#### Update a donor
a **PUT** request to /api/donor with a valid token in the Authentication header will return an object of a newly updated donor.

##### Request
```
{
	"lastName":  "Artinger"
}
```

##### Response
```
{
    "id": 3,
    "firstName": "Tina",
    "lastName": "Artinger",
    "email": "tr@gmail.com",
    "role": "donor"
}
```

#### Delete a donor
a **DELETE** request to /api/donor with a valid token in the Authentication header will return an object of the deleted donor. Deleting a donor will remove any existing links between donations previously made by that donor and the donations they have made.

##### Response
```
{
    "id": 3,
    "firstName": "Tina",
    "lastName": "Artinger",
    "email": "ta@gmail.com",
    "role": "donor",
    "message": "This donor has been deleted successfully"
}
```

### Donations

#### Add a donation
a **POST** request to /api/donation/:id with a valid token in the Authentication header and an id of an existing school in the params will return an object the information on the donation and the associated schools funds.

##### Request
```
/api/donation/1
{
"amount": 200 (must be an integer greater than 0)
}
```

##### Response
```
{
    "id": 1,
    "amount": 200,
    "created_at": "2019-04-16 10:10:51",
    "updated_at": "2019-04-16 10:10:51",
    "donorID": 3,
    "schoolID": 1,
    "fundedSchool": {
        "schoolName": "Marion-Sterling Elementary School",
        "fundsNeeded": 2500,
        "fundsReceived": 200
    }
}
```

### Errors
all errors are returned in the form of an object with a message key and a note on the specific issue.

##### Response
```
{
    message: 'There was an error checking whether this admin is already linked to  a school',
}
```

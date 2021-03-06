# Introduction

Raffle-api is a REST-API built on node with typescript.

These docs describe how to use the [Raffle](https://raffle-contest-api.herokuapp.com/) API.

Postman collection in file:- Api.postman_collection.json
Deployed URL:- https://raffle-contest-api.herokuapp.com

## Responses

Many API endpoints return the JSON representation of the resources created or edited.

However, if an invalid request is submitted, or some other error occurs, Raffle returns a JSON response in the following format:

```javascript
{
  "message" : string,
  "statusCode" : number,
  "data"    : string,
  "error": string
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `data` attribute contains any other metadata associated with the response. This will be an escaped string containing JSON data.

The `error` attribute contains error trace.

## Status Codes

Raffle returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |


## Authorization(Login/Signup User)

## Login


```http
POST /api//user/login
```

| Body | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Your registered email |

Response

Body

```javascript
{
	"_id": "6088375e17a36fa4d48d4220",
	"email": "mayankbajaj30@gmail.com",
	"firstName": "Mayank",
	"lastName": "Bajaj",
	"token": "YOUR_AUTH_TOKEN"
}
```

## Signup

To register for a new user

```http
PUT /api//user/signup
```
Body

| Param | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Your  email |
| `firstName` | `string` | **Required**. Your first name  |
| `lastName` | `string` | **Required**. Your last name  |


Response

```javascript
{
	"_id": "6088375e17a36fa4d48d4220",
	"email": "mayankbajaj30@gmail.com",
	"firstName": "Mayank",
	"lastName": "Bajaj",
	"token": "YOUR_AUTH_TOKEN"
}
```

```
Some API requests require the use of a generated authentication token. You can create new user, or signup with a new one.
```


## Get a new ticket

Get a new ticket
```http
POST /api/ticket (Need auth-token)
```

Response

```javascript
{
	"redeemed": false,
	"_id": "60894c04cad47bc43cc360fd",
	"userId": "60885e70e84b9aad572cefaf",
	"uniqueCode": "ko1ecms4",
}
```

## Get a new ticket, internal use

Get a new ticket for internal apis
```http
POST /api/ticket/internal
```

Body

| Param | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | **Required**.  |

Response

```javascript
{
	"redeemed": false,
	"_id": "60894c04cad47bc43cc360fd",
	"userId": "60885e70e84b9aad572cefaf",
	"uniqueCode": "ko1ecms4",
}
```

## Create a new Contest

```http
POST /api/contest
```

Body

| Param | Type | Description |
| :--- | :--- | :--- |
| `prize` | `string` | **Required**. Prize Name  |
| `endDate` | `DateString` | **Required**. End Date of contest |

Response

```javascript
{
	"winnerId": null,
	"_id": "60894c83cad47bc43cc360fe",
	"prize": "CAR",
	"endDate": "2022-04-22T18:30:00.000Z"
}
```


## Participate in a Contest

```http
PUT /api/contest/participate (Need auth-token)
```

Body

| Param | Type | Description |
| :--- | :--- | :--- |
| `contestId` | `string` | **Required**. id of contest to participate in   |
| `ticketId` | `string` | **Required**. id of ticket to use  |

Response

Code 200, if successfully enrolled


## Get last week winners

```http
GET /api/contest/lastWeekWinners
```

Response

```javascript
[
	{
		"winner": {
			"_id": "6088375e17a36fa4d48d4220",
			"email": "mayankbajaj30@gmail.com",
			"firstName": "Mayank",
			"lastName": "Bajaj",
			"__v": 0
		},
		"prize": "GOLD",
		"endDate": "2021-04-23T18:30:00.000Z",
	},
	{
		"winner": {
			"_id": "60885e70e84b9aad572cefaf",
			"email": "sam@gmail.com",
			"firstName": "Sam",
			"lastName": "Curran",
		},
		"_id": "608864b2a5a0ecae01748085",
		"prize": "CAR",
		"endDate": "2021-04-22T18:30:00.000Z",
	}
]
```


## Declare Winner

```http
GET /api/contest/declareWinnerRandomly
```


Body

| Param | Type | Description |
| :--- | :--- | :--- |
| `contestId` | `string` | **Required**. id of contest to declare winner in   |

Response

200, with winnerId, If successfully declared. Future scope- cron job for the same

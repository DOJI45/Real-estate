# Real-estate
About:
This project aims to connect the potential buyers and the sellers;
Seller uploads property with valid documents;
These documents are verified;
Only verified documents which are according to wishlist of the buyer are shown to the buyer;
Buyer may choose the property he is interested in and contact the owner;
Meanwhile once the buyer clicks on he is interested  in some property that notification is sent to the owner;


Flow of the project:

home page - login page
- ask for login with username password
- else signup

signup - redirect to a signup page
populate the data in signup page if the email is confirmed

signin - signin with correct email and password - passport js//TODO

user.html
- upload properties - populate the property and document tables
automatically also populate the verification table
- set the requirements -- populate the wishlist table - makesure that one user will have a single entry in according to primary key
- view the properties
- view notifications
	- if property is verified
	- if property is chosen by another user

employee.html
- check for the documents uploaded in the verfication table related to him.
- validate the details.

store both the image and document with the absolute path in the database which can be rendered later;

documents which are to be verified:
khata certificate
tax receit
encumberation certificate

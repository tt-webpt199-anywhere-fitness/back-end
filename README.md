Endpoints

===================================

// ?? POST ==> /api/auth/register ==> Create user

\*\* Return ==>
{
"id": #,
"username": "user",
"role_name": "role"
}

=====================================

// ?? POST ==> /api/auth/login ==> Log in

\*\* Return ==>
{
message: "Welcome back, user!",
token: "0or439uin395v0284532n9-028409-4-094850-98c09-7854n7854cm548-152m8cn510mn850"
}

=====================================

// ?? GET ==> /api/users ==> Return array of all users

=====================================

// ?? GET ==> /api/users/:id ==> Return user with specified ID

=====================================

// ?? PUT ==> /api/users/:id ==> Update user information

\*\* Return ==>
{
"id": #,
"username": "user",
"password": "password",
"role": "role"
}

=====================================

// ?? DELETE ==> /api/users/:id ==> Delete user

\*\* Return ==>
{
"message": "User ID id has been deleted successfully"
}

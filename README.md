# Endpoints

===================================

## Users

===================================

### // ?? POST ==> /api/auth/register ==> Create user

\*\* Return ==>
{
"id": #,
"username": "user",
"role_name": "role"
}

=====================================

### // ?? POST ==> /api/auth/login ==> Log in

\*\* Return ==>
{
message: "Welcome back, user!",
token: "0or439uin395v0284532n9-028409-4-094850-98c09-7854n7854cm548-152m8cn510mn850"
}

=====================================

### // ?? GET ==> /api/users ==> Return array of all users

=====================================

### // ?? GET ==> /api/users/:id ==> Return user with specified ID

=====================================

### // ?? GET ==> /api/users/:id/courses ==> Return array of courses tied to user_id

=====================================

### // ?? PUT ==> /api/users/:id ==> Update user information

\*\* Return ==>
{
"id": #,
"username": "user",
"password": "password",
"role": "role"
}

=====================================

### // ?? DELETE ==> /api/users/:id ==> Delete user

\*\* Return ==>
{
"message": "User ID id has been deleted successfully"
}

=====================================

## Courses

=====================================

### // ?? GET ==> /api/courses ==> Return array of all courses

=====================================

### // ?? GET ==> /api/courses/:id ==> Return course with specified ID

=====================================

### // ?? POST ==> /api/courses ==> Create new course

\*\* Return ==>
{
"id": #,
"course_name": "course",
"course_type": "type",
"course_start": "05/25/2021 04:00 PM",
"course_duration": "45 minutes",
"course_intensity": #,
"course_enrolled": #,
"course_max": #
}

=====================================

### // ?? PUT ==> /api/courses/:id ==> Update course

\*\* Return ==>
{
"id": #,
"course_name": "course",
"course_type": "type",
"course_start": "05/25/2021 04:00 PM",
"course_duration": "45 minutes",
"course_intensity": #,
"course_enrolled": #,
"course_max": #
}

=====================================

### // ?? DELETE ==> /api/courses/:id ==> Delete course

\*\* Return ==>
{
"message": "Course ID id has been deleted successfully"
}

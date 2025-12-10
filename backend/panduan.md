

{/api/users}:

# REGISTER
{/api/users, POST}
## JSON
{
  "username": "test",
  "password_hash": "test1234",
  "name": "testname",
  "email": "test@gmail.com",
  "notlp": "088888888888",
  "tipe_user": "user"
}

# LOGIN
{/api/users/login, POST}
## JSON
{
  "username": "test",
  "password_hash": "test1234"
}
# GET DATA USER
{/api/users/current, GET}

# UPDATE DATA USER
{/api/users/current, PATCH}
## JSON
{
  "name": "updated user"
  "email": "updated user"
  "notlp": "updated user"
}

# DELETE DATA USER
{/api/users/current, DELETE}

{/api/report}

{/api/report, POST}
{/api/report/:reportId, GET}
{/api/report/:reportId, PUT}
{/api/report/:reportId, DELETE}
{/api/report, GET}
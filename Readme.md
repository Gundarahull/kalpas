# Organization and User Management API (GraphQL)

## Overview

This project provides a GraphQL API for managing users, organizations, and memberships. Each organization can have multiple users with specific roles, and each user can belong to multiple organizations. The API includes functionality for user registration, login, organization management, and membership management with secure authentication and role-based permissions.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [GraphQL Schema](#graphql-schema)
  - [Entities](#entities)
  - [Mutations](#mutations)
  - [Queries](#queries)
- [Authorization & Authentication](#authorization--authentication)

## Technologies Used

- **Node.js**: JavaScript runtime
- **GraphQL**: API query language
- **PostgreSQL**: Relational database
- **Sequelize**: ORM for database interactions
- **JWT**: JSON Web Token for secure authentication
- **BCrypt**: For password hashing

## GraphQL Schema

### User Type
- **User**: Represents a user in the system.
  - **Fields**:
    - `id`: Unique identifier for the user.
    - `name`: Name of the user.
    - `email`: Email address of the user.
    - `organizations`: List of `Organization` objects representing the organizations where the user is a member.

### Organization Type
- **Organization**: Represents an organization.
  - **Fields**:
    - `id`: Unique identifier for the organization.
    - `name`: Name of the organization.
    - `members`: List of `Membership` objects representing users associated with the organization.

### Membership Type
- **Membership**: Represents a user's membership within an organization, including their role.
  - **Fields**:
    - `id`: Unique identifier for the membership.
    - `user`: The associated `User` object.
    - `organization`: The associated `Organization` object.
    - `role`: Role of the user within the organization (e.g., member, admin).

## Mutations

### User Registration & Login

- **registerUser(name: String!, email: String!, password: String!): regUser!**
  - Registers a new user with the provided name, email, and password.
  - Returns an `regUser` containing basic user details.

- **loginUser(email: String!, password: String!): AuthPayload!**
  - Logs in a user with the provided email and password.
  - Returns an `AuthPayload` containing a JWT token and basic user details.

- **AuthPayload**
  - **Fields**:
    - `token`: JWT token for the authenticated user.
    - `user`: Basic details of the user, including `id`, `name`, and `email`.

---

### Organization Management

- **createOrganization(name: String!): Organization!**
  - Creates a new organization with the provided name.
  - **Authorization**: Only logged-in users can create an organization.

---

### Membership Management

- **addMemberToOrganization(orgId: ID!, userId: ID!, role: String!): Membership!**
  - Adds a user to an organization with the specified role (e.g., member, admin).
  - **Authorization**: Only users with the `admin` role in the organization can add new members.



## Queries

### organizations: [Organization!]!
- **Description**: Lists all organizations. Only logged-in users can view the list.
- **Arguments**: None.
- **Authorization**: Only logged-in users can view the list of organizations.
- **Response**: A list of `Organization` objects.

---

### organization__Members(organizationId: ID!): [Membership!]!
- **Description**: Lists all members of an organization, showing each member's name, email, and role.
- **Arguments**:
  - `organizationId` (ID!): The unique identifier for the organization.
- **Authorization**: Only logged-in users who are members of the specified organization can view the members.
- **Response**: A list of `Membership` objects, each containing the `User`'s name, email, and role in the organization.

---

### me: User
- **Description**: Fetches the currently logged-in user's details, including the organizations they belong to.
- **Arguments**: None.
- **Authorization**: The user must be logged in.
- **Response**: A `User` object containing the user's `id`, `name`, `email`, and a list of `Organization` objects where the user is a member.


## Authorization & Authentication

### JWT Authentication
- **Description**: JSON Web Tokens (JWT) will be used for authenticating and authorizing users. 
- **Flow**:
  1. **Login**: A user logs in by providing their email and password.
  2. **Token Generation**: Upon successful login, a JWT token is generated and returned to the client. This token will be used for subsequent requests to protected resources.
  3. **Token Verification**: For any protected GraphQL query or mutation, the token will be sent in the `Authorization` header, and the server will verify the validity of the token.

### Password Hashing
- **Description**: All user passwords should be securely hashed before storing them in the database.
- **Method**: Use a hashing algorithm such as **crtpto** to hash passwords before storing them. This ensures that even if the database is compromised, the actual passwords are not exposed.


### Role-Based Access Control (RBAC)
- **Description**: Role-based access control will be used within the GraphQL resolvers to ensure that only authorized users can perform certain actions.
- **Usage**:
  - Each user will have a `role` field (e.g., `admin`, `member`).
  - Access to certain operations will be restricted based on the user’s role.
  - Example:
    - Only **admins** can add new members to an organization.
    - Regular users cannot perform admin-level actions.

  - **Role Validation in Resolvers**:
    ```js
    const isAdmin = (user) => user.role === 'admin';

    if (!isAdmin(currentUser)) {
      throw new Error('Only admins can add members to this organization.');
    }
    ```

### Protected Routes
- **Description**: Certain GraphQL operations (queries and mutations) require authentication and authorization.
  - For instance, the mutation `addMemberToOrganization` will only be allowed if the logged-in user is an `admin` of that organization.
- **Authorization Header**:
  - JWT tokens should be passed in the `Authorization` header.

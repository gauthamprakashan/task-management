# Task Management Assessment - Javascript

### Note: Please read all the instructions before starting the assessment.
 
**Technology Stack:** Javascript, Node.js, Express, mongoose ODM

## Overview

You are tasked with completing a  task management system built with TypeScript, Node.js, Express, and mongodb with mongoose ODM. The system has authentication with specific permissions and capabilities.

### Requirements
Authenticated User can able to do:

1.list all the tasks with filters and pagination.

2.Get specific task by task id.

3.create task.

4.Update existing task.

5.delete existing task.

6.Get task statistics.

### Note: Do not make any changes to the test case files or the workflows/scripts, as doing so will lead to automatic disqualification.

## Submission Requirements
- Complete the implementation within the given timeframe
- Ensure all existing tests pass
- Document any assumptions or design decisions made
- Code should be production-ready quality

## Setup Instructions
```bash
npm install        # Install all project dependencies
npm run migrate    # Run database migrations
npm run seed       # Seed the database with sample data
npm run dev        # Start the development server
npm test           # Run all tests
```

You've been provided with a partially implemented API codebase that simulates a real-world scenario where you need to debug existing functionality and complete missing features. This assessment evaluates your ability to work with existing code, implement RESTful APIs, and maintain code quality standards.

## Task Description
- Fix existing issues and implement missing task CRUD features in the provided repository.

## Task CRUD Operations
Please go to `routes/task.js`, `models/Task.js`, `utils/validation.js`,ect and complete the TODO Items.
Please review the entire code, locate all the TODO comments, and implement the missing parts accordingly. Once done, complete updated version of the code and run tests cases `npm run test` pass how as much as test cases you can and submit at the end.
| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/api/tasks` | POST | Create task | `201` + task object |
| `/api/tasks` | GET | List tasks | `200` + array (supports `status` filter, pagination) |
| `/api/tasks/:id` | GET | Get task by ID | `200` + task or `404` |
| `/api/tasks/:id` | PUT | Update task | `200` + updated task |
| `/api/tasks/:id` | DELETE | Delete task | `204` or `404` |

## Error Handling
- `400` - Invalid input
- `401` - Authentication failure  
- `404` - Resource not found, etc

## Environment Setup
Ensure you have the following configured in your `.env` file:
```bash
DATABASE_URL=your_database_connection_string   # You can use a local database URL or a remote database URL for testing.
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Project Structure
```
src/
├── config/          # DB, environment config
├── controllers/     # API handlers
├── middleware/      # Auth, error handling
├── models/          # Database models
├── routes/          # Express routes
├── services/        # Business logic
├── types/           # TypeScript types
├── utils/           # Utilities, error classes
└── tests/           # Test suites
```

## What We're Looking For
- **Problem-solving skills** - Debug and fix existing authentication issues
- **API design knowledge** - Implement RESTful endpoints following best practices
- **TypeScript proficiency** - Maintain type safety throughout the codebase
- **Error handling** - Proper HTTP status codes and error responses 
- **Code quality** - Clean, readable, and maintainable code
- **Testing awareness** - Ensure all provided tests pass

## Evaluation Criteria
- Complete and correct functionality
- Proper error handling and status codes
- Clean code structure and TypeScript usage
- Readable and maintainable code
- Consistent with existing patterns
- Good validation and security practices
- All tests passing
- Clear commit messages and comments
- Additional documentation if needed


## Support
If you encounter any setup issues or have questions about requirements, please reach out to the technical team. Focus on implementing the core functionality first, then optimize and refine as time permits.

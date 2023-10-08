## BIGLAW AI

Welcome to the development documentation for the BIGLAW-AI project. In this documentation, we will discuss the essential tools used in our application and provide insights into how everything works together.

## What is BIGLAW-AI
BIGLAW AI is an AI powered application dedicated to revolutionizing the way corporate lawyers work by providing cutting-edge solutions tailored to their specific needs. Our primary focus is on enhancing efficiency and streamlining the process of preparing contracts and agreements while maintaining the highest standards of data security and privacy.

## Features
- Drafting and Summarizing Agreements: BiglawAI excels in converting term sheets into comprehensive, legally enforceable agreements, customized to meet the unique requirements of each agreement. It can also simplify complex agreements into concise term sheets, making them more understandable and communicable. This service is available in multiple languages, including Chinese, Spanish, and French, making it invaluable for lawyers working with diverse clients worldwide.
  
- Data Security and Privacy: Recognizing the sensitivity of legal documents, BiglawAI prioritizes the security and privacy of customer data. Their scrubbing system removes sensitive information before transmitting data or documents to an online API, ensuring the confidentiality and security of clients' information throughout the process.

- Streamlined Online Text Editing: BiglawAI provides an integrated online text editor that simplifies the process of refining and polishing generated drafts. This feature enables corporate lawyers to efficiently review and edit documents, ensuring they meet precise specifications and adhere to the highest legal standards.

- Full Agreement Generation: They aim to generate complete agreement drafts directly from term sheets, eliminating the need for users to interactively create separate sections.


## Tools

<img src="https://github.com/Abdulhamid97Mousa/biglawai_frontend_mongodb/assets/80536675/c7788dcb-1587-49e9-8fa3-3e612201edea" width="48" height="36">

Next.js is a popular framework for building React applications. It offers the following

key features:
- Server-side rendering (SSR) and static site generation (SSG) for improved performance and SEO.
- First-class support for various tools and libraries.
- CSS modules for styling, ensuring better encapsulation of styles.
- TypeScript integration for type safety.
- Image optimization for efficient asset management.
- Usage in BIGLAW-AI: We use Next.js as the foundation for our frontend, taking advantage of its performance-enhancing features and flexibility.

<img src="https://github.com/Abdulhamid97Mousa/biglawai_frontend_mongodb/assets/80536675/d49e9ccc-f3b2-43b4-9afa-cdc1d1be8e96" width="48" height="36">

Prisma is an open-source database toolkit that provides Object-Relational Mapping (ORM) capabilities for interacting with databases in an object-oriented manner. Key aspects of Prisma include:
Prisma Client: An auto-generated and type-safe query builder for Node.js and TypeScript.
Usage in BIGLAW-AI: Prisma is instrumental in managing our database operations, offering a type-safe and efficient way to interact with our data.

<img src="https://github.com/Abdulhamid97Mousa/biglawai_frontend_mongodb/assets/80536675/01c55ec9-95c8-44e0-8d51-1d7461a19e2d" width="48" height="48">

MongoDB is a document-oriented NoSQL database designed for high-volume data storage. Instead of traditional tables and rows, MongoDB uses collections and documents to store data.
Usage in BIGLAW-AI: We utilize MongoDB as our primary data store, benefiting from its scalability and flexibility for managing large volumes of data.

<img src="https://github.com/Abdulhamid97Mousa/biglawai_frontend_mongodb/assets/80536675/b255bb0a-17fd-4346-9b19-d004a2d7abb4" width="48" height="48">

TypeScript is an open-source language that builds upon JavaScript by introducing static type definitions. Key advantages of TypeScript include:
- Enhanced developer tooling, such as autocompletion and type checking.
- Improved code robustness.
- TypeScript plays a pivotal role in ensuring the reliability and maintainability of our codebase by adding static type checking.

Feel free to explore these tools further within our codebase or reach out to the development team for more information on their specific roles and usage.



## Conventions and Best Practices
In the BIGLAW-AI project, we adhere to a set of coding conventions and best practices to ensure consistency, maintainability, and collaboration among our development team. These conventions cover various aspects of our codebase, including coding style, documentation, version control, and more. Following these practices not only makes the codebase more understandable but also facilitates efficient collaboration and future enhancements.

### Coding Style
We maintain a consistent coding style throughout the project to ensure that the code is easy to read and understand. We follow industry-standard conventions for naming variables, functions, and classes. For example, when naming variables and functions, we use camelCase, and for classes, we use PascalCase. Here's an example:


```javascript
// Good practice: Using camelCase for variable and function names
const myVariableName = 'example';

function myFunctionName() {
  // Function code here
}

// Good practice: Using PascalCase for class names
class MyClass {
  // Class code here
}
```

### API Calls
Making API calls is a crucial aspect of our BIGLAW-AI project. Here, we'll outline best practices and conventions related to making API calls, using your example as a reference.

#### Example API Call in LoginPage.tsx
In the LoginPage.tsx file, you have an example of making an API call to the /api/signin endpoint. Let's highlight the best practices within this code snippet:

```javascript
// Import the necessary dependencies
import React, { useState, FormEventHandler } from "react";
import { signIn, useSession } from "next-auth/react";
// ...other imports...

// Define the handleLogin function for form submission
const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  setIsLoggingIn(true);

  try {
    // Make an API call to /api/signin
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Use NextAuth's signIn method for authentication
    const result = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: `${window.location.origin}/Logged-in/Dashboard`,
      redirect: false,
    });

    if (result && !result.error) {
      console.log(result?.url!, "this is sign-in");
      router.push(result?.url!);
    } else {
      throw new Error(result?.error || "NextAuth signIn returned undefined");
    }
  } catch (error) {
    console.error("Login failed", error);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred");
    }
  }

  setIsLoggingIn(false);
};

```

#### Key Best Practices for API calls:
- Error Handling: Proper error handling is crucial. In your code, you catch and handle errors from the API call, providing meaningful error messages and alerts to the user.
- Async/Await: Using async/await for asynchronous operations, such as API calls, makes the code more readable and maintainable.
- Use of NextAuth: You appropriately use NextAuth's signIn method for authentication, integrating it seamlessly with your API call.
- Content-Type Header: Setting the "Content-Type" header to "application/json" is a best practice for JSON API requests.

#### Prisma Schema Usage
In your API call, you interact with your database using Prisma. Let's highlight which parts of the Prisma schema are used in this API call:

```javascript
const { email, password } = req.body;

try {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Handling user not found
  }

  const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordMatch) {
    // Handling incorrect password
  }

  const chat = await prisma.chat.create({
    data: {
      userId: user.email,
      createdByWho: user.name,
    },
  });

  // Handling success and returning chat data
} catch (error) {
  // Handling errors and returning appropriate responses
}
```

### Key Elements of a Prisma Schema:
- generator: Specifies the Prisma client generator, which generates the Prisma Client for your application.
- datasource: Defines the database connection details, such as the provider (e.g., MongoDB) and the URL.
- model: Defines your data models. Each model represents an entity in your application (e.g., User, Session, Chat, Message, File). You specify properties (fields) of each model and their data types.
- @id: Marks a field as the primary identifier for the model.
- @default(auto()): Specifies that a field has an auto-generated default value.
- @map("_id"): Maps the field to the "_id" field in the MongoDB collection.
- @db.ObjectId: Indicates that the field is an ObjectId type in MongoDB.
- Relationships (@relation): Defines relationships between models. For example, the User model has relationships with Session, Chat, and Message.

By following these conventions in your Prisma schema, you can effectively model your data and define relationships between entities. Prisma will use this schema to generate a Prisma Client that provides a type-safe and efficient way to interact with your database in your JavaScript/TypeScript code.


## Version Control (Git)
We use Git for version control to track changes, collaborate with team members, and manage our codebase efficiently. We follow Git best practices, such as creating feature branches, writing meaningful commit messages, and regularly syncing with the main branch. For example:

```shell
# Create a new feature branch
git checkout -b feature/new-feature

# Make changes and commit with a descriptive message
git commit -m "Add functionality to calculate statistics"

# Regularly sync with the main branch
git fetch origin
git rebase origin/main
```

## Contributions
We welcome contributions to the BIGLAW-AI GitHub repository from the developer community. Your contributions help us enhance our AI-powered application and make it even more valuable for corporate lawyers. Here's how you can contribute:

### Reporting Issues
If you encounter any bugs, glitches, or unexpected behavior while using BIGLAW-AI, please report them on our GitHub repository. When reporting issues, be sure to provide detailed information about the problem, including steps to reproduce it and any error messages you receive. This information helps our development team identify and resolve issues more efficiently.

### Feature Requests
If you have ideas for new features or improvements that you believe would benefit our users, please feel free to submit feature requests on our GitHub repository. We value your input and are open to suggestions for making BIGLAW-AI even more powerful and user-friendly.

### Pull Requests
If you're interested in contributing code to BIGLAW-AI, we encourage you to submit pull requests. Whether it's bug fixes, new features, or improvements to existing code, your contributions are highly appreciated. To ensure a smooth review process, please follow these guidelines when submitting pull requests:

1. Fork the BIGLAW-AI repository to your GitHub account.
2. Create a new branch for your changes.
3. Commit your changes with clear and concise messages.
4. Test your changes thoroughly to ensure they do not introduce new issues.
5. Submit a pull request with a detailed description of the changes made and the problem they address.
6. Our development team will review your pull request, provide feedback, and work with you to ensure that your contributions align with the project's goals and standards.


## Demo
To experience BIGLAW-AI in action, please visit our application at https://biglawai-frontend-mongodb.vercel.app. Explore its features and functionality, and feel free to provide feedback or report any issues you encounter during your demo. Your input is valuable in helping us refine and enhance the application further.



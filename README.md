# Owe me - React.js application to manage your and your crew's expenses.

This project is also deployed on netlify [owe me](https://owe-me.netlify.app/).

## Project purpose

This project was created to show off what I've learned about React.js.

## Application functionality description

### Users

On the /users page the list of users is displayed. For every user photo, name, surname and current 'account' balance are displayed.
The color of users account balance is green for positive and red for negative balance.

At the first render of an app 5 users are added with the data fetched from a random user generator API (https://randomuser.me/api).

### Transactions

On the /transactions page the list of user transactions is diplayed. There is also an option to create new transaction by clicking the add button '+'.

When the '+' button is clicked the modal for creating transaction is displayed. In the modal there are two user selectors for picking transaction sender
and receivers, transaction description text input, transaction amount number input with two buttons for increasing or decreasing the transaction amount by the step of 0.01 and the submit button.
User can pick one transaction sender by clicking on selected user in the first user selector, then the transaction sender is displayed in place of the first user selector. Transaction sender can be changed by clicking on selected sender, then the user selector is displayed again.
User can pick multiple transaction receivers by clicking on the users in the second selector. Selected receivers background is changed to a darker color to highlight the selection.
To be able to send the transaction user must pick sender and at least one receiver and enter the transaction amount, transaction description is not required.
Required fields have select validation, input fields have the format validation. User can send properly created transaction by clicking the submit button at the bootom of the modal. Ater sending the transaction the modal closes and the alert with the transaction status is displayed for 3 seconds.
User can also close the modal manually without sending the transaction by clicking the red 'x' button located at the top right of the modal.

### Debts

On the /debts page the list of user debts is diplayed. Every debt has the information about the creditor, the debtor and the debt amount.

On this page there is also an option to settle up debts. By clicking on selected debt the modal for creating transactions (described in the 'Transactions' section) is displayed. In this modal every field is automatically filled with the data from selected debt.

### Expenses

On the /expenses page the overall user expenses amount for every user is displayed. The user expense is understood as him being the receiver of the transaction that is not a debt settlement.

## The code itself

This application is created with the use of function components, controlled components and React hooks.
To create this application React hooks such as useState, useEffect, useContext and useReducer are used. To be able to navigate between pages React Router was used.
To prevent props drilling context.js was created and useGlobalContext custom hook was created to be able to use this context across the app components in a more comfortable way.
In the app I've used certain React Hooks and techniques to show that I know they exist, the purpose of using them and how to do it. For example using useReducer hook and creating reducer for the application this size, coded by one person, might be an overkill in other circumstances but it's here for the reason.

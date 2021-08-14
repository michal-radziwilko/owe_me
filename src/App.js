import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";
import TransactionList from "./components/TransactionList";
import DebtList from "./components/DebtList";
import { useGlobalContext } from "./context";
import ExpenseList from "./components/ExpenseList";

function App() {
  const { addUsers } = useGlobalContext();
  useEffect(() => {
    addUsers(5);
  }, []);
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <UserList />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/transactions">
            <TransactionList />
          </Route>
          <Route path="/debts">
            <DebtList />
          </Route>
          <Route path="/expenses">
            <ExpenseList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

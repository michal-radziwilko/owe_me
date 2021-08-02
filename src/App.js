import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";
import TransactionList from "./components/TransactionList";
import AddTransactionModal from "./components/AddTransactionModal";
import DebtList from "./components/DebtList";
import { useGlobalContext } from "./context";

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
            <AddTransactionModal />
          </Route>
          <Route path="/debts">
            <DebtList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

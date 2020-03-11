import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/users/User";
import About from "./components/pages/About";
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     users: [],
  //     user: {},
  //     loading: false,
  //     alert: null,
  //     repos: []
  //   };
  // }
  // get data trên github
  // componentDidMount = async () => {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  // chưa lấy dc data sẽ hiện màn loading
  // setLoading(true);
  // this.setState({
  //   loading: true
  // });
  // const res = await axios.get(
  //   `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  // );
  // trả về data và đưa data ra màn hình thay cho màn loading
  // setUsers(res.data);
  // setLoading(false);
  // this.setState({
  //   users: res.data,
  //   loading: false
  // });
  // console.log(res.data);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data);
      setLoading(false);
    };
    fetchData();
    //eslint-disable-next-line
  }, []);
  //get single user github
  const getUser = async username => {
    // hooks
    setLoading(true);
    // class components
    // this.setState({
    //   loading: true
    // });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
    // this.setState({
    //   user: res.data,
    //   loading: false
    // });
  };

  // get user repos
  const getUserRepos = async username => {
    setLoading(true);
    // this.setState({
    //   loading: true
    // });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
    // this.setState({
    //   repos: res.data,
    //   loading: false
    // });
  };
  // search users trên github
  const searchUsers = async keyword => {
    setLoading(true);
    // this.setState({
    //   loading: true
    // });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${keyword}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //hooks
    setUsers(res.data.items);
    setLoading(false);
    // this.setState({
    //   users: res.data.items,
    //   loading: false
    // });
  };
  // khi ấn vào vào nút Clear sẽ xóa toàn bộ users đã search
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    // this.setState({
    //   users: [],
    //   loading: false
    // });
  };
  //  alert
  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg: msg, type: type } });
    //hooks
    setAlert({ msg, type });
    // alert sau khi hiện thì sau 1 khoảng time sẽ bị clear
    setTimeout(() => setAlert(null), 5000);
    // setTimeout(() => this.setState({ alert: null }), 5000);
  };

  // const { loading, users, alert, user, repos } = this.state;
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact={true}
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={keyword => searchUsers(keyword)}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={(msg, type) => showAlert(msg, type)}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact={true} path="/about" component={About} />
            <Route
              exact={true}
              path="/user/:login"
              render={props => (
                <Fragment>
                  <User
                    {...props}
                    getUser={username => getUser(username)}
                    user={user}
                    loading={loading}
                    getUserRepos={username => getUserRepos(username)}
                    repos={repos}
                  />
                </Fragment>
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;

import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/users/User";
import About from "./components/pages/About";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
      loading: false,
      alert: null,
      repos: []
    };
  }
  // get data trên github
  async componentDidMount() {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    // chưa lấy dc data sẽ hiện màn loading
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // trả về data và đưa data ra màn hình thay cho màn loading
    this.setState({
      users: res.data,
      loading: false
    });
    // console.log(res.data);
  }
  //get single user github
  getUser = async username => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/users/${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      user: res.data,
      loading: false
    });
  };
  // get user repos
  getUserRepos = async username => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      repos: res.data,
      loading: false
    });
  };
  // search users trên github
  searchUsers = async keyword => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${keyword}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      users: res.data.items,
      loading: false
    });
  };
  // khi ấn vào vào nút Clear sẽ xóa toàn bộ users đã search
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };
  //  alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    // alert sau khi hiện thì sau 1 khoảng time sẽ bị clear
    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  render() {
    const { loading, users, alert, user, repos } = this.state;
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
                      searchUsers={keyword => this.searchUsers(keyword)}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={(msg, type) => this.setAlert(msg, type)}
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
                      getUser={username => this.getUser(username)}
                      user={user}
                      loading={loading}
                      getUserRepos={username => this.getUserRepos(username)}
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
  }
}

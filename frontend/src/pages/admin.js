import moment from "moment";
import React from "react";
import ReactLoading from "react-loading";
const API_BASE_URL = process.env.REACT_APP_API_BASE;
async function sha256(message) {
  const msgBuffer = new TextEncoder("utf-8").encode(message);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");
  return hashHex;
}

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: null,
      loading: false,
      data: null,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    console.log(process.env);
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  async fetchData() {
    this.setState({ loading: true });
    fetch(API_BASE_URL + "get/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: await sha256(this.state.password),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          this.setState({
            error: json.error,
            loading: false,
          });
        } else {
          json.sort((a, b) => a.time - b.time);
          this.setState({
            data: json,
            loading: false,
            error: null,
          });
        }
      });
  }

  render() {
    let dataRender = [];

    if (this.state.data) {
      for (let i = 0; i < this.state.data.length; i++) {
        dataRender.push(
          <tr>
            <td>{i + 1}</td>
            <td>{this.state.data[i].key}</td>
            <td>{this.state.data[i].content} </td>
            <td>
              {moment
                .unix(this.state.data[i].time / 1000)
                .format("DD-MM-YYYY HH:mm:ss")}
            </td>
          </tr>
        );
      }
    }

    return (
      <div className="cfs_form admin">
        <div>
          <h3>Admin dashboard</h3>
          <input
            type="password"
            onChange={this.handlePasswordChange}
            className="admin_passInput"
          />
          <br />
          <button onClick={this.fetchData} className="admin_fetchDataBtn">
            Login
          </button>
          {this.state.loading && (
            <div className="loader">
              <ReactLoading type="spin" color="#fff" height={30} width={30} />
            </div>
          )}
          {this.state.error && (
            <div className="cfs_form_footer_error">{this.state.error}</div>
          )}
          {this.state.data && (
            <div className="admin_data_table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Content</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>{dataRender}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

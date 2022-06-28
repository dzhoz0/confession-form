import React from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      captcha_answer: "",
      captcha_svg: "",
      captcha_id: "",
      loading: false,
      error: null,
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCaptchaAnswerChange = this.handleCaptchaAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchCaptcha = this.fetchCaptcha.bind(this);
  }

  componentDidMount() {
    this.fetchCaptcha();
  }

  fetchCaptcha() {
    console.log(process.env);
    fetch(API_BASE_URL + "captcha/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          captcha_svg: data.captcha,
          captcha_id: data.id,
        });
      });
  }
  handleSubmit() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: this.state.content,
        time: new Date().getTime(),
        captcha: {
          answer: this.state.captcha_answer,
          id: this.state.captcha_id,
        },
      }),
    };
    this.setState({ loading: true });
    fetch(API_BASE_URL + "add/", options)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          window.location.href = "/done?id=" + json.id;
        } else {
          this.setState({
            error: json.error,
            loading: false,
          });
          if (json.error === "Failed to verify captcha") {
            this.fetchCaptcha();
          }
        }
      });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }
  handleCaptchaAnswerChange(event) {
    this.setState({ captcha_answer: event.target.value });
  }
  render() {
    return (
      <div>
        <div className="cfs_form submitter">
          {" "}
          <div className="change_link">
            <button className="btn btn-link">
              <Link to="/admin">Be an Admin</Link>
            </button>
          </div>
          {this.state.loading ? (
            <ReactLoading
              type="spinningBubbles"
              color="#fff"
              className="loader"
            />
          ) : (
            <div className="cfs_form_content">
              <div className="cfs_form_header">
                <h1>Confession Form</h1>
              </div>

              <div className="cfs_form_body">
                <div className="cfs_form_body_content">
                  <textarea
                    className="cfs_form_body_content_textarea"
                    placeholder="Enter your confession here"
                    value={this.state.content}
                    onChange={this.handleContentChange}
                  />
                </div>
                <div className="cfs_form_body_captcha">
                  <div
                    className="cfs_form_body_captcha_svg"
                    dangerouslySetInnerHTML={{ __html: this.state.captcha_svg }}
                  ></div>
                  <div className="cfs_form_body_captcha_answer">
                    <input
                      type="text"
                      placeholder="Enter the captcha answer"
                      value={this.state.captcha_answer}
                      onChange={this.handleCaptchaAnswerChange}
                    />
                  </div>
                </div>
              </div>

              <div className="cfs_form_footer">
                <button onClick={this.handleSubmit}>Submit</button>
                <div className="cfs_form_footer_error">
                  {this.state.error ? this.state.error : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

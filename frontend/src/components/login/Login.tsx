import React, { useState } from 'react';
import logo from '../../img/logo.png';
import '../../style/login.css';

const Login: React.FC = () => {
  const [errorMessage] = useState<string>('error');
  const handleSubmit = () => {};
  return (
    <body>
      <div className="position-relative">
        <div className="header width-full pt-5 pb-4" role="banner">
          <div className="container clearfix width-full text-center">
            <img src={logo} loading="lazy" alt="Logo" />
          </div>
        </div>
      </div>
      <div className="application-data">
        <main>
          <div id="login" className="auth-form px-3">
            <div className="auth-form-header p-0" />
            <div className="auth-form-body mt-3">
              <form onSubmit={handleSubmit} acceptCharset="UTF-8" method="post" />
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <label htmlFor="login_field">Username or email address</label>
              <input
                type="text"
                name="login"
                id="login_field"
                className="form-control input-block"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="username"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control form-control input-block"
                autoComplete="current-password"
              />
              <input
                type="submit"
                name="commit"
                value="Sign in"
                className="btn btn-primary btn-block"
                data-disable-with="Signing in…"
                data-signin-label="Sign in"
                data-sso-label="Sign in with your identity provider"
              />
            </div>
          </div>
        </main>
      </div>
      <div className="footer container-lg p-responsive py-6 mt-6" role="contentinfo">
        <ul className="list-style-none d-flex flex-justify-center">
          <li className="mr-3">Footer1</li>
          <li className="mr-3">Footer2</li>
          <li className="mr-3">Footer3</li>
        </ul>
      </div>
    </body>
  );
};
export default Login;

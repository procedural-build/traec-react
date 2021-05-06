import React from "react";
import { BSCard } from "traec-react/utils/bootstrap";
import LoginForm from "../form";

export default function LoginPage(props) {
  let { state, search } = props.location || {};

  let nextUrl = "/accounts/profile";
  if (state) {
    nextUrl = state.nextUrl || nextUrl;
  } else if (search) {
    let queryParams = new URLSearchParams(search);
    nextUrl = queryParams.get("next");
  }

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="col-sm-8 offset-sm-2">
        <BSCard title="Login" body={<LoginForm nextUrl={nextUrl} />} />
      </div>
    </div>
  );
}

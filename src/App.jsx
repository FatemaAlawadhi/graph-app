import * as login from "./functions/login.jsx";
import * as profile from "./functions/profile.jsx";
import Error from "./components/Error.jsx"

function App() {
  return (
    <>
      {Route()}
    </>
  )
}

export default App

const root = "/graph-app"

function Route() {
  const hash = window.location.hash;
  console.log(hash);

  if (hash === "#profile") {
    return profile.renderProfile();
  } else if (hash === "") {
    return login.renderLogin();
  } else {
    return <Error error="Page Not Found" />;
  }
  
  /*
  const path = window.location.pathname;
  console.log(path)
  console.log(root + "/#profile")
  if (path === root + "/") {
    return login.renderLogin()
  }else if (path === root + "/#profile") {
    return profile.renderProfile()
  }else {
    return <Error error="Page Not Found"></Error>
  }*/
}

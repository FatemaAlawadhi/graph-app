
export function UserIdentification(props) {
    let userData = props.userData
  return (
    <div className= "UserData UserIdentification">
      <p>User Details: </p>
      <p>Username: <span className="DataText">{userData.login}</span></p>
      <p>Email: <span className="DataText">{userData.email}</span></p>
      <p>First Name:<span className="DataText"> {userData.firstName}</span></p>
      <p>Last Name: <span className="DataText">{userData.lastName}</span></p>
      <p>Gender: <span className="DataText">{userData.attrs.gender}</span></p>
      <p>Country of birth: <span className="DataText">{userData.attrs.countryOfBirth}</span></p>
      <p>Phone Number: <span className="DataText">{userData.attrs.Phone}</span></p>
      <p>CPR Number: <span className="DataText">{userData.attrs.CPRnumber}</span></p>
      <p>Qualification: <span className="DataText">{userData.attrs.qualification}</span></p>
      <p>Degree: <span className="DataText">{userData.attrs.Degree}</span></p>
      <p>Job: <span className="DataText">{userData.attrs.jobtitle}</span></p>
      <p>Campus: <span className="DataText">{userData.campus}</span></p>
    </div>
  );
}


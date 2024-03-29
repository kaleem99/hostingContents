function validateUserDetails(userObj) {
  if (userObj.signature === "2u") {
    if (
      !userObj.pfirstName ||
      !userObj.pLastName ||
      !userObj.pJobTitle ||
      !userObj.pOfficeAddress
    ) {
      alert(
        "Please complete the mandatory Name, Last name, Title, and Address fields."
      );
      return false;
    }
    if (userObj.NameCoach && !userObj.NameCoach.includes("name-coach.com")) {
      alert("Please use an actual NameCoach link.");
      return false;
    }
    if (userObj.pOfficeAddress === "Remote" && !userObj.address) {
      alert("Please complete the mandatory remote address field");
      return false;
    }
  }
  if (userObj.signature === "gs") {
    if (!userObj.pfirstName || !userObj.pLastName || !userObj.pJobTitle) {
      alert("Please complete the mandatory Name, Surname, and Title fields.");
      return false;
    }
  }
  if (userObj.signature === "edx") {
    if (!userObj.fname || !userObj.lname || !userObj.jobtitle) {
      alert("Please complete the mandatory Name, Surname, and Title fields.");
      return false;
    }
    if(userObj.number && userObj.number.length > 18){
      return alert("Please ensure that the number of characters does not exceed 18 characters.")
    }
    if (userObj.pOfficeAddress === "Remote" && !userObj.address) {
      alert("Please complete the mandatory remote address field");
      return false;
    }
  }
  return true;
}

export default validateUserDetails;

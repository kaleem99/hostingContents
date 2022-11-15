function validateUserDetails(userObj) {
	if (userObj.signature === '2u') {
		if (!userObj.pfirstName || !userObj.pLastName || !userObj.pJobTitle || !userObj.pOfficeAddress) {
			alert('Please complete the mandatory Name, Last name, Title, and Address fields.')
			return false;
		}
		if (userObj.NameCoach && !userObj.NameCoach.includes('name-coach.com')) {
			alert('Please use an actual NameCoach link.')
			return false;
		}
	}
	if (userObj.signature === 'gs') {
		if (!userObj.pfirstName || !userObj.pLastName || !userObj.pJobTitle) {
			alert('Please complete the mandatory Name, Surname, and Title fields.')
			return false;
		}
	}
	if(userObj.signature === "edx"){
		if (!userObj.fname || !userObj.lname || !userObj.jobtitle) {
			alert('Please complete the mandatory Name, Surname, and Title fields.')
			return false;
		}
	}
	return true
}

export default validateUserDetails

const { Campus, Student } = require('../models');

const seedDB = async () => {
	const dummy_campus = await Campus.create({
		name: "Hunter College",
		address:"695 Park Ave, New York, NY 10065",
		description: "This is a school in NYC."
	});
	const dummy_campus2 = await Campus.create({
		name: "Harvard",
		address: "86 Brattle Street Cambridge, MA 02138 ·",
		description: "This is a school in MA."
	});

	const dummy_student = await Student.create({
			firstname: "Joe",
			lastname: "Shmo",
			email: "hola@gmail.com",
			gpa: 3.8
		});

	await dummy_student.setCampus(dummy_campus);
	
}

module.exports = seedDB;
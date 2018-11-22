window.onload = function() {
	createStudents();
}

//const access_token = 'b3d3a5f9f1228d360c47b6b13fa4dc6c2cbbece1';
const access_token = '';
const github_api_get_students = `https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/?access_token=${access_token}`;
const github_api_get_student_tasks = `https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/KurosavaAkira?ref=master`;

const get_students = async () => {
	try {
		const response = await fetch(github_api_get_students);
		if (!response.ok) throw new Error(response.statusText);
		const data = await response.json();
		return data;
	} catch(err) {
		return err;
	}
}

class Student {
	constructor(name, tasks, tasks_url, tasks_api_url) {
		this.name = name;
		this.tasks = tasks;
		this.tasks_url = tasks_url;
		this.tasks_api_url = tasks_api_url;
	}
}

const createStudents = async () => {
	const row_students = await get_students();
	let students = [];
	row_students.forEach(student => {
		let new_student = new Student(student.name, [], student.html_url, student.git_url);
		students.push(new_student);
	});
	return console.log(students);
}
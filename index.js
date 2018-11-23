window.onload = function() {
	studentsRating();
}

const get_students = async () => {
	const access_token = '852b707e5429d0a321fa784cfd9aa68a39927675';
	const github_api_get_students = `https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/?access_token=${access_token}`;
	try {
		const response = await fetch(github_api_get_students);
		if (!response.ok) throw new Error(response.statusText);
		return data = await response.json();
	} catch(err) {
		return err;
	}
}

const get_student_tasks = async (student_name) => {
	const access_token = '852b707e5429d0a321fa784cfd9aa68a39927675';
	let github_api_get_student_tasks = `https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/${student_name}?ref=master&access_token=${access_token}`;
	try {
		const response = await fetch(github_api_get_student_tasks);
		if (!response.ok) throw new Error(response.statusText);
		return data = await response.json();
	} catch(err) {
		return err;
	}
}

class Student {
	constructor(name, tasks, tasks_url, tasks_api_url, rating) {
		this.name = name;
		this.tasks = tasks;
		this.tasks_url = tasks_url;
		this.tasks_api_url = tasks_api_url;
		this.rating = rating;
	}
}

const createStudents = async () => {
	const row_students = await get_students();
	let students = [];
	row_students.forEach(student => {
		let new_student = new Student(student.name, [], student.html_url, student.git_url, null);
		students.push(new_student);
	});
	return students;
}

const createStudentsTask = async () => {
	let students = await createStudents();
	students.forEach(async (student, i) => {
		let tasks = await get_student_tasks(student.name);
		students[i].rating = studentRating(tasks);
		tasks.forEach(task => {
			students[i].tasks.push(task.name)
		});
	});
	return students;
}

const studentRating = (tasks) => {
	return tasks.length;
}

const studentsRating = async () => {
	let students = await createStudentsTask();
	students.sort((a, b) => {
		console.log(a);
		console.log(a.rating);
		return a.rating - b.rating;
	});
	return console.log(students);
}

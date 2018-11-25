window.onload = function() {
	renderRating();
}

const getStudents = async () => {
	const access_token = '';
	const github_api_get_students = `https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/?access_token=${access_token}`;
	try {
		const response = await fetch(github_api_get_students);
		if (!response.ok) {
			const wrapper = document.getElementsByClassName('wrapper')[0];
			wrapper.insertAdjacentHTML('beforeend', error(response.statusText));
			throw new Error(response.statusText);
		}
		return data = await response.json();
	} catch(err) {
		return err;
	}
}

const getStudentTasks = async (student_name) => {
	const access_token = '';
	let github_api_get_student_tasks = `https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/${student_name}?ref=master&access_token=${access_token}`;
	try {
		const response = await fetch(github_api_get_student_tasks);
		if (!response.ok) throw new Error(response.statusText);
		return data = await response.json();
	} catch(err) {
		return err;
	}
}

const getRepoStats = async () => {
	const access_token = '';
	const github_api_get_repo_stats = `https://api.github.com/repos/kottans/frontend-2019-homeworks?access_token=${access_token}`;
	try {
		const response = await fetch(github_api_get_repo_stats);
		if (!response.ok) throw new Error(response.statusText);
		return data = await response.json();
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
	const row_students = await getStudents();
	let students = [];
	row_students.forEach(student => {
		let new_student = new Student(student.name, [], student.html_url, student.git_url);
		students.push(new_student);
	});
	return students;
}

const createStudentsTask = async () => {
	let students = await createStudents();
	return Promise.all(students.map(async (student, i) => {
		let tasks = await getStudentTasks(student.name);
		tasks.forEach(task => {
			students[i].tasks.push(task.name)
		});
    return students[i];
	}));
}

const studentsRating = async () => {
	let students = await createStudentsTask();
	    students.sort((a, b) => {
			return b.tasks.length - a.tasks.length;
	  	}); 

    return students;
}

const repoStats= async () => {
	const row_stats = await getRepoStats();
	const stats = {
		pull_requests: null,
		forks: null,
	};
	stats.pull_requests = row_stats.open_issues_count;
	stats.forks = row_stats.forks;
	return stats;
}

const error = (error) => {
	return `<div class="box">
				<div class="box-name">${error} - GitHub API limit is 60 requests per hour for each user. 
				Please, try again later or <a href="https://github.com/KurosavaAkira/kottans-task-stats-2019">fork this app</a> and insert your GitHub access_token.</div>
			</div>`
}

const titleHtml = () => {
	return `<div class="box">
				<div class="box-name">Name</div>
				<div class="box-task">Completed</div>
			</div>`
}

const studentHtml = (i, name, name_url, number_of_tasks, tasks_url, tasks_list) => {
	return `<div class="box">
				<div class="box-name"><span>${i + 1}.</span><a href="${name_url}">${name}</a></div>
				<div class="box-task"><a href="${tasks_url}">${number_of_tasks}</a><span class="tooltiptext">${tasks_list}</span></div>
			</div>`
}

const studentUrl = (name) => {
	return `https://github.com/${name}`;
}

const repoStatsHtml = (pull_requests, forks) => {
	return `<div class="box">
				<div class="box-pull"><img src="img/git-pull-request.png">${pull_requests}</div>
				<div class="box-fork"><img src="img/git-fork.png">${forks}</div>
			</div>`
}

const renderRating  = async () => {
	const wrapper = document.getElementsByClassName('wrapper')[0];
	const rating_data = await studentsRating();
	const repo_stats = await repoStats();
		wrapper.insertAdjacentHTML('beforeend', titleHtml());
		rating_data.forEach((student, i) =>{
			wrapper.insertAdjacentHTML('beforeend', studentHtml(i, student.name, studentUrl(student.name), student.tasks.length, student.tasks_url, student.tasks.join().replace(/,/g, ' ')));
		});
		wrapper.insertAdjacentHTML('beforeend', repoStatsHtml(repo_stats.pull_requests, repo_stats.forks));
}


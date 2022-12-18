// Part 1

returnStudentName(1)
    .then(function (studentName) {
        console.log(studentName)
    })
    .then(function () {
        returnTaskId(2)
            .then(function (array) {
                return returnTaskName(array);
            })
            .then(function (names) {
                console.log(names)
            })
    })

async function returnStudentName(id) {
    let student = await fetch('https://apigenerator.dronahq.com/api/g4C15xPP/students/' + id);
    student = await student.json();
    let name = student.Name;
    return name
}

async function returnTaskId(id) {
    let arrayTask = [];
    let task = fetch('https://apigenerator.dronahq.com/api/5Bba_f-L/grades');
    task = await (await task).json();
    for (let index = 0; index < task.length; index++) {
        if (id === parseInt(task[index].studentId)) {
            let studentTask = {
                "taskId": task[index].taskId,
                "taskGrade": task[index].number
            }
            arrayTask.push(studentTask)
        }
    }
    return arrayTask
}

async function returnTaskName(array) {
    let tasksArray = [];
    let tasks = fetch('https://apigenerator.dronahq.com/api/75U0yEKU/tasks');
    tasks = await (await tasks).json();
    array.forEach(x => {
        for (let index = 0; index < tasks.length; index++) {
            if (parseInt(x.taskId) === parseInt(tasks[index].id)) {
                let task = {
                    "taskName": tasks[index].title,
                    "taskGrade": x.taskGrade
                }
                tasksArray.push(task)
            }
        }
    })
    return tasksArray
}
// Part 1
// searchForStudentActivities(2)

function searchForStudentActivities(studentId){
    returnStudentName(studentId)
    .then(function (studentName) {
        console.log(studentName)
    })
    .then(function () {
        returnTaskId(studentId)
            .then(function (array) {
                return returnTaskName(array);
            })
            .then(function (names) {
                console.log(names)
            })
    })
}


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

// Part 2

calculateStudentAverage(2)

function calculateStudentAverage(studentId) {
    let grades = []
    returnTaskId(studentId)
    .then(function(array){
        array.forEach(x => {
            grades.push(x.taskGrade)
        })
        return grades
    })
    .then(function(grades){
        let average = parseFloat(0)
        grades.forEach(y => {
            average = average + parseFloat(y)
        })

        return average / grades.length
    })
    .then(function(average){
        console.log(average)
    })
}

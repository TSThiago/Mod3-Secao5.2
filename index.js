async function getAllStudents() {
    let studentsArray = await fetch('https://apigenerator.dronahq.com/api/g4C15xPP/students');
    studentsArray = await studentsArray.json();
    return studentsArray
}

async function getStudentById(id) {
    let student = await fetch('https://apigenerator.dronahq.com/api/g4C15xPP/students/' + id);
    student = await student.json();
    return student;
}

async function getAllGrades() {
    let gradesArray = await fetch('https://apigenerator.dronahq.com/api/5Bba_f-L/grades');
    gradesArray = await gradesArray.json();
    return gradesArray;
}

async function getGradeById(id) {
    let grade = await fetch('https://apigenerator.dronahq.com/api/5Bba_f-L/grades/' + id);
    grade = await grade.json();
    return grade;
}

async function getAllTasks() {
    let tasks = await fetch('https://apigenerator.dronahq.com/api/75U0yEKU/tasks');
    tasks = await tasks.json();
    return tasks;
}

async function getTaskById(id){
    let task = await fetch('https://apigenerator.dronahq.com/api/75U0yEKU/tasks/' +id);
    task = await task.json();
    return task;
}

// Part 1

// searchForStudentActivities(2)

async function searchForStudentActivities(studentId) {
    let studentName = await returnStudentName(studentId)
    let tasks = await returnTaskId(studentId)
    let studentTasks = await returnTaskName(tasks)

    console.log(studentName)
    console.log(studentTasks)
}



async function returnStudentName(id) {
    let name = await getStudentById(id);
    return name.Name
}

async function returnTaskId(id) {
    let arrayTask = []
    let task = await getAllGrades()
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
    let tasks = await getAllTasks()
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

// calculateStudentAverage(2)

async function calculateStudentAverage(studentId) {
    let average = parseFloat(0)
    let grades = []
    let studentName = await returnStudentName(studentId)
    let arrayTask = await returnTaskId(studentId)

    arrayTask.forEach(x => {
        grades.push(x.taskGrade)
    })

    grades.forEach(y => {
        average = average + parseFloat(y)
    })
    average = average / grades.length
    console.log("Média: " + studentName + " - " + average)
}

// Part 3 

// returnPendentActivities(3)

async function getActivitiesId() {
    let tasks = await getAllTasks()
    let tasksId = []
    for (let index = 0; index < tasks.length; index++) {
        tasksId.push(tasks[index].id)
    }
    return tasksId
}

async function returnPendentActivities(studentId) {
    let pendentActivities = []
    let submittedActivities = []
    let activities = await getActivitiesId()
    let activitiesId = []

    let taskId = await returnTaskId(studentId)
    for(let index = 0; index < taskId.length; index++){
        activitiesId.push(parseInt(taskId[index].taskId))
    }

    activities.forEach(x => {
        if (activitiesId.includes(x) === true) {
            submittedActivities.push(x)
        } else {
            pendentActivities.push(x)
        }
    })

    console.log("Atividades entregues: " +submittedActivities)
    console.log("Atividades pendentes: " +pendentActivities)
}

// Part 4

returnStudentsWhoseDidTheTask('Colocando em prática 1.2')

async function returnStudentsWhoseDidTheTask(taskName){
    let taskId = ''
    let tasksarray = []
    let studentsArray = []

    let grades = await getAllGrades()
    let tasks = await getAllTasks()
    let students = await getAllStudents()

    let taskGrades = []
    let tasksTitle = []
    for(let index = 0; index < grades.length; index++){
        let task = {
            "studentId": grades[index].studentId,
            "taskId": parseInt(grades[index].taskId),
            "number": grades[index].number
        }
        taskGrades.push(task)
    }

    for(let index = 0; index < tasks.length; index++){
        tasksTitle.push(tasks[index].title)
    }
    tasks.forEach(x => {
        if(x.title === taskName){
            taskId = x.id
        }
    })

    taskGrades.forEach(x => {
        if(x.taskId === taskId){
            tasksarray.push(x)
        }
    })

    tasksarray.forEach(y => {
        for(let index = 0; index < students.length; index++){
            if(parseInt(students[index].id) === parseInt(y.studentId)){
                let student = {
                    "name": students[index].Name,
                    "grade": y.number
                }
                studentsArray.push(student)
            }
        }
    })
    console.log("Atividade: " +taskName)
    studentsArray.forEach(z => {
        console.log("Nome: " +z.name+ " - Nota: " +z.grade)
    })
}
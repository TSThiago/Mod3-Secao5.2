searchStudentsById(1)

// Part 1

function searchStudentsById(id){
    fetch('https://apigenerator.dronahq.com/api/g4C15xPP/students/' + id)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(compareStudentId(data,id))
    });
}

function returnTaskId(studentId){
    fetch('https://apigenerator.dronahq.com/api/5Bba_f-L/grades')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(compareStudentId(data, studentId));
    });
}

function compareStudentId(json, studentId) {
    let array = []
    for(let index = 0; index < json.length; index++){
        if (parseInt(json[index].studentId) === studentId){
            array.push(json[index].taskId)
        } 
    }
    return array
}
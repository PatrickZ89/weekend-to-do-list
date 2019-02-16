console.log( 'js loaded!' );

$( document ).ready( function(){
  console.log('jQuery is Ready!');

  $( '#addButton' ).on( 'click', addTask);
  $('#taskList').on('click', '.completeButton', completeClick);
  $('#taskList').on('click', '.deleteButton', deleteClick);

  getTasks();

}); 

function addTask() {
    console.log('Adding Task!');
    
}


function getTasks() {
    console.log('Getting Tasks!');
    $.ajax({
        method: 'GET',
        url: '/tasks'
        }).then(function (response) {
        $('#taskIn').val('');
        $('#notesIn').val('');
  
        $('#taskList').empty();
        
        response.forEach(function (task) {
            $('#taskList').append(`
            <tr>
            <td>${task.task}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>${task.notes}</td>
            <td>${task.deadline}</td>
            <td><button class="completeButton" data-id="${task.id}">Completed</button>
            <td><button class="deleteButton" data-id="${task.id}">Delete</button>
            </tr>
            `)
          })
        })
}

function deleteClick() {
    console.log('Deleting Task!');
    
}


function completeClick() {
    console.log('Task Completed!');
    
}
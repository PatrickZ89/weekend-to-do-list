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

    let newTask = {
        task: $('#taskIn').val(),
        status: $('#statusIn').val(),
        priority: $('#priorityIn').val(),
        notes: $('#notesIn').val(),
        deadline: $('#deadlineIn').val()
      };
     
      $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
      }).then(function () {
        getTasks();
      })
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
            console.log('status:', task.status);
            
            if (task.status === 'Complete') {
                $('#taskList').append(`
            <tr style="background-color: rgba(53, 172, 16, 0.692);">
            <td>${task.task}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>${task.notes}</td>
            <td>${task.deadline}</td>
            <td><button class="deleteButton" data-id="${task.id}">Delete</button>
            </tr>
            `)
            }
            else {
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
            }
          })
        })
}

function deleteClick() {
    console.log('Deleting Task!');
  const completedTask = $(this).data().id;
  $.ajax({
    method: 'DELETE',
    url: '/tasks/' + completedTask
  }).then(function () {
    getTasks();
  })
}


function completeClick() {
    console.log('Task Completed!');
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + $(this).data().id,
      }).then(function () {
        getTasks();
      }) 
}


// Define variables
let timer;
let timeLeft = 1500; //25 minutes in seconds
let isRunning = false;
let sessionType = 'Pomodoro';



//Function to update the timer display
function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

//Event listeners
document.getElementById('startButton').addEventListener('click', startTimer);


//Function to start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (sessionType === 'Pomodoro') {
        timeLeft--;
        if (timeLeft < 0) {
          clearInterval(timer);
          isRunning = false;
          alert("Time's up! Take a break.");
          sessionType = 'Break';
          timeLeft = 300; // 5 minutes break
        }
      } else if (sessionType === 'Break') {
        timeLeft--;
        if (timeLeft < 0) {
          clearInterval(timer);
          isRunning = false;
          alert("Break's over! Get back to work.");
          sessionType = 'Pomodoro';
          timeLeft = 1500; // 25 minutes work
        }
      }
      updateTimerDisplay();
    }, 1000);
  }
}



//Function to reset the timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 1500; //Reset to 25 minutes
  updateTimerDisplay();
}

//Event listeners
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

if (startButton) {
  startButton.addEventListener('click', startTimer);
}

if (resetButton) {
  resetButton.addEventListener('click', resetTimer);
}

//Function to toggle between day and night themes
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('day-theme');
  body.classList.toggle('night-theme');
}

//Event listener for theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

//Define variables
let tasks = [];

//Function to add a task to the list
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

//Function to render tasks in the list
function renderTasks() {
  const tasksElement = document.getElementById('tasks');
  tasksElement.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" id="task${index}" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
      <label for="task${index}" ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.text}</label>
      <button onclick="removeTask(${index})">Remove</button>
    `;
    tasksElement.appendChild(taskItem);
  });
}

//Function to toggle task completion status
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

//Function to remove a task from the list
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.getElementById('taskInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      addTask();
  }
});
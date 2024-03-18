# Todo List Application

## Overview

This is a simple Todo List application built with React. The application allows users to add, edit, and delete tasks. Each task has a status (completed or incomplete) and a priority level (low, medium, high). The priority level of each task is indicated by its color in the task list.

## Features

### Task List Display

- Displays a list of tasks with their respective statuses (completed or not completed).
- Each task has options to mark as completed or delete.
- Includes a counter for total tasks and completed tasks.

### Task Management

- Ability to add a new task.
- Ability to edit an existing task.
- Ability to mark a task as completed.
- Ability to delete a task.
- Local storage is implemented to persist tasks even if the user refreshes the page.
- Utilizes Redux RTK.
- Uses Ant Design for UI library.

## Usage

- To add a new task, click on Add Todo button, and a modal will show up. Fill in the task title and select its priority, then click Create Todo button.
- To edit a task, click on the edit icon, a modal will show up with inputs prefilled, make changes, and press Update Todo button.
- To mark a task as completed or incomplete, click the checkbox.
- To delete a task, click the "Delete" icon.

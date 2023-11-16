# Van Morph Tool

I built this application to streamline one of my client's more time consuming daily tasks. He manages a daycare center and his employees drive shuttle vans to pick up the participants. When an employee is out of office, he needs to reassign their passengers to vans with similar routes and available seats.

# In This Document

1) Steps Taken to Create This Application
2) Development Progress and Future Feature Sets
3) Latest Features
4) Technologies Used
5) Stumbling and Learning Points


# Steps Taken to Create this Application

1) Data Collection: I began by sitting down with my client to understand his specific needs and objectives so I could define the project's scope.

2) Planning: I created a detailed project plan outlining the features, timeline, and resource requirements. I then created a kanban board to organize the progress of the tasks needed to complete the outlined features. 

3) Development (In progress): After I had a clear picture of what I needed to do to complete this project, I started to code with a priority of making sure that my components and pages were kept organized. 

4) Test and Quality Assurance: After completing the development of the application, I will review the code to find ways to improve its functionality and efficiency.

5) Ongoing Support: Once I release the minimum viable product for use, I will maintain constant communication with my client to identify areas for improvement and to expand the application's functionality to further assist his day-to-day tasks.


# Development Progress and Future Feature Sets

Completed: 
- Created a form for saving van details (employee name, route, passengers).
- Developed “drag and drop” UI that enables the user to move passengers manually from one van to another.
- Enabled the user to select an out of office employee.
- Added warning and loading messages when applicable.
  
In progress: 
- Enable UI to delete vans.
- Add logic that assigns passengers from the out of office employee’s van to other vans based on capacity and proximity to route.
- Create a secure login page.

# Latest Features

I created a navbar transition that shows the navbar when the user scrolls down, but also hides the navbar when the user scrolls up. 

https://github.com/tytwitchell/van-morph/assets/135183794/59147757-2bb5-43f3-b4ab-8314d5396e41


I created a warning message to inform the user that they must select an employee before proceeding to the next step. This requirement ensures the application can effectively reallocate passengers from the out-of-office employee's van to other vans.

https://github.com/tytwitchell/van-morph/assets/135183794/9e836a2e-edc3-4a05-ac98-3cca06cd8eae


# Technologies Used

- React.js
- React Router 6
- Firestore DB


# Stumbling and Learning Points

- Figuring out how to rerender the displayed UI when the Firestore data was updated and not immediately when a passenger was dragged into a new van. I ended up importing and saving the updated firestore data in state and refactored the rendered HTML to map over the state variable

<img width="543" alt="saveInStateScreenShot" src="https://github.com/tytwitchell/van-morph/assets/135183794/c456a987-d118-4979-8fe0-3d15b5051527">




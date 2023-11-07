# Van Morph Tool

I built this application to streamlines one of my dad's more time consuming daily tasks. He manages a daycare center and his employees drive shuttle vans to pick up the participants. When an employee is out of office, he needs to reassign their passengers to vans with similar routes and available seats.

# In This Document

1) Steps Taken to Create This Application
2) Development Progress and Future Feature Sets
3) Technologies Used
4) Stumbling and Learning Points


# Steps Taken to Create this Application

1) Data Collection: I began by sitting down with my dad to understand his specific needs and objectives so I could define the project's scope.

2) Planning and Design: I then created a detailed project plan outlining the features, timeline, and resource requirements. I also designed the application's user interface and opted to use Firestore as the database.

3) Development (In progress): After I had a clear picture of what I needed to do to complete this project, I started to code with a priority of making sure that my componenents and pages were kept organized. 

4) Test and Quality Assurance: After completing the development of the application, I will review the code to find ways to improve its functionality and efficiency.

5) Ongoing Support: Once I release the minimum viable product for my dad to use, I will maintain constant communication with him to identify areas for improvement and to expand the application's functionality to further assist his day-to-day tasks.


# Development Progress and Future Feature Sets

Completed: 
- Created a form for saving van details (employee name, route, passengers).
- Enable van editing using a 'drag & drog' UI experience for passenger transfers.

In progress: 
- Enable UI to delete vans.
- Allow selection of an out of office employee and move passengers to buses with available seats on similar routes.
- Create a secure sign-in page.
  

# Technologies Used

- React.js
- React Router 6
- Firestore DB


# Stumbling and Learning Points

- Figuring out how to rerender the displayed UI when the Firestore data was updated and not immediately when a passenger was dragged into a new van. I ended up importing and saving the updated firestore data in state and refactoring the rendered HTML to map over the state variable

<img width="543" alt="saveInStateScreenShot" src="https://github.com/tytwitchell/van-morph/assets/135183794/c456a987-d118-4979-8fe0-3d15b5051527">




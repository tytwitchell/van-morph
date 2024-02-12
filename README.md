# Van Morph Tool

I built this application to streamline one of my client's more time consuming daily tasks. He manages a daycare center and his employees drive shuttle vans to pick up the participants. When an employee is out of office, he needs to reassign their passengers to vans with similar routes and available seats.

# In This Document

1) Application URL
2) Demo and Code Walkthrough
3) How to Use the Application
4) Latest Features
5) Development Progress and Future Feature Sets
6) Steps Taken to Create This Application
7) Technologies Used
8) Code Highlights


# Application URL

https://vanmorph.netlify.app/

# Demo and Code Walkthrough

https://github.com/tytwitchell/van-morph/assets/135183794/c8bb9d24-f6bc-4404-bb7b-f3e4e871a8c3

# How to Use the Application

1) Check the "Van List" section to see all existing vans in the database. Drag and drop passengers between vans for one-off updates.
2) In the "Select Employee" section, choose the out-of-office employee. Click the "Next Step" button to navigate to the new passenger assignments.
3) You will be navigated to the "Today's Vans" section where you can view the new temporary passenger assignments. The passengers from the "Absent Van" are now in new vans, displayed under "Vans for Today."
4) To add a new van to the database, use the form in the "Add Van" section.
  

# Latest Features

After selecting an employee, the application now sorts their passengers into other vans based on capacity requirements.  The updated passenger assignments are saved in local storage to prevent alterations to the main database. This precaution is taken because upon the employee's return to the office, the van assignments stored in the Firestore database will be utilized again.


# Development Progress and Future Feature Sets

Completed: 
- Created a form for saving van details (employee name, route, passengers).
- Developed “drag and drop” UI that enables the user to make one-off passenger assignment updates.
- Enabled the user to select an out of office employee.
- Added logic that assigns passengers from the out of office employee’s van to other vans based on capacity.
- Added warning and loading messages.
  
In progress: 
- Enable ability to select multiple out of office employees.
- Add ability to delete vans.
- Update UI for mobile
  

# Steps Taken to Create this Application

1) Data Collection: I began by sitting down with my client to understand his specific needs and objectives so I could define the project's scope.

2) Planning: I created a detailed project plan outlining the features, timeline, and resource requirements. I then created a kanban board to organize the progress of the tasks needed to complete the outlined features. 

3) Development (In progress): After I had a clear picture of what I needed to do to complete this project, I started to code with a priority of making sure that my components and pages were kept organized. 

4) Test and Quality Assurance: After completing the development of the application, I will review the code to find ways to improve its functionality and efficiency.

5) Ongoing Support: Once I release the minimum viable product for use, I will maintain constant communication with my client to identify areas for improvement and to expand the application's functionality to further assist his day-to-day tasks.



# Technologies Used

- React.js
- React Router 6
- Firestore DB


# Code Highlights

- My most recent update simplified the process of assigning passengers to their new vans by using a recursive function. This replaced the need for the previously used useEffects, loop methods, and useState variables.

![image](https://github.com/tytwitchell/van-morph/assets/135183794/083323c3-fb8b-4365-b42d-01d11886fe2a)



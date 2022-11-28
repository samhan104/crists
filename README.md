# crists

create a To-Do list app

home - see the lists you have by the title

Show - see the contents of the lists

        - if possible, have edit/delete buttons next to each array value
            - when edit, it'll just turn the array value it's next to as the one to be updated
            - delete will just delete
        
        - have an add button to add to the current list
        -back button

New - Create a new list

        - have a button to add items to the array
            - DOM? jQuery?
        -back button


update/delete - self explanitory

If i have time 

    - Creating a login, so that people can have their lists synced to their accounts
        - login authorization (JWT)

    -bootstrap

    - on load, start home page of basic animation of app name, then redirect to show page
        - options
            - type out title
            - do like a liquid filling up animation, then load into app

    - make it into a smartphone app?? 

    - css styling?

    - use icons for buttons?
        - x for delete, pencil for edit, check for submit, < for back etc



User creates account
    - adds account info document to collection

User logs in
    - checks collection to see if account info is correct
        - if correct, then logs in
        - else, returns an error

    - When logged in
        - have the routes be under the username of the user
            - example: example.com/username/new, etc
        - have if/else statements to check session to see if logged in
            - if not logged in or session expires and try to go to example.com/username/new, redirects to login page
main();


function main(){
    const new_project_btn = document.getElementById("new-project-btn");
    const overlay = document.getElementById("modal-overlay");
    const submit_btn = document.getElementById("submit-btn");
    const error_message = document.getElementById("error-message");
    const logout_btn = document.getElementById("logout-btn");
    const delete_overlay = document.getElementById("delete-overlay");
    const cancel_delete_btn = document.getElementById("cancel-delete-btn");
    const confirm_delete_btn = document.getElementById("confirm-delete-btn");

    // If project is selected to be deleted, and popup is open this var is set.
    let selected_project = null;

    confirm_delete_btn.addEventListener('click', deleteProject);
    submit_btn.addEventListener('click', createProject);
    overlay.addEventListener('click', closePopup);
    new_project_btn.addEventListener('click', openPopup);
    logout_btn.addEventListener('click', logoutUser);
    cancel_delete_btn.addEventListener('click', closeDeletePopup);

    displayProjects();

    function openPopup(){
        overlay.classList.add('show');
    }

    function closePopup(e){
        if (e.target === overlay){
            overlay.classList.remove('show');
        }
    }

    function setErrorMessage(message){
        error_message.innerText = message; 
    }
    async function createProject(e){
        const project_name = document.getElementById("project-name").value;
        if (!project_name) {
            setErrorMessage("Project must have a name");
            return;
        }
        try {
            const emptyArray = []
            const response = await fetch("http://localhost:3000/api/data/save_project" , {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    create_new: true,
                    project_name: project_name,
                    resolution: emptyArray,
                    layers: emptyArray,
                    layer_data: emptyArray,
                })
            });
            const result = await response.json();
            if (result.error){
                setErrorMessage(result.error)
            }
            else if (result.redirect){
                window.location.href =`/dashboard?name=${encodeURIComponent(project_name)}`;

            }
        }
        catch (error) {
            setErrorMessage(error.message);
        }

        // Outline: 
        // Store in Database, 
        // Open webpage
    }
    async function displayProjects(){
        try{
            const result = await fetch("http://localhost:3000/api/data/get_projects", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const projects = await result.json();
            console.log("projects: ", projects);
            const container = document.getElementById("projects-grid");
            projects.names.forEach(element => {                
                const div = document.createElement("project-card");
                div.id = element.project_name
                const last_modified = new Date(element.last_modified)
                const formatted = last_modified.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"   
                  });

                div.className = "project-card";

                const name_div = document.createElement("div");
                name_div.classList.add("text-container") 
                name_div.onclick = () => handleClick(element.project_name);

                const title = document.createElement("h3");
                title.textContent = element.project_name;

                const date = document.createElement("p");
                date.textContent = `Last edited: ${formatted}`;

                const delete_icon = document.createElement("div");
                delete_icon.classList.add("delete-container");

                delete_icon.onclick = () => openDeletePopup(element.project_name);

                //Create Trash SVG
                const trash_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                trash_svg.setAttribute('viewBox', "0 0 24 24");
                trash_svg.setAttribute('height', '20px');
                

                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", "M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z")
                
                trash_svg.appendChild(path);
                delete_icon.appendChild(trash_svg);

                
                name_div.appendChild(title);
                name_div.appendChild(date);
                div.appendChild(name_div);
                div.appendChild(delete_icon);

                container.appendChild(div);

            });
        }
        catch (error){
            throw new Error(error.message);
        }
         
    }
    function openDeletePopup(project_name){
        delete_overlay.classList.add('show');
        selected_project = project_name;
    }

    function closeDeletePopup(){
        delete_overlay.classList.remove('show');
        selected_project = null;
    }

    async function deleteProject(){
        if (selected_project.length < 1){
            throw new Error("No Project Selected");
            return;
        }
        const result = await fetch("http://localhost:3000/api/data/delete_project", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                project_name: selected_project,
            })

        })
        const response = await result.json();
        if (response.error){
            throw new Error(response.error);
        }
        const container = document.getElementById("projects-grid");
        const child = document.getElementById(selected_project);
        container.removeChild(child);
        closeDeletePopup();
    }

    function handleClick(project_name){
        //When a button is clicked, redirect to the dashboard with the name of the project
        window.location.href =`/dashboard?name=${encodeURIComponent(project_name)}`;
    }
    async function logoutUser(e){
        const result = await fetch("http://localhost:3000/api/users/logout", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
        const response = await result.json();

        if (response.redirect){
            window.location.href = response.redirect;
        }
    }


}
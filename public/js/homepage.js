main();


function main(){
    const new_project_btn = document.getElementById("new-project-btn");
    const overlay = document.getElementById("modal-overlay");
    const submit_btn = document.getElementById("submit-btn");
    const error_message = document.getElementById("error-message");

    submit_btn.addEventListener('click', createProject);
    overlay.addEventListener('click', closePopup);
    new_project_btn.addEventListener('click', openPopup);
    
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
                window.location.href = result.redirect
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
                const div = document.createElement(element.project_name);
                const last_modified = new Date(element.last_modified)
                const formatted = last_modified.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"   
                  });

                div.className = "project-card";

                const title = document.createElement("h3");
                title.textContent = element.project_name;

                const date = document.createElement("p");
                date.textContent = `Last edited: ${formatted}`;

                div.appendChild(title);
                div.appendChild(date);

                container.appendChild(div);
            });
            // return (
            //     <div className="projects-grid">
            //         {projects.map(project => (
            //             <div key={project._id} className="project-card">
            //             {project.name}
            //             </div>
            //         ))}
            //         </div>
            // )
        }
        catch (error){
            throw new Error(error.message);
        }
         
    }


}
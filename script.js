const localStorageKey = 'to_do_list';

function changePalette(palette) {
    const root = document.documentElement;
    
    switch (palette) {
        case 'palette1': // dark | padrao
            root.style.setProperty('--background-color', '#0e0e0e');
            root.style.setProperty('--font-color', '#ffffff');

            root.style.setProperty('--add_button-color', '#202020');
            root.style.setProperty('--add_button-color2', '#161616');

            root.style.setProperty('--remove_button-color', '#67c350');
            root.style.setProperty('--remove_button-color2', '#33951a');

            root.style.setProperty('--footer_background-color', '#333333');
            root.style.setProperty('--footer_font-color', '#ffffff');
            break;

        case 'palette2': // light
            root.style.setProperty('--background-color', '#edebeb');
            root.style.setProperty('--font-color', '#302f2f');

            root.style.setProperty('--add_button-color', '#23aafc');
            root.style.setProperty('--add_button-color2', '#6dbded');

            root.style.setProperty('--remove_button-color', '#67c350');
            root.style.setProperty('--remove_button-color2', '#33951a');

            root.style.setProperty('--footer_background-color', '#333333');
            root.style.setProperty('--footer_font-color', '#ffffff');
            break;

        case 'palette3': // rosa
            root.style.setProperty('--background-color', '#f3aacb');
            root.style.setProperty('--font-color', '#ffffff');

            root.style.setProperty('--add_button-color', '#c88e83');
            root.style.setProperty('--add_button-color2', '#ba7b7c');

            root.style.setProperty('--remove_button-color', '#f57ac8');
            root.style.setProperty('--remove_button-color2', '#bd4d94');

            root.style.setProperty('--footer_background-color', '#333333');
            root.style.setProperty('--footer_font-color', '#ffffff');
            break;

        default:
            break;
    }
}

function handleKeyPress(event)
{
    // Verifica se a tecla pressionada é a tecla "Enter"
    if (event.key === "Enter") {
        newTask(); // Chama a função que adiciona o item à lista
    }
}

function validateNewTask() // analisa se a nova tarefa ja existe no planner
{
    let storedTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('new_task').value.toLowerCase();

    let exists      = storedTasks.find( x => x.name == inputValue);

    return !exists ? false : true;
}

function newTask() 
{
    let input = document.getElementById('new_task');
    input.style.border = '';

    if (!input.value)
    {
        input.style.border = '1px solid red';
        alert("Digite uma tarefa");
    }
    else if(validateNewTask())
    {
        alert("Essa tarefa já foi criada");
    }
    else
    {
        try
        {
            // Obtém os valores existentes do local storage
            let storedTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

            // Adiciona a nova tarefa ao array
            storedTasks.push({
                name: input.value
            });

            // Salva o array atualizado de volta no local storage
            localStorage.setItem(localStorageKey, JSON.stringify(storedTasks));
            showTasks();

        } 
        catch (error)
        {
            console.error("Erro ao processar JSON:", error);
        }
        input.value = '';
    }
}

function showTasks()
{
    let storedTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('planner');

    list.innerHTML = '';

    for(let i = 0; i < storedTasks.length; i++){
        list.innerHTML += `<li>${storedTasks[i]['name']}<button id='task_button' onclick='removeItem("${storedTasks[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/></svg></button></li>`;
    }
}

function removeItem(data)  // essa funcao remove as tasks tanto do local storage quanto da parte visual do planner
{
    let storedTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = storedTasks.findIndex(x => x.name == data);
    storedTasks.splice(index,1);
    localStorage.setItem(localStorageKey, JSON.stringify(storedTasks));
    showTasks();
}

showTasks() // mantem as tasks salvas ao recarregar a pagina

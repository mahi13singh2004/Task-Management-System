const fs=require('fs')
const filepath='./todolist.json'

const command=process.argv[2]
const argument=process.argv[3]

const load=()=>{
    try {
        const buffer=fs.readFileSync(filepath)
        const string_form=buffer.toString()
        const json_form=JSON.parse(string_form)
        return json_form
    } 
    catch (error) {
        return []    
    }
}

const save=(tasks)=>{
    const string_form=JSON.stringify(tasks)
    fs.writeFileSync(filepath,string_form)
}

const removeTask=(idx)=>{
    const tasks=load()
    if(idx>=0 && idx<tasks.length){
        const removed=tasks.splice(idx,1)
        save(tasks)
        console.log(`task removed is ${removed[0].task}`)
    }
    else{
        console.log('Error occured')
    }
}

const showList=()=>{
    const tasks=load()
    if(tasks.length==0){
        console.log("No tasks to show")
    }
    else{
        console.log("Tasks:")
        tasks.forEach((task,idx)=>{
            console.log(`${idx} : ${task.task}`)
        })
    }
}

const addTask=(task)=>{
    const tasks=load()
    tasks.push({task})
    save(tasks)
    console.log('Task Added')
}

if(command==='add'){
    addTask(argument)
}
else if(command==='remove'){
    removeTask(parseInt(argument))
}
else if(command==='list'){
    showList()
}
else{
    console.log('Invalid')
}
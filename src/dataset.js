const dataset = {
    tasks: {
        "tarefa-1": { id: "tarefa-1", content: "tarefa-1" },
        "tarefa-2": { id: "tarefa-2", content: "tarefa-2" },
        "tarefa-3": { id: "tarefa-3", content: "tarefa-3" },
        "tarefa-4": { id: "tarefa-4", content: "tarefa-4" }
    },
    columns: {
        "column-1": { id: "column-1", title: "Backlog", taskIds: ['tarefa-1'] },
        "column-2": { id: "column-2", title: "Progresso", taskIds: ['tarefa-2', 'tarefa-3'] },
        "column-3": { id: "column-3", title: "Revisão", taskIds: [] },
        "column-4": { id: "column-4", title: "Entregue", taskIds: ["tarefa-4"] }
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"]
}

export default dataset
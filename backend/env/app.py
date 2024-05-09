from flask import Flask, jsonify, request

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory database
tasks = [
    
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    new_task['id'] = tasks[-1]['id'] + 1 if tasks else 1
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    task.update(request.json)
    return jsonify(task)

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    delTask = next((t for t in tasks if t['id'] == task_id), None)
    global tasks
    
    tasks = [t for t in tasks if t['id'] != task_id]

    return jsonify(delTask), 201

if __name__ == '__main__':
    app.run(debug=True)

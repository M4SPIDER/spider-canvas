import React, { useState } from 'react';
import { Plus, Check, Trash2, Edit3, Clock, Star, Filter } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn Spider Canvas', completed: true, priority: 'high', createdAt: new Date() },
    { id: 2, text: 'Build mobile apps', completed: false, priority: 'medium', createdAt: new Date() },
    { id: 3, text: 'Share with friends', completed: false, priority: 'low', createdAt: new Date() },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [priority, setPriority] = useState('medium');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority,
      createdAt: new Date()
    }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  };

  const priorityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Spider Tasks</h1>
            <p className="text-sm text-purple-200/60">{stats.active} tasks remaining</p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
              {stats.completed}/{stats.total} done
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-4 border border-white/20">
          <div className="flex items-center justify-between text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-purple-200/60 text-xs">Total</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-purple-200/60 text-xs">Done</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.active}</div>
              <div className="text-purple-200/60 text-xs">Active</div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Add Task */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-4 border border-white/20">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add new task..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={addTask}
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-400 hover:to-pink-400 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Priority Selector */}
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all border ${
                  priority === p 
                    ? priorityColors[p]
                    : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === f 
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-white/60 border border-transparent hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 border transition-all ${
                task.completed ? 'border-green-500/30 opacity-70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-white/40 hover:border-purple-400'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                
                <div className="flex-1">
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                      onBlur={() => saveEdit(task.id)}
                      className="w-full bg-white/10 border border-purple-400 rounded-lg px-3 py-1 text-white focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <p className={`text-white font-medium ${task.completed ? 'line-through text-white/60' : ''}`}>
                      {task.text}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Just now
                    </span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(task)}
                    className="p-2 text-white/40 hover:text-purple-400 hover:bg-white/10 rounded-lg transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-purple-400/40 mx-auto mb-3" />
            <p className="text-white/60">No tasks here!</p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-purple-200/40 mt-6">
          Built with 🕷️ Spider Canvas
        </p>
      </div>
    </div>
  );
}

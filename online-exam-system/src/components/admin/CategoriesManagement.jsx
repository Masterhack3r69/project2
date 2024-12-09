import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdSave, MdClose } from 'react-icons/md';
import '../../css/components/admin/CategoriesManagement.css';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Mathematics', description: 'All math related subjects', topics: ['Algebra', 'Calculus', 'Geometry'] },
    { id: 2, name: 'Science', description: 'Science subjects', topics: ['Physics', 'Chemistry', 'Biology'] },
    { id: 3, name: 'Programming', description: 'Programming languages', topics: ['Java', 'Python', 'JavaScript'] },
  ]);

  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', topics: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (category) => {
    setEditingCategory({ ...category, topics: category.topics.join(', ') });
  };

  const handleSave = () => {
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...editingCategory, topics: editingCategory.topics.split(',').map(t => t.trim()) }
        : cat
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = Math.max(...categories.map(c => c.id)) + 1;
    const topicsArray = newCategory.topics.split(',').map(t => t.trim());
    setCategories([...categories, { ...newCategory, id: newId, topics: topicsArray }]);
    setNewCategory({ name: '', description: '', topics: '' });
    setShowAddForm(false);
  };

  return (
    <div className="category-management">
      <div className="category-management-header">
        <h2>Categories Management</h2>
        <button 
          className="category-add-button"
          onClick={() => setShowAddForm(true)}
        >
          <MdAdd size={20} /> Add Category
        </button>
      </div>

      {showAddForm && (
        <div className="category-form">
          <h3>Add New Category</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Topics (comma-separated)"
              value={newCategory.topics}
              onChange={(e) => setNewCategory({ ...newCategory, topics: e.target.value })}
            />
            <div className="form-buttons">
              <button className="save-button" onClick={handleAdd}>
                <MdSave size={18} /> Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                <MdClose size={18} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            {editingCategory?.id === category.id ? (
              <div className="category-edit-form">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                />
                <input
                  type="text"
                  value={editingCategory.topics}
                  onChange={(e) => setEditingCategory({ ...editingCategory, topics: e.target.value })}
                  placeholder="Topics (comma-separated)"
                />
                <div className="edit-buttons">
                  <button className="save-button" onClick={handleSave}>
                    <MdSave size={18} /> Save
                  </button>
                  <button className="cancel-button" onClick={() => setEditingCategory(null)}>
                    <MdClose size={18} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <div className="topics-list">
                    {category.topics.map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="category-actions">
                  <button className="category-edit-button" onClick={() => handleEdit(category)}>
                    <MdEdit size={18} />
                  </button>
                  <button className="category-delete-button" onClick={() => handleDelete(category.id)}>
                    <MdDelete size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;

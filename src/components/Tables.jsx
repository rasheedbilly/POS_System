import React, { useState } from 'react';

const Tables = ({ tables, onAddTable, onRemoveTable, onSelectTable, selectedTable, isManageMode, onUpdateTablePosition }) => {
  const [tableForm, setTableForm] = useState({ number: '', x: 50, y: 50 });

  const handleAddTable = () => {
    if (tableForm.number.trim()) {
      onAddTable({
        id: Date.now(),
        number: tableForm.number,
        x: tableForm.x,
        y: tableForm.y
      });
      setTableForm({ number: '', x: 50, y: 50 });
    }
  };

  const handleDragStart = (table, e) => {
    if (!isManageMode) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('tableId', table.id);
  };

  const handleDragOver = (e) => {
    if (!isManageMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    if (!isManageMode) return;
    e.preventDefault();
    const tableId = parseInt(e.dataTransfer.getData('tableId'));
    const seatingLayout = e.currentTarget;
    const rect = seatingLayout.getBoundingClientRect();
    const newX = e.clientX - rect.left - 40; // 40 is half the table width
    const newY = e.clientY - rect.top - 40; // 40 is half the table height
    if (onUpdateTablePosition) {
      onUpdateTablePosition(tableId, Math.max(0, newX), Math.max(0, newY));
    }
  };

  return (
    <div className="tables-section">
      <h2>Seating Layout</h2>
      
      {isManageMode && (
        <div className="table-form">
          <input
            type="text"
            placeholder="Table number (e.g., 1, A, Window)"
            value={tableForm.number}
            onChange={(e) => setTableForm({ ...tableForm, number: e.target.value })}
          />
          <button onClick={handleAddTable}>Add Table</button>
        </div>
      )}

      <div className="seating-layout" onDragOver={handleDragOver} onDrop={handleDrop}>
        {tables.map(table => (
          <div
            key={table.id}
            className={`table-item ${selectedTable?.id === table.id ? 'selected' : ''}`}
            style={{
              left: `${table.x}px`,
              top: `${table.y}px`
            }}
            draggable={isManageMode}
            onDragStart={(e) => handleDragStart(table, e)}
            onClick={() => !isManageMode && onSelectTable(table)}
          >
            <div className="table-number">{table.number}</div>
            {isManageMode && (
              <button className="table-delete" onClick={(e) => {
                e.stopPropagation();
                onRemoveTable(table.id);
              }}>×</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;

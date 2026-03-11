import { useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Tickets from './components/Tickets'
import Tables from './components/Tables'

import items from './models/items'

function App() {
  const [cart, setCart] = useState([])
  const [tickets, setTickets] = useState([])
  const [tables, setTables] = useState([
    { id: 1, number: '1', x: 50, y: 50 },
    { id: 2, number: '2', x: 200, y: 50 },
    { id: 3, number: '3', x: 350, y: 50 }
  ])
  const [selectedTable, setSelectedTable] = useState(null)
  const [currentView, setCurrentView] = useState('FOH')
  const [isManageMode, setIsManageMode] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [customization, setCustomization] = useState({
    bread: '',
    patty: '',
    cheese: [],
    toppings: [],
    note: ''
  })


  const addToCart = (item) => {
    setCart([...cart, item])
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
  }

  const submitTicket = (cartItems) => {
    const now = new Date();
    const newTicket = {
      id: Date.now(),
      items: cartItems,
      status: 'Queue',
      table: selectedTable,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      timestamp: now.toISOString()
    }
    setTickets([...tickets, newTicket])
    setCart([])
    // close menu/cart by deselecting the table
    setSelectedTable(null)
  }

  const addTable = (table) => {
    setTables([...tables, table])
  }

  const removeTable = (tableId) => {
    setTables(tables.filter(t => t.id !== tableId))
    if (selectedTable?.id === tableId) {
      setSelectedTable(null)
    }
  }

  const updateTablePosition = (tableId, x, y) => {
    setTables(tables.map(table =>
      table.id === tableId ? { ...table, x, y } : table
    ))
  }

  const updateTicketStatus = (ticketId, newStatus) => {
    if (newStatus === 'completed') {
      setTickets(tickets.filter(ticket => ticket.id !== ticketId))
    } else {
      setTickets(tickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      ))
    }
  }

  const onCustomize = (item) => {
    setSelectedItem(item)
    setShowCustomize(true)
  }

  const handleCustomizationChange = (field, value) => {
    if (field === 'cheese' || field === 'toppings') {
      setCustomization(prev => ({
        ...prev,
        [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value]
      }))
    } else {
      setCustomization(prev => ({ ...prev, [field]: value }))
    }
  }

  const submitCustomization = () => {
    const customItem = {
      ...selectedItem,
      name: `${selectedItem.name} (${customization.bread} ${customization.patty}${customization.cheese.length ? ' ' + customization.cheese.join(', ') : ''}${customization.toppings.length ? ' ' + customization.toppings.join(', ') : ''})`,
      customization,
      price: selectedItem.price
    }
    addToCart(customItem)
    setShowCustomize(false)
    setCustomization({ bread: '', patty: '', cheese: [], toppings: [], note: '' })
  }

  return (
    <div className="App">
      <div className="view-switcher">
        <button className={currentView === 'FOH' ? 'active' : ''} onClick={() => setCurrentView('FOH')}>FOH (Front of House)</button>
        <button className={currentView === 'BOH' ? 'active' : ''} onClick={() => setCurrentView('BOH')}>BOH (Back of House)</button>
      </div>
      
      {currentView === 'FOH' ? (
        <>
          <h1>POS System - Order</h1>
          <div className="foh-container">
            <div className="foh-left">
              {/* placeholder above seating layout when no table is selected */}
              {!selectedTable && (
                <div className="select-table-message">
                  Please select a table to start an order.
                </div>
              )}

              <Tables
                tables={tables}
                onAddTable={addTable}
                onRemoveTable={removeTable}
                selectedTable={selectedTable}
                onSelectTable={setSelectedTable}
                isManageMode={isManageMode}
                onUpdateTablePosition={updateTablePosition}
              />
              <button className="manage-mode-btn" onClick={() => setIsManageMode(!isManageMode)}>
                {isManageMode ? 'Done Managing Tables' : 'Manage Tables'}
              </button>
            </div>
            <div className="foh-right">
              {/* Only show menu/cart when a table is actively selected */}
              {selectedTable ? (
                <>
                  <div className="selected-table-info">Table: {selectedTable.number}</div>
                  <Menu items={items} onAddToCart={addToCart} onCustomize={onCustomize} />
                  <Cart
                    cart={cart}
                    onRemove={removeFromCart}
                    onClear={clearCart}
                    onSubmit={submitTicket}
                    selectedTable={selectedTable}
                  />
                  <button className="cancel-selection-btn" onClick={() => {
                    // return to seating layout without submitting
                    setSelectedTable(null);
                    clearCart();
                  }}>
                    Cancel
                  </button>
                </>
              ) : (
                <div className="no-table-placeholder">
                  <p>Please select a table to start an order.</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>POS System - Kitchen</h1>
          <Tickets tickets={tickets} onUpdateStatus={updateTicketStatus} />
        </>
      )}

      {showCustomize && (
        <div className="modal">
          <div className="modal-content">
            <h2>Customize {selectedItem?.name}</h2>
            <div>
              <label>Bread:</label>
              {['wheat', 'white', 'whole'].map(b => (
                <label key={b}>
                  <input type="radio" name="bread" value={b} checked={customization.bread === b} onChange={() => handleCustomizationChange('bread', b)} />
                  {b}
                </label>
              ))}
            </div>
            <div>
              <label>Patty:</label>
              {['Beef', 'Turkey'].map(p => (
                <label key={p}>
                  <input type="radio" name="patty" value={p} checked={customization.patty === p} onChange={() => handleCustomizationChange('patty', p)} />
                  {p}
                </label>
              ))}
            </div>
            <div>
              <label>Cheese:</label>
              {['American', 'Cheddar'].map(c => (
                <label key={c}>
                  <input type="checkbox" checked={customization.cheese.includes(c)} onChange={() => handleCustomizationChange('cheese', c)} />
                  {c}
                </label>
              ))}
            </div>
            <div>
              <label>Toppings:</label>
              {['Lettuce', 'Tomato', 'Pickle', 'Onion'].map(t => (
                <label key={t}>
                  <input type="checkbox" checked={customization.toppings.includes(t)} onChange={() => handleCustomizationChange('toppings', t)} />
                  {t}
                </label>
              ))}
            </div>
            <div>
              <label>Note:</label>
              <textarea value={customization.note} onChange={(e) => handleCustomizationChange('note', e.target.value)} />
            </div>
            <button onClick={submitCustomization}>Submit</button>
            <button onClick={() => setShowCustomize(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
import React, { useState } from 'react';

const Tickets = ({ tickets, onUpdateStatus }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setSelectedStatus(ticket.status);
  };

  const handleSubmitStatus = () => {
    if (selectedTicket && selectedStatus) {
      onUpdateStatus(selectedTicket.id, selectedStatus);
      setSelectedTicket(null);
      setSelectedStatus(null);
    }
  };

  return (
    <div className="tickets-container">
      <h2>Kitchen Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets</p>
      ) : (
        <div className="tickets-grid">
          {tickets.map(ticket => (
            <div key={ticket.id} className={`ticket ticket-${ticket.status.toLowerCase()}`} onClick={() => handleTicketClick(ticket)}>
              <h3>Ticket #{ticket.id}</h3>
              {ticket.table && <div className="ticket-table">Table: {ticket.table.number}</div>}
              <div className="ticket-status">Status: {ticket.status}</div>
              {ticket.timestamp && <div className="ticket-time">Received: {new Date(ticket.timestamp).toLocaleString()}</div> }
              <div className="ticket-items">
                {ticket.items.map((item, index) => (
                  <div key={index}>{item.name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ticket #{selectedTicket.id}</h2>
            <div>
              <h3>Select Status:</h3>
              {['Queue', 'In progress', 'completed'].map(status => (
                <label key={status}>
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                  />
                  {status}
                </label>
              ))}
            </div>
            <button onClick={handleSubmitStatus}>Submit</button>
            <button onClick={() => setSelectedTicket(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;

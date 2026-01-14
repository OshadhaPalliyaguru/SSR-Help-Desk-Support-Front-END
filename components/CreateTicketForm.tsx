'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { createTicket } from '@/services/ticketService';

export default function CreateTicketForm() {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    employeeName: '',
    issueDescription: '',
    priority: 'LOW'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      await createTicket(formData);
      
     
      setFormData({ employeeName: '', issueDescription: '', priority: 'LOW' });
      
     
      router.refresh(); 
      
    } catch (err) {
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-lg font-bold mb-4">➕ New Ticket</h2>
      
      <div className="flex gap-4 mb-4">
        <input 
          type="text" 
          placeholder="Employee Name"
          className="border p-2 rounded w-1/3"
          value={formData.employeeName}
          onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
          required
        />
        <select 
          className="border p-2 rounded w-1/4"
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="mb-4">
        <textarea 
          placeholder="Describe the issue..."
          className="border p-2 rounded w-full"
          value={formData.issueDescription}
          onChange={(e) => setFormData({...formData, issueDescription: e.target.value})}
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : 'Submit Ticket'}
      </button>
    </form>
  );
}
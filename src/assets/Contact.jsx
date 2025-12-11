import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      setStatus('Message sent successfully! ✅');
      setTimeout(() => {
        setStatus('');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get In <span className="text-purple-400">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-purple-600 mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Have a project in mind? Let's work together to create something amazing
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-600 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="gmail"
                  name="gmail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-600 transition-colors"
                  placeholder="Your@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-600 transition-colors"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-600 transition-colors resize-none"
                placeholder="Tell me about your discussion..."
              ></textarea>
            </div>

            {status && (
              <div className="bg-green-600/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg">
                {status}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
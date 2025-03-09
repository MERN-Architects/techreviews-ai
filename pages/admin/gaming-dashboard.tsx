import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

interface GamingContent {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

const GamingDashboard = () => {
  const [contents, setContents] = useState<GamingContent[]>([]);
  const [formData, setFormData] = useState<GamingContent>({
    id: 0,
    title: '',
    excerpt: '',
    image: '',
    category: '',
    date: '',
    slug: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Load existing content from localStorage
    const savedContents = localStorage.getItem('gamingContents');
    if (savedContents) {
      setContents(JSON.parse(savedContents));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      const updatedContents = contents.map(content =>
        content.id === formData.id ? formData : content
      );
      setContents(updatedContents);
      localStorage.setItem('gamingContents', JSON.stringify(updatedContents));
    } else {
      const newContent = {
        ...formData,
        id: Date.now(),
        slug: formData.title.toLowerCase().replace(/ /g, '-')
      };
      const newContents = [...contents, newContent];
      setContents(newContents);
      localStorage.setItem('gamingContents', JSON.stringify(newContents));
    }
    resetForm();
  };

  const handleEdit = (content: GamingContent) => {
    setFormData(content);
    setEditMode(true);
  };

  const handleDelete = (id: number) => {
    const updatedContents = contents.filter(content => content.id !== id);
    setContents(updatedContents);
    localStorage.setItem('gamingContents', JSON.stringify(updatedContents));
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      title: '',
      excerpt: '',
      image: '',
      category: '',
      date: '',
      slug: ''
    });
    setEditMode(false);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">গেমিং কনটেন্ট ড্যাশবোর্ড</h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">শিরোনাম</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">সংক্ষিপ্ত বিবরণ</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ছবির URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ক্যাটাগরি</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">তারিখ</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              {editMode ? 'আপডেট করুন' : 'যোগ করুন'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                বাতিল করুন
              </button>
            )}
          </form>
        </motion.div>

        <div className="space-y-4">
          {contents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{content.title}</h3>
                <p className="text-gray-600">{content.category}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(content)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  সম্পাদনা
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  মুছুন
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GamingDashboard; 
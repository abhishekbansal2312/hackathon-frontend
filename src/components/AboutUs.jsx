import React from 'react';

// Team data array
const teamMembers = [
  {
    id: 1,
    name: 'Abbas Akbar',
    role: 'Custom SEO Services',
    description: 'Custom, organic SEO services that include technical audits, on-page search engine optimization.',
    imgSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Ali Sher Khan',
    role: 'SEO Website Design',
    description: '1st on the list provides highly effective PPC advertising for every budget including Google PPC Ads.',
    imgSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 3,
    name: 'Abhishek Bansal',
    role: 'SEO Consulting',
    description: 'B2B SEO is the process of generating valuable inbound leads from other businesses.',
    imgSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Tanu',
    role: 'Content Marketing',
    description: 'Content marketing services to help grow your brand with SEO-friendly content.',
    imgSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-16 px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
          The Dream Team
        </h1>
        <p className="text-2xl font-light text-gray-400">We Grow Businesses Online. Period.</p>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className={`bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 ${
              index === 1 || index === 2 ? 'mt-8' : ''
            }`}
          >
            <img
              src={member.imgSrc}
              alt={member.name}
              className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-105"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                {member.role}
              </h2>
              <p className="text-lg text-gray-300 font-semibold">{member.name}</p>
              <p className="mt-4 text-gray-200 leading-relaxed">{member.description}</p>
            </div>
            {/* <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 h-1 mt-4"></div> */}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default AboutUs;

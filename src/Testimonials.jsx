import React from 'react';

const testimonials = [
  {
    name: 'Aarav Sharma',
    feedback: 'I’ve saved so much on travel with ShareFare! It’s reliable and helps me meet new people on campus.',
  },
  {
    name: 'Meera Patel',
    feedback: 'Super easy to find a ride to my hometown. Great platform for college students.',
  },
  {
    name: 'Rahul Verma',
    feedback: 'Offering rides has never been easier. I cover fuel costs and make new friends!',
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What our users say</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-lg italic mb-4">“{t.feedback}”</p>
            <p className="text-blue-400 font-semibold">– {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

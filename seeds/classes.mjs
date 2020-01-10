import Class from '../model/Class.mjs';

export default (req, res) => {
  // create some Classes
  const classes = [
    {
      name: 'Summertime fine',
      description: "These beaches ain't ready",
      type: 'Yoga',
      startTime: '5:30',
      endTime: '6:00',
      duration: 30,
      days: 'Sunday',
      intensityLevel: 'Intermediate',
      requirements: 'None',
      location: 'The Park',
      size: 10,
      price: 15.0,
      arrivalDetails: 'Arrive 10 minutes early for stretching',
      shouldKnowDetails: 'We go hard!'
    }
  ];

  // use the Class model to insert/save
  Class.remove({}, () => {
    for (fitnessClass of classes) {
      const newClass = new Class(fitnessClass);
      newClass.save();
    }
  });

  // seeded!
  res.send('Database seeded!');
};

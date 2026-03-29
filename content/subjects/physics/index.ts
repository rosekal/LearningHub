import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-physics',
    title: 'Foundations of Physics',
    description:
      'Core ideas of measurement, models, forces, energy, and the role of mathematics in describing physical systems.',
    units: [
      { title: 'What Is Physics?' },
      { title: 'Measurement and Units' },
      { title: 'Scalars and Vectors' },
      { title: 'Scientific Notation and Estimation' },
      { title: 'Mathematical Models in Physics' },
      { title: 'Experimental Methods and Uncertainty' },
    ],
  },
  {
    id: 'kinematics',
    title: 'Kinematics',
    description: 'The description of motion in one and two dimensions without regard to the causes of motion.',
    units: [
      { title: 'Position, Distance, and Displacement' },
      { title: 'Speed and Velocity' },
      { title: 'Acceleration' },
      { title: 'Motion Graphs' },
      { title: 'Uniform Motion' },
      { title: 'Uniformly Accelerated Motion' },
      { title: 'Free Fall' },
      { title: 'Projectile Motion' },
      { title: 'Relative Motion' },
    ],
  },
  {
    id: 'dynamics-and-forces',
    title: 'Dynamics and Forces',
    description:
      'How forces affect motion, including Newtonian mechanics and the analysis of interacting bodies.',
    units: [
      { title: 'Force and Interaction' },
      { title: "Newton's First Law", aliases: ['Newtons First Law'] },
      { title: "Newton's Second Law", aliases: ['Newtons Second Law'] },
      { title: "Newton's Third Law", aliases: ['Newtons Third Law'] },
      { title: 'Weight and Normal Force' },
      { title: 'Friction' },
      { title: 'Tension and Spring Forces' },
      { title: 'Free-Body Diagrams', aliases: ['Free body diagrams'] },
      { title: 'Circular Motion and Centripetal Force' },
    ],
  },
  {
    id: 'work-energy-and-power',
    title: 'Work, Energy, and Power',
    description:
      'Energy transfer, conservation laws, and the quantitative analysis of mechanical systems.',
    units: [
      { title: 'Work' },
      { title: 'Kinetic Energy' },
      { title: 'Gravitational Potential Energy' },
      { title: 'Elastic Potential Energy' },
      { title: 'Conservation of Energy' },
      { title: 'Power' },
      { title: 'Efficiency' },
      { title: 'Energy in Real Systems' },
    ],
  },
  {
    id: 'momentum-and-collisions',
    title: 'Momentum and Collisions',
    description:
      'Momentum, impulse, and the behavior of colliding objects in isolated and non-isolated systems.',
    units: [
      { title: 'Linear Momentum' },
      { title: 'Impulse' },
      { title: 'Conservation of Momentum' },
      { title: 'Elastic Collisions' },
      { title: 'Inelastic Collisions' },
      { title: 'Center of Mass' },
      { title: 'Recoil and Explosions' },
    ],
  },
  {
    id: 'rotational-motion-and-gravitation',
    title: 'Rotational Motion and Gravitation',
    description:
      'Rotational kinematics, torque, angular momentum, and the gravitational interaction between masses.',
    units: [
      { title: 'Angular Displacement, Velocity, and Acceleration' },
      { title: 'Torque' },
      { title: 'Rotational Inertia' },
      { title: 'Rotational Dynamics' },
      { title: 'Angular Momentum' },
      { title: 'Rolling Motion' },
      { title: 'Universal Gravitation' },
      { title: 'Orbits and Orbital Motion' },
    ],
  },
  {
    id: 'waves-and-oscillations',
    title: 'Waves and Oscillations',
    description:
      'Periodic motion, wave behavior, sound, and the transfer of energy through oscillating systems.',
    units: [
      { title: 'Simple Harmonic Motion' },
      { title: 'Pendulums and Springs' },
      { title: 'Wave Properties' },
      { title: 'Transverse and Longitudinal Waves' },
      { title: 'Superposition and Interference' },
      { title: 'Standing Waves' },
      { title: 'Sound Waves' },
      { title: 'Doppler Effect' },
      { title: 'Resonance' },
    ],
  },
  {
    id: 'thermodynamics',
    title: 'Thermodynamics',
    description:
      'Heat, temperature, energy transfer, and the laws governing thermal systems.',
    units: [
      { title: 'Temperature and Thermal Equilibrium' },
      { title: 'Heat and Specific Heat Capacity' },
      { title: 'Phase Changes' },
      { title: 'Thermal Expansion' },
      { title: 'Ideal Gas Basics' },
      { title: 'The First Law of Thermodynamics' },
      { title: 'Heat Engines' },
      { title: 'Entropy and the Second Law' },
    ],
  },
  {
    id: 'electricity-and-circuits',
    title: 'Electricity and Circuits',
    description:
      'Charge, electric fields, potential, current, resistance, and basic circuit behavior.',
    units: [
      { title: 'Electric Charge' },
      { title: "Coulomb's Law", aliases: ['Coulombs Law'] },
      { title: 'Electric Field' },
      { title: 'Electric Potential and Voltage' },
      { title: 'Current' },
      { title: "Resistance and Ohm's Law", aliases: ['Resistance and Ohms Law'] },
      { title: 'Series Circuits' },
      { title: 'Parallel Circuits' },
      { title: 'Electrical Power' },
      { title: 'Capacitors Basics' },
    ],
  },
  {
    id: 'magnetism-and-electromagnetism',
    title: 'Magnetism and Electromagnetism',
    description:
      'Magnetic fields, electromagnetic induction, and the connection between electricity and magnetism.',
    units: [
      { title: 'Magnetic Fields' },
      { title: 'Magnetic Forces on Charges and Currents' },
      { title: 'Electromagnets' },
      { title: 'Electromagnetic Induction' },
      { title: "Faraday's Law", aliases: ['Faradays Law'] },
      { title: "Lenz's Law", aliases: ['Lenzs Law'] },
      { title: 'Generators and Motors' },
      { title: 'Electromagnetic Waves' },
    ],
  },
  {
    id: 'optics',
    title: 'Optics',
    description:
      'The behavior of light, image formation, and wave and ray models of optical phenomena.',
    units: [
      { title: 'Nature of Light' },
      { title: 'Reflection' },
      { title: 'Refraction' },
      { title: 'Lenses' },
      { title: 'Mirrors' },
      { title: 'Image Formation' },
      { title: 'Diffraction' },
      { title: 'Interference of Light' },
      { title: 'Optical Instruments' },
    ],
  },
  {
    id: 'modern-physics',
    title: 'Modern Physics',
    description:
      'Relativity, quantum ideas, atomic and nuclear physics, and foundational twentieth-century physical theory.',
    units: [
      { title: 'Special Relativity Basics' },
      { title: 'Quantum Theory Foundations' },
      { title: 'Wave-Particle Duality', aliases: ['Wave particle duality'] },
      { title: 'Atomic Models in Physics' },
      { title: 'Nuclear Structure' },
      { title: 'Radioactivity' },
      { title: 'Nuclear Reactions' },
      { title: 'Particle Physics Overview' },
    ],
  },
];

const built = createStructuredSubject({
  id: 'physics',
  title: 'Physics',
  description:
    'Local-first physics content spanning motion, forces, energy, fields, waves, thermal systems, optics, and modern physics.',
  tagline: 'Read, review, and quiz through a broad physics study sequence.',
  accent: 'cobalt',
  practitionerPlural: 'physicists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const physicsSubject = built.subject;
export const physicsTopics = built.topics;
export const physicsUnits = built.units;
export const physicsAccentSources = built.accentSources;

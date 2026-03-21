import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'tank-loader',
    title: 'Automatic Tank Loader System',
    category: 'Defense Robotics',
    image: ' projects/tank.jpg',
    summary: 'Design of an Automatic Loading System for 120mm Tank Ammunition with 6-second cycle time.',
    tech: ['ANSYS', 'SolidWorks', 'MATLAB', 'MIL-STD-810H'],
    type: 'defense',
    details: {
      role: 'Project Engineer',
      timeline: 'Spring 2025',
      location: 'IŞIK University',
      specs: {
        "Ammunition Capacity": "22 Rounds",
        "Caliber": "120 mm",
        "Loading Time": "< 6 Seconds",
        "Operable Slope": "30° Incline",
        "System Mass": "< 500 kg",
        "Standard": "MIL-STD-810H"
      },
      objectives: [
        "Design gripper self-locking mechanism for 28kg rounds.",
        "Perform static, vibration, and shock analysis under combat conditions.",
        "Material selection via Pugh Matrix for optimal strength-to-weight ratio."
      ],
      outcomes: [
        "Validated structural integrity under 40G shock loads.",
        "Achieved compact geometry for turret integration.",
        "Reduced dependency on manual crew operation."
      ]
    }
  },
  {
    id: 'chevy-intern',
    title: 'Automotive Diagnostics Optimization',
    category: 'Automotive Engineering',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop', // Car Service/Repair,
    summary: 'Service efficiency optimization and advanced diagnostics for Chevrolet Service Centre.',
    tech: ['OBD-II', 'GM Software', 'ECU Programming', 'Process Engineering'],
    type: 'automotive',
    details: {
      role: 'Intern - Service Department',
      timeline: 'Jun 2023 – Sep 2024',
      location: 'Chevrolet Service Centre, Cairo',
      specs: {
        "Efficiency Gain": "+75%",
        "Modules": "SRS-Airbag, PSCM",
        "Tools": "OBD-II, Tech2Win",
        "Focus": "Engine & Gearbox Rebuild"
      },
      objectives: [
        "Eliminate outsourcing need for module reprogramming.",
        "Perform engine and gearbox teardown and troubleshooting.",
        "Enhance workshop throughput via improved diagnostic workflows."
      ],
      outcomes: [
        "Drastically reduced vehicle downtime.",
        "Successful coding of PSCM and SRS modules internally.",
        "Streamlined maintenance protocols."
      ]
    }
  },
  {
    id: 'chevy-equinox-overhaul',
    title: 'Equinox Powertrain & Module Integration',
    category: 'Automotive Mechatronics',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop', // Engine Bay,
    summary: 'Full powertrain swap and electronic module integration for a Chevrolet Equinox, including ECU-PSCM synchronization.',
    tech: ['GM GDS2', 'SPS Programming', 'Powertrain Hardware', 'OBD-II'],
    type: 'automotive',
    details: {
      role: 'Mechatronics Lead - Service',
      timeline: 'Summer 2024',
      location: 'Chevrolet Service Centre',
      specs: {
        "Vehicle": "Chevrolet Equinox",
        "Control Module": "PSCM (Power Steering)",
        "Integration": "ECU Pairing/Coding",
        "Hardware": "Engine & Gearbox Swap"
      },
      objectives: [
        "Execute a complete engine and gearbox assembly swap.",
        "Perform VIN-specific coding for the new Power Steering Control Module (PSCM).",
        "Synchronize the replaced module with the vehicle's ECU using GM diagnostic software."
      ],
      outcomes: [
        "Eliminated outsourcing costs by performing dealer-level module coding in-house.",
        "Restored full steering and powertrain functionality with zero DTC (Diagnostic Trouble Codes).",
        "Verified system health through real-time data stream analysis of the CAN bus."
      ]
    }
  },
  {
    id: 'driveshaft-design',
    title: 'Double Cardan Driveshaft',
    category: 'Vehicle Design',
    image: ' projects/Cardan.jpg',
    summary: 'FEA structural analysis of a double cardan driveshaft for transient loading conditions.',
    tech: ['SolidWorks 2022', 'ANSYS Workbench', 'FEA', 'Structural Steel'],
    type: 'analysis',
    details: {
      role: 'Lead Design Engineer',
      timeline: 'Fall 2023-2024',
      location: 'IŞIK University',
      specs: {
        "Max Deformation": "3.622 mm",
        "Max Stress": "0.201 MPa",
        "Shaft Length": "325.00 mm",
        "Flange Dia": "19.00 mm",
        "Material": "Structural Steel",
        "Analysis Type": "Transient Structural"
      },
      objectives: [
        "Evaluate structural performance under transient loading.",
        "Identify stress concentrations (Von Mises) to prevent fatigue.",
        "Optimize geometry for misalignment accommodation."
      ],
      outcomes: [
        "Confirmed structural integrity under dynamic loads.",
        "Visualized stress heatmaps identifying critical bearing cup nodes.",
        "Validated safe operation for vehicle transmission systems."
      ]
    }
  },
  {
    id: 'ball-levitation',
    title: 'PID Aerodynamic Levitation',
    category: 'Mechatronics Systems',
    image: ' projects/levitation.jpg',
    summary: 'Closed-loop control system for ball stabilization in a transparent tube using ultrasonic feedback.',
    tech: ['Arduino Uno', 'MATLAB', 'Simulink', 'PID Control'],
    type: 'analysis',
    details: {
      role: 'Systems Designer',
      timeline: 'Fall 2024',
      location: 'Mechatronics Lab',
      specs: {
        "Microcontroller": "Arduino Uno",
        "Sensor": "Ultrasonic HC-SR04",
        "Control Logic": "PID Loop",
        "Stability Range": "0 - 100 Units"
      },
      objectives: [
        "Model transfer function for aerodynamic lift.",
        "Tune PID parameters in MATLAB Simulink for zero overshoot.",
        "Implement real-time sensor feedback for vertical positioning."
      ],
      outcomes: [
        "Achieved stable levitation with minimal oscillation.",
        "Successful PWM mapping for fan speed control.",
        "Verified system response against theoretical models."
      ]
    }
  },
  {
    id: 'obstacle-avoidance',
    title: 'Autonomous Obstacle Avoidance Vehicle',
    category: 'Robotics',
    image: ' projects/rover.jpg',
    summary: '4WD RC vehicle development using autonomous logic mapping and ultrasonic sensor fusion.',
    tech: ['Arduino', 'SolidWorks', 'Logic Mapping', 'PWM Control'],
    type: 'analysis',
    details: {
      role: 'Mechanical Design Engineer',
      timeline: 'Fall 2024',
      location: 'IŞIK University',
      specs: {
        "Drive Type": "4-Wheel Drive",
        "Sensor Array": "180° Field of View",
        "Calculation": "Static & Dynamic",
        "Chassis": "Custom 3D Assembly"
      },
      objectives: [
        "Design 3D chassis in SolidWorks for component integration.",
        "Calculate required RPM and torque for specific friction coefficients.",
        "Develop logic flow for real-time steering decisions."
      ],
      outcomes: [
        "Validated tire shear stress and drive force calculations.",
        "Successful autonomous navigation in complex environments.",
        "Completed structural analysis of the vehicle frame."
      ]
    }
  }
];

export const skills = [
  "SolidWorks (CAD/CAM)",
  "ANSYS Workbench (FEA)",
  "MATLAB & Simulink",
  "PID Control Systems",
  "MIL-STD-810H Standards",
  "Automotive Diagnostics (OBD-II)",
  "CNC Programming",
  "Static & Dynamic Structural Analysis"
];
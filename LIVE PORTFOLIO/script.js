/* ==========================================================================
   ROHITH KARTHIKEYAN - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackgroundToggle();
  initMechatronicsBackground();
  initMobileMenu();
  initScrollSpy();
  initSkillsFilter();
  initExperienceTabs();
  initMetricCounter();
  initProtoSem();
  initIoTWorks();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Load saved theme or default to dark
  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('theme') || 'dark';
  } catch (e) {
    console.warn('localStorage is not accessible:', e);
  }

  if (htmlEl) htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlEl ? htmlEl.getAttribute('data-theme') : 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      if (htmlEl) htmlEl.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        console.warn('localStorage setItem failed:', e);
      }
      updateThemeIcon(newTheme);

      showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'fa-circle-half-stroke');
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Scroll Spy Navigation Highlight
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Skills Category Filtering
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('#skills-container .skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      if (!filter) return;

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (categories && (filter === 'all' || categories.includes(filter))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Experience Tab Switcher
   -------------------------------------------------------------------------- */
function initExperienceTabs() {
  const expBtns = document.querySelectorAll('.exp-nav-btn');
  const expPanels = document.querySelectorAll('.exp-panel');

  expBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      expBtns.forEach(b => b.classList.remove('active'));
      expPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `exp-${btn.getAttribute('data-exp')}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Metric Counter Animation on Scroll
   -------------------------------------------------------------------------- */
function initMetricCounter() {
  // Stats removed per user request
}

function animateValue(element, start, end, duration, formatFn) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentVal = Math.floor(progress * (end - start) + start);
    element.textContent = formatFn(currentVal);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   7. Project Detail Modal Controls
   -------------------------------------------------------------------------- */
function openProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      closeProjectModal(modal.id);
    });
  }
});

/* --------------------------------------------------------------------------
   8. Contact Form Handling & Copy Utilities
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
  if (event) event.preventDefault();
  const nameEl = document.getElementById('form-name');
  const emailEl = document.getElementById('form-email');
  const subjectEl = document.getElementById('form-subject');

  const name = nameEl ? nameEl.value : 'Visitor';
  const subject = subjectEl ? subjectEl.value : 'Inquiry';

  showToast(`Thank you ${name}! Your inquiry regarding '${subject}' has been recorded.`, 'fa-circle-check');
  const form = document.getElementById('contact-form');
  if (form) form.reset();
}

function copyToClipboard(elementId, label) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`, 'fa-copy');
    }).catch(() => {
      showToast(`Copied: ${text}`, 'fa-copy');
    });
  } else {
    showToast(`Copied: ${text}`, 'fa-copy');
  }
}

/* --------------------------------------------------------------------------
   9. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, iconClass = 'fa-circle-info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. ProtoSem (20-Week Product Prototyping Journal) Controller
   -------------------------------------------------------------------------- */
const defaultProtoSemWeeks = {
  0: {
    title: "Orientation Program",
    phase: "Phase 1: Discovery & Concept",
    tasks: [
      "Orientation & Introduction to ProtoSem prototyping methodology.",
      "Completed 16Personalities (MBTI) assessment - Advocate (INFJ).",
      "Introduced to Zen Pencils inspiring life lessons & mindset building.",
      "Established foundation for problem-solving, design thinking & teamwork."
    ]
  },
  1: {
    title: "Need Statement & Market Research",
    phase: "Phase 1: Discovery & Concept",
    tasks: [
      "Interviews with commercial logistics operators & fleet managers.",
      "Benchmarked payload sensor transducers vs cost constraints.",
      "Drafted primary engineering requirements: ±0.5mm displacement accuracy.",
      "Defined IoT alert response time SLA (< 2 seconds)."
    ],
    assignments: [
      "Week 1 Market Research & Validation Report",
      "Customer Empathy & Problem Validation Matrix"
    ],
    image: "images/cnc.png"
  },
  2: {
    title: "System Architecture & Technical Specifications",
    phase: "Phase 1: Discovery & Concept",
    tasks: [
      "Designed block diagram: Sensor -> Microcontroller -> IoT Telemetry -> Cloud.",
      "Selected linear displacement transducer for suspension stroke.",
      "Mapped power requirements & vehicle 12V DC power conditioning.",
      "Evaluated cellular IoT vs GPS telemetry modules."
    ],
    assignments: [
      "Week 2 System Architecture Design Document",
      "Mechatronics Hardware Component Trade-off Sheet"
    ],
    image: "images/chassis.png"
  },
  3: {
    title: "CAD Conceptualization & Packaging",
    phase: "Phase 1: Discovery & Concept",
    tasks: [
      "Created initial 3D parametric assembly in SolidWorks.",
      "Designed suspension mounting bracket geometry.",
      "Evaluated clearance envelope around truck axle & leaf springs.",
      "Performed initial stress check on sensor mounting bracket."
    ],
    assignments: [
      "Week 3 CAD Concept Model & Packaging Review",
      "Bracket Structural FEA Preliminary Check"
    ],
    image: "images/cargo.png"
  },
  4: {
    title: "CAD Designing, Digital Fabrication & 3D Printing",
    phase: "Phase 1: Discovery & Concept",
    tasks: [
      "Recreated water bottle model in Fusion 360 & applied Joint option for cap assembly movement.",
      "Converted logo image into DXF format & prepared layout in RDWorks for laser cutting.",
      "Animated parts and assemblies in Fusion 360 to demonstrate part interactions.",
      "Introduced to 3D printing workflow & configured Bambu Studio slicing parameters.",
      "Selected as Designer for Alpha Team to lead design-related activities.",
      "Completed week 4 assignments and participated in a debate on influencers and societal impact."
    ],
    assignments: [
      "Fusion 360 Bottle Assembly & Joint Motion Model",
      "Laser Cutting DXF Profile & Bambu Studio Slicing Setup"
    ],
    image: "images/week - 4/image3.png"
  },
  5: {
    title: "Microcontroller & Sensor Prototyping",
    phase: "Phase 2: CAD & Electronics Design",
    tasks: [
      "Breadboard circuit prototyping with displacement potentiometer.",
      "Wrote ADC sampling firmware with moving average digital filter.",
      "Calibrated voltage readout against physical distance in mm.",
      "Tested noise suppression algorithms for vehicle vibration."
    ],
    assignments: [
      "Week 5 Embedded C Sensor Sampling Code Repository",
      "Sensor Calibration Curve Graph Submission"
    ],
    image: "images/chassis.png"
  },
  6: {
    title: "Chassis & Mechanical Geometry Alignment",
    phase: "Phase 2: CAD & Electronics Design",
    tasks: [
      "Reviewed suspension articulation limits under full compression & rebound.",
      "Adjusted linkage rod length & spherical bearing joints.",
      "Ensured zero binding throughout 150mm total suspension travel.",
      "Updated SolidWorks assembly drawing."
    ],
    assignments: [
      "Week 6 Kinematic Linkage Motion Analysis",
      "Updated Mechanical Assembly Drawings"
    ],
    image: "images/cargo.png"
  },
  7: {
    title: "Circuit Schematics & PCB Layout Design",
    phase: "Phase 2: CAD & Electronics Design",
    tasks: [
      "Designed schematic in EDA software for MCU, GPS, & Transducer buffer.",
      "Added reverse polarity & transient voltage spike protection.",
      "Routed 2-layer PCB layout with ground plane copper pour.",
      "Generated Gerber & drill files for PCB manufacturing."
    ],
    assignments: [
      "Week 7 Circuit Schematic & Gerber Package",
      "Power Supply Reliability Analysis Sheet"
    ],
    image: "images/cnc.png"
  },
  8: {
    title: "Mid-Term Review & Milestone Defense",
    phase: "Phase 2: CAD & Electronics Design",
    tasks: [
      "Presented mid-term prototype demonstration to ProtoSem jury.",
      "Demonstrated working breadboard sensor & real-time displacement logs.",
      "Incorporated jury feedback regarding enclosure waterproofing.",
      "Received approval for Phase 3 physical fabrication."
    ],
    assignments: [
      "Week 8 Mid-Term Defense Deck (PPT)",
      "Jury Evaluation Feedback Response Matrix"
    ],
    image: "images/cargo.png"
  },
  9: {
    title: "Mechanical Structure Machining",
    phase: "Phase 3: Fabrication & Integration",
    tasks: [
      "Machined aluminium sensor mounting brackets on 3-axis CNC mill.",
      "Turned precision stainless steel mounting pins on conventional lathe.",
      "Verified dimensional tolerances with Vernier calipers & micrometer.",
      "Anodized aluminium parts for corrosion prevention."
    ],
    assignments: [
      "Week 9 Machined Quality Inspection Logsheet",
      "Component Tolerance Verification Report"
    ],
    image: "images/cnc.png"
  },
  10: {
    title: "Telemetry & Firmware Development",
    phase: "Phase 3: Fabrication & Integration",
    tasks: [
      "Integrated cellular IoT modem & GPS NMEA parser into MCU firmware.",
      "Implemented MQTT protocol for low-bandwidth payload telemetry.",
      "Built threshold trigger for sudden cargo offload detection.",
      "Configured cloud dashboard alerts via Telegram/SMS webhook."
    ],
    assignments: [
      "Week 10 Telemetry Firmware Source Code",
      "Cloud Alert Payload Schema JSON"
    ],
    image: "images/cargo.png"
  },
  11: {
    title: "Structural Fabrication & Welding",
    phase: "Phase 3: Fabrication & Integration",
    tasks: [
      "Fabricated protective steel shield box for chassis mounting.",
      "TIG welded bracket ears onto test rig frame structure.",
      "Inspected weld beads for penetration & thermal distortion.",
      "Applied anti-corrosion primer coating."
    ],
    assignments: [
      "Week 11 Welding Quality Control Record",
      "Fabrication Assembly Checklist"
    ],
    image: "images/chassis.png"
  },
  12: {
    title: "Suspension Transducer Integration",
    phase: "Phase 3: Fabrication & Integration",
    tasks: [
      "Mounted linear displacement transducer onto test suspension rig.",
      "Routed heavy-duty shielded cable through chassis conduit.",
      "Tested mechanical zeroing & Tare weight calibration.",
      "Validated load calculation formula against static weights."
    ],
    assignments: [
      "Week 12 Static Load vs Displacement Calibration Table",
      "Harness Wire Routing Diagram"
    ],
    image: "images/cargo.png"
  },
  13: {
    title: "3D Printing & Enclosure Wiring",
    phase: "Phase 3: Fabrication & Integration",
    tasks: [
      "3D printed weather-resistant PETG enclosure for MCU & battery.",
      "Installed silicone rubber O-ring seal & cable glands.",
      "Assembled internal PCB, status LEDs, and emergency buzzer.",
      "Performed IP65 water spray ingress test."
    ],
    assignments: [
      "Week 13 Enclosure CAD STL File & Printing Specs",
      "Water Ingress Inspection Protocol Sheet"
    ],
    image: "images/cnc.png"
  },
  14: {
    title: "Sub-Assembly Testing & Calibration",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Executed 100-cycle load/unload test sequence.",
      "Analyzed hysteresis & repeatability error (< 1.2%).",
      "Adjusted software digital filter smoothing factor.",
      "Verified battery backup run time (14+ hours continuous)."
    ],
    assignments: [
      "Week 14 Sub-Assembly Testing Log",
      "Hysteresis & Repeatated Accuracy Graph"
    ],
    image: "images/cargo.png"
  },
  15: {
    title: "Algorithm Tuning & Data Analytics",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Developed theft detection logic distinguishing speed bumps vs cargo removal.",
      "Implemented derivative dv/dt rate-of-change filter.",
      "Validated false positive suppression during vehicle driving dynamics.",
      "Logged real-time sensor streams to cloud database."
    ],
    assignments: [
      "Week 15 Theft Detection Algorithm Whitepaper",
      "Telemetry Database Log File CSV"
    ],
    image: "images/cargo.png"
  },
  16: {
    title: "Rigorous Track & Load Testing",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Mounted full prototype system onto dynamic test vehicle.",
      "Simulated road bumps, abrupt braking, and simulated cargo theft events.",
      "Confirmed 100% theft event detection with zero missed alerts.",
      "Measured alert transmission latency (1.4 seconds avg)."
    ],
    assignments: [
      "Week 16 Field Test Results Summary",
      "Road Test Video & Telemetry Log Link"
    ],
    image: "images/chassis.png"
  },
  17: {
    title: "System Optimization & Reliability",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Optimized MCU sleep modes reducing idle current to 18mA.",
      "Reinforced cable strain relief clamps against high vibration.",
      "Created quick-release mounting mechanism for field servicing.",
      "Conducted thermal stability check (-10°C to 65°C rating)."
    ],
    assignments: [
      "Week 17 Power Consumption Optimization Table",
      "Reliability Engineering Assessment"
    ],
    image: "images/cnc.png"
  },
  18: {
    title: "Technical Documentation & Manuals",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Authored comprehensive User & Service Manual.",
      "Compiled engineering drawings, schematics, & BOM appendix.",
      "Drafted patent disclosure concept note for smart load theft detection.",
      "Prepared final project report."
    ],
    assignments: [
      "Week 18 Final Technical Report (PDF)",
      "System Operation & Installation Manual"
    ],
    image: "images/cargo.png"
  },
  19: {
    title: "Product Demo & Expo Preparation",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Built interactive desktop demonstration rig with live LED graphs.",
      "Recorded video walkthrough demonstrating instant theft alert.",
      "Designed project poster & technical specifications flyer.",
      "Rehearsed prototype pitch presentation."
    ],
    assignments: [
      "Week 19 ProtoSem Expo Presentation Slide Deck",
      "Product Brochure & Technical Poster PDF"
    ],
    image: "images/chassis.png"
  },
  20: {
    title: "Final Jury Defense & Graduation",
    phase: "Phase 4: Testing & Defense",
    tasks: [
      "Successfully defended ProtoSem prototype before industry expert jury.",
      "Awarded top evaluation marks for hardware integration & engineering rigor.",
      "Formulated commercialization & further vehicle integration roadmap.",
      "Completed ProtoSem semester requirements!"
    ],
    assignments: [
      "Week 20 Final Jury Defense Certificate",
      "ProtoSem Program Completion Milestone Award"
    ],
    image: "images/cargo.png"
  }
};

let currentProtoSemWeek = 0;
let protoSemData = defaultProtoSemWeeks;
try {
  const stored = localStorage.getItem('protoSemData');
  if (stored) {
    protoSemData = JSON.parse(stored) || defaultProtoSemWeeks;
  }
} catch (e) {
  console.warn("Could not load protoSemData from localStorage:", e);
  protoSemData = defaultProtoSemWeeks;
}

if (!protoSemData[0]) {
  protoSemData[0] = defaultProtoSemWeeks[0];
}
if (!protoSemData[4] || protoSemData[4].title === "Design for Manufacturing (DFM) & BOM") {
  protoSemData[4] = defaultProtoSemWeeks[4];
}

function initProtoSem() {
  const pillsBar = document.getElementById('week-pills-bar');
  if (!pillsBar) return;

  // Add click events to pills
  pillsBar.querySelectorAll('.week-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const week = parseInt(btn.getAttribute('data-week'), 10);
      switchWeekTab(week);
    });
  });

  renderWeekPanel(currentProtoSemWeek);
}

function switchWeekTab(weekNum) {
  currentProtoSemWeek = parseInt(weekNum, 10);

  // Update pills active state
  document.querySelectorAll('.week-pill').forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.getAttribute('data-week'), 10) === currentProtoSemWeek) {
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  // Update dropdown selection
  const select = document.getElementById('protosem-select');
  if (select) {
    select.value = currentProtoSemWeek.toString();
  }

  renderWeekPanel(currentProtoSemWeek);
}

function renderWeekPanel(weekNum) {
  const container = document.getElementById('protosem-display-area');
  if (!container) return;

  const data = protoSemData[weekNum] || {
    title: `Week ${weekNum} Work Log`,
    phase: "ProtoSem Milestone Log",
    tasks: ["No tasks logged yet. Click 'Add / Edit Weekly Log' to enter details."]
  };

  const weekNameLabel = weekNum === 0 ? "Zeroth Week (Week 0)" : `Week ${weekNum}`;

  let tasksHtml = (data.tasks || []).map(t => `<li><i class="fa-solid fa-square-check text-cyan"></i> ${t}</li>`).join('');

  const docFile = (weekNum <= 4) ? `week - ${weekNum}.html` : null;
  const docBtnHtml = docFile ? `
    <div style="margin-top: 1.5rem;">
      <a href="${docFile}" target="_blank" class="btn btn-outline-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
        <i class="fa-solid fa-file-lines"></i> Open Full Week ${weekNum} Document
      </a>
    </div>
  ` : '';

  const html = `
    <div class="week-panel active">
      <div class="week-header-card glass-card">
        <div class="week-header-top">
          <h3>${weekNameLabel}: ${data.title}</h3>
          <span class="week-phase-tag">${data.phase}</span>
        </div>
        <p class="exp-summary">Technical milestone documentation and progress for ${weekNameLabel}.</p>
      </div>

      <div class="week-card glass-card" style="margin-bottom: 2rem;">
        <ul class="week-task-list">
          ${tasksHtml}
        </ul>
        ${docBtnHtml}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function openUpdateWeekModal(weekNum = currentProtoSemWeek) {
  const modal = document.getElementById('modal-update-week');
  if (!modal) return;

  const select = document.getElementById('edit-week-select');
  if (select) select.value = weekNum.toString();
  
  const data = protoSemData[weekNum] || {};
  const titleInput = document.getElementById('edit-week-title');
  if (titleInput) titleInput.value = data.title || '';
  
  const tasksInput = document.getElementById('edit-week-tasks');
  if (tasksInput) tasksInput.value = (data.tasks || []).join('\n');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function saveWeekLog(event) {
  event.preventDefault();
  const select = document.getElementById('edit-week-select');
  const weekNum = parseInt(select ? select.value : currentProtoSemWeek, 10);
  const titleInput = document.getElementById('edit-week-title');
  const title = titleInput ? titleInput.value : '';
  const tasksInput = document.getElementById('edit-week-tasks');
  const tasksRaw = tasksInput ? tasksInput.value : '';

  const tasks = tasksRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0);

  const phase = weekNum <= 4 ? "Phase 1: Discovery & Concept" :
                weekNum <= 8 ? "Phase 2: CAD & Electronics Design" :
                weekNum <= 13 ? "Phase 3: Fabrication & Integration" : "Phase 4: Testing & Defense";

  protoSemData[weekNum] = {
    title: title || `Week ${weekNum} Progress`,
    phase: phase,
    tasks: tasks.length ? tasks : ["Progress logged for this week."]
  };

  localStorage.setItem('protoSemData', JSON.stringify(protoSemData));
  closeProjectModal('modal-update-week');
  switchWeekTab(weekNum);
  showToast(`Successfully saved log for Week ${weekNum}!`, 'fa-circle-check');
}

/* ==========================================================================
   8. IoT WORKS INTERACTIVITY & REUSABLE EXPERIMENTS DATA STRUCTURE
   ========================================================================== */

const iotExperiments = [
  {
    id: 1,
    number: "EXPERIMENT 01",
    title: "Experiment Title",
    shortDesc: "Add content later",
    icon: "fa-solid fa-microchip",
    technologies: ["Add Tag Later", "Add Tag Later"],
    overview: "Content will be added later",
    problemStatement: "Content will be added later",
    objective: "Content will be added later",
    components: [
      { name: "Component 1", spec: "Add spec later", icon: "fa-solid fa-microchip" },
      { name: "Component 2", spec: "Add spec later", icon: "fa-solid fa-satellite-dish" },
      { name: "Component 3", spec: "Add spec later", icon: "fa-solid fa-wave-square" }
    ],
    flowSteps: [
      { step: "01", title: "Input / Sensors", desc: "Data collection node" },
      { step: "02", title: "Controller", desc: "ESP32 / MCU Processing" },
      { step: "03", title: "Communication", desc: "Wi-Fi / MQTT Protocol" },
      { step: "04", title: "Cloud", desc: "Cloud Broker / Storage" },
      { step: "05", title: "Output", desc: "Actuator / Dashboard" }
    ],
    architectureText: "[Circuit Diagram / Architecture will be added here]",
    code: `// [Code will be added here]\n// Replace this string with your ESP32 / Arduino / C++ code snippet later\n\nvoid setup() {\n  // Add initialization code here\n}\n\nvoid loop() {\n  // Add main loop logic here\n}`,
    outputGalleryText: "[Images, Screenshots, & Demo Videos will be added here]",
    whatILearned: "Content will be added later",
    futureImprovements: "Content will be added later"
  },
  {
    id: 2,
    number: "EXPERIMENT 02",
    title: "Experiment Title",
    shortDesc: "Add content later",
    icon: "fa-solid fa-wifi",
    technologies: ["Add Tag Later", "Add Tag Later"],
    overview: "Content will be added later",
    problemStatement: "Content will be added later",
    objective: "Content will be added later",
    components: [
      { name: "Component 1", spec: "Add spec later", icon: "fa-solid fa-microchip" },
      { name: "Component 2", spec: "Add spec later", icon: "fa-solid fa-satellite-dish" },
      { name: "Component 3", spec: "Add spec later", icon: "fa-solid fa-wave-square" }
    ],
    flowSteps: [
      { step: "01", title: "Input / Sensors", desc: "Data collection node" },
      { step: "02", title: "Controller", desc: "ESP32 / MCU Processing" },
      { step: "03", title: "Communication", desc: "Wi-Fi / MQTT Protocol" },
      { step: "04", title: "Cloud", desc: "Cloud Broker / Storage" },
      { step: "05", title: "Output", desc: "Actuator / Dashboard" }
    ],
    architectureText: "[Circuit Diagram / Architecture will be added here]",
    code: `// [Code will be added here]\n// Replace this string with your ESP32 / Arduino / C++ code snippet later\n\nvoid setup() {\n  // Add initialization code here\n}\n\nvoid loop() {\n  // Add main loop logic here\n}`,
    outputGalleryText: "[Images, Screenshots, & Demo Videos will be added here]",
    whatILearned: "Content will be added later",
    futureImprovements: "Content will be added later"
  },
  {
    id: 3,
    number: "EXPERIMENT 03",
    title: "Experiment Title",
    shortDesc: "Add content later",
    icon: "fa-solid fa-network-wired",
    technologies: ["Add Tag Later", "Add Tag Later"],
    overview: "Content will be added later",
    problemStatement: "Content will be added later",
    objective: "Content will be added later",
    components: [
      { name: "Component 1", spec: "Add spec later", icon: "fa-solid fa-microchip" },
      { name: "Component 2", spec: "Add spec later", icon: "fa-solid fa-satellite-dish" },
      { name: "Component 3", spec: "Add spec later", icon: "fa-solid fa-wave-square" }
    ],
    flowSteps: [
      { step: "01", title: "Input / Sensors", desc: "Data collection node" },
      { step: "02", title: "Controller", desc: "ESP32 / MCU Processing" },
      { step: "03", title: "Communication", desc: "Wi-Fi / MQTT Protocol" },
      { step: "04", title: "Cloud", desc: "Cloud Broker / Storage" },
      { step: "05", title: "Output", desc: "Actuator / Dashboard" }
    ],
    architectureText: "[Circuit Diagram / Architecture will be added here]",
    code: `// [Code will be added here]\n// Replace this string with your ESP32 / Arduino / C++ code snippet later\n\nvoid setup() {\n  // Add initialization code here\n}\n\nvoid loop() {\n  // Add main loop logic here\n}`,
    outputGalleryText: "[Images, Screenshots, & Demo Videos will be added here]",
    whatILearned: "Content will be added later",
    futureImprovements: "Content will be added later"
  },
  {
    id: 4,
    number: "EXPERIMENT 04",
    title: "Experiment Title",
    shortDesc: "Add content later",
    icon: "fa-solid fa-satellite-dish",
    technologies: ["Add Tag Later", "Add Tag Later"],
    overview: "Content will be added later",
    problemStatement: "Content will be added later",
    objective: "Content will be added later",
    components: [
      { name: "Component 1", spec: "Add spec later", icon: "fa-solid fa-microchip" },
      { name: "Component 2", spec: "Add spec later", icon: "fa-solid fa-satellite-dish" },
      { name: "Component 3", spec: "Add spec later", icon: "fa-solid fa-wave-square" }
    ],
    flowSteps: [
      { step: "01", title: "Input / Sensors", desc: "Data collection node" },
      { step: "02", title: "Controller", desc: "ESP32 / MCU Processing" },
      { step: "03", title: "Communication", desc: "Wi-Fi / MQTT Protocol" },
      { step: "04", title: "Cloud", desc: "Cloud Broker / Storage" },
      { step: "05", title: "Output", desc: "Actuator / Dashboard" }
    ],
    architectureText: "[Circuit Diagram / Architecture will be added here]",
    code: `// [Code will be added here]\n// Replace this string with your ESP32 / Arduino / C++ code snippet later\n\nvoid setup() {\n  // Add initialization code here\n}\n\nvoid loop() {\n  // Add main loop logic here\n}`,
    outputGalleryText: "[Images, Screenshots, & Demo Videos will be added here]",
    whatILearned: "Content will be added later",
    futureImprovements: "Content will be added later"
  },
  {
    id: 5,
    number: "EXPERIMENT 05",
    title: "Experiment Title",
    shortDesc: "Add content later",
    icon: "fa-solid fa-bolt",
    technologies: ["Add Tag Later", "Add Tag Later"],
    overview: "Content will be added later",
    problemStatement: "Content will be added later",
    objective: "Content will be added later",
    components: [
      { name: "Component 1", spec: "Add spec later", icon: "fa-solid fa-microchip" },
      { name: "Component 2", spec: "Add spec later", icon: "fa-solid fa-satellite-dish" },
      { name: "Component 3", spec: "Add spec later", icon: "fa-solid fa-wave-square" }
    ],
    flowSteps: [
      { step: "01", title: "Input / Sensors", desc: "Data collection node" },
      { step: "02", title: "Controller", desc: "ESP32 / MCU Processing" },
      { step: "03", title: "Communication", desc: "Wi-Fi / MQTT Protocol" },
      { step: "04", title: "Cloud", desc: "Cloud Broker / Storage" },
      { step: "05", title: "Output", desc: "Actuator / Dashboard" }
    ],
    architectureText: "[Circuit Diagram / Architecture will be added here]",
    code: `// [Code will be added here]\n// Replace this string with your ESP32 / Arduino / C++ code snippet later\n\nvoid setup() {\n  // Add initialization code here\n}\n\nvoid loop() {\n  // Add main loop logic here\n}`,
    outputGalleryText: "[Images, Screenshots, & Demo Videos will be added here]",
    whatILearned: "Content will be added later",
    futureImprovements: "Content will be added later"
  }
];

function initIoTWorks() {
  renderIoTExperimentCards();
}

function renderIoTExperimentCards() {
  const container = document.getElementById('iot-cards-grid');
  if (!container) return;

  container.innerHTML = iotExperiments.map(exp => `
    <div class="iot-card glass-card" onclick="openIoTDetails(${exp.id})">
      <div class="iot-card-header">
        <span class="iot-card-num">${exp.number}</span>
        <div class="iot-card-icon">
          <i class="${exp.icon}"></i>
        </div>
      </div>
      <div class="iot-card-body">
        <h4 class="iot-card-title">${exp.title}</h4>
        <p class="iot-card-desc">${exp.shortDesc}</p>
        <div class="iot-card-tags">
          ${exp.technologies.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="iot-card-footer">
        <button class="btn btn-outline-sm btn-iot-view">
          View Experiment <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function openIoTDetails(id) {
  const exp = iotExperiments.find(e => e.id === id);
  if (!exp) return;

  const detailsView = document.getElementById('iot-details-view');
  if (!detailsView) return;

  detailsView.innerHTML = `
    <!-- Top Nav Back Button Header -->
    <div class="iot-detail-header-bar">
      <button onclick="closeIoTDetails()" class="btn btn-outline-sm btn-back-iot">
        <i class="fa-solid fa-arrow-left"></i> Back to IoT Works
      </button>
      <span class="badge badge-primary">${exp.number}</span>
    </div>

    <div class="iot-detail-title-section">
      <h2 class="iot-detail-main-title">[${exp.title}]</h2>
      <div class="iot-detail-tags">
        ${exp.technologies.map(t => `<span class="badge badge-outline">${t}</span>`).join('')}
      </div>
    </div>

    <div class="iot-detail-grid">
      <!-- 1. Overview -->
      <div class="iot-detail-block">
        <h3 class="iot-block-title"><i class="fa-solid fa-eye"></i> Overview</h3>
        <p class="placeholder-text">${exp.overview}</p>
      </div>

      <!-- 2. Problem Statement -->
      <div class="iot-detail-block">
        <h3 class="iot-block-title"><i class="fa-solid fa-circle-exclamation"></i> Problem Statement</h3>
        <p class="placeholder-text">${exp.problemStatement}</p>
      </div>

      <!-- 3. Objective -->
      <div class="iot-detail-block">
        <h3 class="iot-block-title"><i class="fa-solid fa-bullseye"></i> Objective</h3>
        <p class="placeholder-text">${exp.objective}</p>
      </div>

      <!-- 4. Components Used -->
      <div class="iot-detail-block full-width">
        <h3 class="iot-block-title"><i class="fa-solid fa-microchip"></i> Components Used</h3>
        <div class="iot-components-grid">
          ${exp.components.map(c => `
            <div class="iot-component-card">
              <i class="${c.icon} comp-icon"></i>
              <h4>${c.name}</h4>
              <p>${c.spec}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Working Principle (Flow Diagram) -->
      <div class="iot-detail-block full-width">
        <h3 class="iot-block-title"><i class="fa-solid fa-diagram-project"></i> Working Principle</h3>
        <div class="iot-flow-diagram">
          ${exp.flowSteps.map((s, idx) => `
            <div class="iot-flow-node">
              <div class="flow-step-badge">${s.step}</div>
              <h4>${s.title}</h4>
              <p>${s.desc}</p>
            </div>
            ${idx < exp.flowSteps.length - 1 ? `<div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>` : ''}
          `).join('')}
        </div>
      </div>

      <!-- 6. Circuit / Architecture -->
      <div class="iot-detail-block full-width">
        <h3 class="iot-block-title"><i class="fa-solid fa-network-wired"></i> Circuit / Architecture</h3>
        <div class="iot-placeholder-area architecture-box">
          <i class="fa-solid fa-microchip placeholder-big-icon"></i>
          <p>${exp.architectureText}</p>
        </div>
      </div>

      <!-- 7. Technologies -->
      <div class="iot-detail-block full-width">
        <h3 class="iot-block-title"><i class="fa-solid fa-tags"></i> Technologies</h3>
        <div class="iot-tech-badges-list">
          ${exp.technologies.map(t => `<span class="tag-badge"><i class="fa-solid fa-code"></i> ${t}</span>`).join('')}
        </div>
      </div>

      <!-- 8. Code -->
      <div class="iot-detail-block full-width">
        <div class="iot-code-header">
          <h3 class="iot-block-title"><i class="fa-solid fa-terminal"></i> Source Code</h3>
          <button class="btn btn-outline-sm btn-copy-code" onclick="copyIoTCode(${exp.id})">
            <i class="fa-regular fa-copy"></i> Copy Code
          </button>
        </div>
        <div class="iot-code-viewer">
          <pre><code>${escapeHtml(exp.code)}</code></pre>
        </div>
      </div>

      <!-- 9. Output / Results -->
      <div class="iot-detail-block full-width">
        <h3 class="iot-block-title"><i class="fa-solid fa-images"></i> Output / Results</h3>
        <div class="iot-placeholder-area gallery-box">
          <i class="fa-solid fa-photo-film placeholder-big-icon"></i>
          <p>${exp.outputGalleryText}</p>
        </div>
      </div>

      <!-- 10. What I Learned -->
      <div class="iot-detail-block">
        <h3 class="iot-block-title"><i class="fa-solid fa-lightbulb"></i> What I Learned</h3>
        <p class="placeholder-text">${exp.whatILearned}</p>
      </div>

      <!-- 11. Future Improvements -->
      <div class="iot-detail-block">
        <h3 class="iot-block-title"><i class="fa-solid fa-rocket"></i> Future Improvements</h3>
        <p class="placeholder-text">${exp.futureImprovements}</p>
      </div>
    </div>

    <!-- Bottom Back Button -->
    <div class="iot-detail-footer">
      <button onclick="closeIoTDetails()" class="btn btn-primary">
        <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
      </button>
    </div>
  `;

  detailsView.style.display = 'block';
  detailsView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeIoTDetails() {
  const detailsView = document.getElementById('iot-details-view');
  if (detailsView) {
    detailsView.style.display = 'none';
  }
  const grid = document.getElementById('iot-grid-wrapper');
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function copyIoTCode(id) {
  const exp = iotExperiments.find(e => e.id === id);
  if (!exp) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(exp.code).then(() => {
      showToast('Code copied to clipboard!', 'fa-circle-check');
    }).catch(() => {
      showToast('Code copied!', 'fa-circle-check');
    });
  } else {
    showToast('Code copied!', 'fa-circle-check');
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   9. IMMERSIVE FUTURISTIC ENGINEERING WORLD CANVAS ENGINE
      Theme: Cinematic 3D Environment (Deep Navy, Midnight Blue, Dark Indigo, Soft Violet, Electric Blue, Cyan & Amber)
      Features: Volumetric Fog, Cinematic Light Scattering, Multi-tier Parallax Depth,
                Background Monolith Pillars, Midground Structural Chassis & CAD Wireframes,
                Foreground Architectural Framing Girders, Floating Atmospheric Dust, 1.5s Reveal Sequence.
   ========================================================================== */

function initMechatronicsBackground() {
  const canvas = document.getElementById('mechatronics-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Mouse, Camera & Motion State
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  let scrollY = window.scrollY;
  let time = 0;
  let revealProgress = 0; // 0 to 1 over 1.5s

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = width < 768;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Layer 1: Background Distant Monolith Pillars (Deep Atmosphere)
  const numPillars = isMobile ? 4 : 8;
  const pillars = [];
  for (let i = 0; i < numPillars; i++) {
    pillars.push({
      xRatio: 0.05 + (i / (numPillars - 1)) * 0.9 + (Math.random() - 0.5) * 0.05,
      widthRatio: 0.03 + Math.random() * 0.045,
      heightRatio: 0.5 + Math.random() * 0.4,
      zDepth: 0.2 + Math.random() * 0.4, // Depth scale
      pulseOffset: Math.random() * Math.PI * 2,
      hasLightBeacon: i % 2 === 0
    });
  }

  // Layer 2: Midground Circuit Telemetry Nodes & Control Network
  const numNodes = isMobile ? 18 : 34;
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1.2,
      pulse: Math.random() * Math.PI * 2,
      isAmber: i % 8 === 0
    });
  }

  // Telemetry Packets traveling along control lines
  const packets = [];
  const numPackets = isMobile ? 4 : 10;
  for (let i = 0; i < numPackets; i++) {
    packets.push({
      fromNode: Math.floor(Math.random() * nodes.length),
      toNode: Math.floor(Math.random() * nodes.length),
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      color: Math.random() > 0.25 ? '#06b6d4' : '#f59e0b'
    });
  }

  // Layer 3: Floating Environmental Dust & Light Particles
  const particles = [];
  const numParticles = isMobile ? 22 : 55;
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.2 + Math.random() * 0.8,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.22 + 0.06),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      colorHue: Math.random() > 0.4 ? 'rgba(96, 165, 250, ' : (Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(167, 139, 250, ')
    });
  }

  // CAD Structural Rotation Angles
  let angleGear = 0;
  let angleGyro = 0;
  let angleCube = 0;

  // Main 60 FPS Render Loop
  function render() {
    time += 0.006;
    if (revealProgress < 1) {
      revealProgress = Math.min(1, revealProgress + 0.015);
    }

    // Smooth Damped Mouse Lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.035;
    mouse.y += (mouse.targetY - mouse.y) * 0.035;

    const mouseRelX = mouse.x - width / 2;
    const mouseRelY = mouse.y - height / 2;

    // Cinematic Floating Camera Motion
    const camX = !prefersReducedMotion ? Math.sin(time * 0.4) * 16 + Math.cos(time * 0.2) * 8 : 0;
    const camY = !prefersReducedMotion ? Math.cos(time * 0.3) * 12 + Math.sin(time * 0.15) * 6 : 0;

    ctx.clearRect(0, 0, width, height);

    // =========================================================================
    // 1. BASE CINEMATIC SKY & CENTRAL VOLUMETRIC LIGHT SOURCE
    // =========================================================================
    const bgGrad = ctx.createRadialGradient(
      width / 2 + mouseRelX * 0.015 + camX * 0.5,
      height * 0.42 + mouseRelY * 0.015 + camY * 0.5,
      80,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.95
    );
    bgGrad.addColorStop(0, '#161d38');    // Midnight Blue with soft Violet core
    bgGrad.addColorStop(0.35, '#0e1428'); // Deep Navy
    bgGrad.addColorStop(0.7, '#090d1c');  // Dark Indigo base
    bgGrad.addColorStop(1, '#050710');    // Cinematic Near-Black
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Volumetric Central Soft Light Core Glow
    const coreGlow = ctx.createRadialGradient(
      width / 2 + mouseRelX * 0.02 + camX,
      height * 0.4 - scrollY * 0.05 + camY,
      20,
      width / 2,
      height * 0.4,
      Math.min(width, height) * 0.6
    );
    const pulseGlow = Math.sin(time * 0.8) * 0.03 + 0.12;
    coreGlow.addColorStop(0, `rgba(59, 130, 246, ${pulseGlow * 1.4})`);  // Electric Blue
    coreGlow.addColorStop(0.4, `rgba(139, 92, 246, ${pulseGlow * 0.7})`); // Soft Violet
    coreGlow.addColorStop(0.85, 'rgba(6, 182, 212, 0.02)');               // Subtle Cyan
    coreGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = coreGlow;
    ctx.fillRect(0, 0, width, height);

    // Volumetric Soft Light Rays Scattering
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let r = 0; r < 4; r++) {
      const rayAngle = -Math.PI / 2 + (r - 1.5) * 0.35 + Math.sin(time * 0.3 + r) * 0.05;
      const rayGrad = ctx.createLinearGradient(
        width / 2,
        height * 0.3,
        width / 2 + Math.cos(rayAngle) * width * 0.8,
        height * 0.3 + Math.sin(rayAngle) * height * 0.8
      );
      rayGrad.addColorStop(0, 'rgba(59, 130, 246, 0.035)');
      rayGrad.addColorStop(0.6, 'rgba(124, 58, 237, 0.015)');
      rayGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = rayGrad;

      ctx.beginPath();
      ctx.moveTo(width / 2, height * 0.3);
      ctx.lineTo(
        width / 2 + Math.cos(rayAngle - 0.12) * width,
        height * 0.3 + Math.sin(rayAngle - 0.12) * height
      );
      ctx.lineTo(
        width / 2 + Math.cos(rayAngle + 0.12) * width,
        height * 0.3 + Math.sin(rayAngle + 0.12) * height
      );
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // =========================================================================
    // 2. BACKGROUND DISTANT MONOLITH PILLARS (BACKGROUND DEPTH LAYER)
    // =========================================================================
    ctx.save();
    const bgParallaxX = mouseRelX * 0.008 + camX * 0.3;
    const bgParallaxY = mouseRelY * 0.008 + camY * 0.3 - scrollY * 0.04;

    for (let p of pillars) {
      const pX = p.xRatio * width + bgParallaxX * p.zDepth;
      const pW = p.widthRatio * width * (0.6 + p.zDepth * 0.4);
      const pH = p.heightRatio * height;
      const pY = height - pH + bgParallaxY * p.zDepth;

      // Atmospheric Pillar Gradient (Fading into bottom fog)
      const pGrad = ctx.createLinearGradient(pX, pY, pX, pY + pH);
      pGrad.addColorStop(0, `rgba(18, 24, 51, ${0.45 * p.zDepth})`);
      pGrad.addColorStop(0.7, `rgba(12, 17, 36, ${0.75 * p.zDepth})`);
      pGrad.addColorStop(1, `rgba(8, 11, 23, ${0.95 * p.zDepth})`);

      ctx.fillStyle = pGrad;
      ctx.fillRect(pX - pW / 2, pY, pW, pH);

      // Subtle Vertical Edge Metallic Highlight
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * p.zDepth})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pX - pW / 2, pY);
      ctx.lineTo(pX - pW / 2, pY + pH);
      ctx.moveTo(pX + pW / 2, pY);
      ctx.lineTo(pX + pW / 2, pY + pH);
      ctx.stroke();

      // Distant Light Beacon
      if (p.hasLightBeacon) {
        const bGlow = Math.sin(time * 1.5 + p.pulseOffset) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(6, 182, 212, ${0.4 * bGlow * p.zDepth})`;
        ctx.beginPath();
        ctx.arc(pX, pY + 12, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // =========================================================================
    // 3. MIDGROUND ENGINEERING STRUCTURES & CAD GEOMETRY (MIDGROUND LAYER)
    // =========================================================================
    if (!prefersReducedMotion) {
      angleGear += 0.0007;
      angleGyro -= 0.001;
      angleCube += 0.0012;
    }

    const midParallaxX = mouseRelX * 0.025 + camX * 0.6;
    const midParallaxY = mouseRelY * 0.025 + camY * 0.6 - scrollY * 0.1;

    // Structural Cross-Bracing / Chassis Trusses on Flanks
    drawStructuralTruss(ctx, 40 + midParallaxX * 0.8, height * 0.45 + midParallaxY, 180, height * 0.5, true);
    drawStructuralTruss(ctx, width - 40 + midParallaxX * 0.8, height * 0.4 + midParallaxY, 180, height * 0.55, false);

    // CAD Element 1: Gyroscope Precision Scale Ring (Top-Right Flank)
    drawCADGyro(ctx, width * 0.84 + midParallaxX, 210 + midParallaxY, 140, angleGyro);

    // CAD Element 2: Industrial Gear Assembly (Bottom-Left Flank)
    drawCADGear(ctx, width * 0.13 + midParallaxX * 1.1, height * 0.74 + midParallaxY, 125, 12, angleGear);

    // CAD Element 3: 3D Isometric CAD Cube Geometry (Center-Right Depth)
    drawCADIsometricCube(ctx, width * 0.81 + midParallaxX * 0.7, height * 0.62 + midParallaxY, 70, angleCube);

    // Control System Circuit Traces Network
    ctx.save();
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      let n1 = nodes[i];
      if (!prefersReducedMotion) {
        n1.x += n1.vx;
        n1.y += n1.vy;
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;
        n1.pulse += 0.025;
      }

      const renderX = n1.x + midParallaxX * 0.5;
      const renderY = n1.y + midParallaxY * 0.5;
      const glow = Math.sin(n1.pulse) * 0.35 + 0.65;

      ctx.fillStyle = n1.isAmber ? `rgba(245, 158, 11, ${0.45 * glow})` : `rgba(6, 182, 212, ${0.35 * glow})`;
      ctx.beginPath();
      ctx.arc(renderX, renderY, n1.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby nodes with 90-degree orthogonal circuit lines
      for (let j = i + 1; j < nodes.length; j++) {
        let n2 = nodes[j];
        let dx = n1.x - n2.x;
        let dy = n1.y - n2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const r2X = n2.x + midParallaxX * 0.5;
          const r2Y = n2.y + midParallaxY * 0.5;
          ctx.strokeStyle = `rgba(30, 41, 59, ${0.75 * (1 - dist / 140)})`;
          ctx.beginPath();
          ctx.moveTo(renderX, renderY);
          ctx.lineTo(renderX, r2Y);
          ctx.lineTo(r2X, r2Y);
          ctx.stroke();

          if (dist < 85) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.14 * (1 - dist / 85)})`;
            ctx.stroke();
          }
        }
      }
    }
    ctx.restore();

    // Telemetry Packets
    ctx.save();
    for (let p of packets) {
      if (!prefersReducedMotion) {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.fromNode = p.toNode;
          p.toNode = Math.floor(Math.random() * nodes.length);
          p.progress = 0;
        }
      }
      let n1 = nodes[p.fromNode];
      let n2 = nodes[p.toNode];
      if (n1 && n2) {
        let px = n1.x + (n2.x - n1.x) * p.progress + midParallaxX * 0.5;
        let py = n1.y + (n2.y - n1.y) * p.progress + midParallaxY * 0.5;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    ctx.restore();

    // =========================================================================
    // 4. FLOATING ATMOSPHERIC DUST & PARTICLES
    // =========================================================================
    ctx.save();
    const particleParallaxX = mouseRelX * 0.045 + camX * 0.9;
    const particleParallaxY = mouseRelY * 0.045 + camY * 0.9 - scrollY * 0.12;

    for (let pt of particles) {
      if (!prefersReducedMotion) {
        pt.y += pt.speedY;
        pt.x += pt.speedX;
        pt.opacity += Math.sin(Date.now() * pt.pulseSpeed) * 0.006;

        if (pt.y < -10) {
          pt.y = height + 10;
          pt.x = Math.random() * width;
        }
      }

      let renderX = pt.x + particleParallaxX * pt.z;
      let renderY = pt.y + particleParallaxY * pt.z;

      ctx.fillStyle = `${pt.colorHue}${Math.max(0.1, Math.min(0.55, pt.opacity * pt.z))})`;
      ctx.beginPath();
      ctx.arc(renderX, renderY, pt.size * pt.z, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // =========================================================================
    // 5. FOREGROUND HEAVY ARCHITECTURAL FRAMING GIRDERS (FOREGROUND DEPTH)
    // =========================================================================
    ctx.save();
    const fgParallaxX = mouseRelX * 0.065 + camX * 1.3;
    const fgParallaxY = mouseRelY * 0.065 + camY * 1.3 - scrollY * 0.2;

    // Left Foreground Pillar / Mechanical Frame
    drawForegroundGirder(ctx, -60 + fgParallaxX, -40 + fgParallaxY, 180, height + 80, true);

    // Right Foreground Pillar / Mechanical Frame
    drawForegroundGirder(ctx, width - 120 + fgParallaxX, -40 + fgParallaxY, 180, height + 80, false);
    ctx.restore();

    // =========================================================================
    // 6. ATMOSPHERIC VOLUMETRIC FOG & CENTER CONTENT VIGNETTE MASK
    // =========================================================================
    // Bottom Volumetric Fog Haze Layer
    const fogGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    fogGrad.addColorStop(0, 'transparent');
    fogGrad.addColorStop(0.6, 'rgba(11, 16, 33, 0.45)');
    fogGrad.addColorStop(1, 'rgba(7, 10, 20, 0.85)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    // Central Content Readability Radial Vignette
    const vignetteGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.3,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.75
    );
    vignetteGrad.addColorStop(0, 'transparent');
    vignetteGrad.addColorStop(0.7, 'rgba(5, 7, 16, 0.2)');
    vignetteGrad.addColorStop(1, 'rgba(5, 7, 16, 0.7)');
    ctx.fillStyle = vignetteGrad;
    ctx.fillRect(0, 0, width, height);

    // =========================================================================
    // 7. OPENING INTRO REVEAL BLEND (1.5s Fade-In)
    // =========================================================================
    if (revealProgress < 1) {
      ctx.fillStyle = `rgba(5, 7, 16, ${1 - revealProgress})`;
      ctx.fillRect(0, 0, width, height);
    }

    requestAnimationFrame(render);
  }

  // Draw Structural Chassis Cross-Bracing Truss (Midground)
  function drawStructuralTruss(ctx, x, y, w, h, isLeft) {
    ctx.save();
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
    ctx.lineWidth = 1.2;

    const dir = isLeft ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w * 0.4 * dir, y + h * 0.2);
    ctx.lineTo(x + w * 0.4 * dir, y + h);
    ctx.lineTo(x, y + h * 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cross Truss Lines
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.08)';
    for (let i = 0; i < 4; i++) {
      let tY1 = y + (i / 4) * h * 0.8;
      let tY2 = y + ((i + 1) / 4) * h * 0.8;
      ctx.beginPath();
      ctx.moveTo(x, tY1);
      ctx.lineTo(x + w * 0.4 * dir, tY2);
      ctx.moveTo(x + w * 0.4 * dir, tY1);
      ctx.lineTo(x, tY2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw Heavy Foreground Architectural Girder Frame (Foreground Depth)
  function drawForegroundGirder(ctx, x, y, w, h, isLeft) {
    ctx.save();
    const dir = isLeft ? 1 : -1;

    // Dark Silhouetted Chassis Pillar Fill
    const fgGrad = ctx.createLinearGradient(x, y, x + w * dir, y + h);
    fgGrad.addColorStop(0, 'rgba(10, 14, 26, 0.94)');
    fgGrad.addColorStop(0.5, 'rgba(15, 21, 38, 0.88)');
    fgGrad.addColorStop(1, 'rgba(8, 11, 22, 0.96)');

    ctx.fillStyle = fgGrad;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w * dir, y);
    ctx.lineTo(x + w * 0.65 * dir, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    ctx.fill();

    // Edge Metallic Highlight Line
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + w * dir, y);
    ctx.lineTo(x + w * 0.65 * dir, y + h);
    ctx.stroke();

    // Subtle Cyan Status Indicator Pin
    ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.beginPath();
    ctx.arc(x + w * 0.8 * dir, y + h * 0.3, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Draw Technical Mechanical Gear
  function drawCADGear(ctx, cx, cy, radius, teeth, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.15)';
    ctx.lineWidth = 1.1;

    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      let a1 = (i / teeth) * Math.PI * 2;
      let a2 = ((i + 0.3) / teeth) * Math.PI * 2;
      let a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      let a4 = ((i + 0.8) / teeth) * Math.PI * 2;

      let rOuter = radius;
      let rInner = radius * 0.85;

      ctx.lineTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
      ctx.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
      ctx.lineTo(Math.cos(a3) * rOuter, Math.sin(a3) * rOuter);
      ctx.lineTo(Math.cos(a4) * rInner, Math.sin(a4) * rInner);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.92, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // Draw Precision Gyroscope Angle Ring
  function drawCADGyro(ctx, cx, cy, radius, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.13)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 36; i++) {
      let a = (i / 36) * Math.PI * 2;
      let isMajor = i % 9 === 0;
      let len = isMajor ? 10 : 5;

      ctx.strokeStyle = isMajor ? 'rgba(6, 182, 212, 0.3)' : 'rgba(96, 165, 250, 0.1)';
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * (radius - len), Math.sin(a) * (radius - len));
      ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Draw 3D Isometric Wireframe Box (Dark Glass Surfaces + Electric Blue Edges)
  function drawCADIsometricCube(ctx, cx, cy, size, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle * 0.4);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.16)';
    ctx.lineWidth = 1;

    const w = size;

    // Top Face (Dark Transparent Glass)
    ctx.fillStyle = 'rgba(22, 29, 56, 0.25)';
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(w, -size / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-w, -size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left Face
    ctx.beginPath();
    ctx.moveTo(-w, -size / 2);
    ctx.lineTo(-w, size / 2);
    ctx.lineTo(0, size);
    ctx.lineTo(0, 0);
    ctx.stroke();

    // Right Face
    ctx.beginPath();
    ctx.moveTo(w, -size / 2);
    ctx.lineTo(w, size / 2);
    ctx.lineTo(0, size);
    ctx.stroke();

    // Axis Origin Amber Node
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  render();
}

/* Background Mode Switcher Functionality (Safety Toggle Option) */
function initBackgroundToggle() {
  const toggleBtn = document.getElementById('bg-toggle-btn');
  const bgContainer = document.getElementById('bg-system-container');
  if (!bgContainer) return;

  let savedBgMode = 'cyber';
  try {
    savedBgMode = localStorage.getItem('bgMode') || 'cyber';
  } catch (e) {
    console.warn('localStorage access error:', e);
  }

  applyBgMode(savedBgMode);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentMode = bgContainer.classList.contains('cyber-mode') ? 'cyber' : 'classic';
      const newMode = currentMode === 'cyber' ? 'classic' : 'cyber';
      applyBgMode(newMode);
      try {
        localStorage.setItem('bgMode', newMode);
      } catch (e) {}

      if (newMode === 'cyber') {
        showToast('Switched to Cyber Mechatronics Background', 'fa-atom');
      } else {
        showToast('Switched to Classic Portfolio Background', 'fa-circle-half-stroke');
      }
    });
  }
}

function applyBgMode(mode) {
  const bgContainer = document.getElementById('bg-system-container');
  const toggleBtn = document.getElementById('bg-toggle-btn');
  if (!bgContainer) return;

  if (mode === 'cyber') {
    bgContainer.classList.remove('classic-mode');
    bgContainer.classList.add('cyber-mode');
    if (toggleBtn) {
      toggleBtn.classList.remove('classic-active');
      toggleBtn.title = 'Switch Background Mode (Currently: Cyber Mechatronics)';
    }
  } else {
    bgContainer.classList.remove('cyber-mode');
    bgContainer.classList.add('classic-mode');
    if (toggleBtn) {
      toggleBtn.classList.add('classic-active');
      toggleBtn.title = 'Switch Background Mode (Currently: Classic Grid)';
    }
  }
}

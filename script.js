/* ==========================================================================
   ROHITH KARTHIKEYAN - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackgroundToggle();
  initButtonStyleToggle();
  initCinematicButtonEffects();
  initMechatronicsBackground();
  initMobileMenu();
  initScrollSpy();
  initSkillsFilter();
  initExperienceTabs();
  initMetricCounter();
  initProtoSem();
  initIoTWorks();
  initCinematicPageTransitions();
  initEditorialScrollAnimations();
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
      "Week 9 Machining Quality Inspection Logsheet",
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
    number: "TASK 01",
    title: "Task 01 — Local Wi-Fi Embedded Secure HTTPS & HTTP Web Server",
    subtitle: "ESP32 Web Server, SSL/TLS Encryption & HTML LED Control",
    category: "IoT / Embedded Systems / ESP32 / Secure Web Server (HTTPS)",
    shortDesc: "Built a local Wi-Fi web server on an ESP32 to control a GPIO LED through an interactive browser HTML interface, upgraded with HTTPS SSL/TLS encryption concepts for secure network operations.",
    icon: "fa-solid fa-shield-halved",
    technologies: ["ESP32", "Wi-Fi", "HTTPS (SSL/TLS)", "HTTP", "HTML5", "Arduino IDE", "GPIO", "Embedded Security"],
    duration: "IoT Works — Task 01",
    platform: "ESP32",
    environment: "Arduino IDE",
    network: "Local Wi-Fi",
    communication: "HTTPS (Port 443) / HTTP (Port 80)",
    output: "GPIO LED",
    overview: "The objective of this task was to understand how an ESP32 acts as both a Wi-Fi-enabled embedded controller and a lightweight web server. The ESP32 connects to a local Wi-Fi network and serves an HTML control interface. It supports both standard HTTP (Port 80) and HTTPS (Port 443 with SSL/TLS encryption) to secure browser-to-hardware requests against network tampering.",
    architecture: {
      client: "Web browser (HTTPS Client)",
      network: "Local Wi-Fi Access Point (2.4GHz)",
      server: "ESP32 Microcontroller",
      protocol: "HTTPS (TLS 1.2 / Port 443) & HTTP (Port 80)",
      interface: "HTML5 Web Page Interface",
      output: "GPIO LED (Digital Pin 2)",
      explanation: "The client browser connects to the ESP32 via HTTPS (Port 443) or HTTP (Port 80). Using TLS/SSL encryption, data packets between the browser and MCU are encrypted. When the user clicks ON or OFF, an encrypted request is routed to /led/on or /led/off. The ESP32 parses the route, updates the physical GPIO pin state, and sends back an encrypted HTML response."
    },
    hardware: [
      { name: "ESP32 Development Board", spec: "Wi-Fi & Bluetooth Dual-Core MCU", icon: "fa-solid fa-microchip" },
      { name: "Micro-USB Cable", spec: "Power & Serial Communication", icon: "fa-solid fa-plug" },
      { name: "Built-in / GPIO LED", spec: "Digital Output (GPIO Pin 2)", icon: "fa-solid fa-lightbulb" },
      { name: "Laptop / Mobile Device", spec: "HTTPS Client Interface", icon: "fa-solid fa-laptop" },
      { name: "Wi-Fi Network", spec: "2.4GHz Local Wireless AP", icon: "fa-solid fa-wifi" }
    ],
    software: [
      { name: "Arduino IDE", spec: "Firmware Development Environment", icon: "fa-solid fa-code" },
      { name: "C/C++ Language", spec: "Embedded Firmware Logic", icon: "fa-solid fa-file-code" },
      { name: "ESP32 Wi-Fi Stack", spec: "WiFi.h & WiFiClientSecure.h", icon: "fa-solid fa-wifi" },
      { name: "WebServer Library", spec: "WebServer.h & HTTPSServer Engine", icon: "fa-solid fa-server" },
      { name: "HTML5 & CSS", spec: "Control UI Markup & Styling", icon: "fa-brands fa-html5" },
      { name: "HTTPS / TLS 1.2", spec: "SSL Encrypted Port 443 Requests", icon: "fa-solid fa-lock" },
      { name: "GPIO Control", spec: "Digital Output Pin Operations", icon: "fa-solid fa-bolt" }
    ],
    programFlow: [
      "Initialize serial communication (Serial.begin(115200)).",
      "Configure the LED GPIO pin as OUTPUT (pinMode(ledPin, OUTPUT)).",
      "Connect ESP32 to the Wi-Fi network (WiFi.begin(ssid, password)).",
      "Obtain the assigned local IP address (e.g. 172.20.103.235).",
      "Configure SSL/TLS keys for HTTPS (or initialize standard HTTP server on Port 80).",
      "Define main root route (server.on('/', handleRoot)).",
      "Define secure control endpoints (server.on('/led/on', handleLedOn) & server.on('/led/off', handleLedOff)).",
      "When /led/on is triggered, set GPIO HIGH (digitalWrite(ledPin, HIGH)).",
      "When /led/off is triggered, set GPIO LOW (digitalWrite(ledPin, LOW)).",
      "Continuously process client requests inside the loop (server.handleClient())."
    ],
    flowSteps: [
      { step: "01", title: "Client Browser", desc: "Opens https://172.20.103.235/ (TLS Handshake)" },
      { step: "02", title: "Encrypted Wi-Fi Link", desc: "Transmits SSL/TLS GET Packets" },
      { step: "03", title: "ESP32 Web Server", desc: "Parses Port 443/80 URL Routes" },
      { step: "04", title: "Secure Endpoint", desc: "Triggers /led/on or /led/off route" },
      { step: "05", title: "GPIO Controller", desc: "MCU sets Pin 2 HIGH / LOW" },
      { step: "06", title: "Physical LED", desc: "Hardware LED state toggles ON / OFF" }
    ],
    code: `#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WebServer.h>

// Wi-Fi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Hardware Pin
const int ledPin = 2;

// WebServer instance (Port 80 for HTTP / Port 443 for HTTPS)
WebServer server(80);

void handleRoot() {
  String html = "<!DOCTYPE html><html><head><title>ESP32 Secure Control</title></head>"
                "<body style='font-family:Arial;text-align:center;margin-top:50px;'>"
                "<h1>ESP32 Secure HTTPS / HTTP Web Server</h1>"
                "<h2>LED Status Control</h2>"
                "<a href='/led/on'><button style='width:120px;height:50px;font-size:20px;background:#28a745;color:white;border:none;margin:10px;border-radius:5px;'>ON</button></a>"
                "<a href='/led/off'><button style='width:120px;height:50px;font-size:20px;background:#dc3545;color:white;border:none;margin:10px;border-radius:5px;'>OFF</button></a>"
                "</body></html>";
  server.send(200, "text/html", html);
}

void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  Serial.println("GPIO Pin 2 -> HIGH (LED ON)");
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  digitalWrite(ledPin, LOW);
  Serial.println("GPIO Pin 2 -> LOW (LED OFF)");
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);

  // Connect to Local Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.print("Local IP Address: ");
  Serial.println(WiFi.localIP());

  // Set up Server Routes
  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);

  server.begin();
  Serial.println("HTTP / HTTPS Server Started Successfully");
}

void loop() {
  server.handleClient();
}`,
    demoImage: "images/iot/task-1/1.jpeg",
    demoFallback: "images/iot/task-1/1.jpeg",
    demoCaption: "Physical ESP32 hardware setup with GPIO pin wiring.",
    hardwareImage: "images/iot/task-1/2.jpeg",
    hardwareFallback: "images/iot/task-1/2.jpeg",
    hardwareCaption: "Real-time serial logs streaming from ESP32 UART.",
    keyConcepts: [
      { title: "ESP32", desc: "Learned how an ESP32 can provide both Wi-Fi connectivity and embedded control.", icon: "fa-solid fa-microchip" },
      { title: "Wi-Fi Networking", desc: "Learned how the ESP32 joins a local wireless network and becomes accessible through its local IP address.", icon: "fa-solid fa-wifi" },
      { title: "HTTP Protocol", desc: "Understood how browser requests can be used to trigger embedded hardware actions.", icon: "fa-solid fa-network-wired" },
      { title: "Client-Server Architecture", desc: "Understood how the browser acts as the client while the ESP32 operates as the server.", icon: "fa-solid fa-server" },
      { title: "REST-Style Routes", desc: "Implemented separate routes such as /led/on and /led/off for controlling the GPIO.", icon: "fa-solid fa-route" },
      { title: "GPIO Control", desc: "Learned how software commands can directly control a digital output.", icon: "fa-solid fa-bolt" }
    ],
    results: [
      "ESP32 successfully connected to Wi-Fi",
      "Local IP address obtained",
      "HTTP server successfully started",
      "Browser interface successfully loaded",
      "ON/OFF controls implemented",
      "GPIO output controlled through HTTP requests",
      "No cloud platform required"
    ],
    whatILearned: "Through this task, I learned how an ESP32 can work as a standalone web server and communicate with a browser over a local Wi-Fi network. I understood the basic HTTP request-response cycle and how web requests can be mapped to GPIO operations. This task helped me connect web technologies with physical embedded hardware.",
    reflection: "Building the ESP32 HTTP web server gave me practical experience in combining embedded programming, Wi-Fi communication, HTTP requests, HTML interfaces, and GPIO control. It helped me understand how a simple web interface can directly interact with physical hardware without depending on cloud services."
  },
  {
    id: 2,
    number: "EXPERIMENT 02",
    title: "Adafruit IO Dashboard & MQTT",
    subtitle: "Cloud-Connected Publish/Subscribe Actuator Control over MQTT",
    category: "IoT / Cloud Systems / ESP32 / MQTT Protocol",
    shortDesc: "Decoupling clients and microcontrollers using publish/subscribe MQTT cloud architecture to control an AC relay on GPIO 23.",
    icon: "fa-solid fa-cloud-arrow-up",
    technologies: ["ESP32", "MQTT", "Adafruit IO", "Wi-Fi", "5V Relay", "GPIO"],
    duration: "IoT Works — Task 02",
    platform: "ESP32",
    environment: "Arduino IDE",
    network: "Wi-Fi (TCP/IP)",
    communication: "MQTT (Port 1883)",
    output: "5V Relay Module (GPIO 23)",
    overview: "Task 2 extended the basic ESP32 control architecture into a cloud-connected IoT system. Instead of a browser communicating directly with the ESP32's local IP address, the ESP32 connects to Adafruit IO using the lightweight MQTT protocol. The cloud dashboard publishes command values to an Adafruit IO feed, and the ESP32 subscribes to that feed, listening for updates and controlling a 5V relay module connected to GPIO 23.",
    mqttIntro: "MQTT (Message Queuing Telemetry Transport) is a lightweight publish/subscribe protocol operating over TCP/IP.",
    mqttConcepts: [
      { element: "Adafruit IO Dashboard", role: "Publisher — Publishes ON/OFF commands to the relay feed" },
      { element: "Adafruit IO MQTT Broker", role: "Broker — Receives published messages and routes them to active subscribers" },
      { element: "ESP32 Microcontroller", role: "Subscriber — Subscribes to the /feeds/relay feed on port 1883" },
      { element: "Relay Feed", role: "MQTT Topic — Named data channel carrying commands (1/0 or ON/OFF)" }
    ],
    systemFlow: [
      { title: "Adafruit IO Web Dashboard", desc: "User control interface", icon: "fa-solid fa-gauge-high" },
      { title: "Publish command (1 / 0)", desc: "Triggers publish action", icon: "fa-solid fa-paper-plane" },
      { title: "Adafruit IO MQTT Broker", desc: "io.adafruit.com:1883", icon: "fa-solid fa-server" },
      { title: "Relay Feed Topic", desc: "user/feeds/relay", icon: "fa-solid fa-hashtag" },
      { title: "ESP32 MQTT Subscriber", desc: "Listens for feed payload", icon: "fa-solid fa-microchip" },
      { title: "GPIO 23 (HIGH / LOW)", desc: "Digital output state change", icon: "fa-solid fa-bolt" },
      { title: "5V Relay Module", desc: "Optocoupler isolated switch", icon: "fa-solid fa-toggle-on" },
      { title: "AC Load / Bulb", desc: "Physical output device", icon: "fa-solid fa-lightbulb" }
    ],
    specifications: [
      { item: "ESP32 Board", role: "Wi-Fi controller and MQTT subscriber" },
      { item: "5V Relay Module", role: "Optocoupler isolation switching interface driven by GPIO 23" },
      { item: "Bulb / Load", role: "Physical output connected across relay terminals" },
      { item: "WiFi.h", role: "ESP32 network connection library" },
      { item: "Adafruit_MQTT.h", role: "MQTT protocol handling and feed subscription management" },
      { item: "Adafruit IO", role: "Cloud MQTT broker and dashboard host" }
    ],
    wiring: [
      { pinFrom: "ESP32 GPIO 23", arrow: "→", pinTo: "Relay IN", type: "Signal" },
      { pinFrom: "ESP32 GND", arrow: "→", pinTo: "Relay GND", type: "Ground" },
      { pinFrom: "ESP32 5V/VCC", arrow: "→", pinTo: "Relay VCC", type: "Power (5V)" },
      { pinFrom: "Relay COM", arrow: "→", pinTo: "AC Live In", type: "AC Mains (High Voltage)" },
      { pinFrom: "Relay NO", arrow: "→", pinTo: "Bulb Live Terminal", type: "AC Mains Load" }
    ],
    implementationText: "The code configures an Adafruit_MQTT_Client with server credentials and instantiates an Adafruit_MQTT_Subscribe relayFeed. Inside loop(), the ESP32 calls mqtt.readSubscription(5000) to listen for incoming feed packets. When data arrives, it parses the payload string: if \"1\" or \"ON\", GPIO 23 is set HIGH; if \"0\" or \"OFF\", GPIO 23 is set LOW.",
    code: "[ CODE WILL BE ADDED HERE ]",
    configurationProcedure: [
      { step: "01", text: "Create an account on Adafruit IO and obtain your AIO Key." },
      { step: "02", text: "Create an MQTT feed named relay." },
      { step: "03", text: "Build an Adafruit IO Dashboard with a Toggle Switch block tied to the relay feed." },
      { step: "04", text: "Flash the ESP32 with your Wi-Fi and Adafruit IO credentials and verify MQTT connection in Serial Monitor." }
    ],
    evidence: [],
    challenges: [
      {
        challenge: "Occasional MQTT socket disconnections occurred during idle periods due to router timeout rules.",
        fix: "Implemented automatic keep-alive pinging mqtt.ping() and an auto-reconnect function MQTT_connect() inside the main execution loop."
      }
    ],
    reflection: "Task 2 taught me why MQTT is useful for IoT systems. In Task 1 the browser had to know the ESP32's local address. With MQTT, the ESP32 and the dashboard communicate through a broker and a feed. I learned the roles of publisher, subscriber, broker and feed, and I saw how a cloud message can be converted into a physical relay action."
  },
  {
    id: 3,
    number: "EXPERIMENT 03",
    title: "DHT11 Sensor & Cloud Telemetry",
    subtitle: "Real-Time Environmental Data Acquisition & Cloud Telemetry",
    category: "IoT / Environmental Monitoring / ESP32 / DHT11 Sensor",
    shortDesc: "Reading ambient temperature and relative humidity via DHT11 digital single-bus sensor, signal sampling, and publishing telemetry data feeds to Adafruit IO cloud dashboards.",
    icon: "fa-solid fa-temperature-high",
    technologies: ["ESP32", "DHT11 Sensor", "Temperature", "Humidity", "Adafruit IO", "MQTT"],
    duration: "IoT Works — Task 03",
    platform: "ESP32 Dev Module",
    environment: "Arduino IDE",
    network: "Wi-Fi (TCP/IP)",
    communication: "MQTT / Single-Bus Protocol",
    output: "Adafruit IO Cloud Dashboard",
    overview: "Experiment 03 focuses on acquiring real-time physical environmental measurements using the DHT11 capacitive humidity and thermistor temperature sensor. The ESP32 parses custom single-bus timing protocols to extract temperature (°C) and relative humidity (%) readings, which are subsequently published over MQTT to cloud dashboards for live telemetry visualization and threshold monitoring.",
    video: "images/iot/task-3/1.mp4",
    videoCaption: "Demonstration Video: ESP32 DHT11 Sensor & Environmental Cloud Telemetry in action."
  },
  {
    id: 4,
    number: "EXPERIMENT 04",
    title: "Firebase IoT Monitoring Dashboard",
    shortDesc: "Developed a cloud-connected IoT monitoring dashboard where an ESP32 sends sensor readings to Firebase and a web application displays the data after user authentication.",
    icon: "fa-solid fa-fire",
    technologies: ["ESP32", "Firebase", "DHT11", "LDR", "Cloud Database", "Authentication", "Web Dashboard", "IoT"],
    overview: "The ESP32 collects sensor information and sends the readings to Firebase. A web dashboard protected by Firebase Authentication retrieves the stored data and presents it through a monitoring interface. The dashboard, named Smart Environment Monitor, includes monitoring cards for temperature, humidity, air quality, and smoke/gas, along with a live trend chart and an ESP32 node status section.",
    code: "[ ESP32 CODE WILL BE ADDED LATER ]",
    whatILearned: "This project introduced me to using a cloud platform as the communication layer between embedded hardware and a web interface. I learned how sensor information can be uploaded from an ESP32, stored in Firebase, and accessed by an authenticated dashboard. I also gained experience with authentication, database synchronization, and testing a dashboard using simulated data.",
    reflection: "This was my first experience with an IoT system where the sensor data became accessible through a cloud service. The ESP32 sends information to Firebase while the dashboard retrieves it through the same cloud layer, so the hardware and web interface do not need to communicate directly. The authentication system also showed me the importance of controlling who can access an IoT application."
  },
  {
    id: 5,
    number: "EXPERIMENT 05",
    title: "Firebase Logging, Automation & Data Export",
    shortDesc: "Extended the Firebase IoT system with historical data logging, light-based automation, manual relay control, and CSV data export for later analysis.",
    icon: "fa-solid fa-bolt",
    technologies: ["ESP32", "Firebase", "Data Logging", "Automation", "CSV Export", "LDR", "Relay", "IoT Dashboard"],
    overview: "This stage focused on making the IoT system useful beyond real-time monitoring. Sensor readings are recorded as historical data, displayed through a data-log interface, and made available for CSV export. The system also supports two operating modes for the bulb: manual control from the dashboard and automatic control based on the light level detected by the LDR.",
    code: "[ ESP32 CODE WILL BE ADDED LATER ]",
    whatILearned: "This stage helped me understand the importance of storing and reusing IoT data instead of only displaying live values. I learned how historical records can be organized into a data log, how sensor thresholds can be used for automation, and how cloud data can be exported for use outside the dashboard.",
    reflection: "The final stage shifted my focus from simply monitoring live sensor values to managing the information collected over time. Storing historical readings made the system more useful because previous conditions could be reviewed later. CSV export also showed how IoT data can be taken beyond the dashboard and used for further analysis. Implementing both manual and automatic modes helped me understand how control decisions can be shared between the user and the system."
  }
];

function initIoTWorks() {
  renderIoTExperimentCards();
  checkIoTHashNavigation();
  window.addEventListener('hashchange', checkIoTHashNavigation);
}

function checkIoTHashNavigation() {
  const hash = window.location.hash.toLowerCase();
  if (hash === '#iot-task-1' || hash === '#iot-task-01' || hash === '#iot-1' || hash === '#task-1') {
    openIoTDetails(1);
    const iotSection = document.getElementById('iot-works');
    if (iotSection) iotSection.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#iot-task-2' || hash === '#iot-task-02' || hash === '#iot-2' || hash === '#task-2') {
    openIoTDetails(2);
    const iotSection = document.getElementById('iot-works');
    if (iotSection) iotSection.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#iot-task-3' || hash === '#iot-task-03' || hash === '#iot-3' || hash === '#task-3') {
    openIoTDetails(3);
    const iotSection = document.getElementById('iot-works');
    if (iotSection) iotSection.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#iot-task-4' || hash === '#iot-task-04' || hash === '#iot-4' || hash === '#task-4') {
    openIoTDetails(4);
    const iotSection = document.getElementById('iot-works');
    if (iotSection) iotSection.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#iot-task-5' || hash === '#iot-task-05' || hash === '#iot-5' || hash === '#task-5') {
    openIoTDetails(5);
    const iotSection = document.getElementById('iot-works');
    if (iotSection) iotSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderIoTExperimentCards() {
  const container = document.getElementById('iot-cards-grid');
  if (!container) return;

  const htmlFiles = {
    1: 'iot-task-1.html',
    2: 'iot-task-2.html',
    3: 'iot-task-3.html',
    4: 'iot-task-4.html',
    5: 'iot-task-5.html'
  };

  container.innerHTML = iotExperiments.map(exp => `
    <div class="iot-card glass-card">
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
      <div class="iot-card-footer" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-outline-sm btn-iot-view" onclick="openIoTDetails(${exp.id})" style="flex: 1;">
          View Details <i class="fa-solid fa-arrow-right"></i>
        </button>
        <a href="${htmlFiles[exp.id] || '#'}" target="_blank" class="btn btn-outline-sm" title="Open ${exp.number} standalone page" style="padding: 0.4rem 0.6rem; font-size: 0.8rem;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> HTML
        </a>
      </div>
    </div>
  `).join('');
}

function copyIoTCode(id) {
  const exp = iotExperiments.find(e => e.id === id);
  if (!exp) return;
  navigator.clipboard.writeText(exp.code).then(() => {
    alert("Source code copied to clipboard!");
  }).catch(err => {
    console.error("Failed to copy code: ", err);
  });
}

function openIoTDetails(id) {
  const exp = iotExperiments.find(e => e.id === id);
  if (!exp) return;

  const detailsView = document.getElementById('iot-details-view');
  if (!detailsView) return;

  if (exp.id === 1) {
    detailsView.innerHTML = `
      <!-- Top Navigation & Metadata Header -->
      <div class="iot-detail-header-bar">
        <button onclick="closeIoTDetails()" class="btn btn-outline-sm btn-back-iot">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <a href="iot-task-1.html" target="_blank" class="btn btn-outline-sm" title="Open Task 1 in separate HTML page">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open HTML File
          </a>
          <div class="iot-task-badge-nav">
            <span class="badge badge-primary"><i class="fa-solid fa-microchip"></i> ${exp.number}</span>
          </div>
        </div>
      </div>

      <!-- 1. HERO SECTION -->
      <div class="iot-detail-title-section">
        <div class="editorial-annotation"><span class="editorial-num">TASK 01</span> <span class="editorial-slash">/</span> ${exp.category}</div>
        <h2 class="iot-detail-main-title">${exp.title}</h2>
        <div class="iot-detail-subtitle">${exp.subtitle}</div>
        <p class="iot-detail-lead-desc">${exp.shortDesc}</p>
        
        <div class="iot-detail-tags">
          ${exp.technologies.map(t => `<span class="badge badge-outline"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('')}
        </div>
      </div>

      <!-- 16. PROJECT METADATA BANNER -->
      <div class="iot-meta-bar">
        <div class="iot-meta-item">
          <span class="iot-meta-label">Duration</span>
          <span class="iot-meta-value">${exp.duration}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Platform</span>
          <span class="iot-meta-value">${exp.platform}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Environment</span>
          <span class="iot-meta-value">${exp.environment}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Network</span>
          <span class="iot-meta-value">${exp.network}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Communication</span>
          <span class="iot-meta-value">${exp.communication}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Output</span>
          <span class="iot-meta-value">${exp.output}</span>
        </div>
      </div>

      <div class="iot-detail-grid">
        <!-- 2. PROJECT OVERVIEW -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-eye"></i> Project Overview</h3>
          <p class="iot-text-content">${exp.overview}</p>
        </div>

        <!-- 3. HOW IT WORKS (HORIZONTAL PROCESS DIAGRAM) -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-diagram-project"></i> How It Works</h3>
          <div class="iot-flow-diagram">
            ${exp.flowSteps.map((s, idx) => `
              <div class="iot-flow-node">
                <div class="flow-step-badge">STEP ${s.step}</div>
                <h4>${s.title}</h4>
                <p>${s.desc}</p>
              </div>
              ${idx < exp.flowSteps.length - 1 ? `<div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>` : ''}
            `).join('')}
          </div>
        </div>

        <!-- 4. SYSTEM ARCHITECTURE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-sitemap"></i> System Architecture</h3>
          <div class="iot-arch-grid">
            <div class="iot-arch-card">
              <div class="iot-arch-icon"><i class="fa-solid fa-laptop"></i></div>
              <div class="iot-arch-info">
                <h4>Client</h4>
                <p>${exp.architecture.client}</p>
              </div>
            </div>
            <div class="iot-arch-card">
              <div class="iot-arch-icon"><i class="fa-solid fa-wifi"></i></div>
              <div class="iot-arch-info">
                <h4>Network</h4>
                <p>${exp.architecture.network}</p>
              </div>
            </div>
            <div class="iot-arch-card">
              <div class="iot-arch-icon"><i class="fa-solid fa-server"></i></div>
              <div class="iot-arch-info">
                <h4>Server</h4>
                <p>${exp.architecture.server}</p>
              </div>
            </div>
            <div class="iot-arch-card">
              <div class="iot-arch-icon"><i class="fa-solid fa-network-wired"></i></div>
              <div class="iot-arch-info">
                <h4>Protocol</h4>
                <p>${exp.architecture.protocol}</p>
              </div>
            </div>
            <div class="iot-arch-card">
              <div class="iot-arch-icon"><i class="fa-brands fa-html5"></i></div>
              <div class="iot-arch-info">
                <h4>Interface</h4>
                <p>${exp.architecture.interface}</p>
              </div>
            </div>
            <div class="iot-arch-card">
              <div class="iot-arch-icon"><i class="fa-solid fa-lightbulb"></i></div>
              <div class="iot-arch-info">
                <h4>Output</h4>
                <p>${exp.architecture.output}</p>
              </div>
            </div>
          </div>
          <p class="iot-text-content" style="margin-top: 1rem;">${exp.architecture.explanation}</p>
        </div>

        <!-- 5. HARDWARE USED -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-microchip"></i> Hardware Used</h3>
          <div class="iot-components-grid">
            ${exp.hardware.map(c => `
              <div class="iot-component-card">
                <i class="${c.icon} comp-icon"></i>
                <h4>${c.name}</h4>
                <p>${c.spec}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 6. SOFTWARE & TECHNOLOGIES -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-laptop-code"></i> Software & Technologies</h3>
          <div class="iot-components-grid">
            ${exp.software.map(s => `
              <div class="iot-component-card">
                <i class="${s.icon} comp-icon"></i>
                <h4>${s.name}</h4>
                <p>${s.spec}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 7. IMPLEMENTATION & CODE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-list-check"></i> Program Implementation Flow</h3>
          <div class="iot-steps-list">
            ${exp.programFlow.map((stepText, idx) => `
              <div class="iot-step-item">
                <span class="iot-step-number">${String(idx + 1).padStart(2, '0')}</span>
                <span class="iot-step-text">${stepText}</span>
              </div>
            `).join('')}
          </div>

          <div class="iot-code-header" style="margin-top: 2rem;">
            <h3 class="iot-block-title"><i class="fa-solid fa-terminal"></i> Core C/C++ Firmware Code</h3>
            <button class="btn btn-outline-sm btn-copy-code" onclick="copyIoTCode(${exp.id})">
              <i class="fa-regular fa-copy"></i> Copy Code
            </button>
          </div>
          <div class="iot-code-viewer">
            <pre><code>${escapeHtml(exp.code)}</code></pre>
          </div>
        </div>

        <!-- 8. HTTP REQUEST FLOW PIPELINE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-arrows-split-up-and-left"></i> HTTP Request-Response Flow</h3>
          <div class="iot-pipeline-container">
            <div class="iot-pipeline-card">
              <div class="iot-pipeline-title"><i class="fa-solid fa-circle-play"></i> Step 1: Interface Request</div>
              <div class="iot-pipeline-steps">
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Browser Opens</div>
                  <div class="iot-pipe-step-val">http://ESP32-IP/</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">ESP32 Responds</div>
                  <div class="iot-pipe-step-val">HTML Web Server UI</div>
                </div>
              </div>
            </div>

            <div class="iot-pipeline-card">
              <div class="iot-pipeline-title"><i class="fa-solid fa-toggle-on"></i> Step 2: Turn ON Action</div>
              <div class="iot-pipeline-steps">
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">User Action</div>
                  <div class="iot-pipe-step-val">Click ON Button</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">HTTP Request</div>
                  <div class="iot-pipe-step-val">GET /led/on</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">ESP32 Execution</div>
                  <div class="iot-pipe-step-val">digitalWrite(ledPin, HIGH)</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Hardware Output</div>
                  <div class="iot-pipe-step-val">GPIO LED ON</div>
                </div>
              </div>
            </div>

            <div class="iot-pipeline-card">
              <div class="iot-pipeline-title"><i class="fa-solid fa-toggle-off"></i> Step 3: Turn OFF Action</div>
              <div class="iot-pipeline-steps">
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">User Action</div>
                  <div class="iot-pipe-step-val">Click OFF Button</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">HTTP Request</div>
                  <div class="iot-pipe-step-val">GET /led/off</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">ESP32 Execution</div>
                  <div class="iot-pipe-step-val">digitalWrite(ledPin, LOW)</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Hardware Output</div>
                  <div class="iot-pipe-step-val">GPIO LED OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 9. WORKING DEMONSTRATION & HARDWARE SETUP (PHOTOS) -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-camera"></i> Working Demonstration & Hardware Setup</h3>
          <div class="iot-evidence-gallery">
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">Photo 1: Working Demonstration</span>
                <img src="${exp.demoImage}" onerror="if(!this.dataset.retry){this.dataset.retry=1;this.src='${exp.demoFallback}';}else if(this.dataset.retry==='1'){this.dataset.retry=2;this.src='../../../../.gemini/antigravity-ide/brain/92f4f735-28b9-440a-ba9d-351d8c6037ac/.user_uploaded/media_1790524369288.png';}" alt="Working Demonstration" class="iot-evidence-img">
              </div>
              <div class="iot-evidence-caption">${exp.demoCaption}</div>
            </div>

            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">Photo 2: Hardware Setup</span>
                <img src="${exp.hardwareImage}" onerror="if(!this.dataset.retry){this.dataset.retry=1;this.src='${exp.hardwareFallback}';}else if(this.dataset.retry==='1'){this.dataset.retry=2;this.src='../../../../.gemini/antigravity-ide/brain/92f4f735-28b9-440a-ba9d-351d8c6037ac/.user_uploaded/media_1790524379831.png';}" alt="Hardware Setup" class="iot-evidence-img">
              </div>
              <div class="iot-evidence-caption">${exp.hardwareCaption}</div>
            </div>
          </div>
        </div>

        <!-- 10. KEY CONCEPTS LEARNED -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-graduation-cap"></i> Key Concepts Learned</h3>
          <div class="iot-concepts-grid">
            ${exp.keyConcepts.map(c => `
              <div class="iot-concept-card">
                <div class="iot-concept-header">
                  <div class="iot-concept-icon"><i class="${c.icon}"></i></div>
                  <h4 class="iot-concept-title">${c.title}</h4>
                </div>
                <p class="iot-concept-desc">${c.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 11. RESULTS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-circle-check"></i> Project Results & Verification</h3>
          <div class="iot-results-checklist">
            ${exp.results.map(r => `
              <div class="iot-result-item">
                <i class="fa-solid fa-circle-check iot-result-icon"></i>
                <span>${r}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 12. WHAT I LEARNED -->
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-lightbulb"></i> What I Learned</h3>
          <p class="iot-text-content">${exp.whatILearned}</p>
        </div>

        <!-- 13. REFLECTION -->
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-brain"></i> Engineering Reflection</h3>
          <p class="iot-text-content">${exp.reflection}</p>
        </div>
      </div>

      <!-- 16. PORTFOLIO TASK NAVIGATION & FOOTER -->
      <div class="iot-task-nav">
        <button class="btn btn-outline-sm" disabled style="opacity: 0.5;">
          <i class="fa-solid fa-arrow-left"></i> Previous Task
        </button>
        <span class="badge badge-primary">Task 01</span>
        <button class="btn btn-outline-sm" onclick="openIoTDetails(2)">
          Next Task <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="iot-detail-footer">
        <button onclick="closeIoTDetails()" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
      </div>
    `;
  } else if (exp.id === 2) {
    detailsView.innerHTML = `
      <!-- Top Navigation & Metadata Header -->
      <div class="iot-detail-header-bar">
        <button onclick="closeIoTDetails()" class="btn btn-outline-sm btn-back-iot">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
        <div class="iot-task-badge-nav">
          <span class="badge badge-primary"><i class="fa-solid fa-cloud"></i> ${exp.number}</span>
        </div>
      </div>

      <!-- HERO SECTION -->
      <div class="iot-detail-title-section">
        <div class="editorial-annotation"><span class="editorial-num">TASK 02</span> <span class="editorial-slash">/</span> ${exp.category}</div>
        <h2 class="iot-detail-main-title">${exp.title}</h2>
        <div class="iot-detail-subtitle">${exp.subtitle}</div>
        <p class="iot-detail-lead-desc">${exp.shortDesc}</p>
        
        <div class="iot-detail-tags">
          ${exp.technologies.map(t => `<span class="badge badge-outline"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('')}
        </div>
      </div>

      <!-- PROJECT METADATA BANNER -->
      <div class="iot-meta-bar">
        <div class="iot-meta-item">
          <span class="iot-meta-label">Task</span>
          <span class="iot-meta-value">${exp.duration}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Microcontroller</span>
          <span class="iot-meta-value">${exp.platform}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Protocol</span>
          <span class="iot-meta-value">${exp.communication}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Cloud Host</span>
          <span class="iot-meta-value">Adafruit IO</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Actuation Target</span>
          <span class="iot-meta-value">${exp.output}</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Architecture</span>
          <span class="iot-meta-value">Publish / Subscribe</span>
        </div>
      </div>

      <div class="iot-detail-grid">
        <!-- 1. OVERVIEW -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-eye"></i> 1. Overview</h3>
          <p class="iot-text-content">${exp.overview}</p>
        </div>

        <!-- 2. CONCEPTS & MQTT ARCHITECTURE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-diagram-project"></i> 2. Concepts & MQTT Architecture</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">${exp.mqttIntro}</p>
          <div class="iot-table-wrapper">
            <table class="iot-spec-table">
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Role in this Project</th>
                </tr>
              </thead>
              <tbody>
                ${exp.mqttConcepts.map(c => `
                  <tr>
                    <td><strong>${c.element}</strong></td>
                    <td>${c.role}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3. SYSTEM DESIGN -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-sitemap"></i> 3. System Design</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">End-to-end telemetry and command flow pipeline across cloud MQTT broker and ESP32 GPIO actuation:</p>
          <div class="iot-system-flow-wrapper">
            <div class="iot-flow-nodes-container">
              <div class="iot-sys-node">
                <div class="sys-node-icon"><i class="fa-solid fa-gauge-high"></i></div>
                <div>
                  <div class="sys-node-title">Adafruit IO Web Dashboard</div>
                  <div class="sys-node-desc">User Toggle Control Interface</div>
                </div>
              </div>

              <div class="iot-sys-arrow">
                <span class="arrow-text">Publish command (1 / 0)</span>
                <i class="fa-solid fa-arrow-down"></i>
              </div>

              <div class="iot-sys-node highlight-broker">
                <div class="sys-node-icon"><i class="fa-solid fa-cloud"></i></div>
                <div>
                  <div class="sys-node-title">Adafruit IO MQTT Broker</div>
                  <div class="sys-node-desc">io.adafruit.com:1883</div>
                </div>
              </div>

              <div class="iot-sys-arrow">
                <span class="arrow-text">Relay Feed Topic (user/feeds/relay)</span>
                <i class="fa-solid fa-arrow-down"></i>
              </div>

              <div class="iot-sys-node">
                <div class="sys-node-icon"><i class="fa-solid fa-microchip"></i></div>
                <div>
                  <div class="sys-node-title">ESP32 MQTT Subscriber</div>
                  <div class="sys-node-desc">Listens for incoming feed payload</div>
                </div>
              </div>

              <div class="iot-sys-arrow">
                <span class="arrow-text">GPIO 23 (HIGH / LOW)</span>
                <i class="fa-solid fa-arrow-down"></i>
              </div>

              <div class="iot-sys-node">
                <div class="sys-node-icon"><i class="fa-solid fa-toggle-on"></i></div>
                <div>
                  <div class="sys-node-title">5V Relay Module</div>
                  <div class="sys-node-desc">Optocoupler isolation switching interface</div>
                </div>
              </div>

              <div class="iot-sys-arrow">
                <span class="arrow-text">High Voltage AC Circuit</span>
                <i class="fa-solid fa-arrow-down"></i>
              </div>

              <div class="iot-sys-node highlight-output">
                <div class="sys-node-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <div>
                  <div class="sys-node-title">AC Load / Bulb</div>
                  <div class="sys-node-desc">Physical Light Switching</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. HARDWARE & SOFTWARE SPECIFICATIONS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-list-check"></i> 4. Hardware & Software Specifications</h3>
          <div class="iot-table-wrapper">
            <table class="iot-spec-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Role & Specification</th>
                </tr>
              </thead>
              <tbody>
                ${exp.specifications.map(s => `
                  <tr>
                    <td><strong>${s.item}</strong></td>
                    <td>${s.role}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 5. WIRING / SETUP -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-plug"></i> 5. Wiring / Setup</h3>
          
          <div class="iot-wiring-grid">
            ${exp.wiring.map(w => `
              <div class="iot-wiring-card ${w.type.includes('AC') ? 'ac-warning-card' : ''}">
                <div class="wiring-from">${w.pinFrom}</div>
                <div class="wiring-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="wiring-to">${w.pinTo}</div>
                <div class="wiring-badge">${w.type}</div>
              </div>
            `).join('')}
          </div>

          <div class="iot-safety-notice">
            <i class="fa-solid fa-triangle-exclamation safety-icon"></i>
            <div>
              <strong>AC HIGH VOLTAGE SAFETY NOTICE:</strong>
              <span>Relay COM and NO terminals switch AC mains power. High voltage live lines must be insulated with optocoupler isolation to ensure low-voltage ESP32 protection and safe operation.</span>
            </div>
          </div>
        </div>

        <!-- 6. IMPLEMENTATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-code"></i> 6. Implementation</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">${exp.implementationText}</p>
          
          <div class="iot-code-header">
            <h4 class="iot-block-title"><i class="fa-solid fa-terminal"></i> Source Code Viewer</h4>
            <button class="btn btn-outline-sm btn-copy-code" onclick="copyIoTCode(${exp.id})">
              <i class="fa-regular fa-copy"></i> Copy Code
            </button>
          </div>
          <div class="iot-code-viewer">
            <pre><code>${exp.code}</code></pre>
          </div>
        </div>

        <!-- 7. CONFIGURATION PROCEDURE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-sliders"></i> 7. Configuration Procedure</h3>
          <div class="iot-steps-timeline">
            ${exp.configurationProcedure.map(c => `
              <div class="iot-step-card">
                <div class="step-card-num">${c.step}</div>
                <div class="step-card-body">
                  <p>${c.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 8. EVIDENCE & VISUAL VERIFICATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-circle-play"></i> 8. Video Demonstration</h3>
          
          <div class="iot-video-featured-card" style="margin-bottom: 0;">
            <div class="iot-video-wrapper">
              <span class="iot-evidence-badge" style="top: 1rem; left: 1rem; right: auto;"><i class="fa-solid fa-video"></i> Video Demonstration</span>
              <video controls autoplay loop muted playsinline class="iot-evidence-video">
                <source src="images/iot/task-2/1.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="iot-evidence-caption" style="margin-top: 0.75rem;"><i class="fa-solid fa-play"></i> Demonstration Video: ESP32 Adafruit IO MQTT AC Relay Actuation in action.</div>
          </div>
        </div>

        <!-- 9. CHALLENGES & FIXES -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-wrench"></i> 9. Challenges & Fixes</h3>
          <div class="iot-challenge-container">
            ${exp.challenges.map(ch => `
              <div class="iot-challenge-card">
                <div class="challenge-side">
                  <div class="challenge-tag"><i class="fa-solid fa-circle-exclamation"></i> Challenge</div>
                  <p>${ch.challenge}</p>
                </div>
                <div class="solution-side">
                  <div class="solution-tag"><i class="fa-solid fa-circle-check"></i> Fix / Solution</div>
                  <p>${ch.fix}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 10. REFLECTION -->
        <div class="iot-detail-block full-width reflection-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-brain"></i> 10. Reflection</h3>
          <p class="iot-text-content reflection-text">${exp.reflection}</p>
        </div>
      </div>

      <!-- PORTFOLIO TASK NAVIGATION & FOOTER -->
      <div class="iot-task-nav">
        <button class="btn btn-outline-sm" onclick="openIoTDetails(1)">
          <i class="fa-solid fa-arrow-left"></i> Previous Task
        </button>
        <span class="badge badge-primary">Task 02</span>
        <button class="btn btn-outline-sm" onclick="openIoTDetails(3)">
          Next Task <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="iot-detail-footer">
        <button onclick="closeIoTDetails()" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
      </div>
    `;
  } else if (exp.id === 4) {
    detailsView.innerHTML = `
      <!-- Top Navigation & Metadata Header -->
      <div class="iot-detail-header-bar">
        <button onclick="closeIoTDetails()" class="btn btn-outline-sm btn-back-iot">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <a href="iot-task-4.html" target="_blank" class="btn btn-outline-sm" title="Open Task 4 in separate HTML page">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open HTML File
          </a>
          <div class="iot-task-badge-nav">
            <span class="badge badge-primary"><i class="fa-solid fa-fire"></i> ${exp.number}</span>
          </div>
        </div>
      </div>

      <!-- HERO SECTION -->
      <div class="iot-detail-title-section">
        <div class="editorial-annotation"><span class="editorial-num">TASK 04</span> <span class="editorial-slash">/</span> IoT / Cloud Integration / ESP32 / Firebase Monitoring</div>
        <h2 class="iot-detail-main-title">${exp.title}</h2>
        <div class="iot-detail-subtitle">Cloud-Connected Telemetry, User Authentication & Web Monitoring</div>
        <p class="iot-detail-lead-desc">${exp.shortDesc}</p>
        
        <div class="iot-detail-tags">
          ${exp.technologies.map(t => `<span class="badge badge-outline"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('')}
        </div>
      </div>

      <!-- METADATA BANNER -->
      <div class="iot-meta-bar">
        <div class="iot-meta-item">
          <span class="iot-meta-label">Task</span>
          <span class="iot-meta-value">IoT Works — Task 04</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Microcontroller</span>
          <span class="iot-meta-value">ESP32 Dev Module</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Cloud Platform</span>
          <span class="iot-meta-value">Google Firebase</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Security</span>
          <span class="iot-meta-value">Firebase Auth (Email/Pass)</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Database Path</span>
          <span class="iot-meta-value">sensorData/latest</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Dashboard App</span>
          <span class="iot-meta-value">Smart Environment Monitor</span>
        </div>
      </div>

      <!-- GRID SECTION CONTENT -->
      <div class="iot-detail-grid">
        
        <!-- 01 — OVERVIEW -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-eye"></i> Overview</h3>
          <p class="iot-text-content">The ESP32 collects sensor information and sends the readings to Firebase. A web dashboard protected by Firebase Authentication retrieves the stored data and presents it through a monitoring interface. The dashboard, named Smart Environment Monitor, includes monitoring cards for temperature, humidity, air quality, and smoke/gas, along with a live trend chart and an ESP32 node status section.</p>
          <p class="iot-text-content" style="margin-top: 1rem;">The dashboard also includes a testing console that can send sample readings to Firestore. This makes it possible to test and verify the dashboard interface before connecting the physical ESP32 hardware.</p>
          <div class="iot-safety-notice" style="margin-top: 1rem; border-color: rgba(6, 182, 212, 0.4);">
            <i class="fa-solid fa-circle-info safety-icon" style="color: var(--accent-cyan);"></i>
            <div>
              <strong>Initial State Note:</strong>
              <span>During the initial screenshot capture, the monitoring cards displayed '--' because no sensor reading had been received yet.</span>
            </div>
          </div>
        </div>

        <!-- 02 — KEY CONCEPTS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-brain"></i> Key Concepts</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card">
              <i class="fa-solid fa-cloud comp-icon"></i>
              <h4>Cloud Service Models</h4>
              <p>IaaS provides infrastructure such as virtual machines, PaaS provides a platform for running applications, and SaaS provides complete software applications. Firebase can be understood as a Backend-as-a-Service (BaaS) platform, providing ready-to-use services such as databases, authentication, and hosting.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-database comp-icon"></i>
              <h4>Firebase Database</h4>
              <p>Firebase stores sensor information in the cloud and allows connected applications to receive updated data.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-user-lock comp-icon"></i>
              <h4>Authentication</h4>
              <p>Firebase Authentication verifies the identity of users signing into the application. This project uses email and password authentication.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-shield-halved comp-icon"></i>
              <h4>Authorization</h4>
              <p>Authorization determines what an authenticated user is allowed to access or modify. These permissions are controlled through Firebase rules.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-microchip comp-icon"></i>
              <h4>Sensors</h4>
              <p>The ESP32 receives environmental information from a temperature/humidity sensor and an LDR light sensor.</p>
            </div>
          </div>
        </div>

        <!-- 03 — SYSTEM DESIGN -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-sitemap"></i> System Design</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">Visual System Architecture Flow:</p>
          <div class="iot-flow-diagram">
            <div class="iot-flow-node">
              <div class="flow-step-badge">INPUT SENSORS</div>
              <h4>Sensors</h4>
              <p>Temperature &bull; Humidity &bull; Light</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node">
              <div class="flow-step-badge">MCU NODE</div>
              <h4>ESP32</h4>
              <p>Reads sensor values and uploads data</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-broker">
              <div class="flow-step-badge">CLOUD BAAS</div>
              <h4>Firebase</h4>
              <p>Cloud Database</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-output">
              <div class="flow-step-badge">WEB INTERFACE</div>
              <h4>Web Dashboard</h4>
              <p>User authentication + Live monitoring</p>
            </div>
          </div>
        </div>

        <!-- 04 — DATA FLOW -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-arrows-split-up-and-left"></i> Data Flow</h3>
          <div class="iot-pipeline-container">
            <div class="iot-pipeline-card">
              <div class="iot-pipeline-title"><i class="fa-solid fa-network-wired"></i> End-to-End Data Pipeline</div>
              <div class="iot-pipeline-steps">
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Step 1</div>
                  <div class="iot-pipe-step-val">Sensors</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Step 2</div>
                  <div class="iot-pipe-step-val">ESP32</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Step 3</div>
                  <div class="iot-pipe-step-val">Firebase</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Step 4</div>
                  <div class="iot-pipe-step-val">Authenticated Web Dashboard</div>
                </div>
                <div class="iot-pipe-step">
                  <div class="iot-pipe-step-num">Step 5</div>
                  <div class="iot-pipe-step-val">User</div>
                </div>
              </div>
            </div>
          </div>
          <p class="iot-text-content" style="margin-top: 1rem;">The ESP32 acts as the data collection node. Sensor readings are uploaded to the Firebase cloud service, while the authenticated web dashboard retrieves the information for visualization.</p>
        </div>

        <!-- 05 — HARDWARE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-microchip"></i> Hardware Used</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card">
              <i class="fa-solid fa-microchip comp-icon"></i>
              <h4>ESP32 Development Board</h4>
              <p>Main controller responsible for collecting sensor readings and communicating with Firebase.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-temperature-high comp-icon"></i>
              <h4>DHT11</h4>
              <p>Temperature and humidity sensing.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-sun comp-icon"></i>
              <h4>LDR</h4>
              <p>Light-level sensing.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-toggle-on comp-icon"></i>
              <h4>Relay Module + Bulb</h4>
              <p>Used as the physical output/control hardware.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-plug comp-icon"></i>
              <h4>Breadboard + Jumper Wires</h4>
              <p>Used for prototyping and making the hardware connections.</p>
            </div>
          </div>
        </div>

        <!-- 06 — SOFTWARE & SERVICES -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-laptop-code"></i> Software & Services</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card">
              <i class="fa-solid fa-fire comp-icon"></i>
              <h4>Firebase Project</h4>
              <p>Used for Authentication and cloud database functionality.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-user-check comp-icon"></i>
              <h4>Firebase Authentication</h4>
              <p>Provides the email/password login system.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-database comp-icon"></i>
              <h4>Firebase Database</h4>
              <p>Stores the IoT data in the cloud.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-server comp-icon"></i>
              <h4>Firebase Hosting</h4>
              <p>Used to host the web dashboard.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-code comp-icon"></i>
              <h4>Arduino IDE</h4>
              <p>Used for ESP32 programming.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-book-bookmark comp-icon"></i>
              <h4>Firebase Library</h4>
              <p>Used by the ESP32 for Firebase communication.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-gauge-high comp-icon"></i>
              <h4>Web Dashboard</h4>
              <p>Smart Environment Monitor interface for viewing the sensor information.</p>
            </div>
          </div>
        </div>

        <!-- 07 — FIREBASE CONFIGURATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-sliders"></i> Setup & Configuration</h3>
          <p class="iot-text-content">The dashboard reads sensor information from the Firebase path: <code>sensorData/latest</code>. This location is represented in the ESP32 status section of the dashboard.</p>
          <p class="iot-text-content" style="margin-top: 0.75rem;">Access to the dashboard requires authentication. The application provides a Sign In page and a Create Account option through Firebase Authentication.</p>
          
          <div class="iot-safety-notice" style="margin-top: 1rem;">
            <i class="fa-solid fa-lock safety-icon"></i>
            <div>
              <strong>Security Notice:</strong>
              <span>Firebase keys and configuration credentials are intentionally not displayed in the portfolio.</span>
            </div>
          </div>

          <h4 style="margin-top: 1.5rem; font-size: 1rem; color: var(--accent-cyan);"><i class="fa-solid fa-folder-tree"></i> Database Structure Visual</h4>
          <div class="db-tree-container" style="margin-top: 0.75rem;">
            <div class="db-tree-node"><span class="db-tree-folder"><i class="fa-solid fa-fire"></i> Firebase</span></div>
            <div class="db-tree-node db-tree-indent-1"><span>│</span></div>
            <div class="db-tree-node db-tree-indent-1"><span>└── </span><span class="db-tree-folder"><i class="fa-solid fa-folder-open"></i> sensorData</span></div>
            <div class="db-tree-node db-tree-indent-2"><span>│</span></div>
            <div class="db-tree-node db-tree-indent-2"><span>└── </span><span class="db-tree-folder"><i class="fa-solid fa-file-code"></i> latest</span></div>
            <div class="db-tree-node db-tree-indent-3"><span>├── </span><span class="db-tree-field"><i class="fa-solid fa-temperature-half"></i> Temperature</span></div>
            <div class="db-tree-node db-tree-indent-3"><span>├── </span><span class="db-tree-field"><i class="fa-solid fa-droplet"></i> Humidity</span></div>
            <div class="db-tree-node db-tree-indent-3"><span>└── </span><span class="db-tree-field"><i class="fa-solid fa-sun"></i> Light</span></div>
          </div>
        </div>

        <!-- 08 — IMPLEMENTATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-terminal"></i> ESP32 Implementation</h3>
          <p class="iot-text-content">The ESP32 firmware is responsible for reading the connected sensors and communicating the collected information to Firebase.</p>
          
          <div class="iot-safety-notice" style="margin-top: 1rem;">
            <i class="fa-solid fa-shield-halved safety-icon"></i>
            <div>
              <strong>Security Protocol Notice:</strong>
              <span>Before publishing the code, replace Wi-Fi and Firebase credentials with safe placeholders.</span>
            </div>
          </div>

          <div class="iot-code-header" style="margin-top: 1.5rem;">
            <h4 class="iot-block-title"><i class="fa-regular fa-file-code"></i> esp32_firebase_telemetry.ino</h4>
            <button class="btn btn-outline-sm btn-copy-code" onclick="copyIoTCode(4)">
              <i class="fa-regular fa-copy"></i> Copy Code
            </button>
          </div>
          <div class="iot-code-viewer">
            <pre><code>[ ESP32 CODE WILL BE ADDED LATER ]</code></pre>
          </div>
        </div>

        <!-- 09 — SMART ENVIRONMENT MONITOR -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-gauge-high"></i> Smart Environment Monitor</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">The web application provides a single interface for viewing the IoT system status and sensor information after authentication.</p>
          <div class="iot-components-grid">
            <div class="iot-component-card">
              <i class="fa-solid fa-temperature-high comp-icon"></i>
              <h4>Temperature Monitoring</h4>
              <p>Real-time ambient temperature metric tracking card.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-droplet comp-icon"></i>
              <h4>Humidity Monitoring</h4>
              <p>Relative air humidity percentage status card.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-wind comp-icon"></i>
              <h4>Air Quality</h4>
              <p>Environmental air quality interface monitoring card.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-smog comp-icon"></i>
              <h4>Smoke / Gas</h4>
              <p>Smoke and gas detection status indicator card.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-chart-line comp-icon"></i>
              <h4>Live Trend Chart</h4>
              <p>Dynamic graphical visualization of sensor telemetry over time.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-circle-nodes comp-icon"></i>
              <h4>ESP32 Node Status</h4>
              <p>Hardware node connection, path representation, and health state.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-sliders comp-icon"></i>
              <h4>Testing Console</h4>
              <p>Integrated simulation console for sending sample data to Firestore.</p>
            </div>
          </div>
        </div>

        <!-- 10 — TESTING CONSOLE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-flask"></i> Testing Console</h3>
          <p class="iot-text-content">The dashboard includes a testing console that can push sample readings to Firestore. This allows the web interface to be tested before the physical ESP32 is connected.</p>
          
          <h4 style="margin-top: 1.25rem; font-size: 0.95rem; color: var(--accent-cyan);"><i class="fa-solid fa-vial"></i> Technical Testing Workflow</h4>
          <div class="iot-flow-diagram" style="margin-top: 0.75rem;">
            <div class="iot-flow-node">
              <div class="flow-step-badge">STEP 1</div>
              <h4>Sample Data</h4>
              <p>Generated test values</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node">
              <div class="flow-step-badge">STEP 2</div>
              <h4>Testing Console</h4>
              <p>Dashboard input trigger</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-broker">
              <div class="flow-step-badge">STEP 3</div>
              <h4>Firestore</h4>
              <p>Cloud database store</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-output">
              <div class="flow-step-badge">STEP 4</div>
              <h4>Dashboard Verification</h4>
              <p>UI state validation</p>
            </div>
          </div>
          <p class="iot-text-content" style="margin-top: 1rem; font-size: 0.88rem; color: var(--text-muted);"><i class="fa-solid fa-lightbulb"></i> Note: This testing console provides a simulation capability to verify dashboard rendering and state changes prior to live hardware node connection.</p>
        </div>

        <!-- 11 — EVIDENCE & VISUAL VERIFICATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-camera"></i> Evidence & Visual Verification</h3>
          <div class="iot-evidence-gallery">
            
            <!-- IMAGE 01 -->
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 01: Firebase Authentication Interface</span>
                <img src="images/iot/task-4/Screenshot 2026-09-28 142546.png" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                     alt="Firebase Authentication Interface" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;">
                  <i class="fa-solid fa-image placeholder-big-icon"></i>
                  <p>[ IMAGE WILL BE UPLOADED LATER ]</p>
                </div>
              </div>
              <div class="iot-evidence-caption">Login page of Smart Environment Monitor.</div>
            </div>

            <!-- IMAGE 02 -->
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 02: Dashboard Interface</span>
                <img src="images/iot/task-4/Screenshot 2026-09-28 143624.png" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                     alt="Dashboard Interface" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;">
                  <i class="fa-solid fa-image placeholder-big-icon"></i>
                  <p>[ IMAGE WILL BE UPLOADED LATER ]</p>
                </div>
              </div>
              <div class="iot-evidence-caption">Dashboard showing sensor cards, trend chart, and ESP32 node status.</div>
            </div>

            <!-- IMAGE 03 -->
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 03: Dashboard Testing Console</span>
                <img src="images/iot/task-4/Screenshot 2026-09-28 144856.png" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                     alt="Dashboard Testing Console" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;">
                  <i class="fa-solid fa-image placeholder-big-icon"></i>
                  <p>[ IMAGE WILL BE UPLOADED LATER ]</p>
                </div>
              </div>
              <div class="iot-evidence-caption">Lower section of the dashboard containing the ESP32 testing console.</div>
            </div>

            <!-- IMAGE 04 -->
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 04: Firebase Database Console</span>
                <img src="images/iot/task-4/Screenshot 2026-09-28 144949.png" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                     alt="Firebase Database Console" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;">
                  <i class="fa-solid fa-image placeholder-big-icon"></i>
                  <p>[ IMAGE WILL BE UPLOADED LATER ]</p>
                </div>
              </div>
              <div class="iot-evidence-caption">Firebase database console used to inspect the stored IoT data.</div>
            </div>

            <!-- IMAGE 05 -->
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 05: Physical Prototype</span>
                <img src="images/iot/task-4/Screenshot 2026-09-28 145007.png" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                     alt="Physical Prototype" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;">
                  <i class="fa-solid fa-image placeholder-big-icon"></i>
                  <p>[ IMAGE WILL BE UPLOADED LATER ]</p>
                </div>
              </div>
              <div class="iot-evidence-caption">Physical ESP32 sensor and relay prototype.</div>
            </div>

          </div>
        </div>

        <!-- 12 — RESPONSIVE DASHBOARD -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-mobile-screen-button"></i> Responsive Interface</h3>
          <div class="iot-evidence-card" style="max-width: 600px; margin: 0 auto;">
            <div class="iot-evidence-img-wrapper">
              <span class="iot-evidence-badge">Mobile Layout Screenshot</span>
              <img src="images/iot/task-4/Screenshot 2026-09-28 145112.png" 
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                   alt="Responsive Dashboard" class="iot-evidence-img">
              <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 260px;">
                <i class="fa-solid fa-mobile-screen placeholder-big-icon"></i>
                <p>[ MOBILE SCREENSHOT WILL BE UPLOADED LATER ]</p>
              </div>
            </div>
            <div class="iot-evidence-caption" style="text-align: center;">Smart Environment Monitor displayed in a responsive mobile layout.</div>
          </div>
        </div>

        <!-- 13 — PROJECT DEMONSTRATION VIDEO -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-video"></i> Project Demonstration</h3>
          <div class="iot-video-featured-card" style="margin-bottom: 0;">
            <div class="iot-video-wrapper">
              <span class="iot-evidence-badge" style="top: 1rem; left: 1rem; right: auto;"><i class="fa-solid fa-film"></i> Video Demonstration</span>
              <video controls class="iot-evidence-video" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <source src="images/iot/task-4/demo.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="iot-placeholder-area" style="display: flex; min-height: 280px; width: 100%;">
                <i class="fa-solid fa-circle-play placeholder-big-icon" style="font-size: 3.5rem;"></i>
                <p style="font-size: 1.1rem; margin-top: 0.5rem;">[ DEMONSTRATION VIDEO WILL BE UPLOADED LATER ]</p>
              </div>
            </div>
            <div class="iot-evidence-caption" style="margin-top: 0.75rem;"><i class="fa-solid fa-play"></i> Demonstration of the Firebase IoT monitoring dashboard and its interaction with the ESP32 system.</div>
          </div>
        </div>

        <!-- 14 — WORKING PRINCIPLE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-list-ol"></i> How the System Works</h3>
          <div class="iot-steps-timeline">
            <div class="iot-step-card">
              <div class="step-card-num">STEP 01</div>
              <div class="step-card-body">
                <p>The ESP32 reads the connected sensors.</p>
              </div>
            </div>
            <div class="iot-step-card">
              <div class="step-card-num">STEP 02</div>
              <div class="step-card-body">
                <p>The collected readings are sent to Firebase.</p>
              </div>
            </div>
            <div class="iot-step-card">
              <div class="step-card-num">STEP 03</div>
              <div class="step-card-body">
                <p>Firebase stores the cloud data.</p>
              </div>
            </div>
            <div class="iot-step-card">
              <div class="step-card-num">STEP 04</div>
              <div class="step-card-body">
                <p>The user signs into Smart Environment Monitor.</p>
              </div>
            </div>
            <div class="iot-step-card">
              <div class="step-card-num">STEP 05</div>
              <div class="step-card-body">
                <p>The dashboard retrieves the available data and displays it.</p>
              </div>
            </div>
            <div class="iot-step-card">
              <div class="step-card-num">STEP 06</div>
              <div class="step-card-body">
                <p>The testing console can be used to send sample readings for dashboard verification.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 15 — WHAT I LEARNED -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-graduation-cap"></i> What I Learned</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">This project introduced me to using a cloud platform as the communication layer between embedded hardware and a web interface. I learned how sensor information can be uploaded from an ESP32, stored in Firebase, and accessed by an authenticated dashboard. I also gained experience with authentication, database synchronization, and testing a dashboard using simulated data.</p>
          <div class="iot-concepts-grid">
            <div class="iot-component-card">
              <i class="fa-solid fa-cloud-arrow-up comp-icon"></i>
              <h4>Cloud Communication</h4>
              <p>Using Firebase as the connection between hardware and web application.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-bolt comp-icon"></i>
              <h4>Realtime Data</h4>
              <p>Working with sensor information stored in the cloud.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-user-lock comp-icon"></i>
              <h4>Authentication</h4>
              <p>Understanding user login with Firebase Authentication.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-shield-halved comp-icon"></i>
              <h4>Authorization</h4>
              <p>Understanding access control through Firebase rules.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-network-wired comp-icon"></i>
              <h4>Web + Hardware Integration</h4>
              <p>Connecting an ESP32 system with a web-based interface.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-vial comp-icon"></i>
              <h4>Dashboard Testing</h4>
              <p>Using sample data to verify the dashboard before hardware integration.</p>
            </div>
          </div>
        </div>

        <!-- 16 — REFLECTION -->
        <div class="iot-detail-block full-width reflection-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-quote-left"></i> Reflection</h3>
          <p class="iot-text-content reflection-text">"This was my first experience with an IoT system where the sensor data became accessible through a cloud service. The ESP32 sends information to Firebase while the dashboard retrieves it through the same cloud layer, so the hardware and web interface do not need to communicate directly. The authentication system also showed me the importance of controlling who can access an IoT application."</p>
        </div>

      </div>

      <!-- PORTFOLIO TASK NAVIGATION & FOOTER -->
      <div class="iot-task-nav">
        <button class="btn btn-outline-sm" onclick="openIoTDetails(3)">
          <i class="fa-solid fa-arrow-left"></i> Previous Task
        </button>
        <span class="badge badge-primary">Task 04</span>
        <button class="btn btn-outline-sm" onclick="openIoTDetails(5)">
          Next Task <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="iot-detail-footer">
        <button onclick="closeIoTDetails()" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
      </div>
    `;
  } else if (exp.id === 5) {
    detailsView.innerHTML = `
      <!-- Top Navigation & Metadata Header -->
      <div class="iot-detail-header-bar">
        <button onclick="closeIoTDetails()" class="btn btn-outline-sm btn-back-iot">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <a href="iot-task-5.html" target="_blank" class="btn btn-outline-sm" title="Open Task 5 in separate HTML page">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open HTML File
          </a>
          <div class="iot-task-badge-nav">
            <span class="badge badge-primary"><i class="fa-solid fa-bolt"></i> ${exp.number}</span>
          </div>
        </div>
      </div>

      <!-- HERO SECTION -->
      <div class="iot-detail-title-section">
        <div class="editorial-annotation"><span class="editorial-num">TASK 05</span> <span class="editorial-slash">/</span> IoT / End-to-End System / Firebase Logging & Automation</div>
        <h2 class="iot-detail-main-title">${exp.title}</h2>
        <div class="iot-detail-subtitle">Historical Data Logging, Dual Control Modes & CSV Export</div>
        <p class="iot-detail-lead-desc">${exp.shortDesc}</p>
        
        <div class="iot-detail-tags">
          ${exp.technologies.map(t => `<span class="badge badge-outline"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('')}
        </div>
      </div>

      <!-- METADATA BANNER -->
      <div class="iot-meta-bar">
        <div class="iot-meta-item">
          <span class="iot-meta-label">Task</span>
          <span class="iot-meta-value">IoT Works — Task 05</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Microcontroller</span>
          <span class="iot-meta-value">ESP32 Dev Module</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Cloud Storage</span>
          <span class="iot-meta-value">Firebase History Log</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Control Modes</span>
          <span class="iot-meta-value">Manual &bull; Automatic</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Sensor Automation</span>
          <span class="iot-meta-value">LDR Light Threshold</span>
        </div>
        <div class="iot-meta-item">
          <span class="iot-meta-label">Data Output</span>
          <span class="iot-meta-value">CSV Spreadsheet Export</span>
        </div>
      </div>

      <!-- GRID SECTION CONTENT -->
      <div class="iot-detail-grid">
        
        <!-- 01 — OVERVIEW -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-eye"></i> Overview</h3>
          <p class="iot-text-content">This stage focused on making the IoT system useful beyond real-time monitoring. Sensor readings are recorded as historical data, displayed through a data-log interface, and made available for CSV export. The system also supports two operating modes for the bulb: manual control from the dashboard and automatic control based on the light level detected by the LDR.</p>
          <p class="iot-text-content" style="margin-top: 1rem;">The recorded historical data log contains:</p>
          <div class="iot-components-grid" style="margin-top: 0.75rem;">
            <div class="iot-component-card">
              <i class="fa-regular fa-clock comp-icon"></i>
              <h4>Timestamp</h4>
              <p>Date and time stamp for recorded measurement</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-temperature-half comp-icon"></i>
              <h4>Temperature</h4>
              <p>Ambient temperature value</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-droplet comp-icon"></i>
              <h4>Humidity</h4>
              <p>Relative humidity value</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-sun comp-icon"></i>
              <h4>Light Condition</h4>
              <p>Environmental light level measurement</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-lightbulb comp-icon"></i>
              <h4>Bulb State</h4>
              <p>Actuator relay state (ON/OFF)</p>
            </div>
          </div>
          <p class="iot-text-content" style="margin-top: 1rem; font-size: 0.88rem; color: var(--text-muted);"><i class="fa-solid fa-circle-info"></i> The data-log interface supports multiple pages using Previous and Next pagination buttons.</p>
        </div>

        <!-- 02 — KEY CONCEPTS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-brain"></i> Key Concepts</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card">
              <i class="fa-solid fa-database comp-icon"></i>
              <h4>Data Logging</h4>
              <p>Instead of keeping only the latest sensor reading, the system stores timestamped measurements so previous conditions can be reviewed later.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-sliders comp-icon"></i>
              <h4>Light Threshold</h4>
              <p>The measured light value is compared with a predefined threshold to determine whether the environment is considered dark or bright.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-hand comp-icon"></i>
              <h4>Manual Mode</h4>
              <p>In manual operation, the user directly controls the bulb from the dashboard.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-robot comp-icon"></i>
              <h4>Automatic Mode</h4>
              <p>In automatic operation, the bulb state is determined using the light reading and the configured threshold.</p>
            </div>
            <div class="iot-component-card">
              <i class="fa-solid fa-file-csv comp-icon"></i>
              <h4>CSV Export</h4>
              <p>The recorded data can be converted into a CSV file, allowing the information to be opened and analyzed using spreadsheet software.</p>
            </div>
          </div>
        </div>

        <!-- 03 — SYSTEM ARCHITECTURE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-sitemap"></i> System Architecture</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">End-to-End System Architecture & Dual Control Flow:</p>
          
          <h4 style="margin-top: 1rem; font-size: 0.95rem; color: var(--accent-cyan);"><i class="fa-solid fa-database"></i> 1. Telemetry Data Pipeline & Export Path</h4>
          <div class="iot-flow-diagram" style="margin-top: 0.75rem;">
            <div class="iot-flow-node">
              <div class="flow-step-badge">SENSORS</div>
              <h4>DHT11 + LDR</h4>
              <p>Environmental sensing</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node">
              <div class="flow-step-badge">MCU</div>
              <h4>ESP32</h4>
              <p>Read sensor values</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-broker">
              <div class="flow-step-badge">CLOUD</div>
              <h4>Firebase</h4>
              <p>Live Data + History</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node">
              <div class="flow-step-badge">WEB UI</div>
              <h4>Dashboard</h4>
              <p>Monitoring interface</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node">
              <div class="flow-step-badge">LOG</div>
              <h4>Data Log</h4>
              <p>Historical table</p>
            </div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-output">
              <div class="flow-step-badge">FILE</div>
              <h4>CSV Export</h4>
              <p>Spreadsheet file</p>
            </div>
          </div>

          <h4 style="margin-top: 1.75rem; font-size: 0.95rem; color: var(--accent-cyan);"><i class="fa-solid fa-route"></i> 2. Dual Control Paths (Manual vs Automatic)</h4>
          <div class="dual-mode-grid" style="margin-top: 0.75rem;">
            <div class="mode-card manual-card">
              <span class="mode-badge-tag"><i class="fa-solid fa-user"></i> MANUAL CONTROL PATH</span>
              <p class="iot-text-content" style="font-size: 0.88rem; margin-bottom: 1rem;">User &rarr; Dashboard &rarr; Command &rarr; ESP32 &rarr; Relay &rarr; Bulb</p>
              <div class="iot-flow-diagram" style="padding: 0.5rem 0;">
                <div class="iot-flow-node"><p>User</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>Dashboard</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>Relay</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>Bulb</p></div>
              </div>
            </div>

            <div class="mode-card auto-card">
              <span class="mode-badge-tag"><i class="fa-solid fa-robot"></i> AUTOMATIC CONTROL PATH</span>
              <p class="iot-text-content" style="font-size: 0.88rem; margin-bottom: 1rem;">LDR &rarr; Threshold &rarr; ESP32 &rarr; Relay &rarr; Bulb</p>
              <div class="iot-flow-diagram" style="padding: 0.5rem 0;">
                <div class="iot-flow-node"><p>LDR</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>Threshold</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>ESP32</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>Relay</p></div>
                <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                <div class="iot-flow-node"><p>Bulb</p></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 04 — DATA LOGGING -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-clock-rotate-left"></i> Historical Data Logging</h3>
          <p class="iot-text-content">Each reading is stored together with its timestamp, allowing the system to maintain a history instead of displaying only the current values.</p>
          
          <h4 style="margin-top: 1.25rem; font-size: 0.95rem; color: var(--accent-cyan);"><i class="fa-solid fa-table"></i> Logged Data Structure</h4>
          <div class="iot-table-wrapper" style="margin-top: 0.75rem;">
            <table class="iot-spec-table">
              <thead>
                <tr>
                  <th>TIMESTAMP</th>
                  <th>TEMPERATURE</th>
                  <th>HUMIDITY</th>
                  <th>LIGHT</th>
                  <th>BULB STATE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2026-09-28 14:15:02</td>
                  <td>26.4 &deg;C</td>
                  <td>58%</td>
                  <td>412 Lux</td>
                  <td><span class="badge badge-outline" style="color:#ef4444; border-color:rgba(239,68,68,0.4);">OFF</span></td>
                </tr>
                <tr>
                  <td>2026-09-28 14:20:18</td>
                  <td>26.8 &deg;C</td>
                  <td>57%</td>
                  <td>185 Lux</td>
                  <td><span class="badge badge-outline" style="color:#22c55e; border-color:rgba(34,197,94,0.4);">ON</span></td>
                </tr>
                <tr>
                  <td>2026-09-28 14:25:44</td>
                  <td>27.2 &deg;C</td>
                  <td>56%</td>
                  <td>140 Lux</td>
                  <td><span class="badge badge-outline" style="color:#22c55e; border-color:rgba(34,197,94,0.4);">ON</span></td>
                </tr>
                <tr>
                  <td>2026-09-28 14:31:10</td>
                  <td>26.9 &deg;C</td>
                  <td>58%</td>
                  <td>520 Lux</td>
                  <td><span class="badge badge-outline" style="color:#ef4444; border-color:rgba(239,68,68,0.4);">OFF</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pagination-bar">
            <button class="btn btn-outline-sm"><i class="fa-solid fa-chevron-left"></i> Previous</button>
            <span class="badge badge-outline" style="padding: 0.4rem 0.8rem;">Page 1</span>
            <button class="btn btn-outline-sm">Next <i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>

        <!-- 05 — MANUAL & AUTOMATIC CONTROL -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-toggle-on"></i> Dual Control Modes</h3>
          <div class="dual-mode-grid">
            <div class="mode-card manual-card">
              <span class="mode-badge-tag"><i class="fa-solid fa-hand"></i> MANUAL MODE</span>
              <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Manual Operation</h4>
              <p class="iot-text-content" style="font-size: 0.9rem;">Manual mode gives the user direct control over the bulb through the dashboard. The bulb remains under user control rather than being automatically determined by the light sensor.</p>
            </div>
            <div class="mode-card auto-card">
              <span class="mode-badge-tag"><i class="fa-solid fa-robot"></i> AUTOMATIC MODE</span>
              <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Automatic Automation</h4>
              <p class="iot-text-content" style="font-size: 0.9rem;">Automatic mode uses the LDR reading to determine the lighting condition. The measured value is compared with the configured threshold, and the ESP32 uses the result to determine the required bulb state.</p>
            </div>
          </div>
        </div>

        <!-- 06 — AUTOMATION LOGIC -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-bolt"></i> Light-Based Automation</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">The automatic mode allows the lighting response to be determined from the ambient light level rather than requiring continuous manual input.</p>
          <div class="iot-flow-diagram">
            <div class="iot-flow-node"><div class="flow-step-badge">INPUT</div><h4>LDR Reading</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">COMPARE</div><h4>Threshold Logic</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-broker"><div class="flow-step-badge">STATE</div><h4>Determine Dark / Bright</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">DECISION</div><h4>Automatic Bulb Decision</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-output"><div class="flow-step-badge">ACTUATION</div><h4>Relay Output</h4></div>
          </div>
        </div>

        <!-- 07 — DATA EXPORT -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-file-export"></i> CSV Data Export</h3>
          <p class="iot-text-content">The historical readings collected by the system can be exported as a CSV file. This makes the logged information accessible outside the dashboard and allows it to be opened using spreadsheet software.</p>
          <div class="iot-flow-diagram" style="margin-top: 0.75rem;">
            <div class="iot-flow-node"><div class="flow-step-badge">SOURCE</div><h4>Firebase History</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">VIEW</div><h4>Dashboard Data Log</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-broker"><div class="flow-step-badge">ACTION</div><h4>Export</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">FILE</div><h4>CSV File</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-output"><div class="flow-step-badge">ANALYSIS</div><h4>Spreadsheet</h4></div>
          </div>
          <div class="iot-placeholder-area" style="margin-top: 1.5rem; min-height: 140px;">
            <i class="fa-solid fa-file-csv placeholder-big-icon"></i>
            <p>[ CSV EXPORT DEMONSTRATION — OPTIONAL MEDIA ]</p>
          </div>
        </div>

        <!-- 08 — HARDWARE & SOFTWARE -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-microchip"></i> Hardware & Software</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card"><i class="fa-solid fa-microchip comp-icon"></i><h4>ESP32 Development Board</h4><p>Main controller responsible for sensor reading, decision-making, Firebase communication, and relay control.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-temperature-high comp-icon"></i><h4>Temperature / Humidity Sensor</h4><p>Used to obtain environmental temperature and humidity readings.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-sun comp-icon"></i><h4>LDR</h4><p>Used to detect the ambient light level.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-toggle-on comp-icon"></i><h4>Relay Module + Bulb</h4><p>Used as the physical lighting output.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-fire comp-icon"></i><h4>Firebase</h4><p>Used for cloud data storage and communication with the dashboard.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-gauge-high comp-icon"></i><h4>IoT Dashboard</h4><p>Provides the monitoring interface, data log, control modes, and export functionality.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-table comp-icon"></i><h4>Spreadsheet Software</h4><p>Used to open the exported CSV data.</p></div>
          </div>
        </div>

        <!-- 09 — DASHBOARD DATA LOG SCREENSHOT -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-table-list"></i> Data Log Interface</h3>
          <p class="iot-text-content" style="margin-bottom: 1rem;">The dashboard provides a dedicated data-log view where previously recorded measurements can be reviewed. The table contains timestamp information together with the environmental readings and bulb state.</p>
          <div class="iot-evidence-card" style="max-width: 800px; margin: 0 auto;">
            <div class="iot-evidence-img-wrapper">
              <span class="iot-evidence-badge">Data Log Screenshot</span>
              <img src="images/iot/task-5/Screenshot 2026-09-28 143624.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" alt="Data Log Interface" class="iot-evidence-img">
              <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 240px;">
                <i class="fa-solid fa-image placeholder-big-icon"></i>
                <p>[ DATA LOG SCREENSHOT — UPLOAD LATER ]</p>
              </div>
            </div>
            <div class="iot-evidence-caption" style="text-align: center;">Data log interface showing recorded IoT measurements with pagination.</div>
          </div>
        </div>

        <!-- 10 — EVIDENCE & VISUAL VERIFICATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-camera"></i> Evidence & Visual Verification</h3>
          <div class="iot-evidence-gallery">
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 01: Data Log Interface</span>
                <img src="images/iot/task-5/Screenshot 2026-09-28 143624.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" alt="Data Log Interface" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;"><i class="fa-solid fa-image placeholder-big-icon"></i><p>[ IMAGE WILL BE UPLOADED LATER ]</p></div>
              </div>
              <div class="iot-evidence-caption">Historical IoT readings displayed through the dashboard data-log interface.</div>
            </div>
            <div class="iot-evidence-card">
              <div class="iot-evidence-img-wrapper">
                <span class="iot-evidence-badge">IMAGE 02: Firebase Authentication</span>
                <img src="images/iot/task-5/Screenshot 2026-09-28 142546.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" alt="Firebase Authentication" class="iot-evidence-img">
                <div class="iot-placeholder-area" style="display: none; width: 100%; min-height: 220px;"><i class="fa-solid fa-image placeholder-big-icon"></i><p>[ IMAGE WILL BE UPLOADED LATER ]</p></div>
              </div>
              <div class="iot-evidence-caption">Firebase Authentication console showing registered users.</div>
            </div>
          </div>
        </div>

        <!-- 11 — PROJECT DEMONSTRATION VIDEOS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-video"></i> System Demonstration Videos</h3>
          <div class="dual-mode-grid" style="margin-bottom: 0;">
            <div class="iot-video-featured-card" style="margin-bottom: 0;">
              <div class="iot-video-wrapper">
                <span class="iot-evidence-badge" style="top: 1rem; left: 1rem; right: auto;"><i class="fa-solid fa-film"></i> Demonstration Video 01</span>
                <video controls class="iot-evidence-video">
                  <source src="images/iot/task-5/WhatsApp Video 2026-09-28 at 4.12.38 PM.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
              <div class="iot-evidence-caption" style="margin-top: 0.75rem;"><i class="fa-solid fa-play"></i> Demonstration 01: ESP32 telemetry, real-time logging & monitoring.</div>
            </div>
            <div class="iot-video-featured-card" style="margin-bottom: 0;">
              <div class="iot-video-wrapper">
                <span class="iot-evidence-badge" style="top: 1rem; left: 1rem; right: auto;"><i class="fa-solid fa-film"></i> Demonstration Video 02</span>
                <video controls class="iot-evidence-video">
                  <source src="images/iot/task-5/WhatsApp Video 2026-09-28 at 4.12.49 PM.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
              <div class="iot-evidence-caption" style="margin-top: 0.75rem;"><i class="fa-solid fa-play"></i> Demonstration 02: Dual control mode switching & CSV data export.</div>
            </div>
          </div>
        </div>

        <!-- 12 — SETUP & CONFIGURATION -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-list-check"></i> Setup & Configuration</h3>
          <div class="iot-steps-timeline">
            <div class="iot-step-card"><div class="step-card-num">STEP 01</div><div class="step-card-body"><p>Sensor readings are collected by the ESP32.</p></div></div>
            <div class="iot-step-card"><div class="step-card-num">STEP 02</div><div class="step-card-body"><p>Each reading is associated with a time and stored as historical data.</p></div></div>
            <div class="iot-step-card"><div class="step-card-num">STEP 03</div><div class="step-card-body"><p>The dashboard displays the stored readings in the Data Log section.</p></div></div>
            <div class="iot-step-card"><div class="step-card-num">STEP 04</div><div class="step-card-body"><p>The user can select manual or automatic bulb control.</p></div></div>
            <div class="iot-step-card"><div class="step-card-num">STEP 05</div><div class="step-card-body"><p>Automatic mode compares the LDR reading against the configured threshold.</p></div></div>
            <div class="iot-step-card"><div class="step-card-num">STEP 06</div><div class="step-card-body"><p>The logged information can be exported as a CSV file.</p></div></div>
          </div>
        </div>

        <!-- 13 — SYSTEM WORKFLOW -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-network-wired"></i> System Workflow</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">Full-Page Visual System Workflow Diagram:</p>
          <div class="iot-flow-diagram">
            <div class="iot-flow-node"><div class="flow-step-badge">1. SENSORS</div><h4>DHT11 + LDR</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">2. MCU</div><h4>ESP32</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-broker"><div class="flow-step-badge">3. BAAS</div><h4>Firebase</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">4. STORE</div><h4>History</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">5. UI</div><h4>Dashboard</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node"><div class="flow-step-badge">6. LOG</div><h4>Data Log</h4></div>
            <div class="iot-flow-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="iot-flow-node highlight-output"><div class="flow-step-badge">7. EXPORT</div><h4>CSV Export</h4></div>
          </div>
        </div>

        <!-- 14 — LIMITATIONS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-triangle-exclamation"></i> Current Limitations</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card"><i class="fa-solid fa-cloud comp-icon"></i><h4>Firebase Usage</h4><p>The free Firebase plan has usage limits, so a continuously growing history may eventually require data cleanup or a higher usage plan.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-gauge-simple-high comp-icon"></i><h4>Sensor Accuracy</h4><p>The DHT11 provides basic environmental measurements, so the readings are more suitable for monitoring trends than precision measurement.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-sliders comp-icon"></i><h4>LDR Threshold</h4><p>Dark/bright classification depends on the selected threshold and the physical placement of the LDR.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-wifi comp-icon"></i><h4>Internet Dependency</h4><p>The system relies on Wi-Fi connectivity, and readings are not stored locally on the ESP32 when the connection is unavailable.</p></div>
          </div>
        </div>

        <!-- 15 — FUTURE IMPROVEMENTS -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-rocket"></i> Future Improvements</h3>
          <div class="iot-components-grid">
            <div class="iot-component-card"><i class="fa-solid fa-chart-line comp-icon"></i><h4>01 History Visualization</h4><p>Convert the historical data table into interactive charts for easier trend analysis.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-bell comp-icon"></i><h4>02 Alerts</h4><p>Introduce notifications when a sensor value crosses a defined limit.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-sd-card comp-icon"></i><h4>03 Offline Data Buffering</h4><p>Temporarily store readings on the ESP32 during Wi-Fi interruptions and upload them once connectivity returns.</p></div>
          </div>
        </div>

        <!-- 16 — WHAT I LEARNED -->
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-graduation-cap"></i> What I Learned</h3>
          <p class="iot-text-content" style="margin-bottom: 1.25rem;">This stage helped me understand the importance of storing and reusing IoT data instead of only displaying live values. I learned how historical records can be organized into a data log, how sensor thresholds can be used for automation, and how cloud data can be exported for use outside the dashboard.</p>
          <div class="iot-concepts-grid">
            <div class="iot-component-card"><i class="fa-solid fa-database comp-icon"></i><h4>Data Logging</h4><p>Keeping historical sensor information.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-robot comp-icon"></i><h4>Automation</h4><p>Using sensor conditions to control hardware.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-hand comp-icon"></i><h4>Manual Control</h4><p>Allowing the user to directly operate the output.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-file-csv comp-icon"></i><h4>Data Export</h4><p>Making IoT information available as a CSV file.</p></div>
            <div class="iot-component-card"><i class="fa-solid fa-cloud-gear comp-icon"></i><h4>Cloud Data Management</h4><p>Working with stored historical information rather than only live readings.</p></div>
          </div>
        </div>

        <!-- 17 — REFLECTION -->
        <div class="iot-detail-block full-width reflection-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-quote-left"></i> Reflection</h3>
          <p class="iot-text-content reflection-text">"The final stage shifted my focus from simply monitoring live sensor values to managing the information collected over time. Storing historical readings made the system more useful because previous conditions could be reviewed later. CSV export also showed how IoT data can be taken beyond the dashboard and used for further analysis. Implementing both manual and automatic modes helped me understand how control decisions can be shared between the user and the system."</p>
        </div>

      </div>

      <!-- PORTFOLIO TASK NAVIGATION & FOOTER -->
      <div class="iot-task-nav">
        <button class="btn btn-outline-sm" onclick="openIoTDetails(4)">
          <i class="fa-solid fa-arrow-left"></i> Previous Task
        </button>
        <span class="badge badge-primary">Task 05</span>
        <button class="btn btn-outline-sm" disabled style="opacity: 0.5;">
          Next Task <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="iot-detail-footer">
        <button onclick="closeIoTDetails()" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
      </div>
    `;
  } else {
    detailsView.innerHTML = `
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
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-eye"></i> Overview</h3>
          <p class="placeholder-text">${exp.overview}</p>
        </div>
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-circle-exclamation"></i> Problem Statement</h3>
          <p class="placeholder-text">${exp.problemStatement}</p>
        </div>
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-bullseye"></i> Objective</h3>
          <p class="placeholder-text">${exp.objective}</p>
        </div>
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
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-network-wired"></i> Circuit / Architecture</h3>
          <div class="iot-placeholder-area architecture-box">
            <i class="fa-solid fa-microchip placeholder-big-icon"></i>
            <p>${exp.architectureText}</p>
          </div>
        </div>
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-tags"></i> Technologies</h3>
          <div class="iot-tech-badges-list">
            ${exp.technologies.map(t => `<span class="tag-badge"><i class="fa-solid fa-code"></i> ${t}</span>`).join('')}
          </div>
        </div>
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
        <div class="iot-detail-block full-width">
          <h3 class="iot-block-title"><i class="fa-solid fa-images"></i> Output / Results</h3>
          <div class="iot-placeholder-area gallery-box">
            <i class="fa-solid fa-photo-film placeholder-big-icon"></i>
            <p>${exp.outputGalleryText}</p>
          </div>
        </div>
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-lightbulb"></i> What I Learned</h3>
          <p class="placeholder-text">${exp.whatILearned}</p>
        </div>
        <div class="iot-detail-block">
          <h3 class="iot-block-title"><i class="fa-solid fa-rocket"></i> Future Improvements</h3>
          <p class="placeholder-text">${exp.futureImprovements}</p>
        </div>
      </div>

      <div class="iot-detail-footer">
        <button onclick="closeIoTDetails()" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to IoT Works Grid
        </button>
      </div>
    `;
  }

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

const ENGINE_CONFIG = {
  maxDpr: 2,
  gridMajor: 100,
  gridMinor: 20,
  crossfadeSpeed: 0.05,

  themes: {
    dark: {
      bg: '#0b0f19',
      gridMajor: 'rgba(0, 242, 254, 0.14)',
      gridMinor: 'rgba(0, 242, 254, 0.035)',
      gridText: 'rgba(0, 242, 254, 0.35)',
      primary: '#00f2fe',
      secondary: '#4facfe',
      accent: '#ff5e36',
      warning: '#f59e0b',
      text: '#f8fafc',
      nodeLine: 'rgba(0, 242, 254, 0.22)',
      glow: 'rgba(0, 242, 254, 0.25)'
    },
    light: {
      bg: '#f1f5f9',
      gridMajor: 'rgba(2, 132, 199, 0.18)',
      gridMinor: 'rgba(2, 132, 199, 0.05)',
      gridText: 'rgba(2, 132, 199, 0.45)',
      primary: '#0284c7',
      secondary: '#2563eb',
      accent: '#ea580c',
      warning: '#d97706',
      text: '#0f172a',
      nodeLine: 'rgba(2, 132, 199, 0.28)',
      glow: 'rgba(2, 132, 199, 0.2)'
    }
  },

  sectionScenes: {
    'hero': 'gears',
    'about': 'network',
    'skills': 'network',
    'experience': 'chassis',
    'projects': 'cnc',
    'protosem': 'protosem',
    'iot-works': 'iot',
    'contact': 'contact'
  },

  nodesMobile: 18,
  nodesDesktop: 40,
  mobileBreakpoint: 768
};

function initMechatronicsBackground() {
  const canvas = document.getElementById('mechatronics-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, ENGINE_CONFIG.maxDpr);
  let width = 0;
  let height = 0;

  function updateCanvasDimensions() {
    dpr = Math.min(window.devicePixelRatio || 1, ENGINE_CONFIG.maxDpr);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }
  updateCanvasDimensions();

  let isMobile = width < ENGINE_CONFIG.mobileBreakpoint;
  let isTabVisible = true;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track Tab Visibility & Reduced Motion
  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
  });

  window.addEventListener('resize', () => {
    updateCanvasDimensions();
    isMobile = width < ENGINE_CONFIG.mobileBreakpoint;
  });

  // State Management
  const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };
  let currentActiveScene = 'gears';
  const sceneNames = ['gears', 'network', 'chassis', 'cnc', 'protosem', 'iot', 'contact'];
  const sceneWeights = { gears: 1, network: 0, chassis: 0, cnc: 0, protosem: 0, iot: 0, contact: 0 };
  let time = 0;
  let chassisProgress = 0;

  // Mouse Listener
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;

    // Update Spotlight Cursor Glow Element
    const glowEl = document.getElementById('cursor-glow');
    if (glowEl) {
      glowEl.style.left = e.clientX + 'px';
      glowEl.style.top = e.clientY + 'px';
      glowEl.classList.add('active');
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    const glowEl = document.getElementById('cursor-glow');
    if (glowEl) glowEl.classList.remove('active');
  });

  // IntersectionObserver for Section-to-Scene Switching
  const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'protosem', 'iot-works', 'contact'];
  const observerOptions = { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.15 };

  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const mappedScene = ENGINE_CONFIG.sectionScenes[id] || 'gears';
        currentActiveScene = mappedScene;

        if (id === 'experience') chassisProgress = 0;
      }
    });
  }, observerOptions);

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) sceneObserver.observe(el);
  });

  // -------------------------------------------------------------------------
  // SCENE 1: HERO - Wireframe Gear Train & Floating Callouts
  // -------------------------------------------------------------------------
  const gearCallouts = [
    { text: "Ø 84.50 mm", sub: "PITCH CIRCLE", xRatio: 0.72, yRatio: 0.35, phase: 0 },
    { text: "R 42.0 mm", sub: "MODULE 1.5 Z=24", xRatio: 0.78, yRatio: 0.55, phase: 2 },
    { text: "± 0.001 mm", sub: "PRECISION TOL", xRatio: 0.62, yRatio: 0.65, phase: 4 },
    { text: "NEMA 23", sub: "STEPPER DRIVE", xRatio: 0.55, yRatio: 0.28, phase: 1 }
  ];

  function drawGearsScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    const parallaxX = (mouse.x - width / 2) * 0.035;
    const parallaxY = (mouse.y - height / 2) * 0.035;
    const cx = width * (isMobile ? 0.5 : 0.7) + parallaxX;
    const cy = height * 0.45 + parallaxY;

    // Gear 1 (Main Sun Gear)
    const r1 = isMobile ? 80 : 120;
    const teeth1 = 24;
    const rot1 = time * 0.3;

    drawGear(cx, cy, r1, teeth1, rot1, colors.primary, 2);

    // Gear 2 (Interlocking Pinion)
    const r2 = r1 * 0.5;
    const teeth2 = 12;
    const angle2 = -0.65;
    const cx2 = cx + (r1 + r2) * Math.cos(angle2);
    const cy2 = cy + (r1 + r2) * Math.sin(angle2);
    const rot2 = -rot1 * (teeth1 / teeth2) + Math.PI / teeth2;

    drawGear(cx2, cy2, r2, teeth2, rot2, colors.secondary, 1.5);

    // Gear 3 (Idler Cluster)
    const r3 = r1 * 0.7;
    const teeth3 = 17;
    const angle3 = 1.85;
    const cx3 = cx + (r1 + r3) * Math.cos(angle3);
    const cy3 = cy + (r1 + r3) * Math.sin(angle3);
    const rot3 = -rot1 * (teeth1 / teeth3) + Math.PI / teeth3;

    drawGear(cx3, cy3, r3, teeth3, rot3, colors.accent, 1.5);

    // Pitch Line mesh connections
    ctx.strokeStyle = colors.gridMajor;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, r1, 0, Math.PI * 2);
    ctx.arc(cx2, cy2, r2, 0, Math.PI * 2);
    ctx.arc(cx3, cy3, r3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dimension Callouts
    gearCallouts.forEach((callout) => {
      const alpha = Math.max(0, Math.sin(time * 1.5 + callout.phase) * 0.7 + 0.3);
      const bx = width * callout.xRatio + parallaxX;
      const by = height * callout.yRatio + parallaxY;

      ctx.save();
      ctx.globalAlpha = weight * alpha;
      ctx.strokeStyle = colors.primary;
      ctx.fillStyle = colors.text;
      ctx.font = '10px "JetBrains Mono", monospace';

      ctx.beginPath();
      ctx.arc(bx, by, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + 25, by - 20);
      ctx.lineTo(bx + 110, by - 20);
      ctx.stroke();

      ctx.fillText(callout.text, bx + 30, by - 24);
      ctx.fillStyle = colors.gridText;
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillText(callout.sub, bx + 30, by - 12);
      ctx.restore();
    });

    ctx.restore();
  }

  function drawGear(x, y, radius, teeth, rotation, color, lineWidth) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    const outerR = radius + 8;
    const innerR = radius - 10;
    const toothAngle = (Math.PI * 2) / teeth;
    const halfTooth = toothAngle * 0.28;

    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a = i * toothAngle;
      ctx.lineTo(Math.cos(a - halfTooth) * innerR, Math.sin(a - halfTooth) * innerR);
      ctx.lineTo(Math.cos(a - halfTooth * 0.7) * outerR, Math.sin(a - halfTooth * 0.7) * outerR);
      ctx.lineTo(Math.cos(a + halfTooth * 0.7) * outerR, Math.sin(a + halfTooth * 0.7) * outerR);
      ctx.lineTo(Math.cos(a + halfTooth) * innerR, Math.sin(a + halfTooth) * innerR);
    }
    ctx.closePath();
    ctx.stroke();

    // Inner Hub & Spokes
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.12, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 4; i++) {
      const sa = (i * Math.PI) / 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(sa) * (radius * 0.12), Math.sin(sa) * (radius * 0.12));
      ctx.lineTo(Math.cos(sa) * (radius * 0.35), Math.sin(sa) * (radius * 0.35));
      ctx.stroke();
    }
    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // SCENE 2: ABOUT / SKILLS - Interactive Circuit Node Mesh & Packets
  // -------------------------------------------------------------------------
  const nodeCount = isMobile ? ENGINE_CONFIG.nodesMobile : ENGINE_CONFIG.nodesDesktop;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.2 + 1.2,
      pulse: Math.random() * Math.PI * 2
    });
  }

  const packets = [];
  for (let i = 0; i < 8; i++) {
    packets.push({
      from: Math.floor(Math.random() * nodeCount),
      to: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004
    });
  }

  function drawNetworkScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    // Update & draw nodes
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Cursor Reaction
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 160 && mouse.active) {
        node.x -= (dx / dist) * 0.8;
        node.y -= (dy / dist) * 0.8;
      }

      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Connecting Lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 140) {
          ctx.strokeStyle = colors.nodeLine;
          ctx.lineWidth = (1 - d / 140) * 1.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Data Packets
    packets.forEach((p) => {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.from = p.to;
        p.to = Math.floor(Math.random() * nodes.length);
      }

      const n1 = nodes[p.from];
      const n2 = nodes[p.to];
      if (n1 && n2) {
        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;

        ctx.fillStyle = colors.accent;
        ctx.shadowColor = colors.accent;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // SCENE 3: EXPERIENCE - Formula Student Spaceframe Chassis 3D Line Drawing
  // -------------------------------------------------------------------------
  const chassisVertices = [
    // Front Bulkhead
    [-1.0, 0.4, -0.4], [-1.0, -0.4, -0.4], [-1.0, -0.3, 0.4], [-1.0, 0.3, 0.4],
    // Front Suspension Hoop
    [-0.4, 0.5, -0.5], [-0.4, -0.5, -0.5], [-0.4, -0.4, 0.5], [-0.4, 0.4, 0.5],
    // Main Roll Hoop
    [0.3, 0.65, -0.6], [0.3, -0.65, -0.6], [0.3, -0.45, 0.95], [0.3, 0.45, 0.95],
    // Rear Subframe
    [1.1, 0.5, -0.5], [1.1, -0.5, -0.5], [1.1, -0.4, 0.6], [1.1, 0.4, 0.6]
  ];

  const chassisEdges = [
    // Front Bulkhead
    [0, 1], [1, 2], [2, 3], [3, 0],
    // Front to Suspension
    [0, 4], [1, 5], [2, 6], [3, 7],
    // Suspension Hoop
    [4, 5], [5, 6], [6, 7], [7, 4],
    // Triangulation Front
    [0, 5], [1, 4], [2, 7], [3, 6],
    // Suspension to Main Hoop
    [4, 8], [5, 9], [6, 10], [7, 11],
    // Main Hoop
    [8, 9], [9, 10], [10, 11], [11, 8],
    // Side Impact Triangulated Tubes
    [4, 9], [5, 8], [6, 11], [7, 10],
    // Main Hoop to Rear Subframe
    [8, 12], [9, 13], [10, 14], [11, 15],
    // Rear Subframe
    [12, 13], [13, 14], [14, 15], [15, 12],
    // Rear Diagonal Bracing
    [8, 13], [9, 12], [10, 15], [11, 14]
  ];

  function drawChassisScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    if (chassisProgress < 1) chassisProgress += 0.015;

    const yaw = time * 0.35 + (mouse.x - width / 2) * 0.0006;
    const pitch = 0.25 + (mouse.y - height / 2) * 0.0006;

    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch), sinP = Math.sin(pitch);

    const scale = isMobile ? 180 : 260;
    const cx = width * (isMobile ? 0.5 : 0.65);
    const cy = height * 0.5;

    // Project Vertices
    const projected = chassisVertices.map(v => {
      let x = v[0], y = v[1], z = v[2];

      // Yaw rotation
      let x1 = x * cosY - y * sinY;
      let y1 = x * sinY + y * cosY;
      let z1 = z;

      // Pitch rotation
      let y2 = y1 * cosP - z1 * sinP;
      let z2 = y1 * sinP + z1 * cosP;

      return {
        px: cx + x1 * scale,
        py: cy - z2 * scale
      };
    });

    // Draw Edges with Progressive Reveal
    const edgesToDraw = Math.floor(chassisEdges.length * Math.min(1, chassisProgress));

    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = colors.accent;
    ctx.shadowBlur = 10;

    for (let i = 0; i < edgesToDraw; i++) {
      const e = chassisEdges[i];
      const p1 = projected[e[0]];
      const p2 = projected[e[1]];

      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Chassis Telemetry Label
    ctx.fillStyle = colors.accent;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText("FS-CHASSIS v3.2 [CHROMOLY 4130]", cx - 110, cy + scale * 0.7);
    ctx.fillStyle = colors.gridText;
    ctx.fillText("TORSIONAL RIGIDITY: 1450 Nm/deg | -500g OPTIMIZED", cx - 110, cy + scale * 0.7 + 14);

    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // SCENE 4: PROJECTS - CNC Toolpath Glowing Cutter & Fading Trail
  // -------------------------------------------------------------------------
  const cncTrail = [];
  const cncWaypoints = [
    { x: 0.25, y: 0.35 },
    { x: 0.55, y: 0.35 },
    { x: 0.65, y: 0.45 },
    { x: 0.65, y: 0.65 },
    { x: 0.45, y: 0.75 },
    { x: 0.30, y: 0.60 },
    { x: 0.25, y: 0.35 }
  ];

  let cncPathProgress = 0;

  function drawCNCScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    cncPathProgress += 0.004;
    if (cncPathProgress >= 1) cncPathProgress = 0;

    // Interpolate current tool position
    const totalWaypoints = cncWaypoints.length - 1;
    const currIndex = Math.floor(cncPathProgress * totalWaypoints);
    const segT = (cncPathProgress * totalWaypoints) - currIndex;

    const w1 = cncWaypoints[currIndex];
    const w2 = cncWaypoints[currIndex + 1];

    const tx = (w1.x + (w2.x - w1.x) * segT) * width;
    const ty = (w1.y + (w2.y - w1.y) * segT) * height;

    // Add to fading trail
    cncTrail.push({ x: tx, y: ty, alpha: 1.0 });
    if (cncTrail.length > 90) cncTrail.shift();

    // Draw fading cut trail
    for (let i = 1; i < cncTrail.length; i++) {
      const p1 = cncTrail[i - 1];
      const p2 = cncTrail[i];
      p1.alpha *= 0.96;

      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = weight * p1.alpha;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Draw Glowing Cutter Head
    ctx.globalAlpha = weight;
    ctx.fillStyle = colors.warning;
    ctx.shadowColor = colors.warning;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(tx, ty, 4, 0, Math.PI * 2);
    ctx.fill();

    // Spindle Tool Circle
    ctx.strokeStyle = colors.warning;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(tx, ty, 12, 0, Math.PI * 2);
    ctx.stroke();

    // Live G-Code HUD Overlay
    ctx.shadowBlur = 0;
    ctx.fillStyle = colors.primary;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`G01 X${tx.toFixed(1)} Y${ty.toFixed(1)} F350`, tx + 18, ty - 8);
    ctx.fillStyle = colors.gridText;
    ctx.fillText(`SPINDLE: 12,000 RPM | ENDMILL Ø6.0mm`, tx + 18, ty + 6);

    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // SCENE 5: PROTOSEM - PCB Trace Timeline & Component Outlines
  // -------------------------------------------------------------------------
  function drawProtoSemScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    const traceY = height * 0.55;
    const startX = width * 0.1;
    const endX = width * 0.9;

    // Main PCB Bus Line
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, traceY);

    const stepWidth = (endX - startX) / 8;
    for (let i = 0; i <= 8; i++) {
      const px = startX + i * stepWidth;
      const py = traceY + (i % 2 === 0 ? 0 : -35);
      ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Lit Nodes along timeline
    const activeNodeIndex = Math.floor((time * 1.5) % 9);
    for (let i = 0; i <= 8; i++) {
      const px = startX + i * stepWidth;
      const py = traceY + (i % 2 === 0 ? 0 : -35);

      ctx.fillStyle = i === activeNodeIndex ? colors.accent : colors.secondary;
      if (i === activeNodeIndex) {
        ctx.shadowColor = colors.accent;
        ctx.shadowBlur = 12;
      }

      ctx.beginPath();
      ctx.arc(px, py, i === activeNodeIndex ? 6 : 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Drifting Electronics Symbol Outlines
    drawSchematicResistor(width * 0.25, height * 0.35 + Math.sin(time) * 10, colors.gridText);
    drawSchematicCapacitor(width * 0.75, height * 0.3 + Math.cos(time) * 10, colors.gridText);

    ctx.restore();
  }

  function drawSchematicResistor(x, y, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x - 30, y);
    ctx.lineTo(x - 15, y);
    ctx.lineTo(x - 10, y - 8);
    ctx.lineTo(x - 0, y + 8);
    ctx.lineTo(x + 10, y - 8);
    ctx.lineTo(x + 15, y);
    ctx.lineTo(x + 30, y);
    ctx.stroke();
    ctx.restore();
  }

  function drawSchematicCapacitor(x, y, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x - 25, y); ctx.lineTo(x - 6, y);
    ctx.moveTo(x - 6, y - 12); ctx.lineTo(x - 6, y + 12);
    ctx.moveTo(x + 6, y - 12); ctx.lineTo(x + 6, y + 12);
    ctx.moveTo(x + 6, y); ctx.lineTo(x + 25, y);
    ctx.stroke();
    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // SCENE 6: IoT WORKS - ESP32 Wi-Fi Arcs & Oscilloscope Waveforms
  // -------------------------------------------------------------------------
  function drawIoTScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    const wifiX = width * (isMobile ? 0.5 : 0.8);
    const wifiY = height * 0.4;

    // Expanding Concentric Wi-Fi Arcs
    for (let i = 1; i <= 4; i++) {
      const radius = ((time * 30 + i * 20) % 80) + 10;
      const alpha = Math.max(0, 1 - radius / 90);

      ctx.strokeStyle = colors.primary;
      ctx.globalAlpha = weight * alpha;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(wifiX, wifiY, radius, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
    }

    ctx.globalAlpha = weight;
    ctx.fillStyle = colors.primary;
    ctx.beginPath();
    ctx.arc(wifiX, wifiY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Scrolling Oscilloscope Sine Wave & PWM Square Wave
    const waveY = height * 0.7;
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < width; x += 6) {
      const sineVal = Math.sin((x * 0.015) - (time * 4)) * 25;
      if (x === 0) ctx.moveTo(x, waveY + sineVal);
      else ctx.lineTo(x, waveY + sineVal);
    }
    ctx.stroke();

    // PWM Square Wave overlay
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = 0; x < width; x += 10) {
      const pwmVal = Math.sin((x * 0.015) - (time * 4)) > 0 ? 18 : -18;
      if (x === 0) ctx.moveTo(x, waveY + 50 + pwmVal);
      else ctx.lineTo(x, waveY + 50 + pwmVal);
    }
    ctx.stroke();

    // Telemetry Status Text
    ctx.fillStyle = colors.primary;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText("ESP32-WROOM-32 [2.4GHz Wi-Fi / BLE]", wifiX - 90, wifiY + 25);
    ctx.fillStyle = colors.gridText;
    ctx.fillText("MQTT: CONNECTED | BAUD: 115200 | RSSI: -42 dBm", wifiX - 90, wifiY + 38);

    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // SCENE 7: CONTACT - Calm State Particle Equilibrium Convergence
  // -------------------------------------------------------------------------
  const calmParticles = [];
  for (let i = 0; i < 25; i++) {
    calmParticles.push({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 200 + 50,
      speed: 0.005 + Math.random() * 0.005,
      radius: Math.random() * 2 + 1
    });
  }

  function drawContactScene(colors, weight) {
    if (weight <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = weight;

    const focalX = width / 2;
    const focalY = height * 0.45;

    // Central Equilibrium Focal Ring
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(focalX, focalY, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Particles converging into orbit
    calmParticles.forEach(p => {
      p.angle += p.speed;
      if (p.dist > 50) p.dist -= 0.2;

      const px = focalX + Math.cos(p.angle) * p.dist;
      const py = focalY + Math.sin(p.angle) * p.dist;

      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // GLOBAL BLUEPRINT GRID DRAWING ENGINE
  // -------------------------------------------------------------------------
  function drawBlueprintGrid(colors) {
    ctx.save();
    const major = ENGINE_CONFIG.gridMajor;
    const minor = ENGINE_CONFIG.gridMinor;

    // Minor Grid Lines
    ctx.strokeStyle = colors.gridMinor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < width; x += minor) {
      ctx.moveTo(x, 0); ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += minor) {
      ctx.moveTo(0, y); ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Major Grid Lines & Coordinate Labels
    ctx.strokeStyle = colors.gridMajor;
    ctx.fillStyle = colors.gridText;
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.beginPath();

    for (let x = 0; x < width; x += major) {
      ctx.moveTo(x, 0); ctx.lineTo(x, height);
      ctx.fillText(`X:${Math.round(x)}`, x + 4, 12);
    }
    for (let y = 0; y < height; y += major) {
      ctx.moveTo(0, y); ctx.lineTo(width, y);
      ctx.fillText(`Y:${Math.round(y)}`, 4, y - 4);
    }
    ctx.stroke();

    // Corner Intersection Crosses '+'
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 1;
    for (let x = major; x < width; x += major) {
      for (let y = major; y < height; y += major) {
        ctx.beginPath();
        ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y);
        ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // -------------------------------------------------------------------------
  // MAIN ANIMATION RENDER LOOP (60 FPS)
  // -------------------------------------------------------------------------
  function render() {
    if (!isTabVisible) {
      requestAnimationFrame(render);
      return;
    }

    time += 0.016;

    // Smooth Lerp Mouse Movement
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    // Update Scene Crossfade Weights
    sceneNames.forEach(name => {
      const targetWeight = (name === currentActiveScene) ? 1 : 0;
      sceneWeights[name] += (targetWeight - sceneWeights[name]) * ENGINE_CONFIG.crossfadeSpeed;
    });

    // Detect Theme Mode
    const htmlTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const colors = ENGINE_CONFIG.themes[htmlTheme] || ENGINE_CONFIG.themes.dark;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // If Reduced Motion requested, render simple static grid & pause heavy loop
    if (prefersReducedMotion) {
      drawBlueprintGrid(colors);
      requestAnimationFrame(render);
      return;
    }

    // 1. Base Blueprint Grid
    drawBlueprintGrid(colors);

    // 2. Render Layered Active Scenes with Crossfading
    drawGearsScene(colors, sceneWeights.gears);
    drawNetworkScene(colors, sceneWeights.network);
    drawChassisScene(colors, sceneWeights.chassis);
    drawCNCScene(colors, sceneWeights.cnc);
    drawProtoSemScene(colors, sceneWeights.protosem);
    drawIoTScene(colors, sceneWeights.iot);
    drawContactScene(colors, sceneWeights.contact);

    requestAnimationFrame(render);
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

/* ==========================================================================
   BUTTON STYLE SWITCHER & CINEMATIC MOUSE SPOTLIGHT ENGINE
   ========================================================================== */
function initCinematicButtonEffects() {
  const buttons = document.querySelectorAll('.btn, .tab-btn, .exp-nav-btn, .week-pill');
  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--mouse-x', `${x}px`);
      btn.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initButtonStyleToggle() {
  const toggleBtn = document.getElementById('btn-style-toggle-btn');
  let savedBtnStyle = 'cinematic';
  try {
    savedBtnStyle = localStorage.getItem('btnStyle') || 'cinematic';
  } catch (e) {
    console.warn('localStorage error:', e);
  }

  applyButtonStyle(savedBtnStyle);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentStyle = document.body.classList.contains('btn-style-classic') ? 'classic' : 'cinematic';
      const newStyle = currentStyle === 'cinematic' ? 'classic' : 'cinematic';
      applyButtonStyle(newStyle);
      try {
        localStorage.setItem('btnStyle', newStyle);
      } catch (e) {}

      if (newStyle === 'cinematic') {
        showToast('Switched to Cinematic Glass Floating Buttons', 'fa-wand-magic-sparkles');
      } else {
        showToast('Switched to Classic Portfolio Buttons', 'fa-square');
      }
    });
  }
}

function applyButtonStyle(style) {
  const toggleBtn = document.getElementById('btn-style-toggle-btn');
  if (style === 'classic') {
    document.body.classList.remove('btn-style-cinematic');
    document.body.classList.add('btn-style-classic');
    if (toggleBtn) {
      toggleBtn.classList.add('classic-active');
      toggleBtn.title = 'Switch Button Style (Currently: Classic Solid)';
    }
  } else {
    document.body.classList.remove('btn-style-classic');
    document.body.classList.add('btn-style-cinematic');
    if (toggleBtn) {
      toggleBtn.classList.remove('classic-active');
      toggleBtn.title = 'Switch Button Style (Currently: Cinematic Floating Glass)';
    }
  }
}

/* ==========================================================================
   CINEMATIC EDITORIAL PAGE TRANSITIONS & STEPPED MASK ANIMATION ENGINE
   ========================================================================== */
function initCinematicPageTransitions() {
  const overlay = document.getElementById('cinematic-transition-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .hero-cta a, .nav-brand');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetSection = document.querySelector(href);
      if (!targetSection) return;

      e.preventDefault();

      if (overlay) {
        overlay.classList.remove('exit');
        overlay.classList.add('active');

        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'auto' });
          overlay.classList.add('exit');

          if (href === '#hero') {
            triggerHeroMaskAnimation();
          }

          setTimeout(() => {
            overlay.classList.remove('active', 'exit');
          }, 450);
        }, 350);
      } else {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initial hero mask animation
  setTimeout(() => {
    triggerHeroMaskAnimation();
  }, 250);
}

function triggerHeroMaskAnimation() {
  const wrapper = document.querySelector('.cinematic-hero-mask-wrapper');
  if (wrapper) {
    wrapper.classList.remove('animating-mask');
    void wrapper.offsetWidth;
    wrapper.classList.add('animating-mask');
  }
}

function initEditorialScrollAnimations() {
  const elements = document.querySelectorAll('.stagger-editorial, .section-header, .glass-card, .project-card, .skill-card');
  
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}



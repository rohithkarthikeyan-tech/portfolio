/* ==========================================================================
   ROHITH KARTHIKEYAN - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initSkillsFilter();
  initExperienceTabs();
  initMetricCounter();
  initProtoSem();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'fa-circle-half-stroke');
  });
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

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
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
  event.preventDefault();
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const subject = document.getElementById('form-subject').value;

  showToast(`Thank you ${name}! Your inquiry regarding '${subject}' has been recorded.`, 'fa-circle-check');
  document.getElementById('contact-form').reset();
}

function copyToClipboard(elementId, label) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`, 'fa-copy');
  }).catch(() => {
    showToast(`Copied: ${text}`, 'fa-copy');
  });
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
    title: "Design for Manufacturing (DFM) & BOM",
    phase: "Phase 1: Discovery & Concept",
    tasks: [
      "Optimized sensor bracket geometry for CNC milling & sheet metal bending.",
      "Finalized complete Bill of Materials (BOM) with cost estimates.",
      "Selected IP67 waterproof connectors for external chassis wire runs.",
      "Prepared component procurement request."
    ],
    assignments: [
      "Week 4 Bill of Materials (BOM) & Costing Table",
      "DFM Guidelines Compliance Report"
    ],
    image: "images/cnc.png"
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

let currentProtoSemWeek = 1;
let protoSemData = JSON.parse(localStorage.getItem('protoSemData')) || defaultProtoSemWeeks;

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

  const weekNameLabel = `Week ${weekNum}`;

  let tasksHtml = (data.tasks || []).map(t => `<li><i class="fa-solid fa-square-check text-cyan"></i> ${t}</li>`).join('');

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


# Research

Conon Labs is building a shared ground network for small satellites. Our research focuses on letting one ground station serve many satellites at once, and on the hardware and software needed to make that work in orbit.

## Areas of Investigation

<div class="research-explorer">
  <div class="re-index" role="tablist" aria-label="Research areas">
    <button type="button" class="re-tab is-active" role="tab" id="re-tab-1" aria-controls="re-panel-1" aria-selected="true"><span class="re-num">01</span><span class="re-title">Contention-based multiple access</span></button>
    <button type="button" class="re-tab" role="tab" id="re-tab-2" aria-controls="re-panel-2" aria-selected="false" tabindex="-1"><span class="re-num">02</span><span class="re-title">RF hardware</span></button>
    <button type="button" class="re-tab" role="tab" id="re-tab-3" aria-controls="re-panel-3" aria-selected="false" tabindex="-1"><span class="re-num">03</span><span class="re-title">Flight and ground firmware</span></button>
    <button type="button" class="re-tab" role="tab" id="re-tab-4" aria-controls="re-panel-4" aria-selected="false" tabindex="-1"><span class="re-num">04</span><span class="re-title">Network and operations software</span></button>
    <button type="button" class="re-tab" role="tab" id="re-tab-5" aria-controls="re-panel-5" aria-selected="false" tabindex="-1"><span class="re-num">05</span><span class="re-title">Prototyping and testing</span></button>
  </div>
  <div class="re-panels">
    <div class="re-panel is-active" role="tabpanel" id="re-panel-1" aria-labelledby="re-tab-1">
      <img class="re-img" src="assets/images/01-contention-based-multiple-access.jpg" alt="Four satellites on an orbit all linking to one ground station at once, with signal ripples around the dish" width="1200" height="800" loading="lazy" decoding="async" />
      <h3>Contention-based multiple access</h3>
      <p>A custom protocol that lets a satellite request a contact window the moment it enters view, so one ground station can serve several satellites at once without pre-booked slots. We study how it holds up under Doppler shift, path loss and many satellites contending at the same time, including degraded links such as tumbling spacecraft.</p>
    </div>
    <div class="re-panel" role="tabpanel" id="re-panel-2" aria-labelledby="re-tab-2">
      <img class="re-img" src="assets/images/02-rf-hardware.jpg" alt="A transceiver board with a chip and two amplifier stages, feeding a patch antenna that radiates" width="1200" height="800" loading="lazy" decoding="async" />
      <h3>RF hardware</h3>
      <p>Low-cost, high-reliability transceivers for both the satellite and the ground station, from RF front-end design to antenna topologies. We build and test them on our own boards and with industry-standard SDRs.</p>
    </div>
    <div class="re-panel" role="tabpanel" id="re-panel-3" aria-labelledby="re-tab-3">
      <img class="re-img" src="assets/images/03-flight-and-ground-firmware.jpg" alt="A microcontroller with a stack of three protocol layers above it, linked to a satellite and a dish" width="1200" height="800" loading="lazy" decoding="async" />
      <h3>Flight and ground firmware</h3>
      <p>Robust low-level firmware and communication stacks for CubeSat OBCs, payload modules and ground station equipment, validated over real RF links.</p>
    </div>
    <div class="re-panel" role="tabpanel" id="re-panel-4" aria-labelledby="re-tab-4">
      <img class="re-img" src="assets/images/04-network-and-operations-software.jpg" alt="A wireframe globe with orbits and ground stations next to a pass-scheduling timeline" width="1200" height="800" loading="lazy" decoding="async" />
      <h3>Network and operations software</h3>
      <p>A web-based platform for operators, with live orbital propagation, multi-satellite command queuing and encrypted command and telemetry, designed to be simple and hands-off.</p>
    </div>
    <div class="re-panel" role="tabpanel" id="re-panel-5" aria-labelledby="re-tab-5">
      <img class="re-img" src="assets/images/05-prototyping-and-testing.jpg" alt="A CubeSat structure with its circuit board lifted out, next to a machined bracket with a milling toolpath" width="1200" height="800" loading="lazy" decoding="async" />
      <h3>Prototyping and testing</h3>
      <p>In-house SMT assembly, composite enclosures and machined parts, plus testing of components not originally designed for space on their way to LEO use.</p>
    </div>
  </div>
</div>

---

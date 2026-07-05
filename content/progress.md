<p class="doc-kicker">Prototype Log - Dynamic Slot Allocation Protocol</p>

# Our Progress

To test the protocol properly, we broke down how the RF chain interacts with our custom baseband handling, validating the scheduling logic independently of the radio hardware.

## RF Breakdown

![RF Breakdown](/assets/images/rfstart.png)

*Baseband handling retained, the RF chain discarded from the DAC/ADC stage onward.*

Testing was performed by keeping the baseband handling and discarding the RF chain from the DAC/ADC point onward. One device acted as a ground station, communicating with the computer over serial, while two devices wired in parallel stood in as satellites.

## Proof-of-Concept Setup

![Test setup](/assets/images/rftest.png)

*Ground station and two parallel "satellite" devices simulating the RF link.*

This lets us successfully test the dynamic slot-allocation protocol for "parallel" communication with the available satellites, while simulating the RF connection.

## The Prototype Dashboard

The service handling the ground-station device was developed and wired to the backend and frontend of the dashboard. The globe animation illustrates the calculated orbital movement of the satellites, derived from their TLEs.

![Dashboard — orbital view](/assets/images/Dashb-1.png)

*Live orbital propagation from TLE data.*

- **In View** — the satellites currently within the ground station's coverage window.
- **Send Command** — schedules a command to run the next time the specified satellite is available.
- **Periodic Commands** — ensures a specified command for a specified satellite is scheduled at least once within a defined interval.

![Dashboard — command panels](/assets/images/Dashb-2.png)

*Command scheduling and periodic-command panels.*

- **Command Log** - every command that is scheduled or has already run.
- **Telemetry Detail** - opens on any selected command to show its full detail.
- **Live Feed** — all activity passing through the GS module and GS service, such as the satellite identify function.

![Dashboard — command log and live feed](/assets/images/Dashb-3.png)

*Command log, telemetry detail, and live activity feed.*

## The Proof of Concept

We cut power to SAT1 so it disappears from the "In View" panel, simulating the satellite leaving the ground station's coverage. The dashboard reports how long ago the missing satellite was last available.

![SAT1 out of coverage](/assets/images/sat-miss.png)

*SAT1 dropped from coverage, last-seen time tracked.*

During this window we scheduled three commands for SAT1 and one for SAT2. The SAT1 commands are held as pending while it is unavailable; the SAT2 command executes immediately.

![Commands pending for SAT1](/assets/images/sat-pending.png)

*SAT1 commands queued as pending, SAT2 command runs at once.*

In the video below, SAT1 is reconnected to power, and the moment the ground station recognizes it as available, the pending commands are sent.

<video autoplay loop muted playsinline poster="/assets/images/Dashb-1.png">
  <source src="/assets/images/sat-respond.mp4" type="video/mp4">
  Your browser doesn't support embedded video.
</video>

*SAT1 was connected as recording began, it takes a few seconds to start up.*